require("dotenv").config();
const mongoose = require("mongoose");
const Path = require("path");

module.exports = class MongoStorage {
  constructor(plan) {
    // this.model = require(Path.resolve(__dirname, `../model/${plan}.model`));
    this.connect();
  }
  connect() {
    const connectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
    console.log(connectionUrl);
    mongoose
      .connect(connectionUrl)
      .then(() => console.log(`connected to DB`))
      .catch((err) => console.log(`connection error: ${err}`));
  }
  find() {
    return this.model.find({});
  }
  retrieve(id) {
    return this.model.find({id});
  }
  create(data) {
    const plan = new this.model(data);
    plan.save();
  }
  delete(id){
    return this.model.deleteOne({id});
  }
  update(id,data){
    return this.model.updateOne({id},data); 
  }
};


