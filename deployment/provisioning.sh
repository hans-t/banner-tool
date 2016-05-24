#!/bin/bash


## Check if SITENAME environment variable is defined.
if [ -z ${SITENAME+x} ];
    then exit 1;
fi


## Variable declarations.
export PROJECT_NAME=banner-tool
export ROOT_URL=/$PROJECT_NAME
export ROOT=~/sites/$SITENAME/$PROJECT_NAME

export NGINX_CONF=${PROJECT_NAME}.conf
export SUPERVISOR_CONF=${PROJECT_NAME}.conf
export SUPERVISOR_PROGRAM=gunicorn_${PROJECT_NAME}

export SOCKNAME=${SITENAME}_${PROJECT_NAME}.sock


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


### Install Node.js v6
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs


### lxml dependencies
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
DOLLAR=$ envsubst < nginx_template.conf > nginx.conf
DOLLAR=$ envsubst < supervisor_template.conf > supervisor.conf
DOLLAR=$ envsubst < gunicorn_start_template.sh > gunicorn_start.sh


sudo mkdir -p /etc/nginx/subsites-available/${SITENAME}
sudo mkdir -p /etc/nginx/subsites-enabled/${SITENAME}

sudo cp nginx.conf /etc/nginx/subsites-available/${SITENAME}/$NGINX_CONF
sudo cp supervisor.conf /etc/supervisor/conf.d/$SUPERVISOR_CONF


## make gunicorn script executable
sudo chmod u+x gunicorn_start.sh


## symlink configurations
sudo ln -sf /etc/nginx/subsites-available/${SITENAME}/$NGINX_CONF \
            /etc/nginx/subsites-enabled/${SITENAME}/$NGINX_CONF


## Restart services
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl stop $SUPERVISOR_PROGRAM
sudo supervisorctl start $SUPERVISOR_PROGRAM


## Install node packages and build index.js
cd $ROOT/source
npm i
npm run build
