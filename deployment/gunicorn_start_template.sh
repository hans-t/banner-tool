#!/bin/bash

ROOT=$ROOT
SOCKFILE=/tmp/$SUFFIX.sock
MODULE_DIR=${DOLLAR}ROOT/source/app/
NUM_WORKERS=3

cd ${DOLLAR}ROOT
source venv/bin/activate

exec gunicorn \
     --worker-class sync \
     --workers ${DOLLAR}NUM_WORKERS \
     --bind unix:${DOLLAR}SOCKFILE \
     --chdir ${DOLLAR}MODULE_DIR \
     --log-level debug \
     --access-logfile ${DOLLAR}ROOT/logs/gunicorn-$SUFFIX-access.log \
     --error-logfile ${DOLLAR}ROOT/logs/gunicorn-$SUFFIX-error.log \
     app:app