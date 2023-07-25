import React from "react";
import Marquee from "react-fast-marquee";
import dashhead from "../../assets/images/dashhead.gif";

const StakingHeadline = () => {
  const texts = ["STAKING", "MAGIC BAG", "STAKING", "MAGIC BAG", "STAKING", "MAGIC BAG"];

  return (
    <div className="w-[100%] mx-auto max-w-[1440px] py-2 px-8 flex items-center justify-center flex-col xl:px-10 ">
      <Marquee className="flex w-[90%] lg:h-[100px] px-0 border-2 border-white rounded-md items-center justify-center space-x-4">
        {texts.map((text, index) => (
           <div key={index} className="flex gap-3 items-center space-x-4">
           <div></div><img src={dashhead} alt="/" width={69} height={64} />
           <h className="cursor-pointer mainSubHeading">{text}</h>
         </div>
        ))}
      </Marquee>
    </div>
  );
};

export default StakingHeadline;