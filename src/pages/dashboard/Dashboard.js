import React from "react";
import Slidebar from "../../components/slidebar/Slidebar";
import dashimg from "../../assets/images/dashimg.png";
import Headline from "../../components/layout/headline";
import { useStateContext } from "../../context";
import { useState, useEffect } from "react";
import BigNumber from "bignumber.js";

const Dashboard = () => {
  /* global BigInt */

  const {
    felixMarketCap,
    felixDollarRate,
    decimals,
    getCirculatingSupply,
    getBurned,
    getLpReward,
    getReflection,
    address,
  } = useStateContext();
  const [circulatingSupply, setCirculatingSupply] = useState(null);
  const [burned, setBurned] = useState(null);
  const [lp, setLp] = useState(null);
  const [reflection, setReflection] = useState(null);
  const { showNav } = useStateContext();
  const [loading, setLoading] = useState(true); // Add 'loading' state variable here

  console.log("circ supply is ", circulatingSupply);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const circulatingCount = await getCirculatingSupply();
        const burnCount = await getBurned();
        const lPCount = await getLpReward();
        const reflectionCount = await getReflection();

        await setCirculatingSupply(circulatingCount);
        await setBurned(burnCount);
        await setLp(lPCount);
        await setReflection(reflectionCount);

        setLoading(false); // Set loading to false once all data is fetched.
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error as well.
      }
    };

    fetchData();
  }, [getCirculatingSupply]);

  const gData = [
    {
      heading1: "MARKET CAP",
      price: `$${felixMarketCap}`,
    },
    {
      heading1: "$FELIX PRICE",
      price: `$${Number(felixDollarRate)?.toFixed(11)}`,
    },
    {
      heading1: "CIRC SUPPLY",
      price: circulatingSupply ? circulatingSupply / 10 ** 18 : 0,
    },
    {
      heading1: "TOTAL BURNED",
      price: burned ? (burned / 10 ** 18).toFixed(5) : 0,
    },
    {
      heading1: "ADDED LP",
      price: lp ? (lp / 10 ** 18).toFixed(5) : 0,
    },
    {
      heading1: "TOTAL REFLECTIONS",
      price: reflection ? (reflection / 10 ** 18).toFixed(7) : 0,
    },
  ];

  const placeholder = (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 my-2"></div>
    </div>
  );

  return (
    <>
      <div
        style={{ display: showNav && "none" }}
        className="flex mx-auto max-w-[1440px] flex-col vh-100 lg:ml-12 justify-center items-center w-[100%] lg:w-[78%]"
      >
        <div
          className={`${showNav ? "hidden" : "flex"
            } lg:border-2 md:border-white md:rounded-md w-[100%]`}
        >
          <div className="flex flex-col px-5 w-[100%] lg:w-[50%]">
            <div className="grid grid-flow-row grid-cols-1">
              {gData.slice(0, 2).map((item, index) => (
                <div
                  key={index}
                  className="items-start border-solid text-white hover:bg-white group border rounded-lg bg-transparent p-1 my-1 w-[100%] lg:w-[70%]"
                >
                  <div className="flex lg:ml-1 justify-start my-1 boxText group-hover:text-black">
                    {item.heading1}
                  </div>
                  <div className="text-lg lg:ml-1 group-hover:text-black">
                    {!felixMarketCap ? (
                      <div role="status" class="max-w-sm animate-pulse">
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 my-2"></div>
                      </div>
                    ) : (
                      item?.price
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:hidden flex flex-col items-center">
              {loading ? (
                <div className="loader">Loading...</div>
              ) : (
                <img src={dashimg} alt="img" />
              )}
            </div>

            <div className="grid grid-flow-row grid-cols-1">
              {gData?.slice(2, 6).map((item, index) => (
                <div
                  key={index}
                  className="items-start border-solid group text-white hover:bg-white border rounded-lg bg-transparent border-white p-1 my-1 w-[100%] lg:w-[70%]"
                >
                  <div className="flex lg:ml-1 justify-start my-1 boxText group-hover:text-black">
                    {item.heading1}
                  </div>
                  <div className="text-lg lg:ml-1 group-hover:text-black">
                    {!address || !getCirculatingSupply || !item.price
                      ? placeholder
                      : `${item.price} ${index === 3? "ETH" : "FELIX"}`}
                  </div>
                </div>
              ))}
            </div>

          </div>
          <div className="hidden lg:flex items-center justify-center w-[35%]">
            <img className="w-[98%] h-[75%]" src={dashimg} alt="img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
