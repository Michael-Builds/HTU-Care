const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const HealthRecord = require("../models/Health-Record");

// POST /health-records - Create a new health record
router.post("/health-records", async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token and get the user's ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Check if the user has already uploaded three health records today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const recordCount = await HealthRecord.countDocuments({
      user: userId,
      date: { $gte: today, $lt: tomorrow },
    });

    if (recordCount >= 3) {
      return res.status(403).json({ error: "Maximum limit reached for today" });
    }

    // Create a new health record object
    const healthRecord = new HealthRecord({
      user: userId,
      fullName: req.body.fullName,
      email: req.body.email,
      facility: req.body.facility,
      healthProvider: req.body.healthProvider,
      testType: req.body.testType,
      date: req.body.date,
    });

    // Save the health record in the database
    const savedHealthRecord = await healthRecord.save();

    res.status(201).json(savedHealthRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save health record" });
  }
});

// GET /health-records - Fetch all health records
router.get('/health-records', async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find();
    res.json(healthRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch health records' });
  }
});

module.exports = router;
