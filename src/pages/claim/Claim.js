import React, { useEffect, useState } from "react";
import Slidebar from "../../components/slidebar/Slidebar";
import ClaimHeadline from "../../components/layout/claimHeadline";
import ClaimButton from "../../components/buttons/ClaimButton";
import claimvid from "../../assets/videos/claimvid.webm";
import { useStateContext } from "../../context";
import SkeletonLoadingVideo from "../../components/skeletonLoadingVideo/SkeletonLoadingVideo"; 
import BigNumber from "bignumber.js";
const Claim = () => {
  const [showUnclaimed, setShowUnclaimed] = useState(true);
  const [showValidate, setShowValidate] = useState(false);
  const [felixBalance, setFelixBalance] = useState(false);
  const [claimedReflection, setClaimedReflection] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const [unclaimedReflection, setUnclaimedReflection] = useState(0);

  const [inputValue, setInputValue] = useState("");
  const [validatedData, setValidatedData] = useState(0);

  const {
    showNav,
    felixDollarRate,
    felixMarketCap,
    ethDollarRate,
    getTotalUnClaimedReflection,
    address,
    decimals,
    getTotalClaimedReflection,
    getFelixBalance,
    publishClaim,
    validateUnclaimed,
    write
  } = useStateContext();

  const gData = [
    {
      heading2: "VALIDATE UNCLAIMED REFLECTIONS",
      heading1: "UNCLAIMED REFLECTIONS",
      price: `${
        address && felixDollarRate && ethDollarRate
          ? (isNaN(unclaimedReflection / 10 ** 18)
              ? 0
              : unclaimedReflection / 10 ** 18) + " ETH"
          : 0
      }`,
    },
    {
      heading1: "FELIX BALANCE",
      price1: `$ ${
        address && felixDollarRate && ethDollarRate
          ? (Number(felixDollarRate) * (felixBalance / 10 ** decimals)).toFixed(
              9
            )
          : 0
      }`,
      price: `${
        address && felixDollarRate && ethDollarRate
          ? (felixBalance / 10 ** decimals).toFixed(5) + " FELIX"
          : "0 FELIX"
      }`,
    },
    {
      heading1: "TOTAL CLAIMED",
      price1: `$ ${
        address && felixDollarRate && ethDollarRate
          ? (ethDollarRate * (claimedReflection / 10 ** 18)).toFixed(9)
          : 0
      }`,
      price: `${
        address && felixDollarRate && ethDollarRate
          ? claimedReflection / 10 ** 18 + " ETH"
          : "0 ETH"
      }`,
    },
    {
      heading1: "UNCLAIMED",
      price1: `$ ${
        address && felixDollarRate && ethDollarRate
          ? (ethDollarRate * (unclaimedReflection / 10 ** 18)).toFixed(9)
          : "0"
      }`,

      price: `${
        address && felixDollarRate && ethDollarRate
          ? unclaimedReflection / 10 ** 18 + " ETH"
          : "0 ETH"
      }`,
    },
  ];

  console.log('felix dollar rate',felixDollarRate)
  console.log('felix balance',felixBalance)
  console.log('decimals',decimals)

  console.log('balanceeee',((felixDollarRate) * ((felixBalance) / 10 ** decimals)).toFixed(
    9
  ))
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const validate = async (e) => {
    setLoadingState(true);

    const data = await validateUnclaimed(inputValue);
    setValidatedData(data);
    console.log("validate data is ", data);
    setLoadingState(false);
  };
  useEffect(() => {
    const getUnClaimedReflectionCount = async () => {
      const unCalimedCount = await getTotalUnClaimedReflection(address);

      setUnclaimedReflection(unCalimedCount);
    };

    const getFelixBalanceCount = async () => {
      const balanceCount = await getFelixBalance(address);
      setFelixBalance(balanceCount);
    };

    const getClaimedReflectionCount = async () => {
      const claimedCount = await getTotalClaimedReflection(address);

      setClaimedReflection(claimedCount);
    };
    getUnClaimedReflectionCount();
    getFelixBalanceCount();

    getClaimedReflectionCount();
  }, [getFelixBalance, getTotalClaimedReflection]);

  console.log(
    "expression",
    unclaimedReflection && unclaimedReflection / 10 ** 18
  );

  const claimEthereums = async (e) => {
    setLoadingState(true);
    const data = await publishClaim();
    setLoadingState(false);
  };

  return (
    <>
      
      <div className="flex mx-auto max-w-[1440px] flex-col vh-100 justify-center items-center ">
        <div className="flex flex-col lg:flex-row w-[100%] lg:justify-around justify-center md:gap-3 p-3 lg:p-1 ">
          <div className="lg:w-[18%] ">
            <Slidebar />
          </div>

          <div className={`${showNav ? "hidden" : "flex"} md:border-2 md:p-[0.2rem] md:border-white md:rounded-md w-[100%] lg:w-[70%] `}>
            <div className="flex flex-col px-5 w-[100%] lg:w-[50%]">
              <div className="flex justify-normal gap-3 bg-transparent font-extrabold text-xl text-gray-600">
                <button
                  className={
                    showUnclaimed ? "text-yellow-400" : "text-gray-600"
                  }
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
                <>
                  <div className="grid  grid-flow-row grid-cols-1 ">
                    {gData.slice(0, 1).map((item, index) => (
                      <div
                        key={index}
                        className="  items-start border-solid gap-1  text-white md:border-2 md:rounded-xl bg-transparent md:border-white p-2 my-1  w-[100%] lg:w-[70%] "
                      >
                        <div className="flex justify-start mb-1 boxText ">
                          {item.heading1}
                        </div>
                        <div className="text-lg ">{item?.price}</div>
                        <div className="  ">
                          <ClaimButton
                            isDisabled={
                              unclaimedReflection &&
                              unclaimedReflection / 10 ** 18
                                ? false
                                : true
                            }
                            onClick={claimEthereums}
                            label={"Claim"}
                            variant="solid"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className=" lg:hidden flex flex-col items-center py-3 w-[100%] md:w-[65%] ">
                    <video src={claimvid} controls={false} autoPlay loop />
                  </div>
                  <div className="grid  grid-flow-row grid-cols-1 ">
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
                  </div>
                </>
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
            {!claimvid ? (
              <SkeletonLoadingVideo />
            ) : (
              <video
                src={claimvid}
                width="700"
                height="300"
                controls={false}
                autoPlay
                loop
              />
              )}
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
