import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AboutMe from "../components/AboutMe";
import CipherMap from "../components/CipherMap";
import ProfessionalInfo from "../components/ProfessionalInfo";
import ResetPassword from "../components/ResetPassword";
import UpdateInterests from "../components/UpdateInterests";
import UpdateProfile from "../components/UpdateProfile";
import WebUrls from "../components/WebUrls";
import userContext from "../context/userContext";
import dashboardImg from "../images/dashboard.png";
import wishListImg from "../images/wishlist.png";

function Profile() {
  const context = useContext(userContext);
  const { userData, setuserData, followers, setloading } = context;

  return (
    <div className="flex flex-col  p-0 mt-0 relative  bg-[rgb(21,24,30)] w-full">
      {/* user profile  ------- */}
      <div
        className={`flex items-center w-full overflow-hidden  top-0 relative bg justify-between h-[16vh] mb-1 text-[rgb(241,241,241)] 
       py-2 px-10 from-transparent border-b-[1px] bg-[url(https://res.cloudinary.com/dynjwlpl3/image/upload/v1679995861/background_cdpmle.png)]  border-[rgb(60,66,74)] `}
      >
        <div className="absolute w-full top-o  h-full  left-0 bg-gradient-to-r  from-[#262c36] to-[transparent]"></div>
        <div className="absolute w-full top-o opacity-40 z-0  h-full  left-0 bg-gradient-to-r from-transparent to-[#262c36]"></div>
        <div className="flex z-20 items-center space-x-6">
          <div className="relative ">
            {!userData?.email ||
            userData.avtar === process.env.REACT_APP_DEFAULT_USERAVTAR ? (
              <div
                className="w-16 h-16 ml-1 cursor-pointer bg-[rgb(189,189,189)]
                  flex justify-center items-center rounded-full"
              >
                <img
                  alt=""
                  className="w-8"
                  src="https://res.cloudinary.com/dynjwlpl3/image/upload/v1679893125/CipherSchools-clone/user_njz54h.png"
                ></img>
              </div>
            ) : (
              <img
                className="w-16 h-16 rounded-full"
                src={userData.avtar}
                alt=""
              />
            )}
            <UpdateProfile
              setuserData={setuserData}
              userData={userData}
              setloading={setloading}
            />
          </div>
          <div className="-space-y-1 flex flex-col justify-center">
            <p className="text-lg">Hello,</p>
            <p className="text-2xl font-semibold">
              {userData?.firstName} {userData?.lastName}
            </p>
            <p className="text-lg">{userData?.email}</p>
          </div>
        </div>
        <Link to={"/followers"}>
          <div className="z-20 text-lg font-semibold relative">
            {" "}
            {followers?.length} Followers
          </div>
        </Link>
      </div>
      <div className="flex justify-between">
        {/* user info -------------------------------------------------------------------- */}
        <div className="w-full py-4 hideScroll  h-[74vh] overflow-y-scroll px-4 pl-12 text-[rgb(241,241,241)]">
          <AboutMe
            setuserData={setuserData}
            userData={userData}
            setloading={setloading}
          />
          <CipherMap />
          <WebUrls
            setuserData={setuserData}
            userData={userData}
            setloading={setloading}
          />
          <ProfessionalInfo
            setuserData={setuserData}
            userData={userData}
            setloading={setloading}
          />
          <div className="space-y-2 py-4 border-b-[1px] border-[rgb(45,48,53)]">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">PASSWORD & SECURITY</p>
              <ResetPassword setloading={setloading} />
            </div>
            <div className="space-y-2 w-full">
              <p className="font-semibold text-base">Password</p>
              <div className="flex bg-[rgb(38,44,54)] py-2 rounded-lg px-4  ">
                <input
                  className="bg-transparent w-full text-[rgb(128,129,145)]  outline-none"
                  value={userData ? "dsfsdsdfgsdfasd" : ""}
                  placeholder={"Passwords"}
                  type={"password"}
                  disabled
                ></input>
              </div>
            </div>
          </div>
          <div className="space-y-2 py-4 border-b-[1px] border-[rgb(45,48,53)]">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">INTERESTS</p>
              <UpdateInterests
                setuserData={setuserData}
                userData={userData}
                setloading={setloading}
              />
            </div>
            <div className="flex flex-wrap gap-y-4 py-1 gap-x-4">
              {userData?.userInfo?.interests?.map((interest) => {
                return (
                  <div
                    className="bg-[rgb(44,37,32)] text-sm rounded-md py-[6px] px-4 text-[rgb(243,145,46)]"
                    key={interest}
                  >
                    <p>{interest}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* right  aside ------- */}

        <div className="text-[rgb(238,238,238)] h-[74.3vh] -space-y-1 items-end  flex flex-col">
          <div
            className="bg-[rgb(38,44,54)] flex items-center px-2 border-l-[1px] border-[rgb(60,66,74)] border-b-[1px] rounded-l-md
                     w-[17rem]
                    h-10 "
          >
            <i className="fa-solid fa-angle-right"></i>
          </div>
          <div
            className="bg-[rgb(38,44,54)] h-full space-y-1 px-2 border-l-[1px] border-[rgb(60,66,74)] 
                    flex flex-col w-60"
          >
            <div className="flex  cursor-pointer -mt-7 py-[10px] space-x-3  rounded-lg hover:bg-[rgb(88,51,26)] pl-6">
              <img className="w-5 h-5" src={dashboardImg} alt="" />
              <p className=" font-semibold text-base">Dashboard</p>
            </div>
            <div className="flex  pr-2  cursor-pointer py-[10px] justify-between rounded-lg bg-[rgb(243,145,46)] pl-6">
              <div className="space-x-3  flex  ">
                <img
                  className="w-5 h-5"
                  src={
                    "https://res.cloudinary.com/dynjwlpl3/image/upload/v1679893125/CipherSchools-clone/user_njz54h.png"
                  }
                  alt=""
                />
                <p className=" font-semibold text-base">My Profile</p>
              </div>
              <div className="w-0 border-l-4 rounded-sm border-[rgb(238,238,238)]"></div>
            </div>{" "}
            <div className="flex  cursor-pointer py-[10px] space-x-3  rounded-lg hover:bg-[rgb(88,51,26)] pl-6">
              <i className="fa-solid  text-lg fa-swatchbook"></i>
              <p className=" font-semibold text-base">Enrolled Courses</p>
            </div>{" "}
            <div className="flex  cursor-pointer py-[10px] space-x-3  rounded-lg hover:bg-[rgb(88,51,26)] pl-6">
              <img className="w-6 h-5" src={wishListImg} alt="" />
              <p className=" font-semibold text-base">Wishlist</p>
            </div>
            <div className="flex items-center  cursor-pointer py-[10px] space-x-3  rounded-lg hover:bg-[rgb(88,51,26)] pl-6">
              <i className="fa-solid text-lg fa-thumbs-up"></i>
              <p className=" font-semibold text-base">Liked Videos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
