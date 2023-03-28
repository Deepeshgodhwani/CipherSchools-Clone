import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";

function ResetPassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [password, setpassword] = useState({
    currentPass: "",
    newPass: "",
    confPass: "",
  });

  const handleInputText = (e) => {
    setpassword({ ...password, [e.target.name]: e.target.value });
  };

  const closeTab = () => {
    setpassword({
      currentPass: "",
      newPass: "",
      confPass: "",
    });
    onClose();
  };

  const handleSubmit = async () => {
    if (
      password.currPass === "" ||
      password.newPass === "" ||
      password.confPass === ""
    )return;

    if (password.currPass === password.newPass) {
      toast({
        description: "Current password and new password should not be same",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if(password.newPass !==password.confPass){
      toast({
        description: "New password and Confirm password should be same",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }


    try {
      let token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:7000/api/userUpdate/resetPassword`,
        {
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
        }
      );

      let result = await response.json();
      if (result.status === "success") {
        toast({
          description: "Profile updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        closeTab();
      } else {
        toast({
          description: result.message,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        setpassword({
          currentPass: "",
          newPass: "",
          confPass: "",
        });
      }
    } catch (error) {
      console.log(error);
      setpassword({
        currentPass: "",
        newPass: "",
        confPass: "",
      });
      closeTab();
      
    }
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
        <ModalContent backgroundColor={"transparent"} padding={"0"} top={"16"}>
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
                  type={"text"}
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
                  type={"text"}
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
                  type={"text"}
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
