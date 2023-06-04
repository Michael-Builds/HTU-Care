const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// dotenv config
dotenv.config();

const authMiddleware = (req, res, next) => {
  // Check if the request has the 'Authorization' header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  // Extract the token from the 'Authorization' header
  const token = authHeader.split(" ")[1];

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Set the user object in the request
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
