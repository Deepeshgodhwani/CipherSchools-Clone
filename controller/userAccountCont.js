const userModel = require("../models/userAuth");
const bcrypt = require("bcryptjs");
const JWT=require('jsonwebtoken');
const JWTSecret = process.env.JWT_SECRET;


// creating user signing up  //
module.exports.createUser = async (req, res) => {
  try {
    // checking whether the user already exists
    let userr = await userModel.findOne({ email: req.body.email })
    .populate("userInfo");
    if (userr) {
      return res
        .status(200)
        .send({ status: "failure", message: "User is already exist" });
    }

    // to encrypt password before saving //

    const salt = bcrypt.genSaltSync(10);
    const encryptedpass = await bcrypt.hash(req.body.password, salt);

    let user = await userModel.create({ ...req.body, password: encryptedpass })
    user=user.toObject();
    delete user.password;

    const data = {
      userId: user._id,
    };

    const authToken = JWT.sign(data, JWTSecret);
    return res
      .status(200)
      .send({ status: "success", data:{user,authToken}, message: "User is created" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};


// logging up user //
module.exports.userLogging = async (req, res) => {

  const { email, password } = req.body;
  try {
    // finding user exist or not //
    let user = await userModel.findOne({ email })
    .populate("userInfo");;

    if (!user) {
      // sending error if user does not exist//
      return res.send({
        status: "failure",
        message: "Please enter valid login credentials",
      });
    } else {
      // checking the encrypted password whether its matched with the saved one or not //
      let check = await bcrypt.compare(password, user.password);
      if (!check) {
        return res.status(200).send({
          status: "failure",
          message: "Please enter valid login credentials",
        });
      }

      user=user.toObject();
      delete user.password;

      const data = {
        userId: user._id,
      };

      //sending JWT token and user details if password ans email password is verified //
      const authToken = JWT.sign(data, JWTSecret);
      return res.status(200).send({
        status: "success",
        data: { authToken, user },
        message: "User is logged",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

//fetching log user details //

module.exports.getUser = async (req, res) => {
  try {
    let userId = req.user;
    let user = await userModel.findById(userId)
    .populate("userInfo")
    .select("-password");
    if (user) {
      return res
        .status(200)
        .send({ status: "success", data: user, message: "user detail" });
    }

    return res.status(200).send({
      status: "failure",
      message: "Please enter valid login credentials",
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

