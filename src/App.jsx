import "./App.css";
import { ethers } from "ethers";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { RouterProvider } from "react-router-dom";
import routes from "./routing/routes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1. Get projectId at https:/ / cloud.walletconnect.com;
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

// 2. Set chains
const mainnet = {
  chainId: 56,
  name: "Bsc Mainnet",
  currency: "BNB",
  explorerUrl: "https://bscscan.com",
  rpcUrl: "https://bsc-dataseed1.binance.org/",
};

// 3. Create modal
const metadata = {
  name: "HellDiver",
  description: "HellDiver",
  url: "https://helldiver.vip",
  icons: ["https://helldiver.vip"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
});

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
