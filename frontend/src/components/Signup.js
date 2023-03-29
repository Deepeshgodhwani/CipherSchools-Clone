import React, { useState, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import logoImg from "../images/cipherlogo.png";
import googleImg from "../images/google.png";
import userContext from "../context/userContext";
const URL = process.env.REACT_APP_HOST;

function Signup(props) {
  const toast = useToast();
  const [userDetails, setuserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNo: "",
  });

  const { onClose, isSignin, toggleSigninView } = props;
  const context = useContext(userContext);
  const { setuserData, setloading } = context;


  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }


  const createUser = async (e) => {
    e.preventDefault();
    //if input fields are empty
    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.email ||
      !userDetails.password
    ) {
      return;
    }

    if(!isValidEmail(userDetails.email)){
      toast({
        description: "Invalid Email Address",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }

    try {
      setloading(true);
      const response = await fetch(`${URL}/api/userAccount/createUser`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      let result = await response.json();
      if (result.status === "success") {
        onClose();
        //saving upated user to local storage
        localStorage.setItem("token", result.data.authToken);
        //updating global user data state
        localStorage.setItem("user", JSON.stringify(result.data.user));
        setuserData(result.data.user);
        toast({
          description: "Signup successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        toggleSigninView(true);
        setuserDetails({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          contactNo: "",
        });
       
        setloading(false);
      } else {
        //if user is already exists and still try to signUp //
        setuserDetails({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          contactNo: "",
        });
        toast({
          description: "User is already exists",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        setloading(false);
      }
    } catch (error) {
      setuserDetails({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contactNo: "",
      });
      toast({
        description: "Internal server error",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setloading(false);
    }
  };

  // /updating input text in userDetails object
  const handleInputText = (e) => {
    setuserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };


  const switchTab =()=>{
    toggleSigninView(true);
    setuserDetails({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      contactNo: "",
    });
  }

  return (
    !isSignin && (
      <div
        className="w-[37rem]  flex flex-col h-[92vh]  text-[rgb(238,238,238)] rounded-3xl p-4
     -top-10 -left-16 absolute bg-[rgb(38,44,54)]"
      >
        <div className="flex font-semibold text-3xl   justify-between">
          <p>Signup</p>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="flex flex-col styleScroll overflow-y-scroll space-y-3 w-full items-center px-4">
          <div className="flex items-center space-x-2">
            <img alt="" className="w-10 " src={logoImg}></img>
            <div className="font-bold text-2xl">CipherSchools</div>
          </div>
          <div className="text-center space-y-0">
            <p className="font-semibold text-[rgb(218,219,221)] text-lg">
              Create New Account
            </p>
            <p className="text-[rgb(174,176,180)]">
              Please provide your valid informations to signup
            </p>
          </div>
          <div className="flex flex-col pt-6 space-y-4">
            <input
              autoComplete="off"
              name="firstName"
              className="bg-[rgb(21,24,30)] 
                        outline-none w-[27rem] py-2 rounded-[10px] px-4"
              placeholder="First Name"
              type={"text"}
              onChange={handleInputText}
              value={userDetails.firstName}
              required
            ></input>
            <input
              autoComplete="off"
              name="lastName"
              className="bg-[rgb(21,24,30)] 
                        outline-none w-[27rem] py-2 rounded-[10px]  px-4"
              placeholder="Last Name"
              type={"text"}
              onChange={handleInputText}
              value={userDetails.lastName}
              required
            ></input>
            <input
              autoComplete="off"
              name="email"
              className="bg-[rgb(21,24,30)] 
                        outline-none w-[27rem] py-2 rounded-[10px]  px-4"
              placeholder="Email Address"
              type={"email"}
              onChange={handleInputText}
              value={userDetails.email}
              required
            ></input>
            <input
              autoComplete="off"
              name="contactNo"
              onChange={handleInputText}
              value={userDetails.contactNo}
              className="bg-[rgb(21,24,30)] 
                        outline-none w-[27rem] py-2 rounded-[10px] px-4"
              minLength={"10"}
              maxLength={"10"}
              placeholder="Phone (Optional)"
              type={"number"}
              required
            ></input>
            <input
              className="bg-[rgb(21,24,30)] 
                        outline-none w-[27rem] py-2 rounded-[10px] px-4"
              placeholder="Password"
              name="password"
              type={"password"}
              value={userDetails.password}
              onChange={handleInputText}
              required
            ></input>
            <div className="text-[rgb(216,132,47)] text-right">
              Forgot Password
            </div>
            <button
              onClick={createUser}
              className="bg-[rgb(243,145,46)] font-semibold py-2 rounded-lg"
            >
              {" "}
              signup
            </button>
          </div>
          <div className="flex">
            Don't have an account ?
            <p
              onClick={switchTab}
              className=" 
                    text-[rgb(216,132,47)] cursor-pointer"
            >
              Get Started
            </p>
          </div>
          <div className="flex items-center">
            <div className="border-t-2 w-40 border-[rgb(77,82,90)] h-0"></div>
            <p>OR</p>
            <div className="border-t-2 w-40 border-[rgb(77,82,90)] h-0"></div>
          </div>
          <div className="flex bg-[rgb(21,24,30)] rounded-xl space-x-4 font-semibold py-2 cursor-pointer px-4">
            <img className="w-7" src={googleImg} alt="" />
            <p>Sign in with Google</p>
          </div>
        </div>
      </div>
    )
  );
}

export default Signup;
