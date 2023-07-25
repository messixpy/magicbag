import React from "react";

import { NavLink } from "react-router-dom";
import twitter from "../../assets/icons/twitter.svg";
import teleg from "../../assets/icons/teleg.svg";
import discord from "../../assets/icons/discord.svg";
import circle from "../../assets/icons/circle.svg";
import { useStateContext } from "../../context";

const Slidebar = ({ children }) => {
  //   const { openMenu } = useStateContext();
  const {showNav}=useStateContext();

  const menuItem = [
    {
      path: "/dashboard",
      name: "DASHBOARD",
    },
    {
      path: "/claim",
      name: "CLAIM",
    },
    {
      path: "/incinerator",
      name: "INCINERATOR",
    },
    {
      path: "/treasury",
      name: "TREASURY",
    },
    {
      path: "/staking",
      name: "STAKING",
    },
  ];

  return (
    <div  className={`${showNav?"flex":"hidden"} lg:flex self-stretch h-full w-[100%] `}>
      <div className="flex flex-col gap-9 subHeadingText py-10 px-5  text-white w-[100%] justify-center border-white rounded-md border-2 ">
        
        {menuItem?.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link  "
            activeclassName="active"
          >
            <div className=" hover:text-yellow-500 link_text">
              <p className="">{item.name}</p>
            </div>
          </NavLink>
        ))}
        <main>{children}</main>
        <div className="flex w-[20%] gap-2 items-end justify-start">
          <img className=" cursor-pointer " src={twitter} alt="twitter" />
          <img className=" cursor-pointer " src={teleg} alt="teleg" />
          <img className=" cursor-pointer " src={discord} alt="discord" />
          <img className=" cursor-pointer " src={circle} alt="circle" />
        </div>
      </div>
    </div>
  );
};

export default Slidebar;
