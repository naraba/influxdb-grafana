import os
import random
import schedule
import time
from influxdb import InfluxDBClient

INFLUX_DATABASE = os.environ['INFLUXDB_DB']
INFLUX_USERNAME = os.environ['INFLUXDB_WRITE_USER']
INFLUX_PASSWORD = os.environ['INFLUXDB_WRITE_USER_PASSWORD']
client = InfluxDBClient('influxdb', 8086, INFLUX_USERNAME, INFLUX_PASSWORD, INFLUX_DATABASE)

def insertDataWithProbability(nodeId, minv, maxv, chance):
  if random.random() < chance:
    data = [
      {
        "measurement": "cpu_usage",
        "tags": {
          "nodeId": nodeId
        },
        "fields": {
          "usage": random.randint(minv, maxv)
        }
      }
    ]
    client.write_points(data)


def job():
  insertDataWithProbability('N0001', 20, 50, 1.0)
  insertDataWithProbability('N0002', 10, 20, 0.9)
  insertDataWithProbability('N0003', 30, 60, 0.9)
  insertDataWithProbability('N0004', 60, 90, 0.9)
  insertDataWithProbability('N0005', 50, 95, 0.5)

schedule.every(10).seconds.do(job)

while True:
  schedule.run_pending()
  time.sleep(1)


