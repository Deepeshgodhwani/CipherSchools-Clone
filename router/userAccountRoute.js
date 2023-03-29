const express = require("express");
const JWT_Auth = require("../config/JWT_Auth");

const {
  createUser,
  userLogging,
  getUser,
} = require("../controller/userAccountCont");
const router = express.Router();

//Routes for user account ------

router.post("/createUser", createUser);
router.post("/logUser", userLogging);
router.get("/getUser", JWT_Auth, getUser);

module.exports = router;
