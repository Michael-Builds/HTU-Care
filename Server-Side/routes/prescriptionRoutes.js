const express = require("express");
const router = express.Router();
const Prescription = require("../models/Prescription");

// Endpoint for saving prescription data
router.post("/prescriptions", async (req, res) => {
  try {
    const {
      selectedUser,
      patientAge,
      doctorName,
      drugname,
      prescriptiondate,
      durationDays,
      timeinterval,
      timesPerDay,
      additionalnotes,
    } = req.body;

    // Get the current time
    const prescriptionTime = new Date();

    // Input validation
    if (
      !selectedUser ||
      !patientAge ||
      !drugname ||
      !prescriptiondate ||
      !durationDays ||
      !timeinterval ||
      !timesPerDay ||
      !additionalnotes
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (patientAge <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid age. Age must be a positive number." });
    }

    // Convert the date string to a Date object
    const formattedDate = new Date(prescriptiondate);

    // Create a new instance of the Prescription model
    const prescription = new Prescription({
      selectedUser,
      patientAge,
      doctorName,
      drugname,
      prescriptiondate: formattedDate,
      durationDays,
      timeinterval,
      timesPerDay,
      additionalnotes,
      prescriptionTime,
    });

    // Save the prescription to the database
    await prescription.save();

    // Format the prescription summary for the user
    const prescriptionSummary = `Prescription Details:
      Patient: ${selectedUser}
      Age: ${patientAge}
      Doctor: ${doctorName}
      Drug Name: ${drugname}
      Prescription Date: ${formattedDate.toLocaleDateString()}
      Duration: ${durationDays}
      Time Interval: ${timeinterval}
      Times Per Day: ${timesPerDay}
      Additional Notes: ${additionalnotes}
      `;

    res.status(201).json({
      message: "Prescription uploaded successfully",
      prescription: prescriptionSummary,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the prescription." });
  }
});

// Endpoint to get all prescriptions
router.get("/prescriptions", async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json({
      message: "Prescriptions retrieved successfully",
      prescriptions,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the prescriptions." });
  }
});

module.exports = router;
