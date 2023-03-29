import React, { useContext } from "react";
import userContext from "../context/userContext";

function Followers() {
  const context = useContext(userContext);
  const { followers } = context;

  return (
    <div className="bg-[rgb(21,24,30)] text-[rgb(223,224,225)]  relative  w-full px-6 pt-6 space-y-4">
      <h2 className="font-semibold text-xl">Users Following You</h2>
      <div className="flex gap-x-[2.5%] overflow-y-scroll styleScroll h-[77vh]  flex-wrap">
        {followers?.map((follower) => {
          return (
            <div
              key={follower.firtName}
              className={
                "bg-[rgb(38,44,54)] w-[18%] items-center h-56   gap-y-2 flex flex-col rounded-lg px-4 py-4"
              }
            >
              <img
                className="w-20 h-20 rounded-full"
                src={follower.avtar}
                alt=""
              />
              <div className="flex justify-start w-full items-start flex-col -gap-x-2">
                <p className="text-lg -mb-1 font-bold">
                  {follower.firstName} {follower.lastName}
                </p>
                <p className="text-left text-[12px]">
                  {follower.currentStatus}
                </p>
                <p className="text-left text-[12px]">
                  {follower.followers} followers
                </p>
              </div>
              <button className="bg-[rgb(243,145,46)] w-full rounded-md py-[3px]">
                Follow
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Followers;
