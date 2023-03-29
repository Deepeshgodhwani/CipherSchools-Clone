import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
const URL = process.env.REACT_APP_HOST;

function ProfessionalInfo(props) {
  const toast = useToast();
  const [dropdown1, setdropdown1] = useState(false);
  const [dropdown2, setdropdown2] = useState(false);
  const [isEdit, setisEdit] = useState(true);
  const { userData, setuserData, setloading } = props;
  const [currentStatus, setcurrentStatus] = useState({
    highestEdu: "",
    currentlyDoing: "",
  });

  useEffect(() => {
    if (userData?.userInfo?.currentStatus) {
      setcurrentStatus(userData?.userInfo?.currentStatus);
    } else {
      setcurrentStatus({
        highestEdu: "",
        currentlyDoing: "",
      });
    }
  }, [userData]);

  const onEdit = async () => {
    let element = document.getElementById("btn");
    //enabling edit mode
    if (isEdit) {
      element.innerText = "Save";
      setisEdit(false);
    } else {
      element.innerText = "Edit";
      setisEdit(true);
      //if info is empty or same as it was then return
      if (
        userData.userInfo.currentStatus === currentStatus ||
        (currentStatus.highestEdu === "" && currentStatus.currentlyDoing === "")
      )
        return;

      try {
        setloading(true);
        // api call  ----
        let token = localStorage.getItem("token");
        const response = await fetch(`${URL}/api/userUpdate/updateUserInfo`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ currentStatus }),
        });

        let result = await response.json();
        if (result.status === "success") {
          //saving upated user to local storage
          localStorage.setItem("user", JSON.stringify(result.data));
          //updating global user data state
          setuserData(result.data);

          toast({
            description: "Updated Personal Info ",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
        setloading(false);
      } catch (err) {
        toast({
          description: "Internal server error",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        setloading(false);
      }
    }
  };

  //to toggle highest edication dropdown
  const ToggleDropdown1 = () => {
    if (dropdown1) {
      setdropdown1(false);
    } else {
      setdropdown1(true);
    }
  };

  //to toggle What do you do currently? dropdown
  const ToggleDropdown2 = () => {
    if (dropdown2) {
      setdropdown2(false);
    } else {
      setdropdown2(true);
    }
  };

  //updating user choosing info
  const updatePersonalInfo = (type, info) => {
    if (type === "highestEdu") {
      setcurrentStatus({ ...currentStatus, highestEdu: info });
      setdropdown1(false);
    } else {
      setcurrentStatus({ ...currentStatus, currentlyDoing: info });
      setdropdown2(false);
    }
  };

  return (
    <>
      <div className="space-y-2 py-4 border-b-[1px] border-[rgb(45,48,53)]">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">PROFESSIONAL INFORMATION</p>
          <button
            onClick={onEdit}
            id="btn"
            className="bg-[rgb(243,145,46)] px-8 rounded-lg py-[3px]"
          >
            Edit
          </button>
        </div>
        <div className="flex gap-x-[3%] ">
          <div className="space-y-2 w-[48.4%] relative">
            <p className="font-semibold text-base">Highest education</p>
            <div
              onClick={() => {
                !isEdit && ToggleDropdown1();
              }}
              className="flex bg-[rgb(38,44,54)] py-2 rounded-lg px-4 justify-between items-center "
            >
              <p className="text-[rgb(201,202,205)] prevent-select  font-semibold">
                {currentStatus.highestEdu
                  ? currentStatus.highestEdu
                  : "Higher Secondary"}
              </p>
              <i className="fa-solid cursor-pointer fa-angle-down text-[rgb(128,129,145)]  "></i>
            </div>
            {dropdown1 && (
              <div
                className=" w-[100%] font-semibold prevent-select   text-[rgb(128,129,145)] px-2 py-2 
                rounded-lg bg-[rgb(38,44,54)] absolute  flex flex-col "
              >
                <p
                  onClick={() => {
                    updatePersonalInfo("highestEdu", "Primary");
                  }}
                  className="hover:bg-[rgb(88,51,26)] px-2 rounded-lg py-1 cursor-pointer "
                >
                  Primary
                </p>
                <p
                  onClick={() => {
                    updatePersonalInfo("highestEdu", "Secondary");
                  }}
                  className="hover:bg-[rgb(88,51,26)] px-2 rounded-lg py-1 cursor-pointer"
                >
                  Secondary
                </p>
                <p
                  onClick={() => {
                    updatePersonalInfo("highestEdu", "Higher Secondary");
                  }}
                  className="hover:bg-[rgb(88,51,26)] px-2 rounded-lg py-1 cursor-pointer "
                >
                  Higher Secondary
                </p>
                <p
                  onClick={() => {
                    updatePersonalInfo("highestEdu", "Graduation");
                  }}
                  className="hover:bg-[rgb(88,51,26)] px-2 rounded-lg py-1 cursor-pointer "
                >
                  Graduation
                </p>
                <p
                  onClick={() => {
                    updatePersonalInfo("highestEdu", "Post Graduation");
                  }}
                  className="hover:bg-[rgb(88,51,26)] px-2 rounded-lg py-1 cursor-pointer"
                >
                  Post Graduation
                </p>
              </div>
            )}
          </div>
          <div className="space-y-2 relative w-[48.4%]">
            <p className="font-semibold text-base">What do you do currently?</p>
            <div
              onClick={() => {
                !isEdit && ToggleDropdown2();
              }}
              className="flex bg-[rgb(38,44,54)] prevent-select  py-2 rounded-lg px-4 justify-between items-center "
            >
              <p className="text-[rgb(201,202,205)] font-semibold">
                {currentStatus.currentlyDoing
                  ? currentStatus.currentlyDoing
                  : "College Student"}
              </p>
              <i className="fa-solid cursor-pointer fa-angle-down text-[rgb(128,129,145)]  "></i>
            </div>
            {dropdown2 && (
              <div
                className=" w-[100%] font-semibold prevent-select   text-[rgb(128,129,145)] px-2 py-2 
                rounded-lg bg-[rgb(38,44,54)] absolute  flex flex-col "
              >
                <p
                  onClick={() => {
                    updatePersonalInfo("currentlyDoing", "Schooling");
                  }}
                  className="hover:bg-[rgb(88,51,26)] px-2 rounded-lg py-1 cursor-pointer "
                >
                  Schooling
                </p>
                <p
                  onClick={() => {
                    updatePersonalInfo("currentlyDoing", "College Student");
                  }}
                  className="hover:bg-[rgb(88,51,26)] px-2 rounded-lg py-1 cursor-pointer"
                >
                  College Student
                </p>
                <p
                  onClick={() => {
                    updatePersonalInfo("currentlyDoing", "Teaching");
                  }}
                  className="hover:bg-[rgb(88,51,26)] px-2 rounded-lg py-1 cursor-pointer "
                >
                  Teaching
                </p>
                <p
                  onClick={() => {
                    updatePersonalInfo("currentlyDoing", "Job");
                  }}
                  className="hover:bg-[rgb(88,51,26)] px-2 rounded-lg py-1 cursor-pointer "
                >
                  Job
                </p>
                <p
                  onClick={() => {
                    updatePersonalInfo("currentlyDoing", "Freelancing");
                  }}
                  className="hover:bg-[rgb(88,51,26)] px-2 rounded-lg py-1 cursor-pointer"
                >
                  Freelancing
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessionalInfo;
