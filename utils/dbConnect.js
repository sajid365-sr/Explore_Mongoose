
const { MongoClient, ServerApiVersion } = require('mongodb');

    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

const database = client.db('Test');




module.exports = {
  ToolsCollection: database.collection("Tools"),
  RandomDataCollection: database.collection("RandomData"),
};