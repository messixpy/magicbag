import React, { useEffect, useState } from "react";
import Slidebar from "../../components/slidebar/Slidebar";
import ClaimHeadline from "../../components/layout/claimHeadline";
import ClaimButton from "../../components/buttons/ClaimButton";
import claimvid from "../../assets/videos/claimvid.mp4";
import { useStateContext } from "../../context";
import BigNumber from "bignumber.js";
const Claim = () => {
  const [showUnclaimed, setShowUnclaimed] = useState(true);
  const [showValidate, setShowValidate] = useState(false);

  const [unclaimedReflection,setUnclaimedReflection]=useState(0)
  const {showNav, felixDollarRate, felixMarketCap,
    ethDollarRate,
     getTotalUnClaimedReflection,address}=useStateContext();
  
  const gData = [
    {
      heading2: "VALIDATE UNCLAIMED REFLECTIONS",
      heading1: "UNCLAIMED REFLECTIONS",
      price: `${address&&felixDollarRate&&ethDollarRate?(new BigNumber(unclaimedReflection)/new BigNumber(10**18))+'ETH':0 } `,
    },
    {
      heading1: "FELIX BALANCE",
      price1: "$ 229053.9",
      price: "92125347.29257213 FELIX",
    },
    {
      heading1: "TOTAL CLAIMED",
      price1: "$ 0.00237458853",
      price: "92125347.29257213 FELIX",
    },
    {
      heading1: "UNCLAIMED",
      price: "92125347.29257213 FELIX",
      price1: "92125347.29257213 FELIX",
    },
  ];


  useEffect(()=>{
    const getUnClaimedReflectionCount = async () => {
      const unCalimedCount = await getTotalUnClaimedReflection(address);

      setUnclaimedReflection(unCalimedCount);
    };

    getUnClaimedReflectionCount()
  },[])
  return (
    <>
      <ClaimHeadline />
      <div className="flex mx-auto max-w-[1440px] flex-col vh-100 justify-center items-center ">
        <div className="flex flex-col lg:flex-row w-[100%] lg:justify-around justify-center md:gap-3 p-3 lg:p-1 ">
          <div className="lg:w-[18%] ">
            <Slidebar />
          </div>

          <div className={`${showNav ? "hidden" : "flex"} md:border-2 md:p-[0.2rem] md:border-white md:rounded-md w-[100%] lg:w-[70%] `}>
            <div className="flex flex-col px-5 w-[100%] lg:w-[50%]">
              <div className="flex justify-normal gap-3 bg-transparent font-extrabold text-xl text-gray-600">
                <button
                  className={showUnclaimed ? "text-yellow-400" : "text-gray-600"}
                  onClick={() => {
                    setShowUnclaimed(true);
                    setShowValidate(false);
                  }}
                >
                  UNCLAIMED
                </button>
                <button
                  className={showValidate ? "text-yellow-400" : "text-gray-600"}
                  onClick={() => {
                    setShowUnclaimed(false);
                    setShowValidate(true);
                  }}
                >
                  VALIDATE
                </button>
              </div>
              {showUnclaimed && (
                 <><div className="grid  grid-flow-row grid-cols-1 ">
                  {gData.slice(0, 1).map((item, index) => (
                    <div
                      key={index}
                      className="  items-start border-solid gap-1  text-white md:border-2 md:rounded-xl bg-transparent md:border-white p-2 my-1  w-[100%] lg:w-[70%] "
                    >
                      <div className="flex justify-start mb-1 boxText ">
                        {item.heading1}
                      </div>
                      <div className="text-lg ">{item.price}</div>
                      <div className="  ">
                        <ClaimButton className="" label={"Claim"} />
                      </div>
                    </div>
                  ))}
                </div><div className=" lg:hidden flex flex-col items-center py-3 w-[100%] md:w-[65%] ">
                    <video src={claimvid} controls={false} autoPlay loop />
                  </div><div className="grid  grid-flow-row grid-cols-1 ">
                    {gData.slice(1, 5).map((item, index) => (
                      <div
                        key={index}
                        className="  items-start border-solid  group text-white hover:bg-white border rounded-lg bg-transparent border-white p-2 my-1 w-[100%] lg:w-[70%]"
                      >
                        <div className="flex justify-start  boxText group-hover:text-black">
                          {item.heading1}
                        </div>
                        <div className="text-lg group-hover:text-black">{item.price1}</div>
                        <div className="text-lg group-hover:text-black">{item.price}</div>
                      </div>
                    ))}
                  </div></>
              )}
              {showValidate && (
                <><div className="grid  grid-flow-row grid-cols-1 ">
                {gData.slice(0, 1).map((item, index) => (
                  <div
                    key={index}
                    className="  items-start border-solid gap-1  text-white md:border  md:rounded-xl bg-transparent md:border-white p-1 my-1 "
                  >
                    <div className="flex justify-start mb-1 boxText p-1 ">
                      {item.heading2}
                    </div>
                    <div className=" flex lg:flex-row flex-col  gap-3 ">
                      <input
                        type="number"
                        
                        placeholder="Amount "
                        className="lg:w-[80%] px-5 font-medium justify-between placeholder-opacity-75 bg-transparent border rounded-md border-white text-white h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        autoComplete="off"
                      ></input>
                      <div className="flex   lg:w-[28%] justify-between">
                      <button className="border-2 border-white hover:bg-white hover:text-black px-1 rounded-md  lg:text-lg font-extrabold ">
                        {" "}
                        Validate
                      </button>
                      <div className="flex lg:hidden ">
                      <h1 className="text-lg font-bold">0 ETH</h1>
                    </div>
                      </div>
                    </div>
                    <div className="lg:flex hidden ">
                      <h1 className="text-lg font-bold">0 ETH</h1>
                    </div>
                  </div>
                ))}
              </div><div className=" lg:hidden flex flex-col items-center py-3 w-[100%] md:w-[65%] ">
                  <video src={claimvid} controls={false} autoPlay loop />
                </div><div className="grid  grid-flow-row grid-cols-1 ">
                  {gData.slice(1, 5).map((item, index) => (
                    <div
                      key={index}
                      className="  items-start border-solid  group text-white hover:bg-white border rounded-lg bg-transparent border-white p-2 my-1 w-[100%] "
                    >
                      <div className="flex justify-start  boxText group-hover:text-black ">
                        {item.heading1}
                      </div>
                      <div className="text-md group-hover:text-black ">{item.price1}</div>
                      <div className="text-md group-hover:text-black">{item.price}</div>
                    </div>
                  ))}
                </div></>
              )}
            </div>
            <div className="hidden lg:flex justify-center items-center border border-white h-fit mt-3 w-[41%]">
              <video
                src={claimvid}
                width="700"
                height="300"
                controls={false}
                autoPlay
                loop
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[100%] overflow-y-hidden ">
          <div className="w-[94%] mt-[2px] flex justify-between items-center">
            <h className="text-md text-white font-semibold">$FELIX DAPP</h>
            <h className="text-md text-white font-semibold">2023</h>
          </div>
        </div>
      </div>
    </>
  );
};

export default Claim;
