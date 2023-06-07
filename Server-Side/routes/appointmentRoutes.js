const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv");

// dotenv config
dotenv.config();

//callbacks for the models of our user and appointment
const User = require("../models/User");
const Appointment = require("../models/Appointment");

// Endpoint for booking an appointment
router.post("/appointments", async (req, res) => {
  const { fullName, email, date, time, condition } = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const userRole = decodedToken.role;

    if (userRole !== "user") {
      return res
        .status(403)
        .send("Access denied. Only users can book appointments.");
    }

    const user = await User.findById(userId).exec(); // Use await and exec() to wait for the query to execute
    if (!user) {
      return res.status(404).send("User not found");
    }

    const appointment = new Appointment({
      user: user._id,
      fullName,
      email,
      date,
      time,
      condition,
    });
    await appointment.save();

    const doctors = await User.find({ role: "doctor" });

    for (const doctor of doctors) {
      doctor.appointments.push(appointment);
      await doctor.save();
    }

    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

module.exports = router;
