const mongodb = require("mongodb");

let connection = "mongodb://localhost:27017/pets";

mongodb
    .MongoClient
    .connect(connection)
    .then(client => {
        let db = client.db("pets");

        let dogs = db.collection("dogs");

        dogs.insert({
            "name": "ivan",
            "age": 12,
            "color": "black",
            "breed": "whatever"
        });

        dogs.find({}).toArray((err, dogs )=> console.log(dogs))
    }).catch(e => {
        console.log(e);
    });