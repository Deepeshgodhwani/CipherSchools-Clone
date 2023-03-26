
const User = require("../models/user");
const bcrypt = require("bcryptjs");
// creating user signing up  //

module.exports.createUser=async (req,res)=>{
    try {
        // checking whether the user already exists
  
        let userr = await User.findOne({ email: req.body.email });
        if (userr) {
          return res.send({status:"failure",message:"User is already exist"});
        }
  
        // to encrypt password before saving //
  
        const salt = await bcrypt.genSaltSync(10);
        const encryptedpass = await bcrypt.hash(req.body.password, salt);
  
        let user = await User.create({...req.body,password:encryptedpass});

        const data = {
          userId: user._id,
        };
  
        const authToken = jwt.sign(data, jwtSecret);
        return res.send({ status:"success",data:authToken,message:"User is created"});
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
      }
}



// logging up user //
 module.exports.userLogging=async (req, res) => {
      const { email, password } = req.body;
      try {
        // finding user exist or not //
        let user = await User.findOne({ email });
  
        if (!user) {
          // sending error if user does not exist//
          return res.send({
            status:"failure",
            message: "Please enter valid login credentials",
          });
        } else {
          // checking the encrypted password whether its matched with the saved one or not //
          let check = await bcrypt.compare(password, user.password);
          if (!check) {
            return res.send({
              status:"failure",
              message: "Please enter valid login credentials",
            });
          }
  
          const data = {
            userId: user._id,
          };
  
          //sending jwt token and user details if password ans email password is verified //
          const authToken = jwt.sign(data, jwtSecret);
          return res.send({ status:"success",data:{authToken,user},message:"User is logged"});
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
      }
    }
  
  
  //fetching log user details //
  
   module.exports.getUser=async (req, res) => {
    try {
      let userId = req.user;
      let user = await User.findById(userId).select("-password");
      if (user) {
        return res.send({ status:"success",data:user,message:"user detail"});
      }
  
      return res.send({status:"failure",message:"Please enter valid login credentials"});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }


  //upating user details

  module.exports.updateUserProfile= async (req,res)=>{
        try {
              
              let user=await user.findOneAndUpdate({_id:req.user},req.body)
              return res.send({ status:"success",data:user,message:"User is updated"});
             
        } catch (error) {

            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }  
     
  }

  
  

  