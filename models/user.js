const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  contactNo: {
    type: Number,
    unique: true,
  },
  password: {
    type: Number,
    require: true,
  },
  avtar: {
    type: String,
  },
  interests: [
    {
      type: String,
    },
  ],
});

const user = mongoose.model("user", userSchema);

module.exports = user;
