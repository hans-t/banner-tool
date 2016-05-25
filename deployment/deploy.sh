#!/bin/bash

## Update repo
git checkout master
git reset --hard origin/master
git pull

## Reinstall node packages and rebuild index.js
npm i
npm run build

## Restart server
sudo supervisorctl restart gunicorn_banner-tool
