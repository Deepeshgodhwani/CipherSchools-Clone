const express = require("express");
const JWT_Auth = require("../config/JWT_Auth");
const {
  createUser,
  userLogging,
  getUser,
  updateUserProfile,
  changePassword,
} = require("../controller/userController");
const router = express.Router();

router.post("/createUser", createUser);
router.get("/logUser", JWT_Auth, userLogging);
router.get("/getUser", JWT_Auth, getUser);
router.put("/updateUser", JWT_Auth, updateUserProfile);
router.put("/resetPassword", JWT_Auth, changePassword);

module.exports = router;
