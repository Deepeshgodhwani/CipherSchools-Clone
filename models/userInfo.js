const mongoose = require("mongoose");

const userInfoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  about: {
    type: String,
  },
  webUrls: {
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  currentStatus: {
    highestEdu: {
      type: String,
    },
    currentlyDoing: {
      type: String,
    },
  },
  interests: [
    {
      type: String,
    },
  ],
});

const userInfo = mongoose.model("userInfo", userInfoSchema);

module.exports = userInfo;
