const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const RejectedAppointment = require("../models/RejectedAppointment");
const User = require("../models/User");
const moment = require("moment");

// Endpoint for uploading the appointments of a user into our database
router.post("/appointments", async (req, res) => {
  try {
    const { email, fullName, date, time, condition, accepted } = req.body;

    // Find the user based on the email address
    const user = await User.findOne({ email });

    //If user isn't found, return an error
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
      accepted, // Store the accepted status
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

// Endpoint for POST /appointments/reject
router.post("/appointments/reject", async (req, res) => {
  try {
    const { userId, rejectReason } = req.body;

    // Retrieve the appointment from the database based on the user
    const appointment = await Appointment.findOne({ user: userId });

    // if appointment not found, return an error
    if (!appointment) {
      return res.status(404).json({ error: 'No appointment found for the user' });
    }
    
    // Create a new rejected appointment instance
    const rejectedAppointment = new RejectedAppointment({
      userId, // Use the userId
      appointmentId: appointment._id, // Store the appointmentId for reference
      rejectReason,
      rejectedOn: new Date(),
    });

    // Save the rejected appointment to the database
    await rejectedAppointment.save();

    // Remove the appointment from the appointment collection
    await Appointment.findByIdAndRemove(appointment._id);

    // Send a response indicating the rejection was successful
    res.status(200).json({ message: "Appointment rejected successfully" });
  } catch (error) {
    // Handle any errors that occur during the rejection process
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while rejecting the appointment" });
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

// Endpoint to get the count of appointments
router.get("/appointments/count", async (req, res) => {
  try {
    // Get the count of appointments
    const count = await Appointment.countDocuments();

    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get appointment count" });
  }
});

//Endpoint for getting and sending the Appointment rejected message to our user who submitted the appointment

module.exports = router;
