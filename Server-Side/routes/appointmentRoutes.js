const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv");

// dotenv config
dotenv.config();

const User = require("./models/User");
const Appointment = require("./models/Appointment");

// Endpoint for booking an appointment
router.post("/appointments", async (req, res) => {
  const { fullName, email, date, time, condition } = req.body;

  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token and decode the user's ID and role
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const userRole = decodedToken.role;

    // Check if the user has the role "user"
    if (userRole !== "user") {
      return res.status(403).send("Access denied. Only users can book appointments.");
    }

    // Check if the user exists based on the decoded user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create a new appointment
    const appointment = new Appointment({
      user: user._id, // Assign the user's ID to the appointment
      fullName,
      email,
      date,
      time,
      condition,
    });
    await appointment.save();

    // Get all users with the role "doctor"
    const doctors = await User.find({ role: "doctor" });

    // Submit the appointment to each doctor
    for (const doctor of doctors) {
      doctor.appointments.push(appointment);
      await doctor.save();
    }

    // Send a success response
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

module.exports = router;
