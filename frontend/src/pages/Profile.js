import React from "react";
import { Link } from "react-router-dom";
function Profile() {
  return (
    <div className="">
      <Link to={"/followers"}>
        <div></div>
      </Link>
    </div>
  );
}

export default Profile;
