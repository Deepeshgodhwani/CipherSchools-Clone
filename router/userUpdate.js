const express = require("express");
const JWT_Auth = require("../config/JWT_Auth");
const {
  updateUserProfile,
  changePassword,
  fetchFollowers,
  updateUserInfo,
} = require("../controller/userUpdateCont");
const router = express.Router();


//  Routes for user update ------

router.put("/updateUser", JWT_Auth, updateUserProfile);
router.put("/updateUserInfo", JWT_Auth, updateUserInfo);
router.put("/resetPassword", JWT_Auth, changePassword);
router.get("/getFollowers", JWT_Auth, fetchFollowers);

module.exports = router;
