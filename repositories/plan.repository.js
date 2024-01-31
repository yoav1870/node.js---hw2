const MongoStorage = require('../db/mongoStorage');

module.exports = class PlanRepository{
    constructor () {
        if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
          this.storage = new MongoStorage('plan');
        }
        else{
            this.storage = null;
        }
      }
      find(){
        return this.storage.find();
      }
      retrieve(id){
        return this.storage.retrieve(id);
      }
      create(plan){
        return this.storage.create(plan);
      }
      update(id, plan){
        return this.storage.update(id, plan);
      }
      delete(id){
        return this.storage.delete(id);
      }
};