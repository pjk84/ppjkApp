#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

if [ "$FLASK_ENV" = "production" ]
then
    echo "Creating the database tables..."
    python wsgi.py create_db
    echo "Tables created"
fi

exec "$@"