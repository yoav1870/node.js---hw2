const { connect } = require("http2");
const mongoose = require("mongoose");
const Path = require("path");
// const planModel = require(Path.join(__dirname, '../models/plan.model'));

const DB_HOST = "hw2.nbsqrps.mongodb.net/hw2db";
const DB_USER = "yoav";
const DB_PASS = "yoav";
const connectionUrl = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
console.log(connectionUrl);

mongoose
  .connect(connectionUrl)
  .then(() => console.log(`connected to DB`))
  .catch((err) => console.log(`connection error: ${err}`));

module.exports = mongoose;
