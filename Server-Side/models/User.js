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
  image: {
    data: Buffer,
    contentType: String,
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

// Method to update email, password, username, and image
userSchema.methods.updateProfile = function (
  email,
  currentPassword,
  newPassword,
  username,
  image
) {
  const user = this;
  return new Promise(async (resolve, reject) => {
    try {
      // Update email if provided
      if (email) {
        user.email = email;
      }

      // Update username if provided
      if (username) {
        user.username = username;
      }

      // Update password if both currentPassword and newPassword are provided
      if (currentPassword && newPassword) {
        if (!user.isPasswordValid(currentPassword)) {
          return reject(new Error("Invalid current password"));
        }
        user.password = newPassword;
      }

      // Update image if provided
      if (image) {
        user.image = image;
      }

      await user.save();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// Method to validate password
userSchema.methods.isPasswordValid = function (password) {
  // Password validation logic


  // Example validation: Password must be at least 8 characters long
  if (password.length < 8) {
    return false;
  }

  return true;
};

// Method to check if the password is a common password
userSchema.methods.isCommonPassword = function (password) {
  const commonPasswords = ["password", "12345678", "qwerty"];
  return commonPasswords.includes(password);
};

// Method to check if the password is based on commonly used patterns
userSchema.methods.isCommonPattern = function (password) {
  const sequentialPatterns = ["12345678", "abcdefgh", "qwertyui"];
  return sequentialPatterns.includes(password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
