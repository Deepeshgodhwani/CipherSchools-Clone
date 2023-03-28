import React, { useEffect, useState } from 'react'
import { useToast } from "@chakra-ui/react";

function AboutMe(props) {
   const [bio, setbio] = useState("");
   const [isEdit, setisEdit] = useState(true);
   const { userData, setuserData } = props;
   const toast = useToast();

   

   useEffect(() => {
     const updateBio =()=>{
          if(userData?.userInfo){
             setbio(userData.userInfo.about);
          }
     }
      updateBio()
   }, [userData])
    
   const onEditing =async ()=>{
     let textArea=document.getElementById('text');
     let button =document.getElementById('editButton');
      if(isEdit){
        textArea.disabled=false;
        button.innerText="Save"
        setisEdit(false);
      }else{
          if(!bio || bio===userData?.userInfo?.about){
            textArea.disabled=true;
            button.innerText="Edit"
            setisEdit(true);
            return ;
          } 

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
                body: JSON.stringify({about:bio}),
              }
            );
      
            let result = await response.json();
            if (result.status === "success") {
                localStorage.setItem("user", JSON.stringify(result.data));
                setuserData(result.data)
                textArea.disabled=true;
                button.innerText="Edit"
                setisEdit(true);
                toast({
                  description: "Updated About me ",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
            }
          }catch(err){
            toast({
              description: "Internal server error",
              status: "warning",
              duration: 2000,
              isClosable: true,
            });
          }
      }
   }
    

  return (
    <div className="space-y-2 pb-4 border-b-[1px] border-[rgb(45,48,53)]">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">ABOUT ME</p>
              <button id='editButton' onClick={onEditing} className="bg-[rgb(243,145,46)] px-8 rounded-lg py-[3px]">
                Edit
              </button>
            </div>
            <textarea
              id='text'
              className="bg-[rgb(38,44,54)] styleScroll placeholder:text-[rgb(117,117,117)]  px-4 py-4 w-full resize-none outline-none rounded-lg"
              placeholder="Add something about you."
              rows="4"
              onChange={(e)=>{setbio(e.target.value)}}
              value={bio}
              disabled
            ></textarea>
          </div>
  )
}

export default AboutMe