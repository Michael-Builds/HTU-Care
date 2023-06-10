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

    // Get the current time
    const prescriptionTime = new Date();

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
      !timesPerDay ||
      !additionalnotes
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

    //Convert the date string to a Date Object
    const formattedDate = new Date(prescriptiondate);

    // Create a new instance of the Prescription model
    const prescription = new Prescription({
      fullName,
      patientAge,
      contact,
      address,
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

    //Format the prescription summary for thr user

    const prescriptionSummary = `Prescription Destails:
      Patient: ${fullName}
      Age: ${patientAge}
      Contact: ${contact}
      Address: ${address}
      Doctor: ${doctorName}
      Drug Name: ${drugname}
      Prescription Date: ${formattedDate.toLocaleDateString()}
      Duration: ${durationDays}
      Time Interval: ${timeinterval}
      Times Per Day: ${timesPerDay}
      Additional Notes: ${additionalnotes}
      `;

    res.status(201).json({
      message: "Prescription uploaded Successfully",
      prescription: prescriptionSummary,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the prescription." });
  }
});

module.exports = router;
