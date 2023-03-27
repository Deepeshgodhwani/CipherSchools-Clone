const express = require("express");
const JWT_Auth = require("../config/JWT_Auth");
const {
  createUser,
  userLogging,
  getUser,
  updateUserProfile,
  changePassword,
  fetchFollowers,
} = require("../controller/userController");
const router = express.Router();

router.post("/createUser", createUser);
router.post("/logUser", userLogging);
router.get("/getUser", JWT_Auth, getUser);
router.put("/updateUser", JWT_Auth, updateUserProfile);
router.put("/resetPassword", JWT_Auth, changePassword);
router.get("/getFollowers", JWT_Auth, fetchFollowers);


module.exports = router;
