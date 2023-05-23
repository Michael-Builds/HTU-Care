const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const dotenv = require("dotenv");

// dotenv config
dotenv.config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  //authorization of our Bearer
  if (!authorization) {
    return res.status(200).send({ error: "Unauthorized Access" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(200).send({ error: "Unauthorized Access" });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
