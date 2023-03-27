import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Followers() {
  const toast = useToast();
  const [followers, setfollowers] = useState([]);

  const fetchFollowers = async () => {
    try {
      let token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:7000/api/user/logUser`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      let result = await response.json();
      console.log(result);
      setfollowers(result.data.followers);
      console.log(followers);
    } catch (error) {
      toast({
        description: "Internal server error",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchFollowers();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      Followers
      <Link to={"/"}>
        <div></div>
      </Link>
    </div>
  );
}

export default Followers;
