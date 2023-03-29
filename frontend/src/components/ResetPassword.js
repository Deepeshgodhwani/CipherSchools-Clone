import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
const URL = process.env.REACT_APP_HOST;

function ResetPassword(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { setloading } = props;
  const [password, setpassword] = useState({
    currentPass: "",
    newPass: "",
    confPass: "",
  });

  const closeTab = () => {
    setpassword({
      currentPass: "",
      newPass: "",
      confPass: "",
    });
    onClose();
  };

  const handleSubmit = async () => {
    //if info is empty or same as it was then return
    if (
      password.currPass === "" ||
      password.newPass === "" ||
      password.confPass === ""
    )
      return;

    if (password.currPass === password.newPass) {
      toast({
        description: "Current password and new password should not be same",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    //if current password and new password does'nt match
    if (password.newPass !== password.confPass) {
      toast({
        description: "New password and Confirm password should be same",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    //validator for short password
    if (password?.newPass?.length < 6) {
      toast({
        description: "Password is too short",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    try {
      setloading(true);
      let token = localStorage.getItem("token");
      const response = await fetch(`${URL}/api/userUpdate/resetPassword`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          currPass: password.currentPass,
          newPass: password.newPass,
        }),
      });

      let result = await response.json();
      if (result.status === "success") {
        closeTab();
        toast({
          description: "Password changed successfully",
          status: "success",
          duration: 1000,
          isClosable: true,
        });

        setloading(false);
      } else {
        //if Old Current password is not correct
        toast({
          description: result.message,
          status: "warning",
          duration: 1000,
          isClosable: true,
        });
        setpassword({
          currentPass: "",
          newPass: "",
          confPass: "",
        });
      }
    } catch (error) {
      setpassword({
        currentPass: "",
        newPass: "",
        confPass: "",
      });
      closeTab();
      setloading(false);
    }
  };

  //updating input text in passoword object
  const handleInputText = (e) => {
    setpassword({ ...password, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button
        onClick={onOpen}
        className="bg-[rgb(243,145,46)] px-5 rounded-lg py-[3px]"
      >
        Change
      </button>
      <Modal isOpen={isOpen} onClose={closeTab}>
        <ModalOverlay />
        <ModalContent backgroundColor={"transparent"} padding={"0"} top={"24"}>
          <div className="flex bg-[rgb(38,44,54)]  space-y-6 flex-col px-8 absolute text-[rgb(238,238,238)] rounded-xl py-8">
            <div className="flex-col  flex space-y-1">
              <div className="space-y-2 ">
                <p className="font-semibold ml-2 text-base">Current Password</p>
                <input
                  autoComplete="off"
                  name="currentPass"
                  className="bg-[rgb(21,24,30)] 
                              outline-none w-[27rem] py-2 rounded-[10px] px-4"
                  placeholder="Current Password"
                  type={"password"}
                  value={password.currentPass}
                  onChange={handleInputText}
                  required
                ></input>
              </div>
              <div className="space-y-2 ">
                <p className="font-semibold ml-2 text-base">New Password</p>
                <input
                  autoComplete="off"
                  name="newPass"
                  className="bg-[rgb(21,24,30)] 
                              outline-none w-[27rem] py-2 rounded-[10px] px-4"
                  placeholder="New Password"
                  type={"password"}
                  value={password.newPass}
                  onChange={handleInputText}
                  required
                ></input>
              </div>
              <div className="space-y-2 ">
                <p className="font-semibold ml-2 text-base">Confirm Password</p>
                <input
                  autoComplete="off"
                  name="confPass"
                  className="bg-[rgb(21,24,30)] 
                              outline-none w-[27rem] py-2 rounded-[10px] px-4"
                  placeholder="Confirm Password"
                  type={"password"}
                  value={password.confPass}
                  onChange={handleInputText}
                  required
                ></input>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeTab}
                className="bg-[rgb(223,224,225)]  text-black px-8 rounded-md py-1"
              >
                cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[rgb(243,145,46)] px-8 rounded-md py-1"
              >
                save
              </button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ResetPassword;
