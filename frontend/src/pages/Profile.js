import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";
import UpdateInterests from "../components/UpdateInterests";
import userContext from "../context/userContext";
import dashboardImg from "../images/dashboard.png";
import wishListImg from "../images/wishlist.png";

function Profile() {
  const context = useContext(userContext);
  const { userData } = context;
  const interests = [
    "Others",
    "App Development",
    "Web Development",
    "Game Development",
    "Data Structures",
  ];
  return (
    <div className="flex flex-col space-y-1 bg-[rgb(21,24,30)] w-full">
      <div className="flex bg justify-between text-[rgb(241,241,241)] h-20 py-2 px-4 border-b-[1px] bg-[rgb(38,45,56)] border-[rgb(60,66,74)] ">
        {/* <div> <img alt=""></img></div> */}
        <div>
          <div>
            {userData.email ? (
              <img className="w-7" src={userData.avtar} alt="" />
            ) : (
              <div
                className="w-7 ml-1 cursor-pointer h-7 bg-[rgb(72,61,53)]
                    flex justify-center items-center rounded-full"
              >
                <img
                  alt=""
                  className="w-3 "
                  src="https://res.cloudinary.com/dynjwlpl3/image/upload/v1679893125/CipherSchools-clone/user_njz54h.png"
                ></img>
              </div>
            )}
          </div>
        </div>
        <Link to={"/followers"}>
          <div> O Followers</div>
        </Link>
      </div>
      <div className="flex justify-between">
        {/* //user info -------------------------------------------------------------------- */}
        <div className="w-full py-4 styleScroll h-[75vh] overflow-y-scroll px-4 pl-12 text-[rgb(241,241,241)]">
          <div className="space-y-2 pb-4 border-b-[1px] border-[rgb(45,48,53)]">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">ABOUT ME</p>
              <button className="bg-[rgb(243,145,46)] px-8 rounded-lg py-[3px]">
                Edit
              </button>
            </div>
            <textarea
              className="bg-[rgb(38,44,54)] placeholder:text-[rgb(117,117,117)]  px-4 py-4 w-full resize-none outline-none rounded-lg"
              placeholder="Add something about you."
              rows="4"
              disabled
            ></textarea>
          </div>
          <div className="space-y-2 py-4 border-b-[1px] border-[rgb(45,48,53)]">
            <p className="font-semibold text-lg">CIPHER MAP</p>
            <div></div>
          </div>
          <div className="space-y-2 py-4 border-b-[1px] border-[rgb(45,48,53)]">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">ON THE WEB</p>
              <button className="bg-[rgb(243,145,46)] px-8 rounded-lg py-[3px]">
                Edit
              </button>
            </div>
            <div className="flex gap-x-8 gap-y-4 flex-wrap">
              <div className="space-y-2 w-[28.9rem]">
                <p className="font-semibold text-base">Linkedin</p>
                <div className="flex bg-[rgb(38,44,54)] rounded-lg px-4 items-center space-x-2 ">
                  <div className="bg-[rgb(128,129,145)] rounded-full h-7 w-7 flex justify-center items-center">
                    <i className="fa-brands text-sm text-[rgb(38,44,54)] fa-linkedin-in"></i>
                  </div>
                  <input
                    type={"text"}
                    placeholder={"LinkedIn"}
                    className={"bg-transparent text-sm w-60 outline-none py-3 "}
                    disabled
                  ></input>
                </div>
              </div>

              <div className="space-y-2 w-[28.9rem]">
                <p className="font-semibold text-base">Github</p>
                <div className="flex bg-[rgb(38,44,54)] rounded-lg px-4 items-center space-x-2 ">
                  <i className="fa-brands text-[rgb(128,129,145)] text-2xl fa-github"></i>
                  <input
                    type={"text"}
                    placeholder={"GitHub"}
                    className={"bg-transparent text-sm w-60 outline-none py-3 "}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="space-y-2 w-[28.9rem]">
                <p className="font-semibold text-base">Facebook</p>
                <div className="flex bg-[rgb(38,44,54)] rounded-lg px-4 items-center space-x-2 ">
                  <div className="bg-[rgb(128,129,145)] rounded-full h-7 w-7 flex justify-center items-center">
                    <i className="fa-brands text-[rgb(38,44,54)] fa-facebook-f"></i>
                  </div>
                  <input
                    type={"text"}
                    placeholder={"Facebook"}
                    className={"bg-transparent text-sm w-60 outline-none py-3 "}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="space-y-2 w-[28.9rem]">
                <p className="font-semibold text-base">Twitter</p>
                <div className="flex bg-[rgb(38,44,54)] rounded-lg px-4 items-center space-x-2 ">
                  <div className="bg-[rgb(128,129,145)] rounded-full h-7 w-7 flex justify-center items-center">
                    <i className="fa-brands text-[rgb(38,44,54)] fa-twitter"></i>
                  </div>
                  <input
                    type={"text"}
                    placeholder={"Twitter"}
                    className={"bg-transparent text-sm w-60 outline-none py-3 "}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="space-y-2 w-[28.9rem]">
                <p className="font-semibold text-base">Instagram</p>
                <div className="flex bg-[rgb(38,44,54)] rounded-lg px-4 items-center space-x-2 ">
                  <div className="bg-[rgb(128,129,145)] rounded-full h-7 w-7 flex justify-center items-center">
                    <i className="fa-brands  text-[rgb(38,44,54)] fa-instagram"></i>
                  </div>
                  <input
                    type={"text"}
                    placeholder={"Instagram"}
                    className={"bg-transparent text-sm w-60 outline-none py-3 "}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="space-y-2 w-[28.9rem]">
                <p className="font-semibold text-base">Website</p>
                <div className="flex bg-[rgb(38,44,54)] rounded-lg px-4 items-center space-x-2 ">
                  <div className="bg-[rgb(128,129,145)] rounded-full h-7 w-7 flex justify-center items-center">
                    <i className="fa-solid text-[rgb(38,44,54)] fa-globe"></i>
                  </div>
                  <input
                    type={"text"}
                    placeholder={"Website"}
                    className={"bg-transparent text-sm w-60 outline-none py-3 "}
                    disabled
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2 py-4 border-b-[1px] border-[rgb(45,48,53)]">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">PROFESSIONAL INFORMATION</p>
              <button className="bg-[rgb(243,145,46)] px-8 rounded-lg py-[3px]">
                Edit
              </button>
            </div>
            <div className="flex gap-x-8 ">
              <div className="space-y-2 w-[28.9rem]">
                <p className="font-semibold text-base">Highest education</p>
                <div className="flex bg-[rgb(38,44,54)] py-2 rounded-lg px-4 justify-between items-center ">
                  <p className="text-[rgb(201,202,205)] font-semibold">
                    Higher Secondary
                  </p>
                  <i className="fa-solid fa-angle-down text-[rgb(128,129,145)]  "></i>
                </div>
              </div>
              <div className="space-y-2 w-[28.9rem]">
                <p className="font-semibold text-base">
                  What do you do currently?
                </p>
                <div className="flex bg-[rgb(38,44,54)] py-2 rounded-lg px-4 justify-between items-center ">
                  <p className="text-[rgb(201,202,205)] font-semibold">
                    College Student
                  </p>
                  <i className="fa-solid fa-angle-down text-[rgb(128,129,145)]  "></i>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2 py-4 border-b-[1px] border-[rgb(45,48,53)]">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">PASSWORD & SECURITY</p>
              <ResetPassword />
            </div>
            <div className="space-y-2 w-[28.9rem]">
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
              <UpdateInterests />
            </div>
            <div className="flex gap-x-4">
              {interests.map((interest) => {
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
        {/* ------------------------------------------------------------------------------------- */}
        <div className="text-[rgb(238,238,238)] -space-y-1 items-end  flex flex-col">
          <div
            className="bg-[rgb(38,44,54)] flex items-center px-2 border-l-[1px] border-[rgb(60,66,74)] border-b-[1px] rounded-l-md
                     w-[17rem]
                    h-10 "
          >
            <i className="fa-solid fa-angle-right"></i>
          </div>
          <div
            className="bg-[rgb(38,44,54)] h-[26.73rem] space-y-1 px-2 border-l-[1px] border-[rgb(60,66,74)] 
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
