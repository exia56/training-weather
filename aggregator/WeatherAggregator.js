const moment = require("moment");
module.exports = {
  aggregateToDBScheme: function (item) {
    const returnObj = {
      lat: item.lat,
      lon: item.lon,
      lat_wgs84: item.lat_wgs84,
      lon_wgs84: item.lon_wgs84,
      locationName: item.locationName,
      stationId: item.stationId,
      time: item.time.obsTime,
      timestamp: moment(item.time.obsTime).valueOf()
    };

    item.weatherElement.forEach(v => {
      returnObj[v.elementName] = v.elementValue.value;
    });
    item.parameter.forEach(v => {
      returnObj[v.parameterName] = v.parameterValue;
    });

    return returnObj;
  },
  aggregateArrayToDBScheme: function (list) {
    return list.map(v => this.aggregateToDBScheme(v));
  }
}

/*
{ _id: 5c6e3a20ce92353f6d100530,
  lat: '25.166689',
  lon: '121.440690',
  lat_wgs84: '25.16488889',
  lon_wgs84: '121.44890560',
  locationName: '淡水',
  stationId: '466900',
  time: '2019-02-21T13:30:00+08:00',
  timestamp: 1550727000000,
  ELEV: '19',
  WDIR: '250',
  WDSD: '0.50',
  TEMP: '23.70',
  HUMD: '0.81',
  PRES: '1015.20',
  '24R': '0',
  H_FX: '3.40',
  H_XD: '260',
  H_FXT: '1232',
  H_F10: '1.50',
  H_10D: '270',
  H_F10T: '1234',
  H_UVI: '-99',
  D_TX: '24.60',
  D_TXT: '1139',
  D_TN: '19.60',
  D_TNT: '0254',
  D_TS: '1.40',
  H_VIS: '-99',
  CITY: '新北市',
  CITY_SN: '06',
  TOWN: '淡水區',
  TOWN_SN: '004' }
*/