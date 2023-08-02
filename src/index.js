import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Head from "./components/layout/head";
import { StateContextProvider } from "./context";
import reportWebVitals from "./reportWebVitals";
import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme } from "@rainbow-me/rainbowkit";
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  bscTestnet,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';



const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora,bscTestnet],
  [
    alchemyProvider({ apiKey: 'y5GcR0NBerm6Zg38XyTQxyO9FMw_TY4I' }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'magicbag',
  projectId: 'f12c6b58850adba8695a7dd824637355',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})
const root = ReactDOM.createRoot(document.getElementById("root"));







root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig} >
      <RainbowKitProvider chains={chains} theme={darkTheme()}  >
        <StateContextProvider>
          <Head />

          <App />
        </StateContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
