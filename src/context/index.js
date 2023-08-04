import { useContext, createContext, useState, useEffect } from "react";
import Web3 from "web3";
import { useAccount, useContractWrite } from "wagmi";
import { ethers } from "ethers";
import contractABI from "./contractABI";
import reflectionABI from "./reflectionABI";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useWalletClient } from "wagmi";

import { usePrepareContractWrite } from "wagmi";
// Creating a new context
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const web3 = new Web3(walletClient);
  const [chainId, setChainId] = useState(null);

  const [showNav, setShowNav] = useState(false);

  const [decimals, setDecimals] = useState();

  const [felixDollarRate, setFelixDollarRate] = useState(null);
  const [felixMarketCap, setFelixMarketCap] = useState(null);

  const [ethDollarRate, setEthDollarRate] = useState(null);

  const notify = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  const errorNotify = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  // contract address
  // this address will be used for main net
  // const contractAddress = '0x418AfEe14a1FD9c05c4df05e033f7C3d46aEb905';

  //address for testing
  // const contractAddress = '0x8029d6984f700220472fc26269165764809d01a4';

  const contractAddress = "0x8029D6984f700220472FC26269165764809D01a4";

  // this is for testing, make sure to replace it before deploying

  // const contractAddress = '0x8F5A439ABac3F482049F6550949c8b4f848940fB';


  const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

  console.log("contract instance is", contractInstance);
  const { address } = useAccount();

  console.log("address is ", address);

  const getDecimals = async () => {
    try {
      const result = await contractInstance.methods.decimals().call();
      console.log("decimals from contract", result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDecimalCount = async () => {
      const decimalCount = await getDecimals();
      console.log("decimal count", decimalCount);
      setDecimals(decimalCount);
    };

    getDecimalCount();
  }, [getDecimals]);

  console.log("decimals are", decimals);
  useEffect(() => {
    async function fetchFelixDollarRate() {
      try {
        const response = await fetch(
          "https://api.geckoterminal.com/api/v2/networks/eth/pools/0xeee0f7ecc5e0b9f8c847c52aac7323cf9f04a421"
        );
        const data = await response.json();
        console.log("new api data", data);
        console.log("attributes", data?.data?.attributes?.fdv_usd);
        setFelixDollarRate(data?.data?.attributes?.base_token_price_usd);
        setFelixMarketCap(data?.data?.attributes?.fdv_usd);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchEthDollarRate() {
      try {
        const response = await fetch(
          "https://fetchtoken.app/alert/get_price_Felix_eth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              symbol: "ETH",
            }),
          }
        );
        const data = await response.json();
        console.log("eth rate", ethDollarRate);
        setEthDollarRate(data[0]?.price);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFelixDollarRate();
    fetchEthDollarRate();
  }, []);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "claimReflection",
  });

  const { write } = useContractWrite(config);
  const getBuyTax = async () => {
    try {
      const result = await contractInstance.methods.buyTax().call();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getSaleTax = async () => {
    try {
      const result = await contractInstance.methods.sellTax().call();

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getTaxDivisionPercent = async () => {
    try {
      const result = await contractInstance.methods
        .taxDivisionPercentage()
        .call();

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getReflection = async () => {
    try {
      const result = await contractInstance.methods.ethReflectionBasis().call();

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getBurned = async () => {
    try {
      const result = await contractInstance.methods.totalBurned().call();
      notify();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getLpReward = async () => {
    try {
      const result = await contractInstance.methods.totalLpAdded().call();

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // dashboard

  const getCirculatingSupply = async () => {
    try {
      const result = await contractInstance.methods.totalSupply().call();
      console.log("result circ supply", result);

      return result;
    } catch (error) {
      console.log(error);
      console.log("error circ supply", error);
    }
  };

  const getFelixBalance = async (wallet) => {
    try {
      const result = await contractInstance.methods.balanceOf(wallet).call();

      return Number(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalClaimedReflection = async (walletAddress) => {
    try {
      const result = await contractInstance.methods
        .totalClaimedReflection(walletAddress)
        .call();

      console.log("------------", result);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalUnClaimedReflection = async (wallet) => {
    try {
      const result = await contractInstance.methods
        .unclaimedReflection(wallet)
        .call();

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const publishClaim = async () => {
    try {
      const result = await contractInstance.methods
        .claimReflection()
        .send({ from: address });

      notify('Claimed Successfully');

      return result;
    } catch (err) {
      errorNotify('Something went wrong');
      console.log(err);
    }
  };

  const publishBurn = async (val) => {
    try {
      const result = await contractInstance.methods
        .burn(val)
        .send({ from: address });
      console.log("burn result", result);
      notify('Burned Successfully');

      return result;
    } catch (err) {
      errorNotify('Something went wrong');
      console.log(err);
    }
  };

  useEffect(() => {
    async function getChainId() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const network = await provider.getNetwork();

        setChainId(network?.chainId);
      }
    }
    getChainId();
  }, []);

  async function getChainIdLatest() {
    if (window.ethereum) {
      window.location.reload();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const network = await provider.getNetwork();

      setChainId(network?.chainId);
    }
  }

  async function validateUnclaimed(address) {
    try {
      const result = await contractInstance.methods
        .unclaimedReflection(address)
        .call();

        notify("Validated Successfully")
      console.log("address of wallet is ", address);

      return result;
    } catch (error) {
      console.log(error);
      errorNotify('Something went wrong')
    }
  }

  const getOwnerAddress = async () => {
    try {
      const result = await contractInstance.methods.owner().call();

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getSwapableReflection = async () => {
    try {
      const result = await contractInstance.methods.swapableRefection().call();

      return result;
    } catch (err) {
      errorNotify();
      console.log(err);
    }
  };

  const recoverToken = async (tokenAddress, swap) => {
    try {
      const result = await contractInstance.methods
        .recoverErc20token(tokenAddress, swap)
        .send({ from: address });

      notify();

      return result;
    } catch (err) {
      errorNotify();
      console.log(err);
    }
  };

  const postEthReflection = async (array, input) => {
    try {
      const result = await contractInstance.methods
        .addReflectionWithETH(array)
        .send({ from: address, value: input });

      notify();
      return result;
    } catch (err) {
      errorNotify();
      console.log(err);
    }
  };
  const postFelixReflection = async (val, array) => {
    try {
      const result = await contractInstance.methods
        .addReflectionWithFelix(val, array)
        .send({ from: address });

      notify();

      return result;
    } catch (err) {
      errorNotify();
      console.log(err);
    }
  };

  const transferFelixToken = async (value) => {
    try {
      const walletAddress = "0x3BFAEC28c254B25Bd0d7b4e78123f990d012A86B";

      const result = await contractInstance.methods
        .transfer(walletAddress, value)
        .send({ from: address });

      notify();

      return result;
    } catch (err) {
      errorNotify();
      console.log(err);
    }
  };
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", getChainIdLatest);
    }
  }, []);

  console.log("felix market cap", felixMarketCap);
  return (
    <StateContext.Provider
      value={{
        showNav,
        setShowNav,
        decimals,
        felixDollarRate,
        felixMarketCap,
        getCirculatingSupply,
        getBurned,
        getLpReward,
        getReflection,
        ethDollarRate,
        getTotalUnClaimedReflection,
        getFelixBalance,
        getTotalClaimedReflection,
        publishClaim,
        address,
        validateUnclaimed,
        publishBurn,
        errorNotify,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
