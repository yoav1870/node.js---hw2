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
  async retrieve(id) {
    // console.log(id);
    const doesPlanExist = await this.Model.exists({ id });
    // console.log(doesPlanExist);
    if (!doesPlanExist) {
      throw new Error("Plan not found");
    }
    return this.Model.find({ id });
  }
  async create(data) {
    const doesPlanExist = await this.Model.exists({ id : data.id });
    if (doesPlanExist) {
      throw new Error("Plan already exists");
    }
    const plan = new this.Model(data);
    // console.log(plan);
    plan.save();
  }
  async delete(id){
    const doesPlanExist = await this.Model.exists({ id });
    if (!doesPlanExist) {
      throw new Error("Plan not found");
    }
    return this.Model.deleteOne({id});
  }
  async update(id,data){
    const doesPlanExist = await this.Model.exists({ id });
    if (!doesPlanExist) {
      throw new Error("Plan not found");
    }
    return this.Model.updateOne({id},data); 
  }
};


