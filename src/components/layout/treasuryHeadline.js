import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import dashhead from "../../assets/images/dashhead.gif";

const SkeletonLoadingTreasuryHeadline = () => {
  // Define the number of skeleton items to show
  const skeletonCount = 10;
  const skeletonItems = Array.from({ length: skeletonCount });

  return (
    <div className="w-[100%] mx-auto max-w-[1440px] py-2 px-8 flex items-center justify-center flex-col xl:px-10 ">
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

const TreasuryHeadline = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data here (you can replace this with actual data fetching)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the data is fetched (simulated here using setTimeout)
    }, 1000);
  }, []);

  const texts = ["TREASURY", "MAGIC BAG", "TREASURY", "MAGIC BAG", "TREASURY", "MAGIC BAG", "TREASURY", "MAGIC BAG", "TREASURY", "MAGIC BAG"];

  if (isLoading) {
    return <SkeletonLoadingTreasuryHeadline />;
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

export default TreasuryHeadline;
