const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const RejectedAppointment = require("../models/RejectedAppointment");
const AcceptedAppointment = require("../models/AcceptedAppointment");
const User = require("../models/User");
const moment = require("moment");

// Endpoint for uploading the appointments of a user into our database
router.post("/appointments", async (req, res) => {
  try {
    const { email, fullName, date, time, condition } = req.body;

    // Find the user based on the email address
    const user = await User.findOne({ email });

    // If user isn't found, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the user with the role of "doctor"
    const doctor = await User.findOne({ role: "doctor" });

    if (!doctor) {
      return res.status(404).json({ error: "No doctor found" });
    }

    // Check if the user has already booked two appointments
    const appointmentCount = await Appointment.countDocuments({
      user: user._id,
    });

    if (appointmentCount >= 2) {
      return res
        .status(400)
        .json({ error: "User has already booked two appointments" });
    }

    // Convert the date string to a Date object
    const formattedDate = new Date(date);

    // Convert the time string to a Date object
    const formattedTime = moment(time, "h:mm A").toDate();

    // Create a new appointment instance
    const appointment = new Appointment({
      doctor: doctor._id,
      user: user._id,
      fullName,
      email,
      date: formattedDate,
      time: formattedTime,
      condition,
    });

    // Save the appointment to the database
    await appointment.save();

    // Format the appointment summary for the doctor
    const appointmentSummary = `
      Appointment Details:
      Patient: ${fullName}
      Email: ${email}
      Date: ${formattedDate.toLocaleDateString()}
      Time: ${moment(formattedTime).format("h:mm A")}
      Condition: ${condition}
    `;

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: appointmentSummary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

// Endpoint for retrieving appointment details
router.get("/appointments", async (req, res) => {
  try {
    const appointmentDetails = await Appointment.find();
    res.json(appointmentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch appointment details" });
  }
});

//Endpoint for posting the rejection of appointment
router.post("/appointments/reject", async (req, res) => {
  try {
    const { appointmentId, rejectReason } = req.body;

    // Validate input data
    if (!rejectReason) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Find the appointment in the database based on the appointment ID
    const appointment = await Appointment.findOne({ id: appointmentId });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Update the appointment status to "rejected"
    appointment.status = "rejected";
    await appointment.save();

    // Create a new rejected appointment instance
    const rejectedAppointment = new RejectedAppointment({
      appointment: appointment._id,
      fullname: appointment.fullName,
      email: appointment.email,
      date: appointment.date,
      time: appointment.time,
      status: "rejected",
      condition: appointment.condition,
      rejectReason,
      rejectedOn: new Date(),
    });

    // Save the rejected appointment to the database
    await rejectedAppointment.save();

    // Remove the appointment from the appointment collection
    await Appointment.findByIdAndRemove(appointment._id);

    // Log the rejection
    console.log(`Appointment ${appointment._id} rejected`);

    // Send a response indicating the rejection was successful
    res.status(200).json({ message: "Appointment rejected successfully" });
  } catch (error) {
    console.error("An error occurred while rejecting the appointment:", error);

    // Handle specific error cases
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Validation error" });
    }

    // Handle other error cases
    res
      .status(500)
      .json({ error: "An error occurred while rejecting the appointment" });
  }
});

//Endpoint for the Appointment Acceptance
router.post("/appointments/accept", async (req, res) => {
  try {
    const { appointmentId, acceptInfo } = req.body;

    //Validate input data for acceptance
    if (!acceptInfo) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    //Find the appointment in the database based on the appointment ID
    const appointment = await Appointment.findOne({ id: appointmentId });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    //Update the appointment status to "accepted"
    appointment.status = "accepted";
    await appointment.save();

    //Createa new accepted appointments instance
    const acceptedAppointment = new AcceptedAppointment({
      appointment: appointment._id,
      fullname: appointment.fullName,
      email: appointment.email,
      date: appointment.date,
      time: appointment.time,
      status: "accepted",
      condition: appointment.condition,
      acceptInfo,
      acceptedOn: new Date(),
    });

    //Save the accepted appointment to the database
    await acceptedAppointment.save();

    //Remove the appointment from the appointment collection
    await Appointment.findByIdAndRemove(appointment._id);

    //Log the acceptance
    console.log(`Appointment ${appointment._id} accepted`);

    //Send a response indicating the acceptance was successful
    res.status(200).json({ message: "Appointment Accepted Successfully!" });
  } catch (error) {
    console.error("An error occurred while accepting the appointment:", error);

    // Handle specific error cases
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Validation error" });
    }

    // Handle other error cases
    res
      .status(500)
      .json({ error: "An error occurred while rejecting the appointment" });
  }
});

// Endpoint to count the number of appointments in the rejectedappointment database
router.get("/rejectedappointments/count", async (req, res) => {
  try {
    const count = await RejectedAppointment.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error counting appointments" });
  }
});

//Endpoint to count the number of appointments in the acceptedappointment collection
router.get("/acceptedappointments/count", async (req, res) => {
  try {
    const count = await AcceptedAppointment.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error counting appointments" });
  }
});

// Endpoint to get the count of appointments
router.get("/appointments/count", async (req, res) => {
  try {
    // Get the count of appointments
    const count = await Appointment.countDocuments({});

    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get appointment count" });
  }
});

// Endpoint for retrieving appointment details and returning to the user
router.get("/appointments/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;

    // Find the appointment in the database based on the appointment ID
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    let status = "pending";
    let appointmentDetails = appointment;

    // Check if the appointment is rejected
    const rejectedAppointment = await RejectedAppointment.findOne({
      appointment: appointment._id,
    });

    if (rejectedAppointment) {
      // Appointment is rejected
      status = "rejected";
      appointmentDetails = rejectedAppointment;
    }

    // Check if the appointment is accepted
    const acceptedAppointment = await AcceptedAppointment.findOne({
      appointment: appointment._id,
    });

    if (acceptedAppointment) {
      // Appointment is accepted
      status = "accepted";
      appointmentDetails = acceptedAppointment;
    }

    // Set the status field in the appointment details
    appointmentDetails.status = status;

    res.status(200).json({ status, appointment: appointmentDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch appointment details" });
  }
});

module.exports = router;
