import { useState ,useEffect} from "react";
import userContext from "./userContext";
const URL = process.env.REACT_APP_HOST;

const UserState = (props) => {
    const [userData, setuserData] = useState({})
    const [followers, setfollowers] = useState([]);
    const [loading, setloading] = useState(true);

     //fetching user details to globalise 
    useEffect(() => {    
      const user = JSON.parse(localStorage.getItem("user"));
       setuserData(user); 
    }, [])
    
     
    //fetching followers
    const fetchFollowers = async ()=>{
      if(!userData?.email) return ;
     try {
       let token = localStorage.getItem("token");
       const response = await fetch(`${URL}/api/userUpdate/getFollowers`, {
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
    <userContext.Provider value={{setuserData,userData,followers, loading,setloading,setfollowers}}>
      {props.children}
    </userContext.Provider>
  );
};


export default UserState
