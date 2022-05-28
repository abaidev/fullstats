### Introduction
This project is built on Django backend and React as a frontend.

The aim of the project was to design a web service where User can 
fetch news articles, read them, rate them and bookmark (favorites) them.

The project is containerized with help of Docker. Three main images 
will be built (postgres, redis, web image). This is achieved by using
`docker-compose`.

After filling and submitting Signup Form Users need to click on confirmation link in their email (except superuser).

### Configuration
Before you start, you need to do the followings:
  - clone this project to your computer
  - inside main directory of the project create folder named `conf`, and put inside file having name `dockers.env` which is going to hold environment variables
  - you may start project in Docker by running command `docker-compose up --build`

##### Environment Variables:
    SECRET_KEY
    DEBUG
    ALLOWED_HOSTS
    CORS_ORIGINS
    TIME_ZONE
    DATABASE_URL
    CELERY_BROKER_URL
    CELERY_RESULT_BACKEND
    EMAIL_BACKEND
    EMAIL_HOST
    EMAIL_PORT
    EMAIL_USE_TLS
    EMAIL_HOST_USER
    EMAIL_HOST_PASSWORD

if you plan to work without docker, then you'll have to create these in your environment, or just put these
variables in separate file called `vars.env` in the same `conf` folder. And in this case (not using Docker) for the React app create 
separate `.env` file inside `frontend` directory, which will be holding one variable 
`REACT_APP_API`.

##### Docker commands
  - docker-compose up --build
  - docker-compose down
  - docker ps -a
  - docker exec -it <mycontainer> bash
    - python3 manage.py createsuperuser

Application is available on [http://127.0.0.1:8000](http://127.0.0.1:8000) or 
[http://0.0.0.0:8000](http://0.0.0.0:8000) 

