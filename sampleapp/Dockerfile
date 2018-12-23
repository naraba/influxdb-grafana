FROM python:3.7

ENV APP_HOME /app

RUN apt-get update && \
    apt-get -y install locales cron && \
    pip install --upgrade pip && \
    pip install --upgrade setuptools && \
    pip install schedule && \
    pip install influxdb && \
    mkdir -p $APP_HOME

WORKDIR $APP_HOME
ADD ./sampleapp/app.py $APP_HOME/


