const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://shiwusa:shiwusa123@cluster0.vxkvc.mongodb.net/pekbot?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("pekbot").collection("coursework");
    console.log("connected to database");
    client.close();
});