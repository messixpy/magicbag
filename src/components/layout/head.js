import React, { useEffect, useState } from "react";
import head from "../../assets/images/head.png";
import Button from "../buttons/Button";
import FelixButton from "../buttons/FelixButton"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useStateContext } from "../../context";
import { Link } from "react-router-dom";
import { useSwitchNetwork, useNetwork } from "wagmi";
import { disconnect } from "@wagmi/core";
import { useAccount } from "wagmi";



const Head = () => {
  const account = useAccount();
  const [nav] = useState(false);
  const {showNav,setShowNav}=useStateContext();
  const [currentChain, setCurrentChain] = useState("");
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork({
      onSuccess(data) {
        console.log("chain changed", data);
      },
    });
  // Function to handle the sidebar toggle
  const handleNav = () => {
    setShowNav(!showNav);

  };
  const {
    address,
    errorNotify,
  } = useStateContext();
console.log('nave state is ',showNav)
const handleShowToast = () => {
errorNotify("Please connect Your Wallet")
};

useEffect(()=>{
if(!address){
  handleShowToast()
}
},[address])
useEffect(() => {
  if (currentChain != 1 && account.isConnected) {
    disconnect();
    errorNotify("Please Connect with Ethereum Network");
  }
}, [currentChain]);




  // getting chain id on run time

  useEffect(() => {
    setCurrentChain(chain?.id);
  }, [chains, chain]);
  return (
   
    <div className=" w-[100%] mx-auto max-w-[1440px] flex flex-col justify-center items-center ">
      <div className="w-[93%]  flex justify-between items-center ">
        <div className="w-[112px] mt-2">
          <Link to={'/'}><img src={head}  alt="heading img" /></Link>
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
