import React, { useState } from "react";
import head from "../../assets/images/head.png";
import Button from "../buttons/Button";
import FelixButton from "../buttons/FelixButton"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useStateContext } from "../../context";

const Head = () => {
  const [nav] = useState(false);
  const {showNav,setShowNav}=useStateContext();

  // Function to handle the sidebar toggle
  const handleNav = () => {
    setShowNav(!showNav);

  };
console.log('nave state is ',showNav)
  // // Function to update the `nav` state based on screen size
  // const updateNavOnResize = () => {
  //   if (window.innerWidth <= 768) {
  //     setNav(false); // Set nav to false for small screens
  //   } else {
  //     setNav(true); // Set nav to true for larger screens
  //   }
  // };

  // // Listen for window resize events and update the `nav` state accordingly
  // useEffect(() => {
  //   updateNavOnResize(); // Call the function initially to set the initial state based on screen size

  //   // Add event listener for resize events
  //   window.addEventListener("resize", updateNavOnResize);

  //   // Clean up the event listener when the component is unmounted
  //   return () => {
  //     window.removeEventListener("resize", updateNavOnResize);
  //   };
  // }, []);

  return (
    <div className=" w-[100%] mx-auto max-w-[1440px] flex flex-col justify-center items-center ">
      <div className="w-[93%]  flex justify-between items-center ">
        <div className="w-[112px] mt-2">
          <img src={head} alt="heading img" />
        </div>
        <div className=" flex items-center mt-3 gap-3">
          <FelixButton className="w-[80px] md:w-[40%]" label={"BUY FELIX"} />
          <Button label={"CONNECT"} />

          <div onClick={handleNav} className="block lg:hidden text-white">
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[100%] items-center mt-2">
        <span className="w-[94%]  h-[3px] bg-white"></span>
      </div>
    </div>
  );
};

export default Head;