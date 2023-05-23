const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = mongoose.model("User");
const dotenv = require("dotenv");

//dotenv config
dotenv.config();


//Push Request for signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send("User already exists");
    }
    const user = new User({ username, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});


//Pull Request for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Email and password are required." });
  }

  //find the user based on their email
  const user = await User.findOne({ email });
  //if error or no user, it returns an error
  if (!user) {
    return res
      .status(422)
      .send({ error: "User with that email does not exist." });
  }

  try {
    await user.comparePassword(password);

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET
    );
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password" });
  }
});


//Endpoint for user role
router.get("/user-role", async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get the user's role from the decoded token
    const user = await User.findById(decodedToken.userId);
    const role = user.role;

    // Send the user's role in the response
    res.send({ role });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



// GET request to fetch the counts
router.get("/admin/dashboard", async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: "user" });
    const doctorCount = await User.countDocuments({ role: "doctor" });

    //fetching the user's and doctors names and email addresses
    const users = await User.find({ role: "user" }).select("username email");
    const doctors = await User.find({ role: "doctor" }).select(
      "username email"
    );

    res.json({ userCount, doctorCount, users, doctors });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// PUT endpoint for updating user information, including password
router.put("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const { CurrentPassword, NewPassword, ...updates } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's password if current password matches
    if (CurrentPassword && NewPassword) {
      await user.updatePassword(CurrentPassword, NewPassword);
    }

    // Update other fields of the user
    Object.assign(user, updates);
    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

module.exports = router;
