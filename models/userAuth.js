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
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  avtar: {
    type: String,
    default:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1679893125/CipherSchools-clone/user_njz54h.png",
  },
  userInfo:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "userInfo",
  }
});

const user = mongoose.model("user", userSchema);

module.exports = user;
