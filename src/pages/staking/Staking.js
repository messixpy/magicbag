import React from "react";
import comingsoon from "../../assets/images/comingsoon.png";
import staking from "../../assets/videos/staking.mp4";
import { useStateContext } from "../../context";
const Staking = () => {
  const {showNav}=useStateContext();
  return (
    <>
     <div style={{display:showNav&&'none'}}  className=" flex  flex-col   lg:ml-12 justify-center items-center w-[100%] lg:w-[78%] ">
        

          <div className={`${showNav ? "hidden" : "flex"} md:border-2 lg:flex-row flex-col items-center justify-around md:p-[0.2rem] self-stretch min-h-[400px] lg:max-h-[400px] md:border-white md:rounded-md  w-[100%] `}>
            <div className=" flex flex-col px-4 py-2 w-[95%] md:w-[75%] lg:w-[35%]">
              <img src={comingsoon} alt="comming soon" />
            </div>
            <div className=" flex justify-center items-center border border-white h-fit my-4 lg:mr-[10%] w-[95%] md:w-[75%] lg:w-[40%] xl:w-[35%]">
              <video
                src={staking}
                width="800"
                height="400"
                controls={false}
                autoPlay
                loop
              />
            </div>
          </div>
      
       
      </div>
    </>
  );
};

export default Staking;
