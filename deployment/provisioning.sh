#!/bin/bash


export PROJECT_NAME=banner-tool
export ROOT_URL=/$PROJECT_NAME
export SUFFIX=$SITENAME_$PROJECT_NAME
export ROOT=~/sites/$SITENAME/$PROJECT_NAME
export NGINX_CONF=nginx_$SUFFIX.conf
export SUPERVISOR_CONF=supervisor_$SUFFIX.conf
export SUPERVISOR_PROGRAM=gunicorn_$PROJECT_NAME


## Install required libraries
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    python3 \
    python3-pip \
    python3.4-venv \
    git \
    nginx \
    supervisor

# lxml dependencies
sudo apt-get install -y \
    libxml2-dev \
    libxslt1-dev \
    python3-dev \
    zlib1g-dev


## Change to root directory, create required folders
mkdir -p $ROOT
cd $ROOT
rm -rf source
mkdir -p logs


## Create Python virtual environment, clone Github repo and install Python packages
python3 -m venv --copies --clear venv
source venv/bin/activate
git clone git@github.com:hans-t/banner-tool.git source
pip install -r source/requirements.txt
pip install -U pip setuptools

### Install Gunicorn
pip install -U gunicorn


## Populate variables in files
cd source/deployment
DOLLAR=$ envsubst < nginx_template.conf > $NGINX_CONF
DOLLAR=$ envsubst < supervisor_template.conf > $SUPERVISOR_CONF
DOLLAR=$ envsubst < gunicorn_start_template.sh > gunicorn_start.sh

sudo cp $NGINX_CONF /etc/nginx/sites-available/$NGINX_CONF
sudo cp $SUPERVISOR_CONF /etc/supervisor/conf.d/$SUPERVISOR_CONF


## make gunicorn script executable
sudo chmod u+x gunicorn_start.sh


## symlink configurations
sudo ln -sf /etc/nginx/sites-available/$NGINX_CONF /etc/nginx/sites-enabled/$NGINX_CONF


## Restart services
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start $SUPERVISOR_PROGRAM


## Install node packages and build index.js
cd $ROOT/source
npm i
npm run build
