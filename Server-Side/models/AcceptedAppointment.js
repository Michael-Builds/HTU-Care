const mongoose = require("mongoose");

const acceptedAppointmentSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  acceptInfo: {
    type: String,
    required: true,
  },
  acceptedOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const AcceptedAppointment = mongoose.model(
  "AcceptedAppointment",
  acceptedAppointmentSchema
);
module.exports = AcceptedAppointment;
