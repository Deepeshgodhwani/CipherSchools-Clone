import React, { useContext } from "react";
import Login from "./Login";
import menuIcon from "../images/menu.png";
import logoImg from "../images/cipherlogo.png";
import filterImg from "../images/filter.png";
import userContext from "../context/userContext";
import { Link } from "@chakra-ui/react";

function Navbar() {
  const context = useContext(userContext);
  const { userData } = context;

  return (
    <div className="flex w-full justify-between border-[rgb(60,66,74)] text-[rgb(238,238,238)] px-4 py-4 items-center bg-[rgb(38,44,54)] border-b-[1px]">
      <div className="flex space-x-8 justify-between">
        <img alt="" className="w-8" src={menuIcon}></img>
        <div className="flex items-center space-x-2">
          <img alt="" className="w-8" src={logoImg}></img>
          <p className="text-xl text-[rgb(238,238,238)]  font-bold">
            CipherSchools
          </p>
        </div>
        <div className="flex text-[rgb(225,222,221)] space-x-2 items-center">
          <i className="fa-regular fa-compass"></i>
          <p>Browse</p>
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </div>
      <div className="flex items-center space-x-8 justify-between">
        <div className="flex bg-[rgb(21,24,30)] rounded-2xl px-4 items-center space-x-2 ">
          <i className="fa-solid text-[#EEEEEE] text-sm fa-magnifying-glass"></i>
          <input
            type={"text"}
            placeholder={"Search and Learn"}
            className={"bg-transparent text-sm w-60 outline-none py-2 "}
          ></input>
          <img className="w-5" src={filterImg} alt="" />
        </div>
        <div className="relative flex  ">
          <i className="fa-sharp fa-regular text-[1.1rem] fa-bell"></i>
          <p className="bg-[rgb(243,145,46)] absolute left-4 -top-3 px-1 h-4 flex justify-center items-center rounded-sm   text-[12px]">
            4
          </p>
        </div>
        {userData.email ? (
          <Link to="/">
            <img
              alt=""
              className="rounded-full h-6 w-6"
              src={userData.avtar}
            ></img>
          </Link>
        ) : (
          <Login />
        )}
        <div className="flex space-x-2 items-center">
          <img
            className="bg-white rounded-full w-5 first-letter:"
            src="https://www.cipherschools.com/static/media/WatchPoints.1caa87d88b88c0d4b4ee24fdd5b1db3f.svg"
            alt=""
          />
          <p className="text-[rgb(243,145,46)] text-sm font-bold">10</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
