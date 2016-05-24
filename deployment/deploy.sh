#!/bin/bash

## Update repo
git checkout master
git reset --hard origin/master
git pull

## Reinstall node packages
npm i

## Restart server
sudo supervisorctl restart gunicorn_banner-tool
