import React, { useEffect } from "react";
import burnvid from "../../assets/videos/burnvid.webm";
import { useStateContext } from "../../context";
import { useState } from "react";
import SkeletonLoadingVideo from "../../components/skeletonLoadingVideo/SkeletonLoadingVideo"; 
import Loader from "../../components/loader/Loader";

const Incinerator = () => {
  const { showNav,decimals,publishBurn,address,felixDollarRate,ethDollarRate,getFelixBalance } = useStateContext();

  const [inputValue, setInputValue] = useState("");
  const [loadingState, setLoadingState] = useState("");
  const [felixBalance, setFelixBalance] = useState("");


  const burnBtnClasses=   "border-2 border-white hover:bg-white hover:text-black px-1 rounded-md lg:text-lg font-extrabold ";

  const disabledClass = inputValue==0 ? "opacity-50 cursor-not-allowed pointer-events-none" : "";


  const gData = [
    {
      heading1: "ENTER FELIX AMOUNT TO BURN",
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
  ];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  const exponentialToDecimal = exponential => {

    
    let decimal = exponential.toString().toLowerCase();
    if (decimal.includes('e+')) {
      const exponentialSplitted = decimal.split('e+');
      let postfix = '';
      for (
        let i = 0;
        i <
        +exponentialSplitted[1] -
          (exponentialSplitted[0].includes('.')
            ? exponentialSplitted[0].split('.')[1].length
            : 0);
        i++
      ) {
        postfix += '0';
      }
      const addCommas = text => {
        let j = 3;
        let textLength = text.length;
        while (j < textLength) {
          text = `${text.slice(0, textLength - j)},${text.slice(
            textLength - j,
            textLength
          )}`;
          textLength++;
          j += 3 + 1;
        }
        return text;
      };
      decimal = addCommas(exponentialSplitted[0].replace('.', '') + postfix);
    }
    if (decimal.toLowerCase().includes('e-')) {
      const exponentialSplitted = decimal.split('e-');
      let prefix = '0.';
      for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
        prefix += '0';
      }
      decimal = prefix + exponentialSplitted[0].replace('.', '');
    }
    return decimal.toString();
  };

  let approveAmount_new = parseFloat(inputValue) * 10 ** parseFloat(decimals);
  let amountInWith = exponentialToDecimal(approveAmount_new);
  let convertedNumTokens = amountInWith.replaceAll(',', '');

  const burnTokens = async e => {
    setLoadingState(true);

    const data = await publishBurn(convertedNumTokens);
    setInputValue("")
    setLoadingState(false);
  };


  useEffect(()=>{
    const getFelixBalanceCount = async () => {
      const balanceCount = await getFelixBalance(address);
      setFelixBalance(balanceCount);
    };

    getFelixBalanceCount()
  },[getFelixBalance])
  return (
    <>
      
     {loadingState?<Loader/>: <div style={{display:showNav&&'none'}}  className=" flex   flex-col vh-100 lg:ml-12 justify-center items-center w-[100%] lg:w-[78%] ">
        

          <div
            className={`${
              showNav ? "hidden" : "flex"
            } md:border-2 flex items-center md:p-[0.2rem] md:border-white md:rounded-md  w-[100%] `}
          >
            <div className="flex flex-col px-5 py-14 w-[100%] lg:w-[50%]">
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
                        onChange={handleInputChange}
                        value={inputValue}
                        className="lg:w-[80%] px-5 font-medium justify-between placeholder-opacity-75 bg-transparent border rounded-md border-white text-white  h-14 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        autoComplete="off"
                      ></input>
                      <div className="flex   lg:w-[22%] justify-between">
                        <button  disable={inputValue == 0 ? true : false} onClick={burnTokens} className={`${burnBtnClasses} ${disabledClass} `}>
                          {" "}
                          BURN
                        </button>
                        <div className="flex lg:hidden ">
                          <h1 className="text-lg font-extrabold">{`$ ${inputValue?(Number(felixDollarRate)?.toFixed(11)*inputValue):0}`}</h1>
                        </div>
                      </div>
                    </div>
                    <div className="lg:flex hidden ">
                      <h1 className="text-lg font-extrabold">{`$ ${inputValue?(Number(felixDollarRate)?.toFixed(11)*inputValue):0}`}</h1>
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
                    className="  items-start border-solid gap-1 group text-white hover:bg-white border rounded-xl bg-transparent border-white p-2 my-2  "
                  >
                    <div className="flex justify-start mb-2 boxText group-hover:text-black">
                      {item.heading1}
                    </div>
                    <div className="text-lg  group-hover:text-black">
                    {!address ? <div role="status" class="max-w-sm animate-pulse">
    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 my-2"></div></div> : item.price1}
                  </div>
                  <div className="text-lg group-hover:text-black">
                    {!address ? <div role="status" class="max-w-sm animate-pulse">
    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 my-2"></div></div> : item.price}
                  </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center border border-white h-fit mt-3  w-[35%]">
            {!burnvid ? (
              <SkeletonLoadingVideo />
            ) : (
              <video
                src={burnvid}
                width="700"
                height="300"
                controls={false}
                autoPlay
                loop
              />
            )}
            </div>
          </div>
        {/* </div> */}
       
      </div>
}
    </>
  );
};

export default Incinerator;
