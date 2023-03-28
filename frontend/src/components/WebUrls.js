import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

function WebUrls(props) {
  const [weburls, setweburls] = useState({
    linkedin: "",
    github: "",
    facebook: "",
    twitter: "",
    instagram: "",
    website: "",
  });
  const [isEdit, setisEdit] = useState(true);
  const { userData, setuserData } = props;
  const toast = useToast();

  useEffect(() => {
    const updateBio = () => {
      if (userData?.userInfo) {
        setweburls(userData.userInfo.webUrls);
      }
    };
    updateBio();
  }, [userData]);

  const onEditing = async () => {
    let inputs = document.getElementsByClassName("input");
    let button = document.getElementById("buttonn");
    if (isEdit) {
      for (let input of inputs) {
        input.disabled = false;
      }
      button.innerText = "Save";
      setisEdit(false);
    } else {
      let inputs = document.getElementsByClassName("input");
      for (let input of inputs) {
        input.disabled = true;
      }
      button.innerText = "Edit";
      setisEdit(true);
      if (weburls === userData?.userInfo?.WebUrls) return;

      try {
        let token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:7000/api/userUpdate/updateUserInfo`,
          {
            method: "PUT",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: JSON.stringify({ webUrls: weburls }),
          }
        );

        let result = await response.json();
        if (result.status === "success") {
          localStorage.setItem("user", JSON.stringify(result.data));
          setuserData(result.data);
          toast({
            description: "Updated Web Urls ",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (err) {
        toast({
          description: "Internal server error",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const handleInputText = (e) => {
    setweburls({ ...weburls, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-2 py-4 border-b-[1px] border-[rgb(45,48,53)]">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">ON THE WEB</p>
        <button
          id="buttonn"
          onClick={onEditing}
          className="bg-[rgb(243,145,46)] px-8 rounded-lg py-[3px]"
        >
          Edit
        </button>
      </div>
      <div className="flex gap-x-[3%] gap-y-4 flex-wrap">
        <div className="space-y-2   w-[48.4%]">
          <p className="font-semibold text-base">Linkedin</p>
          <div className="flex bg-[rgb(38,44,54)] rounded-lg px-4 items-center space-x-2 ">
            <div className="bg-[rgb(128,129,145)] rounded-full h-7 w-7 flex justify-center items-center">
              <i className="fa-brands text-sm text-[rgb(38,44,54)] fa-linkedin-in"></i>
            </div>
            <input
              type={"text"}
              placeholder={"LinkedIn"}
              className={"bg-transparent input text-sm w-full outline-none py-3 "}
              value={weburls?.linkedin}
              name={"linkedin"}
              onChange={handleInputText}
              autoComplete="off"
              disabled
            ></input>
          </div>
        </div>

        <div className="space-y-2  w-[48.4%]">
          <p className="font-semibold text-base">Github</p>
          <div className="flex bg-[rgb(38,44,54)] rounded-lg px-4 items-center space-x-2 ">
            <i className="fa-brands text-[rgb(128,129,145)] text-2xl fa-github"></i>
            <input
              type={"text"}
              placeholder={"GitHub"}
              className={"bg-transparent input text-sm w-full outline-none py-3 "}
              value={weburls?.github}
              onChange={handleInputText}
              name={"github"}
              autoComplete="off"
              disabled
            ></input>
          </div>
        </div>
        <div className="space-y-2    w-[48.4%]">
          <p className="font-semibold text-base">Facebook</p>
          <div className="flex bg-[rgb(38,44,54)] rounded-lg px-4 items-center space-x-2 ">
            <div className="bg-[rgb(128,129,145)] rounded-full h-7 w-7 flex justify-center items-center">
              <i className="fa-brands text-[rgb(38,44,54)] fa-facebook-f"></i>
            </div>
            <input
              type={"text"}
              placeholder={"Facebook"}
              className={"bg-transparent input text-sm w-full outline-none py-3 "}
              value={weburls?.facebook}
              onChange={handleInputText}
              name={"facebook"}
              autoComplete="off"
              disabled
            ></input>
          </div>
        </div>
        <div className="space-y-2    w-[48.4%]">
          <p className="font-semibold text-base">Twitter</p>
          <div className="flex bg-[rgb(38,44,54)] rounded-lg px-4 items-center space-x-2 ">
            <div className="bg-[rgb(128,129,145)] rounded-full h-7 w-7 flex justify-center items-center">
              <i className="fa-brands text-[rgb(38,44,54)] fa-twitter"></i>
            </div>
            <input
              type={"text"}
              placeholder={"Twitter"}
              className={"bg-transparent input text-sm w-full outline-none py-3 "}
              value={weburls?.twitter}
              onChange={handleInputText}
              name={"twitter"}
              autoComplete="off"
              disabled
            ></input>
          </div>
        </div>
        <div className="space-y-2    w-[48.4%]">
          <p className="font-semibold text-base">Instagram</p>
          <div className="flex bg-[rgb(38,44,54)] rounded-lg px-4 items-center space-x-2 ">
            <div className="bg-[rgb(128,129,145)] rounded-full h-7 w-7 flex justify-center items-center">
              <i className="fa-brands  text-[rgb(38,44,54)] fa-instagram"></i>
            </div>
            <input
              type={"text"}
              placeholder={"Instagram"}
              className={"bg-transparent input text-sm w-full outline-none py-3 "}
              value={weburls?.instagram}
              onChange={handleInputText}
              name={"instagram"}
              autoComplete="off"
              disabled
            ></input>
          </div>
        </div>
        <div className="space-y-2    w-[48.4%]">
          <p className="font-semibold text-base">Website</p>
          <div className="flex bg-[rgb(38,44,54)] rounded-lg px-4 items-center space-x-2 ">
            <div className="bg-[rgb(128,129,145)] rounded-full h-7 w-7 flex justify-center items-center">
              <i className="fa-solid text-[rgb(38,44,54)] fa-globe"></i>
            </div>
            <input
              type={"text"}
              placeholder={"Website"}
              className={"bg-transparent input text-sm w-full outline-none py-3 "}
              value={weburls?.website}
              onChange={handleInputText}
              name={"website"}
              autoComplete="off"
              disabled
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebUrls;
