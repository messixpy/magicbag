import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Marquee from "react-fast-marquee";
import dashhead from "../../assets/images/dashhead.gif";

const SkeletonLoadingHeadline = () => {
  // Define the number of skeleton items to show
  const skeletonCount = 6;
  const skeletonItems = Array.from({ length: skeletonCount });

  return (
    <div className="w-[100%] mx-auto max-w-[1440px] py-2  flex items-center justify-center flex-col xl:px-10 ">
      <Marquee className="flex w-[90%] lg:h-[95px] px-0 border-2 border-white rounded-md items-center justify-center space-x-4">
        {skeletonItems.map((_, index) => (
          <div key={index} className="flex gap-3 items-center space-x-4">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div className="h-64 w-69 bg-gray-300 rounded-md"></div>
            <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

const Headline = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Get the current location (URL)

  // Simulate loading data here (you can replace this with actual data fetching)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the data is fetched (simulated here using setTimeout)
    }, 1000);
  }, []);

  // You can map the texts array based on the route here or customize it as per your requirements
  const textsMap = {
    "/dashboard": [
      "DASHBOARD",
      "MAGIC BAG",
      "DASHBOARD",
      "MAGIC BAG",
      "DASHBOARD",
      "MAGIC BAG",
      "DASHBOARD",
      "MAGIC BAG",
    ],
    "/claim": [
      "CLAIM",
      "MAGIC BAG",
      "CLAIM",
      "MAGIC BAG",
      "CLAIM",
      "MAGIC BAG",
      "CLAIM",
      "MAGIC BAG",
      "CLAIM",
      "MAGIC BAG",
      "CLAIM",
      "MAGIC BAG",
    ],
    "/incinerator": [
      "INCINERATOR",
      "MAGIC BAG",
      "INCINERATOR",
      "MAGIC BAG",
      "INCINERATOR",
      "MAGIC BAG",
      "INCINERATOR",
      "MAGIC BAG",
      "INCINERATOR",
      "MAGIC BAG",
    ],
    "/treasury": [
      "TREASURY",
      "MAGIC BAG",
      "TREASURY",
      "MAGIC BAG",
      "TREASURY",
      "MAGIC BAG",
      "TREASURY",
      "MAGIC BAG",
      "TREASURY",
      "MAGIC BAG",
    ],
    "/staking": [
      "STAKING",
      "MAGIC BAG",
      "STAKING",
      "MAGIC BAG",
      "STAKING",
      "MAGIC BAG",
      "STAKING",
      "MAGIC BAG",
      "STAKING",
      "MAGIC BAG",
    ],
    // Add more routes and corresponding texts as needed
  };

  const texts = textsMap[location.pathname] || ["DASHBOARD",
  "MAGIC BAG",
  "DASHBOARD",
  "MAGIC BAG",
  "DASHBOARD",
  "MAGIC BAG",
  "DASHBOARD",
  "MAGIC BAG",];

  if (isLoading) {
    return <SkeletonLoadingHeadline />;
  }

  return (
    <div className="w-[100%] mx-auto max-w-[1440px] py-2 px-8 flex items-center justify-center flex-col xl:px-10 ">
      <Marquee className="flex w-[90%] lg:h-[95px] px-0 border-2 border-white rounded-md items-center justify-center space-x-4">
        {texts.map((text, index) => (
          <div key={index} className="flex gap-3 items-center space-x-4">
            <div></div>
            <img src={dashhead} alt="/" width={69} height={64} />
            <h className="cursor-pointer mainSubHeading">{text}</h>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Headline;
