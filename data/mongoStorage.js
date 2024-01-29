require("dotenv").config();
const mongoose = require("mongoose");
const Path = require("path");

module.exports = class MongoStorage {
  constructor(plan) {
    this.Model = require(Path.resolve(__dirname, `../model/${plan}.model.js`));
    this.connect();
  }
  connect() {
    const connectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
    mongoose
      .connect(connectionUrl)
      .then(() => console.log(`connected to DB`))
      .catch((err) => console.log(`connection error: ${err}`));
  }
  find() {
    return this.Model.find();
  }
  retrieve(id) {
    // console.log(id);
    return this.Model.find({ id });
  }
  create(data) {
    const plan = new this.Model(data);
    plan.save();
  }
  delete(id){
    return this.Model.deleteOne({id});
  }
  update(id,data){
    return this.Model.updateOne({id},data); 
  }
};


