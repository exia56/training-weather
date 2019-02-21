const cron = require("node-cron"),
  fetchWeatherData = require("../service/fetchData");
//           ┌────────────── second (optional)
//           │ ┌──────────── minute
//           │ │ ┌────────── hour
//           │ │ │ ┌──────── day of month
//           │ │ │ │ ┌────── month
//           │ │ │ │ │ ┌──── day of week
//           │ │ │ │ │ │
//           │ │ │ │ │ │
//           * * * * * *
//每分鐘跑一次
cron.schedule("00 */1 * * *", () => {
  fetchWeatherData();
}).start();