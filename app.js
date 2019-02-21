const express = require("express");

const app = express();

const WeatherRespository = require("./respository/WeatherRespository");

app.get("/weather", (req, res) => {
  let query = req.query,
    filter = { CITY_SN: "01" };
  if (query.city)
    filter.CITY_SN = `0${query.city}`.substr(-2);
  WeatherRespository.queryData(filter)
    .then(result => res.send(result))
    .catch(result => res.send(result));
})

app.listen(8080);