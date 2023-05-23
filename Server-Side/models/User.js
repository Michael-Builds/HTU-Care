const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "doctor"],
    default: "user",
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(err);
      }
      resolve(true);
    });
  });
};

userSchema.methods.updatePassword = function (CurrentPassword, NewPassword) {
  const user = this;
  return new Promise(async (resolve, reject) => {
    try {
      const isMatch = await user.comparePassword(CurrentPassword);
      if (!isMatch) {
        return reject(new Error("Invalid current password"));
      }
      user.password = NewPassword;
      await user.save();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

mongoose.model("User", userSchema);
