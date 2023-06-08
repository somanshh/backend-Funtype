const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    requied: true,
  },
  password: {
    type: String,
    requied: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
