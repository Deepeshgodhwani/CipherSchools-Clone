import React from 'react'
import { useToast } from "@chakra-ui/react";

import {
    Modal,
    ModalOverlay,
    ModalContent,

    useDisclosure
  } from '@chakra-ui/react'

function UpdateInterests(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { userData, setuserData } = props;
    const interests=["App Development","Web Development","Game Development","Data Structures",
    "Programming","Machine Learning","Data Science","Others"];
    let userInterests=[];
    let removeInterests=[]
    const toast = useToast();
 
    const addInterests =(interest)=>{
        let element =document.getElementById(interest);
        element.style.backgroundColor="rgb(243,145,46)";
        let index= userInterests.findIndex(elem=> elem === interest);
        let index2=userData?.userInfo?.interests?.findIndex(elem=> elem === interest);
        if(index===-1){
          if(index2===-1 ){
              userInterests.push(interest);
          }else{
              removeInterests.push(interest);
          }
        }else{
           userInterests.slice(index,1);
        }
    }


    const updateUserInterests= async()=>{
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
            body: JSON.stringify({
              interests:userInterests
            }),
          }
        );
  
        let result = await response.json();
        if (result.status === "success") {
          localStorage.setItem("user", JSON.stringify(result.data));
          setuserData(result.data);
          toast({
            description: "Interests updated successfully",
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
          
        }
      } catch (error) {
        console.log(error);
        toast({
          description: "Internal server error",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        closeTab();
        
      }
    }


    const closeTab =()=>{
          userInterests=[]
          onClose();
    }

   
    

  return (
    <div>
          <button onClick={onOpen} className="bg-[rgb(243,145,46)] px-8 rounded-lg py-[3px]">Edit</button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={"transparent"} padding={"0"} top={"16"}>
        <div className="flex bg-[rgb(38,44,54)]  space-y-6 flex-col px-6 cursor-pointer absolute text-[rgb(238,238,238)] rounded-xl py-8">
            <div className="  flex gap-x-4 gap-y-4 flex-wrap " >
                   {interests?.map((interest)=>{
                         return (<div id={interest} key={interest} 
                          onClick={()=>{addInterests(interest)}}
                         className='bg-[rgb(21,24,30)] rounded-md px-4 font-semibold py-2 w-[12rem]'>
                          {interest}</div>)
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
  )
}

export default UpdateInterests