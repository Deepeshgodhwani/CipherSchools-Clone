const followersModel = require("../models/followers");
const userModel = require("../models/userAuth");
const userInfoModel=require("../models/userInfo")
const bcrypt = require("bcryptjs");



//upating user details
module.exports.updateUserProfile = async (req, res) => {
    try {
       const {contactNo,email}=req.body;
       let userr=await userModel.findOne({contactNo});
       
       
       if(userr.contactNo && userr.email!==email ){
            
          return res.status(200).send({
             status: "failure",
             message: "Contact number is already registered",
          })
       }
  
      await userModel.findByIdAndUpdate(req.user, req.body)

      const updatedUser=await userModel.findById(req.user)
      .populate('userInfo')
      .select("-password");
      

      return res
        .status(200)
        .send({ status: "success", data: updatedUser, message: "User is updated" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  };


  // update user info  -------------

  module.exports.updateUserInfo = async (req, res) => {
    try {
    
      let user = await userInfoModel.findOneAndUpdate({user:req.user}, req.body)

      if(!user){
        let data={...req.body,user:req.user};
        let userInfo=await userInfoModel.create(data);
        await userModel.findByIdAndUpdate(req.user,{userInfo:userInfo._id});
      }


      let updatedUser=await userModel.findById(req.user)
      .populate('userInfo')
      .select("-password");


     
      return res
        .status(200)
        .send({ status: "success", data: updatedUser, message: "User is updated" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  };
  
  
  //Reset user password
  
  module.exports.changePassword = async (req, res) => {
    try {
      const { currPass,newPass } = req.body;

      let user = await userModel.findById(req.user);
      //checking new  password  and old password is same or not
      let checkOldPassword = await bcrypt.compare(currPass, user.password);
      let checkNewPassword = await bcrypt.compare(newPass, user.password);
  
      if (!checkOldPassword || checkNewPassword) {
        return res.send({
          status: "failure",
          message: "Invalid Password",
        });
      }
  
      const salt = bcrypt.genSaltSync(10);
      const encryptedpass = await bcrypt.hash(newPass, salt);
      user.password = encryptedpass;
      await user.save();
      return res
        .status(200)
        .send({ status: "success", message: "Password is changed" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  };
  
  //to fetch followers
  
  module.exports.fetchFollowers = async (req, res) => {
    try {
      let followers = await followersModel.find({});
      return res.status(200).send({
        status: "success",
        data: followers,
        message: "List of followers",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  };
  