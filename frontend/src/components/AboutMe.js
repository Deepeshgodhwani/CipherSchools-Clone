import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
const URL = process.env.REACT_APP_HOST;

function AboutMe(props) {
  const [bio, setbio] = useState("");
  const [isEdit, setisEdit] = useState(true);
  const { userData, setuserData, setloading } = props;
  const toast = useToast();

  useEffect(() => {
    const updateBio = () => {
      setbio(userData?.userInfo?.about);
    };
    updateBio();
  }, [userData]);

  //To edit About me

  const onEditing = async () => {
    let textArea = document.getElementById("text");
    let button = document.getElementById("editButton");
    if (isEdit) {
      //enabling edit mode
      textArea.disabled = false;
      button.innerText = "Save";
      setisEdit(false);
    } else {
      //if about me is empty or same as it was then return
      if(bio === userData?.userInfo?.about) {
        textArea.disabled = true;
        button.innerText = "Edit";
        setisEdit(true);
        return;
      }

      try {
        setloading(true);
        //api call ---
        let token = localStorage.getItem("token");
        const response = await fetch(`${URL}/api/userUpdate/updateUserInfo`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ about: bio }),
        });

        let result = await response.json();
        if (result.status === "success") {
          //saving upated user to local storage
          localStorage.setItem("user", JSON.stringify(result.data));
          //updating global user data state
          setuserData(result.data);
          textArea.disabled = true;
          button.innerText = "Edit";
          setisEdit(true);
          toast({
            description: "Updated About me ",
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

  return (
    <div className="space-y-2  pb-4 border-b-[1px] border-[rgb(45,48,53)]">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">ABOUT ME</p>
        <button
          id="editButton"
          onClick={onEditing}
          className="bg-[rgb(243,145,46)] px-8 rounded-lg py-[3px]"
        >
          Edit
        </button>
      </div>
      <textarea
        id="text"
        className="bg-[rgb(38,44,54)] styleScroll placeholder:text-[rgb(117,117,117)]  px-4 py-4 w-full resize-none outline-none rounded-lg"
        placeholder="Add something about you."
        rows="4"
        onChange={(e) => {
          setbio(e.target.value);
        }}
        value={bio}
        disabled
      ></textarea>
    </div>
  );
}

export default AboutMe;
