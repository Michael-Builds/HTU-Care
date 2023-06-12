const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const moment = require("moment");

router.post("/appointments", async (req, res) => {
  try {
    const { email, fullName, date, time, condition } = req.body;

    // Find the user based on the email address
    const user = await User.findOne({ email });

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

//will be accepting responses from appointments booked by th patients and then reply from the doctors

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

module.exports = router;
