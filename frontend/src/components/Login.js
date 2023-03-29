import React, { useContext, useEffect, useState } from "react";
import Signup from "./Signup";
import logoImg from "../images/cipherlogo.png";
import googleImg from "../images/google.png";
import userContext from "../context/userContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const URL = process.env.REACT_APP_HOST;

function Login() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSignin, setisSignin] = useState(true);
  const [userCredentials, setuserCredentials] = useState({
    email: "",
    password: "",
  });
  const context = useContext(userContext);
  const { setuserData, userData, setloading } = context;

  useEffect(() => {
    if (!userData?.email) {
      onOpen();
    }
    // eslint-disable-next-line
  }, []);

  const logUser = async (e) => {
    try {
      e.preventDefault();
      if (!userCredentials.email || !userCredentials.password) {
        return;
      }
      setloading(true);
      const response = await fetch(`${URL}/api/userAccount/logUser`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      let result = await response.json();
      if (result.status === "success") {
        onClose();
        localStorage.setItem("token", result.data.authToken);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        setuserData(result.data.user);
        setuserCredentials({ email: "", password: "" });
        toast({
          description: "Signin successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        
        setloading(false);
      } else {
        toast({
          description: result.message,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        setuserCredentials({ email: "", password: "" });
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setuserCredentials({ email: "", password: "" });
      toast({
        description: "Internal server error",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setloading(false);
    }
  };

  const handleInputText = (e) => {
    setuserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const toggleSigninView = (value) => {
    setisSignin(value);
  };

  
  const switchTab =()=>{
    toggleSigninView(false);
    setuserCredentials({ email: "", password: "" });
    
  }


  return (
    <div>
      <div
        onClick={onOpen}
        className="w-7 ml-1 cursor-pointer h-7 bg-[rgb(72,61,53)] flex justify-center items-center rounded-full"
      >
        <img
          alt=""
          className="w-3 "
          src={process.env.REACT_APP_DEFAULT_USERAVTAR}
        ></img>
      </div>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent backgroundColor={"transparent"} textColor="white">
          {isSignin && (
            <div className="w-[37rem] flex text-[rgb(238,238,238)] flex-col rounded-3xl p-4  px-6 h-[92vh] -top-10 -left-16 absolute bg-[rgb(38,44,54)]">
              <div className="flex font-semibold text-3xl justify-between">
                <p className="">Signin</p>
                <i className="fa-solid fa-xmark"></i>
              </div>
              <div className="flex flex-col space-y-3 w-full pt-8 items-center px-4">
                <div className="flex items-center space-x-2">
                  <img alt="" className="w-10 " src={logoImg}></img>
                  <div className="font-bold text-2xl">CipherSchools</div>
                </div>
                <div className="text-center space-y-2">
                  <p className="font-semibold text-[rgb(218,219,221)] text-lg">
                    Hey, Welcome!
                  </p>
                  <p className="text-[rgb(174,176,180)]">
                    Please provide your email and password to signin
                  </p>
                </div>
                <div className="flex flex-col space-y-4 pt-6">
                  <input
                    name="email"
                    className="bg-[rgb(21,24,30)] 
                        outline-none w-[27rem] py-2 rounded-[10px] px-4"
                    value={userCredentials.email}
                    autoComplete="off"
                    placeholder="Email ID"
                    type={"text"}
                    onChange={handleInputText}
                    required
                  ></input>
                  <input
                    className="bg-[rgb(21,24,30)] 
                        outline-none w-[27rem] py-2 rounded-[10px] px-4"
                    value={userCredentials.password}
                    autoComplete="off"
                    placeholder="Password"
                    name="password"
                    type={"password"}
                    onChange={handleInputText}
                    required
                  ></input>
                  <div className="text-[rgb(216,132,47)] text-right">
                    Forgot Password
                  </div>
                  <button
                    onClick={logUser}
                    className="bg-[rgb(243,145,46)] font-semibold py-2 rounded-lg"
                  >
                    {" "}
                    signin
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
          )}
          <Signup
            onClose={onClose}
            isSignin={isSignin}
            toggleSigninView={toggleSigninView}
          />
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Login;
