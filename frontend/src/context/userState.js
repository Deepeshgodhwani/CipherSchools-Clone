import { useState ,useEffect} from "react";
import userContext from "./userContext";

const UserState = (props) => {
    const [userData, setuserData] = useState({})
    const [followers, setfollowers] = useState([]);


    useEffect(() => {    
      const user = JSON.parse(localStorage.getItem("user"));
       setuserData(user); 
    }, [])
    

    const fetchFollowers = async ()=>{
      if(!userData?.email) return ;
     try {
       let token = localStorage.getItem("token");
       const response = await fetch(`http://localhost:7000/api/userUpdate/getFollowers`, {
         method: "GET",
         mode: "cors",
         headers: {
           "Content-Type": "application/json",
           "auth-token": token,
         },
       });
 
       let result = await response.json();
       setfollowers(result.data);
     } catch (error) {
        console.log(error);
     }
   }

    useEffect(() => {
      fetchFollowers();
    }, [userData])
    

    
    
  return (
    <userContext.Provider value={{setuserData,userData,followers}}>
      {props.children}
    </userContext.Provider>
  );
};


export default UserState
