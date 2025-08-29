const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required to log in!"],
    },
    password: {
      type: Number,
      required: [true, "Password is required to log in!"],
    },
  },
  {
    timestaps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
