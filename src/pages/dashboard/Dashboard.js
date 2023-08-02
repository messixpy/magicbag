import React from "react";
import Slidebar from "../../components/slidebar/Slidebar";
import dashimg from "../../assets/images/dashimg.png";
import Headline from "../../components/layout/headline"
import { useStateContext } from "../../context";
import { useState, useEffect } from "react";
import BigNumber from 'bignumber.js';

const Dashboard = () => {
  /* global BigInt */

  const { felixMarketCap, felixDollarRate, decimals, getCirculatingSupply, getBurned, getLpReward, getReflection } = useStateContext();
  const [circulatingSupply, setCirculatingSupply] = useState(0)
  const [burned, setBurned] = useState(0)
  const [lp, setLp] = useState(0)
  const [reflection, setReflection] = useState(0)
  const { showNav } = useStateContext();


  console.log('circ supply is ',circulatingSupply)

  useEffect(() => {
    const getTotalCirculatingSupply = async () => {
      const circulatingCount = await getCirculatingSupply();
      console.log('circulating count',circulatingCount)
      setCirculatingSupply(circulatingCount);
    };


    const getBurnedCount = async () => {
      const burnCount = await getBurned();
      setBurned(burnCount);
    };


    const getLpCount = async () => {
      const lPCount = await getLpReward();
      setLp(lPCount);
    };


    const getReflectionCount = async () => {
      const reflectionCount = await getReflection();
      setReflection(reflectionCount);
    };

    getTotalCirculatingSupply()

    getBurnedCount()

    getLpCount()

    getReflectionCount()
  }, [])


  const gData = [
    {
      heading1: "MARKET CAP",
      price: `$${felixMarketCap}`
    },
    {
      heading1: "$FELIX PRICE",
      price: `$${Number(felixDollarRate)?.toFixed(11)}`
    },
    {
      heading1: "CIRC SUPPLY",
      price: `${circulatingSupply?(circulatingSupply /10 ** 18):0} FELIX`
    },
    {
      heading1: "TOTAL BURNED",
      price: `${(burned?(burned) / (10 ** 18):0).toFixed(5)} FELIX`,
    },
    {
      heading1: "ADDED LP",
      price: `${(lp? (lp / 10 ** 18):0).toFixed(5)} FELIX`,
    },
    {
      heading1: "TOTAL REFLECTIONS",
      price: `${(reflection?(reflection/10**18):0).toFixed(7)} ETH`,
    },
  ];
  return (
    <><Headline />
      <div className=" flex mx-auto max-w-[1440px]  flex-col vh-100  justify-center items-center ">
        <div className="flex flex-col lg:flex-row w-[100%] lg:justify-around justify-center  md:gap-3 p-3 lg:p-1 ">
          <div className="lg:w-[18%]  ">
            <Slidebar />
          </div>
          <div className={`${showNav ? "hidden" : "flex"} lg:border-2  md:p-[0.2rem] md:border-white md:rounded-md  w-[100%] lg:w-[70%]`}>
            <div className="flex flex-col px-5  w-[100%] lg:w-[50%]">
              <div className="grid  grid-flow-row grid-cols-1 ">
                {gData.slice(0, 2).map((item, index) => (
                  <div
                    key={index}
                    className="  items-start border-solid  text-white  hover:bg-white group border rounded-lg bg-transparent  p-1 my-1 w-[100%] lg:w-[70%]"
                  >
                    <div className="flex lg:ml-1 justify-start my-1 boxText group-hover:text-black ">
                      {item.heading1}
                    </div>
                    <div className="text-lg lg:ml-1 group-hover:text-black">{item.price}</div>
                  </div>
                ))}
              </div>
              <div className=" lg:hidden flex flex-col items-center ">
                <img src={dashimg} alt="img" />
              </div>

              <div className="grid  grid-flow-row grid-cols-1 ">
                {gData.slice(2, 6).map((item, index) => (
                  <div
                    key={index}
                    className="  items-start border-solid  group text-white hover:bg-white border rounded-lg bg-transparent border-white p-1 my-1 w-[100%] lg:w-[70%]"
                  >
                    <div className="flex lg:ml-1 justify-start my-1 boxText group-hover:text-black">
                      {item.heading1}
                    </div>
                    <div className="text-lg lg:ml-1 group-hover:text-black">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" hidden lg:flex items-center justify-center w-[40%]">
              <img className="w-[98%] h-[75%]" src={dashimg} alt="img" />
            </div>
          </div>{" "}
        </div>

        <div className=" flex flex-col  items-center justify-center w-[100%] overflow-y-hidden ">
          <div className="w-[94%] mt-[1px] flex justify-between items-center">
            <h className="text-md text-white font-semibold">$FELIX DAPP</h>
            <h className="text-md text-white font-semibold">2023</h>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
