import React from "react";
import Marquee from "react-fast-marquee";
import dashhead from "../../assets/images/dashhead.gif";

const StakingHeadline = () => (
  <div className=" w-[100%]  mx-auto max-w-[1440px] py-2 px-8 flex items-center justify-center flex-col xl:px-10 ">
    <Marquee className="flex  w-[90%] lg:h-[100px] px-0 border-2 border-white rounded-md items-center justify-center">
    <div></div>
    <div className="w-[50%] lg:px-4 lg:w-[100%]">
        <img src={dashhead} alt="/" width={69} height={64} />
      </div>
      <h1 className="flex items-center cursor-pointer mainSubHeading">
        STAKING
      </h1>
      <div className="w-[50%] lg:px-4 lg:w-[100%]">
        <img src={dashhead} alt="/" width={69} height={64} />
      </div>
      <h className="flex items-center cursor-pointer mainSubHeading">
        MAGIC BAG{" "}
      </h>
      <div className="w-[50%] lg:px-4 lg:w-[100%]">
        <img src={dashhead} alt="/" width={69} height={64} />
      </div>
      <h1 className="flex items-center cursor-pointer mainSubHeading">
        STAKING
      </h1>
      <div className="w-[50%] lg:px-4 lg:w-[100%]">
        <img src={dashhead} alt="/" width={69} height={64} />
      </div>
      <h className="flex items-center cursor-pointer mainSubHeading">
        MAGIC BAG
      </h>
      <div className="w-[50%] lg:px-4 lg:w-[100%]">
        <img src={dashhead} alt="/" width={69} height={64} />
      </div>
      <h className="flex items-center cursor-pointer mainSubHeading">
        STAKING
      </h>
      <div className="w-[50%] lg:px-4 lg:w-[100%]">
        <img src={dashhead} alt="/" width={69} height={64} />
      </div>
      <h1 className="flex items-center cursor-pointer mainSubHeading">
        MAGICBAG
      </h1>
      <div className="w-[50%] lg:px-4 lg:w-[100%]">
        <img src={dashhead} alt="/" width={69} height={64} />
      </div>
      <h className="flex items-center cursor-pointer mainSubHeading">
        STAKING
      </h>
      <div className="w-[50%] lg:px-4 lg:w-[10%]">
        <img src={dashhead} alt="/" width={69} height={64} />
      </div>
    </Marquee>
  </div>
);

export default StakingHeadline;
