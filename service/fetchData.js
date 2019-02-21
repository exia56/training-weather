const fetch = require("node-fetch"),
  DBFactory = require("../respository/DBFactory"),
  WeatherRespository = require("../respository/WeatherRespository"),
  WeatherAggregator = require("../aggregator/WeatherAggregator");
const dataid = "O-A0003-001",
  apikey = "CWB-E45B2F56-414F-4EB2-BB55-AF4DDD8076B2",
  format = "json";

function main() {
  DBFactory.createAsync()
    .then(res => {
      return fetch(`https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/${dataid}?Authorization=${apikey}&format=${format}`, { method: "get" })
    })
    .then(res => res.json())
    .then(res => {
      // console.log(res);
      let datas = WeatherAggregator.aggregateArrayToDBScheme(res.cwbopendata.location);
      return WeatherRespository.insertDatas(datas)
    }).then(res => {
      if (res) console.log("insert success");
    }).catch(res => {
      console.log(res);
    });
}

if (require.main === module) {
  main()
} else {
  module.exports = main;
}
