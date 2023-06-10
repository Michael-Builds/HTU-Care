const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  DrugName: {
    type: String,
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: String,
    required: true,
  },
  Dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.export = Prescription;
