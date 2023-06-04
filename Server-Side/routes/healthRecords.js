const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const HealthRecord = require("../models/Health-Record");

// Upload health record endpoint
router.post("/", authMiddleware, async (req, res) => {
  try {
    // Ensure only users with the role of "user" can upload health records
    if (req.user.role !== "user") {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient privileges" });
    }

    // Extract the health record data from the request body
    const { fullName, email, facility, healthProvider, testType, date } =
      req.body;

    // Create a new health record object
    const healthRecord = new HealthRecord({
      fullName,
      email,
      facility,
      healthProvider,
      testType,
      date,
      user: req.user._id,
    });

    // Save the health record to the database
    await healthRecord.save();

    // Return a success response
    res.status(200).json({ message: "Health record uploaded successfully" });
  } catch (error) {
    // Handle any errors and return an error response
    res.status(500).json({
      message: "Failed to upload health record",
      error: error.message,
    });
  }
});

module.exports = router;
