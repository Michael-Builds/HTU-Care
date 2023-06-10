const express = require("express");
const router = express.Router();
const Prescription = require("../models/Prescription");


// Endpoint for saving prescription data
router.post("/prescriptions", async (req, res) => {
  try {
    const {
      fullName,
      patientAge,
      contact,
      address,
      doctorName,
      drugname,
      prescriptiondate,
      durationDays,
      timeinterval,
      timesPerDay,
      additionalnotes,
    } = req.body;

    // Input validation
    if (
      !fullName ||
      !patientAge ||
      !contact ||
      !address ||
      !doctorName ||
      !drugname ||
      !prescriptiondate ||
      !durationDays ||
      !timeinterval ||
      !timesPerDay
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (contact.length > 10) {
      return res
        .status(400)
        .json({ error: "Contact number should be up to 10 characters." });
    }
    if (contact.length < 10) {
      return res.status(400).json({
        error: "Contact number should not be less than 10 characters",
      });
    }

    if (patientAge <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid age. Age must be a positive number." });
    }

    // Create a new instance of the Prescription model
    const prescription = new Prescription({
      fullName,
      patientAge,
      contact,
      address,
      doctorName,
      drugname,
      prescriptiondate,
      durationDays,
      timeinterval,
      timesPerDay,
      additionalnotes,
    });

    // Save the prescription to the database
    const savedPrescription = await prescription.save();

    res.status(201).json(savedPrescription);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the prescription." });
  }
});

module.exports = router;
