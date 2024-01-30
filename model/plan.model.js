const { Schema, model} = require("mongoose");

const planSchema = new Schema({
  id: { type: Number, required: true , unique: true},
  planName: { type: String },
  locations: [
    {
      id: { type: Number },
      name: { type: String },
      description: { type: String },
      maxCapacity: { type: Number },
      safetyInstructions: { type: String},
      OtherThings: { type: String }
    }
  ]
}, { collection: 'evacuation-plan-generator' });

module.exports = model('plan', planSchema);
