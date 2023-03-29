import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
const URL = process.env.REACT_APP_HOST;

function UpdateInterests(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData, setuserData, setloading } = props;
  const [userInterests, setuserInterests] = useState([]);
  const toast = useToast();
  const [interests, setinterests] = useState([
    { isSelected: false, interest: "App Development" },
    { isSelected: false, interest: "Web Development" },
    { isSelected: false, interest: "Game Development" },
    { isSelected: false, interest: "Data Structures" },
    { isSelected: false, interest: "Programming" },
    { isSelected: false, interest: "Machine Learning" },
    { isSelected: false, interest: "Data Science" },
    { isSelected: false, interest: "Others" },
  ]);

  const initialiseInterets = () => {
    if (userData?.userInfo?.interests) {
      setinterests(
        interests.map((element) => {
          let index = userData?.userInfo?.interests.findIndex(
            (elem) => elem === element.interest
          );
          if (index !== -1) {
            element.isSelected = true;
            return element;
          } else {
            element.isSelected = false;
            return element;
          }
        })
      );

      setuserInterests(userData?.userInfo?.interests);
    } else {
      setinterests([
        { isSelected: false, interest: "App Development" },
        { isSelected: false, interest: "Web Development" },
        { isSelected: false, interest: "Game Development" },
        { isSelected: false, interest: "Data Structures" },
        { isSelected: false, interest: "Programming" },
        { isSelected: false, interest: "Machine Learning" },
        { isSelected: false, interest: "Data Science" },
        { isSelected: false, interest: "Others" },
      ]);
      setuserInterests([]);
    }
  };

  useEffect(() => {
    initialiseInterets();
  }, [userData]);

  //to add new user interests in interest array
  const addInterests = (interest) => {
    let index = userInterests?.findIndex((elem) => elem === interest);
    //if interest is not in data array then push it

    if (index === -1) {
      setuserInterests([...userInterests, interest]);
      setinterests(
        interests.map((element) => {
          if (element.interest === interest) {
            element.isSelected = true;
            return element;
          }

          return element;
        })
      );
    } else {
      //if this interest is already in data array then pop it //
      setuserInterests(
        userInterests.filter((intr) => {
          return intr !== interest;
        })
      );

      setinterests(
        interests.map((element) => {
          if (element.interest === interest) {
            element.isSelected = false;
            return element;
          }

          return element;
        })
      );
    }
  };

  const updateUserInterests = async () => {
    try {
      setloading(true);
      closeTab();
      let token = localStorage.getItem("token");
      const response = await fetch(`${URL}/api/userUpdate/updateUserInfo`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          interests: userInterests,
        }),
      });

      let result = await response.json();
      if (result.status === "success") {
        //saving upated user to local storage
        localStorage.setItem("user", JSON.stringify(result.data));
        //updating global user data state
        setuserData(result.data);
        toast({
          description: "Interests updated successfully",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      } else {
        //if any error happens in updating
        toast({
          description: result.message,
          status: "warning",
          duration: 1000,
          isClosable: true,
        });
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      toast({
        description: "Internal server error",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      closeTab();
      setloading(false);
    }
  };

  //to close the tab
  const closeTab = () => {
    initialiseInterets();
    onClose();
  };

  return (
    <div>
      <button
        onClick={onOpen}
        className="bg-[rgb(243,145,46)] px-8 rounded-lg py-[3px]"
      >
        Edit
      </button>
      <Modal isOpen={isOpen} onClose={closeTab}>
        <ModalOverlay />
        <ModalContent backgroundColor={"transparent"} padding={"0"} top={"24"}>
          <div className="flex bg-[rgb(38,44,54)]  space-y-6 flex-col px-6 cursor-pointer absolute text-[rgb(238,238,238)] rounded-xl py-8">
            <div className="  flex gap-x-4 gap-y-4 flex-wrap ">
              {interests?.map((element) => {
                return (
                  <div
                    id={element.interest}
                    key={element.interest}
                    onClick={() => {
                      addInterests(element.interest);
                    }}
                    className={` ${
                      element.isSelected
                        ? "bg-[rgb(243,145,46)]"
                        : "bg-[rgb(21,24,30)]"
                    } rounded-md px-4 font-semibold py-2 w-[12rem]`}
                  >
                    {element.interest}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeTab}
                className="bg-[rgb(223,224,225)]  text-black px-8 rounded-md py-1"
              >
                cancel
              </button>
              <button
                onClick={updateUserInterests}
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

export default UpdateInterests;
