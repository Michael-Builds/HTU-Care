const mongoose = require('mongoose');

const rejectedAppointmentSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  rejectReason: {
    type: String,
    required: true,
  },
  rejectedOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const RejectedAppointment = mongoose.model('RejectedAppointment', rejectedAppointmentSchema);

module.exports = RejectedAppointment;
