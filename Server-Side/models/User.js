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

// Method to update email, password, and username
userSchema.methods.updateProfile = function (
  email,
  currentPassword,
  newPassword,
  username
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
        if (user.role === "doctor") {
          // Handle update for doctor role
          if (!user.isDoctorPasswordValid(currentPassword)) {
            return reject(new Error("Invalid current password"));
          }
          user.password = newPassword;
        } else if (user.role === "user") {
          // Handle update for user role
          if (!user.isUserPasswordValid(currentPassword)) {
            return reject(new Error("Invalid current password"));
          }
          user.password = newPassword;
        } else if (user.role === "admin") {
          // Handle update for admin role
          if (!user.isAdminPasswordValid(currentPassword)) {
            return reject(new Error("Invalid current password"));
          }
          user.password = newPassword;
        } else {
          return reject(new Error("Invalid role"));
        }
      }

      await user.save();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

/// Method to validate password for doctor role
userSchema.methods.isDoctorPasswordValid = function (password) {
  // Example password validation logic for doctor role
  // Assuming the doctor's password must be at least 8 characters long
  if (password.length < 8) {
    return false;
  }
  // Add more validation rules specific to the doctor role if needed
  return true;
};
// Method to validate password for doctor role
userSchema.methods.isDoctorPasswordValid = function (password) {
  // Example password validation logic for doctor role
  // Assuming the doctor's password must be at least 8 characters long
  // Password must contain at least one lowercase letter
  // Password must contain at least one special character (e.g., !@#$%^&*)
  // Password must not contain the word "doctor" or any variation of it
  if (
    password.length < 8 ||
    !/[a-z]/.test(password) ||
    !/[!@#$%^&*]/.test(password) ||
    /doctor/i.test(password)
  ) {
    return false;
  }
  return true;
};

// Method to validate password for user role
userSchema.methods.isUserPasswordValid = function (password) {
  const username = this.username.toLowerCase();
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password) ||
    this.isCommonPassword(password) ||
    password.toLowerCase().includes(username)
  ) {
    return false;
  }
  return true;
};

// Method to validate password for admin role
userSchema.methods.isAdminPasswordValid = function (password) {
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/\d/.test(password) ||
    !/[!@#$%^&*]/.test(password) ||
    this.isCommonPattern(password)
  ) {
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
  const sequentialPatterns = [
    "12345678",
    "abcdefgh",
    "qwertyui",
    // Add more sequential patterns if needed
  ];
  return sequentialPatterns.includes(password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
