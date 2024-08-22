import "./App.css";
import { ethers } from "ethers";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { RouterProvider } from "react-router-dom";
import { UserDataProvider } from "./context/userDataContext";
import routes from "./routing/routes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1. Get projectId at https:/ / cloud.walletconnect.com;
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

// 2. Set chains
const mainnet = {
  chainId: 137,
  name: "Polygon Mainnet",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com",
  rpcUrl: "https://polygon-rpc.com",
};

// 3. Create modal
const metadata = {
  name: "DeBank Chain",
  description: "DeBank Chain",
  url: "https://dechain.netlify.app",
  icons: ["https://dechain.netlify.app"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
});

function App() {
  return (
    <>
      <UserDataProvider>
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
      </UserDataProvider>
    </>
  );
}

export default App;
