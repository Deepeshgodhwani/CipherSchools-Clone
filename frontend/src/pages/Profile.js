
import React from 'react'
import {Link} from "react-router-dom"
function Profile() {
  return (
    <div>
        Profile
        <Link to={"/followers"}>
          <div>followers</div>
        </Link>
    </div>
  )
}

export default Profile