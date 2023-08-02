import React from "react";
import Slidebar from "../../components/slidebar/Slidebar";
import comingsoon from "../../assets/images/comingsoon.png";
import treasury from "../../assets/videos/treasury.webm";
import TreasuryHeadline from "../../components/layout/treasuryHeadline";
import { useStateContext } from "../../context";
const Treasury = () => {
  const {showNav}=useStateContext();
  return (
    <>
      <div className=" flex mx-auto max-w-[1440px]  flex-col vh-100  justify-center items-center   ">
        <div className="flex  w-[100%] justify-around  md:gap-3 p-1 ">
          <div className="lg:w-[18%]  ">
            <Slidebar />
          </div>

          <div className={`${showNav ? "hidden" : "flex"} md:border-2 lg:flex-row flex-col items-center justify-around md:p-[0.2rem] md:border-white md:rounded-md  w-[100%] lg:w-[70%]`}>
            <div className=" flex flex-col px-4  w-[95%] lg:w-[40%]">
              <img src={comingsoon} alt="comming soon" />
            </div>
            <div className=" flex justify-center border border-white h-fit items-center my-4 w-[95%] lg:w-[40%]">
              <video
                src={treasury}
                width="800"
                height="400"
                controls={false}
                autoPlay
                loop
              />
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-center justify-center w-[100%] h-auto overflow-y-hidden ">
          <div className="w-[96%] mt-[1px] flex justify-between items-center">
            <h className="text-md text-white font-semibold">$FELIX DAPP</h>
            <h className="text-md text-white font-semibold">2023</h>
          </div>
        </div>
      </div>
    </>
  );
};

export default Treasury;
