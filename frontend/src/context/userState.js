import { useState ,useEffect} from "react";
import userContext from "./userContext";

const UserState = (props) => {
    const [userData, setuserData] = useState({})
    useEffect(() => {
        
      const user = JSON.parse(localStorage.getItem("user"));
      setuserData(user);
    }, [])
    
  return (
    <userContext.Provider value={{setuserData,userData}}>
      {props.children}
    </userContext.Provider>
  );
};


export default UserState
