import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
const URL = process.env.REACT_APP_HOST;

function UpdateProfile(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData, setuserData, setloading } = props;
  const toast = useToast();
  const [currentData, setcurrentData] = useState({
    firstName: "",
    lastName: "",
    avtar: "",
    contactNo: "",
    email: "",
  });

  //updating current data to initials
  const UpdateCurrentData = () => {
    setcurrentData({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      contactNo: userData?.contactNo,
      avtar: userData?.avtar,
      email: userData?.email,
    });
  };

  useEffect(() => {
    UpdateCurrentData();
  }, [userData]);

  const UploadPic = async (e) => {
    try {
      //uploading picture in cloudinary to get image url
      if (
        e.target.files[0] &&
        (e.target.files[0].type === "image/jpeg" ||
          e.target.files[0].type === "image/png")
      ) {
        setloading(true);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("upload_preset", "chat_app");
        formData.append("cloud_name", "dynjwlpl3");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dynjwlpl3/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        let pic = await response.json();
        let picture = pic.url.toString();
        setcurrentData({ ...currentData, avtar: picture });
        e.target.value = null;
        setloading(false);
      } else {
        toast({
          description: "picture format should be jpeg or png",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        description: "Internal server error",
        status: "warning",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ////if info is empty or same as it was then return
    if (
      userData.firstName === currentData.firstName &&
      userData.lastName === currentData.lastName &&
      userData.contactNo === currentData.contactNo &&
      userData.avtar === currentData.avtar
    )
      return;

    if (
      currentData.firstName === "" ||
      currentData.lastName === "" ||
      currentData.avtar === ""
    )
      return;

    if (userData.contactNo === currentData.contactNo) {
      let sendData = currentData;
      delete sendData.contactNo;
    }

    try {
      setloading(true);
      onClose();
      let token = localStorage.getItem("token");
      const response = await fetch(`${URL}/api/userUpdate/updateUser`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(currentData),
      });

      let result = await response.json();
      setloading(false);
      if (result.status === "success") {
        //saving upated user to local storage
        localStorage.setItem("user", JSON.stringify(result.data));
        toast({
          description: "Profile updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        //updating global user data state
        setuserData(result.data);
      } else {
        toast({
          description: result.message,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        UpdateCurrentData();
      }
    } catch (error) {
      toast({
        description: "Internal server error",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      closeTab();
      setloading(false);
    }
  };

  const closeTab = () => {
    UpdateCurrentData();
    onClose();
  };

  const handleInputText = (e) => {
    setcurrentData({ ...currentData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div
        onClick={onOpen}
        className="bg-[rgb(32,43,71)] w-6 h-6 flex justify-center items-center absolute -bottom-2 left-6  text-center rounded-full
             text-[12px] cursor-pointer"
      >
        <i className="fa-solid fa-pen"></i>
      </div>
      <Modal isOpen={isOpen} onClose={closeTab}>
        <ModalOverlay />
        <ModalContent backgroundColor={"transparent"} top="10">
          <div className="bg-[rgb(38,44,54)] -left-28 flex flex-col absolute text-[rgb(238,238,238)] rounded-xl px-2 py-4">
            <div className="flex font-semibold text-xl px-4 justify-between">
              <p className="">Profile Update</p>
              <i onClick={closeTab} className="fa-solid fa-xmark"></i>
            </div>
            <div className="text-[rgb(238,238,238)] py-6 flex">
              <div className="relative w-52 h-80    flex justify-center items-center">
                {!userData?.email ||
                currentData.avtar ===
                  process.env.REACT_APP_DEFAULT_USERAVTAR ? (
                  <div
                    className="w-36 h-36 ml-1 relative cursor-pointer bg-[rgb(189,189,189)]
                  flex justify-center items-center rounded-full"
                  >
                    <img
                      alt=""
                      className="w-20"
                      src={process.env.REACT_APP_DEFAULT_USERAVTAR}
                    ></img>
                    <div
                      className="bg-[rgb(32,43,71)] w-8 h-8 flex justify-center items-center absolute  text-center rounded-full
                  text-sm -bottom-3 left-15  cursor-pointer"
                    >
                      <i className="fa-solid fa-pen"></i>
                      <input
                        onChange={UploadPic}
                        type="file"
                        title=""
                        className="opacity-0 cursor-pointer absolute"
                      ></input>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-36 h-36 rounded-full">
                    {" "}
                    <img
                      className="w-36 rounded-full h-36"
                      src={currentData.avtar}
                      alt=""
                    />
                    <div
                      className="bg-[rgb(32,43,71)] w-8 h-8 flex justify-center items-center absolute  text-center rounded-full
                  text-sm -bottom-3 left-[3.4rem]  cursor-pointer"
                    >
                      <i className="fa-solid fa-pen"></i>
                      <input
                        onChange={UploadPic}
                        type="file"
                        title=""
                        className="opacity-0 cursor-pointer absolute"
                      ></input>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-y-2 flex-col">
                <div className="space-y-2 w-[28.9rem]">
                  <p className="font-semibold text-base">First Name</p>
                  <input
                    autoComplete="off"
                    name="firstName"
                    className="bg-[rgb(21,24,30)] 
                              outline-none w-[27rem] py-2 rounded-[10px] px-4"
                    placeholder="First Name"
                    type={"text"}
                    value={currentData.firstName}
                    onChange={handleInputText}
                    required
                  ></input>
                </div>
                <div className="space-y-2 w-[28.9rem]">
                  <p className="font-semibold text-base">Last Name</p>
                  <input
                    autoComplete="off"
                    name="lastName"
                    className="bg-[rgb(21,24,30)] 
                              outline-none w-[27rem] py-2 rounded-[10px] px-4"
                    placeholder="Last Name"
                    type={"text"}
                    value={currentData.lastName}
                    onChange={handleInputText}
                    required
                  ></input>
                </div>
                <div className="space-y-2 w-[28.9rem]">
                  <p className="font-semibold text-base">Email</p>
                  <input
                    autoComplete="off"
                    name="firstName"
                    className="bg-[rgb(21,24,30)] 
                              outline-none w-[27rem] py-2 rounded-[10px] px-4"
                    placeholder="Email ID"
                    type={"text"}
                    value={userData?.email}
                    required
                  ></input>
                </div>
                <div className="space-y-2 w-[28.9rem]">
                  <p className="font-semibold text-base">Mobile Number</p>
                  <input
                    autoComplete="off"
                    name="contactNo"
                    className="bg-[rgb(21,24,30)] 
                              outline-none w-[27rem] py-2 rounded-[10px] px-4"
                    placeholder="Mobile Number"
                    type={"text"}
                    onChange={handleInputText}
                    value={currentData.contactNo}
                    required
                  ></input>
                </div>
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

export default UpdateProfile;
