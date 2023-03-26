const mongoose = require("mongoose");

const followersSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  avtar: {
    type: String,
  },
  currentStatus: {
    type: String,
  },
  followers: {
    type: Number,
    default: 0,
  },
});

const followers = mongoose.model("followers", followersSchema);

module.exports = followers;
