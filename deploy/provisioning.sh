#!/bin/bash

# Will need to include this project nginx configuration in nginx main conf.


export PROJECT_NAME=creative-tool
export SUFFIX=$SITENAME-$PROJECT_NAME
export ROOT=~/sites/$SITENAME/$PROJECT_NAME
export NGINX_CONF = nginx-$SUFFIX.conf
export SUPERVISOR_CONF = supervisor-$SUFFIX.conf


## Install required libraries
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    python3 \
    python3-pip \
    python3-venv \
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


## Populate variables in files
cd source/deployment
DOLLAR=$ envsubst < nginx_template.conf > $NGINX_CONF
DOLLAR=$ envsubst < supervisor_template.conf > $SUPERVISOR_CONF
DOLLAR=$ envsubst < gunicorn_start_template.sh > gunicorn_start.sh

sudo cp $NGINX_CONF /etc/nginx/sites-available/$SUFFIX.conf
sudo cp $SUPERVISOR_CONF /etc/supervisor/conf.d/$SUFFIX.conf


## make gunicorn script executable
sudo chmod u+x gunicorn_start.sh


## symlink configurations
sudo ln -sf /etc/nginx/sites-available/$SITENAME.conf /etc/nginx/sites-enabled/$SITENAME.conf


## Restart services
sudo service nginx stop
sudo service nginx start
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start gunicorn


# populate redis with bus stops data
cd $ROOT/source/app
../../venv/bin/python -c "import bus_stop; bus_stop.import_map_to_redis()"
