require("../models/ImageSchema");
require("../models/TagSchema");

const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/mongoplayground";

mongoose.Promise = global.Promise;

module.exports = mongoose.connect(connectionString);
