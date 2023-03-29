import React, { useContext } from "react";

import dashboardImg from "../images/dashboard.png";
import feedbackImg from "../images/feedback.png";
import tourImg from "../images/destination.png";
import userContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Aside() {
  const context = useContext(userContext);
  let history=useNavigate();
  const { userData, setuserData ,setfollowers } = context;

  const logoutUser = () => {
  //reseting user on signing out //
    localStorage.clear("user");
    localStorage.clear("token");
    setfollowers([]);
    setuserData({});
    history('/');
  };

  return (
    <div className="bg-[rgb(38,44,54)] justify-between h-[91vh] flex pt-2 pb-2 px-1 flex-col  text-[rgb(238,238,238)] border-r-[1px] border-[rgb(60,66,74)]">
      <div className="flex hideScroll flex-col overflow-y-scroll h-[77vh] ">
        <div className="flex flex-col cursor-pointer space-y-1 py-2 px-2 rounded-lg hover:bg-[rgb(88,51,26)] items-center">
          <i className="fa-solid fa-house"></i>
          <p className="text-[10px]">Home</p>
        </div>
        <div className="flex flex-col cursor-pointer space-y-1 py-2 px-2 rounded-lg hover:bg-[rgb(88,51,26)] items-center">
          <i className="fa-solid fa-swatchbook"></i>
          <p className="text-[10px]">Courses</p>
        </div>
        <div className="flex flex-col cursor-pointer space-y-1 py-2 px-2 rounded-lg hover:bg-[rgb(88,51,26)] items-center">
          <i className="fa-solid fa-compass"></i>
          <p className="text-[10px]">Trending</p>
        </div>
        <div className="flex flex-col cursor-pointer space-y-1 py-2 px-2 rounded-lg hover:bg-[rgb(88,51,26)] items-center">
          <i className="fa-solid fa-user-check"></i>
          <p className="text-[10px]">Following</p>
        </div>
        <div className="flex flex-col cursor-pointer space-y-1 py-2 px-2 rounded-lg hover:bg-[rgb(88,51,26)] items-center">
          <img className="w-4" src={dashboardImg} alt="" />
          <p className="text-[10px]">Dashboard</p>
        </div>
        <div className="flex flex-col cursor-pointer space-y-1 py-2 px-2 rounded-lg hover:bg-[rgb(88,51,26)] items-center">
          <i className="fa-brands fa-discord"></i>
          <p className="text-[10px]">Discord</p>
        </div>
        <div className="flex flex-col  cursor-pointer space-y-1 py-2  px-2 rounded-lg hover:bg-[rgb(88,51,26)] items-center">
          <div className="bg-[#EEEEEE] flex justify-center items-center pb-1 w-5 h-5 text-center  rounded-full text-[14px] text-[rgb(38,44,54)]">
            <p>c</p>
          </div>
          <p className="text-[10px]  w-9">Creator Access</p>
        </div>
        <div className="flex flex-col cursor-pointer space-y-1 py-2 px-2 rounded-lg hover:bg-[rgb(88,51,26)] items-center">
          <img className="w-5" src={feedbackImg} alt="" />
          <p className="text-[10px]">Feedback</p>
        </div>
        <div className="flex flex-col cursor-pointer space-y-1 py-2 px-2 rounded-lg hover:bg-[rgb(88,51,26)] items-center">
          <img className="w-6" src={tourImg} alt="" />
          <p className="text-[10px]">Tour</p>
        </div>
      </div>

      {userData?.email ? (
        <div
          onClick={logoutUser}
          className="flex flex-col  border-t-[1px] border-[rgb(60,66,74)]  cursor-pointer mt-1 space-y-0 py-1 px-2 rounded-lg hover:bg-[rgb(88,51,26)] items-center"
        >
          <i className="fa-solid text-lg fa-right-from-bracket"></i>
          <p className="text-[11px]">Logout</p>
        </div>
      ) : (
        <div className="flex flex-col  border-t-[1px] border-[rgb(60,66,74)]  cursor-pointer mt-1 space-y-0 py-1 px-2 rounded-lg hover:bg-[rgb(88,51,26)] items-center">
          <i className="fa-solid fa-right-to-bracket fa-rotate-180"></i>
          <p className="text-[11px]">Signin</p>
        </div>
      )}
    </div>
  );
}

export default Aside;
