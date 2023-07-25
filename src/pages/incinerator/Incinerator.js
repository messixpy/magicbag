import React from "react";
import Slidebar from "../../components/slidebar/Slidebar";
import InciHeadline from "../../components/layout/inciHeadline";
import burnvid from "../../assets/videos/burnvid.mp4";
import { useStateContext } from "../../context";
const Incinerator = () => {
  const { showNav } = useStateContext();
  const gData = [
    {
      heading1: "ENTER FELIX AMOUNT TO BURN",
    },
    {
      heading1: "FELIX BALANCE",
      price1: "$ 229053.9",
      price: "92125347.29257213 FELIX",
    },
  ];
  return (
    <>
      <InciHeadline />
      <div className=" flex mx-auto max-w-[1440px]  flex-col vh-100  justify-center items-center  ">
        <div className="flex flex-col lg:flex-row w-[100%] lg:justify-around justify-center  md:gap-3 p-3 lg:p-1 ">
          <div className="lg:w-[18%]  ">
            <Slidebar />
          </div>

          <div
            className={`${
              showNav ? "hidden" : "flex"
            } md:border-2  md:p-[0.2rem] md:border-white md:rounded-md  w-[100%] lg:w-[70%]`}
          >
            <div className="flex flex-col px-5  w-[100%] lg:w-[50%]">
              <div className="grid  grid-flow-row grid-cols-1 ">
                {gData.slice(0, 1).map((item, index) => (
                  <div
                    key={index}
                    className="  items-start border-solid gap-1  text-white md:border md:rounded-xl bg-transparent md:border-white p-5 my-1 "
                  >
                    <div className="flex justify-start mb-4 boxText hover:black">
                      {item.heading1}
                    </div>
                    <div className=" flex lg:flex-row flex-col mb-2 gap-3 ">
                      <input
                        type="number"
                        placeholder="Amount "
                        className="lg:w-[80%] px-5 font-medium justify-between placeholder-opacity-75 bg-transparent border rounded-md border-white text-white  h-14 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        autoComplete="off"
                      ></input>
                      <div className="flex   lg:w-[22%] justify-between">
                        <button className="border-2 border-white hover:bg-white hover:text-black px-1 rounded-md  lg:text-lg font-extrabold ">
                          {" "}
                          BURN
                        </button>
                        <div className="flex lg:hidden ">
                          <h1 className="text-lg font-extrabold">$ 0</h1>
                        </div>
                      </div>
                    </div>
                    <div className="lg:flex hidden ">
                      <h1 className="text-lg font-extrabold">$ 0</h1>
                    </div>
                  </div>
                ))}
              </div>
              <div className=" lg:hidden flex flex-col items-center py-3 w-[100%] md:w-[65%] ">
                <video src={burnvid} controls={false} autoPlay loop />
              </div>
              <div className="grid  grid-flow-row grid-cols-1 ">
                {gData.slice(1, 2).map((item, index) => (
                  <div
                    key={index}
                    className="  items-start border-solid gap-1 hover:text-black text-white hover:bg-white border rounded-xl bg-transparent border-white p-4 my-2  "
                  >
                    <div className="flex justify-start mb-2 boxText hover:text-black">
                      {item.heading1}
                    </div>
                    <div className="text-lg ">{item.price1}</div>
                    <div className="text-lg ">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" hidden lg:flex justify-center items-center  border border-white lg:ml-5 mt-1 h-fit w-[40%]">
              <video
                src={burnvid}
                width="700"
                height="300"
                controls={false}
                autoPlay
                loop
              />
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-center mt-5 justify-center w-[100%] h-auto overflow-y-hidden ">
          <div className="w-[94%] mt-[1px] flex justify-between items-center">
            <h className="text-md text-white font-semibold">$FELIX DAPP</h>
            <h className="text-md text-white font-semibold">2023</h>
          </div>
        </div>
      </div>
    </>
  );
};

export default Incinerator;
