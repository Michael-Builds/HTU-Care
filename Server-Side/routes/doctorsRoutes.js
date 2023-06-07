const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Doctor = mongoose.model("Doctor");
const dotenv = require("dotenv");

//dotenv configuration
dotenv.config();
