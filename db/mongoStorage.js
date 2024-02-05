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
  async find() {
    return await this.Model.find();
  }
  async retrieve(id) {
    return await this.Model.find({ id });
  }
  async create(data) {
    const plan = await new this.Model(data);
    await plan.save();
  }
  async delete(id) {
    return await this.Model.deleteOne({ id });
  }
  async update(id, data) {
    return await this.Model.updateOne({ id }, data);
  }
};
