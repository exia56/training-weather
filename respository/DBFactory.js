const MongoClient = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017/";

let dbinstance;

module.exports = {
  createAsync: function () {
    return MongoClient.connect(dbUrl, { useNewUrlParser: true })
      .then(instance => {
        dbinstance = instance;
        return instance;
      });
  },
  getDB: function () {
    if (dbinstance && dbinstance.isConnected())
      return Promise.resolve(dbinstance);
    else return this.createAsync()
  }
}