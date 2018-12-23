const DB = process.env.INFLUXDB_DB;
const USER = process.env.INFLUXDB_WRITE_USER;
const PASSWORD = process.env.INFLUXDB_WRITE_USER_PASSWORD;
const URL = `http://${USER}:${PASSWORD}@influxdb:8086/${DB}`;

const INFLUX = require('influx');
const CLIENT = new INFLUX.InfluxDB(URL);

var insertDataWithProbability = function(nodeId, minv, maxv, chance) {
  if (Math.random() < chance) {
    // note: https://docs.influxdata.com/influxdb/v0.13/troubleshooting/frequently_encountered_issues/#writing-integers
    usage = Math.random() * (maxv - minv) + minv;
    data = [{
      "measurement": "cpu_usage",
      "tags": {
        "nodeId": nodeId
      },
      "fields": {
        "usage": usage
      }
    }];
    CLIENT.writePoints(data)
      .catch(error => {
        console.error(`Error: ${error.stack}`)
      });
  }
};

setInterval(function() {
  insertDataWithProbability('N0001', 20, 50, 1.0);
  insertDataWithProbability('N0002', 10, 20, 0.9);
  insertDataWithProbability('N0003', 30, 60, 0.9);
  insertDataWithProbability('N0004', 60, 90, 0.9);
  insertDataWithProbability('N0005', 50, 95, 0.5);
}, 10000);

