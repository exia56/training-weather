const factory = require("./DBFactory");

module.exports = {
  insertDatas: function (datas) {
    return factory.getDB()
      .then(instanse => {
        const dbo = instanse.db("mydb");
        return dbo.collection("weather").insertMany(datas)

      }).then(res => true);
  },

  queryData: function (filter) {
    return factory.getDB()
      .then(instance => {
        const dbo = instance.db("mydb");
        return dbo.collection("weather").find(filter).sort("timestamp", -1).limit(1).toArray();
      }).then(res => {
        if (res && res[0])
          return res[0];
        else return Promise.reject("Data Not Found");
      });
  }
}