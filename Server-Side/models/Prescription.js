const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  patientAge: {
    type: Number,
    required: true,
  },
  patientGender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  patientContact: {
    type: String,
    required: true,
  },
  patientAddress: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  prescriptionDate: {
    type: Date,
    required: true,
  },
  medications: {
    type: String,
    required: true,
  },
  dosageInstructions: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  additionalNotes: {
    type: String,
  },
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
