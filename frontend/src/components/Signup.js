import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import logoImg from "../images/cipherlogo.png";
import googleImg from "../images/google.png";

function Signup(props) {
  const toast = useToast();
  const [userDetails, setuserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [contactNo, setcontactNo] = useState("");
  const { onClose, isSignin, toggleSigninView } = props;

  const createUser = async (e) => {
    e.preventDefault();

    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.email ||
      !userDetails.password
    ) {
      return;
    }

    const userData = contactNo ? { ...userDetails, contactNo } : userDetails;

    try {
      const response = await fetch(
        `http://localhost:7000/api/user/createUser`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      let result = await response.json();
      if (result.status === "success") {
        localStorage.setItem("token", result.data.authToken);
        localStorage.setItem("user", JSON.stringify(result.data.user));
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
        });
        onClose();
      } else {
        setuserDetails({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        toast({
          description: "User is already exists",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      setuserDetails({ firstName: "", lastName: "", email: "", password: "" });
      toast({
        description: "Internal server error",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleInputText = (e) => {
    setuserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    !isSignin && (
      <div
        className="w-[37rem] flex flex-col rounded-3xl shadow-lg shadow-white p-4
     h-[36rem] -top-10 -left-16 absolute bg-[rgb(38,44,54)]"
      >
        <div className="flex  justify-between">
          <p>Signup</p>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="flex flex-col overflow-y-scroll space-y-3 w-full items-center px-4">
          <div className="flex items-center space-x-2">
            <img alt="" className="w-10 " src={logoImg}></img>
            <div>CipherSchools</div>
          </div>
          <div className="text-center">
            <p>Create New Account</p>
            <p>Please provide your valid informations to signup</p>
          </div>
          <div className="flex flex-col space-y-4">
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
              onChange={(e) => {
                setcontactNo(e.target.value);
              }}
              value={contactNo}
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
              className="bg-[rgb(243,145,46)] py-2 rounded-lg"
            >
              {" "}
              signin
            </button>
          </div>
          <div className="flex">
            Don't have an account ?
            <p
              onClick={() => {
                toggleSigninView(true);
              }}
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
          <div className="flex">
            <img className="w-7" src={googleImg} alt="" />
            <p>Sign in with Google</p>
          </div>
        </div>
      </div>
    )
  );
}

export default Signup;
