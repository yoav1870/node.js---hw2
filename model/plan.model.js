const { Schema, model} = require("mongoose");

const planSchema = new Schema({
  id: { type: Number, required: true },
  planName: { type: String, required: true },
  locations: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      maxCapacity: { type: Number, required: true },
      safetyInstructions: { type: String, required: true },
      OtherThings: { type: String }
    }
  ]
}, { collection: 'evacuation-plan-generator' });

module.exports = model('plan', planSchema);
