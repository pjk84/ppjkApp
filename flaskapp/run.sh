#!/bin/bash

echo "activate venv"
source $('pwd')/venv/bin/activate 
echo "...done"

echo "starting Flask app"
nohup python3 app.py &

