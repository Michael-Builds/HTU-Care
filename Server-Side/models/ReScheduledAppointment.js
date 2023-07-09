const mongoose = require("mongoose");

const rescheduledAppointmentSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  rescheduledReason: {
    type: String,
    required: true,
  },
  rescheduledOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rescheduled"],
    default: "pending",
  },
});

const ReScheduledAppointment = mongoose.model(
  "ReScheduledAppointment",
  rescheduledAppointmentSchema
);

module.exports = ReScheduledAppointment;
