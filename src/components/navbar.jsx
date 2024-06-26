import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { AlignJustify, X } from "lucide-react";
import Logo from "@/assets/logo.jpg";
import pdf from "@/assets/whitepaper.pdf";
import { ethers } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3Modal,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { toast } from "react-toastify";
import options from "@/utils/options";
import { trimWallet } from "@/utils/trimWalletAddr";

const Navbar = () => {
  const location = useLocation();
  const { open } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const handleWalletConnect = async () => {
    if (isConnected) {
      if (chainId == 56) {
        const ethersProvider = new ethers.providers.Web3Provider(
          walletProvider
        );
        const signer = await ethersProvider.getSigner();
      } else {
        toast.error("Please select binance chain", options);
      }
    } else {
      await open();
    }
  };

  const linkClasses = (path) =>
    location.pathname === path
      ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
      : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700";

  const mobileLinkClasses = (path) =>
    location.pathname === path
      ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
      : "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700";

  // useEffect(() => {
  //   handleWalletConnect();
  // }, [isConnected]);

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
              <div className="flex h-16 justify-between ">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="h-8 w-auto"
                        src={Logo}
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                </div>

                <div className="hidden sm:ml-6 md:flex sm:space-x-5">
                  <Link to="/" className={linkClasses("/")}>
                    Home
                  </Link>
                  <Link to="/register" className={linkClasses("/register")}>
                    Register
                  </Link>
                  <Link
                    to="/purchase-db-token"
                    className={linkClasses("/purchase-db-token")}
                  >
                    Purchase DB Token
                  </Link>
                  <Link to="/accounts" className={linkClasses("/accounts")}>
                    Accounts
                  </Link>
                  <Link to="/exchange" className={linkClasses("/exchange")}>
                    Exchange
                  </Link>
                  <a
                    href={pdf}
                    target="_blank"
                    className={linkClasses("/exchange")}
                  >
                    Whitepaper
                  </a>

                  <div className="h-16 flex justify-center items-center">
                    <button
                      type="button"
                      className="capitalize rounded bg-[#00A1FF] h-10 px-2 py-1 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      onClick={handleWalletConnect}
                    >
                      {isConnected ? trimWallet(address) : "connect wallet"}
                    </button>
                  </div>
                </div>

                <div className="-mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <AlignJustify
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className="md:hidden">
              <div className="space-y-1 pb-3 pt-2">
                <DisclosureButton
                  as={Link}
                  to="/"
                  className={mobileLinkClasses("/")}
                >
                  Home
                </DisclosureButton>
                <DisclosureButton
                  as={Link}
                  to="/register"
                  className={mobileLinkClasses("/register")}
                >
                  Register
                </DisclosureButton>
                <DisclosureButton
                  as={Link}
                  to="/purchase-db-token"
                  className={mobileLinkClasses("/purchase-db-token")}
                >
                  Purchase DB Token
                </DisclosureButton>
                <DisclosureButton
                  as={Link}
                  to="/accounts"
                  className={mobileLinkClasses("/accounts")}
                >
                  Accounts
                </DisclosureButton>
                <DisclosureButton
                  as={Link}
                  to="/exchange"
                  className={mobileLinkClasses("/exchange")}
                >
                  Exchange
                </DisclosureButton>

                <button
                  type="button"
                  className="ml-3 mr-4 capitalize rounded bg-[#00A1FF] h-10 px-2 py-1 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={handleWalletConnect}
                >
                  {isConnected ? trimWallet(address) : "connect wallet"}
                </button>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
