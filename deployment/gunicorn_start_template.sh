#!/bin/bash

ROOT=$ROOT
SOCKFILE=/tmp/$SOCKNAME
MODULE_DIR=${DOLLAR}ROOT/source
NUM_WORKERS=3

cd ${DOLLAR}ROOT
source venv/bin/activate

exec gunicorn \
     --worker-class sync \
     --workers ${DOLLAR}NUM_WORKERS \
     --bind unix:${DOLLAR}SOCKFILE \
     --chdir ${DOLLAR}MODULE_DIR \
     --log-level debug \
     --access-logfile ${DOLLAR}ROOT/logs/gunicorn_access.log \
     --error-logfile ${DOLLAR}ROOT/logs/gunicorn_error.log \
     app:app
