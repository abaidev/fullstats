#!/bin/bash

echo "Building Frontend"
cd /code/frontend
npm install
npm run build
cd /code

# Collect static files
echo "Collect static files"
python3 /code/manage.py collectstatic --noinput

# Apply database migrations
echo "Apply database migrations"
python3 /code/manage.py migrate

echo "Celery worker & beat starts in Detach mode"
celery -A fullstats worker --beat --detach -l info

echo "DJANGO SERVER starts"
python3 /code/manage.py runserver 0.0.0.0:8000
