const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    patientAge: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    drugname: {
      type: String,
      required: true,
    },
    prescriptiondate: {
      type: Date,
      required: true,
    },
    durationDays: {
      type: String,
      required: true,
    },
    timeinterval: {
      type: String,
      required: true,
    },
    timesPerDay: {
      type: String,
      required: true,
    },
    additionalnotes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
