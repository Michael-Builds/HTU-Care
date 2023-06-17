const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const dotenv = require("dotenv");
const multer = require('multer'); // For handling file uploads
// const User = require('../models/User'); //To enable use catch the user's details and id as well

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

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

    res.send({ token, userID: user._id });
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

// Endpoint for updating user details
router.patch('/users/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { email, password, username } = req.body;
  const image = req.file;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user details
    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    if (username) {
      user.username = username;
    }

    if (image) {
      // Assuming the User model has an 'image' field to store the image path
      user.image = image.path;
    }
    // Save the updated user
    await user.save();

    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user details' });
  }
});


// Endpoint for fetching user details by ID
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ userID: user._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});



module.exports = router;
