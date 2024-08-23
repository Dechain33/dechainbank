import { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { AlignJustify, X } from "lucide-react";
import Logo from "@/assets/Logo.png";
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
import UserDataContext from "@/context/userDataContext";
import usdtABI from "@/abis/usdttoken.json";
import dbTokenABI from "@/abis/dbtoken.json";
import { WeiToETH } from "@/utils/weiToETH";
import LanguageSelector from "@/components/language-selector.jsx";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const context = useContext(UserDataContext);
  const location = useLocation();
  const { open } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const { t } = useTranslation("navbar");

  const usdtContractAddr = import.meta.env.VITE_USDT_CONTRACT_ADDRESS;
  const dbTokenContractAddr = import.meta.env.VITE_DB_CONTRACT_ADDRESS;

  const handleWalletConnect = async () => {
    if (isConnected) {
      if (chainId == 137) {
        fetchContractData();
      } else {
        toast.error("Please select polygon chain", options);
      }
    } else {
      await open();
    }
  };

  const fetchContractData = async () => {
    if (isConnected) {
      if (chainId == 137) {
        const ethersProvider = new ethers.providers.Web3Provider(
          walletProvider
        );
        const signer = await ethersProvider.getSigner();

        const USDTContractIns = new ethers.Contract(
          usdtContractAddr,
          usdtABI,
          signer
        );
        const DBTokenContractIns = new ethers.Contract(
          dbTokenContractAddr,
          dbTokenABI,
          signer
        );

        const userData = await DBTokenContractIns.userInfo(address);

        const referralCount = Number(userData[3]);
        context.setTotalRef(referralCount);

        const refReward = Number(
          await DBTokenContractIns.referralRewards(address)
        );
        context.setTotalRefRewards(refReward);

        const tknPrice =
          Number(await DBTokenContractIns.tokenPrice()) / 1000000;

        context.setTokenPrice(tknPrice);

        const tknPriceSwap =
          Number(await DBTokenContractIns.tokenPriceForSwap()) / 1000000;

        context.setTokenPriceForSwap(tknPriceSwap);

        const poolRefCt = Number(
          await DBTokenContractIns.getPoolReferrals(address)
        );
        context.setPoolRefCount(poolRefCt);

        context.setRefBonus(calculateRefBonus(poolRefCt));

        const poolFee = Number(
          WeiToETH(await DBTokenContractIns.POOL_ENTRY_FEE())
        );

        context.setPoolEntryFee(poolFee);

        const minAmt = Number(
          WeiToETH(await DBTokenContractIns.MIN_PURCHASE())
        );

        const maxAmt = Number(
          WeiToETH(await DBTokenContractIns.MAX_PURCHASE())
        );

        context.setMinAmount(minAmt);
        context.setMaxAmount(maxAmt);

        const totaRefAmt = Number(
          WeiToETH(await DBTokenContractIns.totalRefForTokenPurchase())
        );
        context.setTotalAmountRefPurchase(totaRefAmt);

        const pool3WinnerArr = await DBTokenContractIns.getPool3Winners();
        const finalArr =
          pool3WinnerArr.length > 3 ? pool3WinnerArr.slice(-3) : pool3WinnerArr;
        context.setPool3Winners(finalArr);

        const pool1Data = await getPoolDetails(1, DBTokenContractIns);
        const pool2Data = await getPoolDetails(2, DBTokenContractIns);
        const pool3Data = await getPoolDetails(3, DBTokenContractIns);

        context.setPool1Details(pool1Data);
        context.setPool2Details(pool2Data);
        context.setPool3Details(pool3Data);

        context.setUsdtContractIns(USDTContractIns);
        context.setDbTokenContractIns(DBTokenContractIns);

        const poolDet = await getAllPoolsHistory(DBTokenContractIns);
        context.setPoolsHistory(poolDet);
      }
    }
  };

  const getPoolDetails = async (poolId, DBTokenContractIns) => {
    const pool = await DBTokenContractIns.pools(poolId);

    const poolBal = (WeiToETH(pool) * 45) / 100;

    const pool1UnitSize = Number(
      WeiToETH(await DBTokenContractIns[`POOL${poolId}_UNIT_SIZE`]())
    );
    const numReqFor1 = Number(
      await DBTokenContractIns[`numOfUnitRequiredForPool${poolId}`]()
    );

    const totalBalance =
      (pool1UnitSize * numReqFor1 * (poolId == 3 ? 95 : 45)) / 100;
    const range = Math.round((poolBal / totalBalance) * 100);
    const data = {
      balance: poolBal,
      total: totalBalance,
      range: range,
    };

    return data;
  };

  const getAllPoolsHistory = async (DBTokenContractIns) => {
    const arr = [];

    for (let index = 1; index <= 3; index++) {
      const poolParticipants = await DBTokenContractIns.getPoolParticipants(
        index
      );

      const results =
        index == 3
          ? [poolParticipants[0]]
          : [
              poolParticipants[0],
              poolParticipants[poolParticipants.length - 1],
            ];
      const formattedParticipants = results.map((participant, i) => ({
        id: arr.length + i + 1,
        text: trimWallet(participant),
        status: index == 3 && i == 0 ? "Congratulations" : "Enter",
        phase: `phase ${index}`,
      }));

      arr.push(...formattedParticipants);
    }

    console.log("Array", arr);
    return arr;
  };

  const calculateRefBonus = (refcount) => {
    if (refcount > 6) {
      const extraRef = refcount - 6;
      const amountToReturn = 6 * 550 + extraRef * 950;
      return amountToReturn;
    }

    return refcount * 550;
  };

  const linkClasses = (path) =>
    location.pathname === path
      ? "inline-flex items-center border-b-2 border-indigo-500 lg:px-0.5 xl:px-1 pt-1 text-sm font-medium text-gray-900"
      : "inline-flex items-center border-b-2 border-transparent lg:px-0.5 xl:px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700";

  const mobileLinkClasses = (path) =>
    location.pathname === path
      ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
      : "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700";

  useEffect(() => {
    fetchContractData();
  }, [isConnected]);

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

                <div className="hidden sm:ml-6 xl:flex sm:space-x-5">
                  <Link to="/" className={linkClasses("/")}>
                    {t("navItemHome")}
                  </Link>
                  <Link to="/register" className={linkClasses("/register")}>
                    {t("navItemRegister")}
                  </Link>
                  <Link
                    to="/purchase-db-token"
                    className={linkClasses("/purchase-db-token")}
                  >
                    {t("navItemPurchaseDBToken")}
                  </Link>
                  <Link to="/accounts" className={linkClasses("/accounts")}>
                    {t("navItemAccounts")}
                  </Link>
                  <Link to="/exchange" className={linkClasses("/exchange")}>
                    {t("navItemExchange")}
                  </Link>
                  <Link
                    to="/challenge-mission"
                    className={linkClasses("/challenge-mission")}
                  >
                    {t("navItemChallengeMission")}
                  </Link>
                  <a href={pdf} target="_blank" className={linkClasses("")}>
                    {t("navItemWhitePaper")}
                  </a>

                  <div className="h-16 flex justify-center items-center">
                    <button
                      type="button"
                      className="capitalize rounded bg-[#00A1FF] h-10 px-2 py-1 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      onClick={handleWalletConnect}
                    >
                      {isConnected
                        ? trimWallet(address)
                        : `${t("navItemConnectWallet")}`}
                    </button>
                  </div>

                  <LanguageSelector />
                </div>

                <div className="-mr-2 flex items-center xl:hidden">
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

            <DisclosurePanel className="xl:hidden">
              <div className="space-y-1 pb-3 pt-2">
                <DisclosureButton
                  as={Link}
                  to="/"
                  className={mobileLinkClasses("/")}
                >
                  {t("navItemHome")}
                </DisclosureButton>
                <DisclosureButton
                  as={Link}
                  to="/register"
                  className={mobileLinkClasses("/register")}
                >
                  {t("navItemRegister")}
                </DisclosureButton>
                <DisclosureButton
                  as={Link}
                  to="/purchase-db-token"
                  className={mobileLinkClasses("/purchase-db-token")}
                >
                  {t("navItemPurchaseDBToken")}
                </DisclosureButton>
                <DisclosureButton
                  as={Link}
                  to="/accounts"
                  className={mobileLinkClasses("/accounts")}
                >
                  {t("navItemAccounts")}
                </DisclosureButton>
                <DisclosureButton
                  as={Link}
                  to="/exchange"
                  className={mobileLinkClasses("/exchange")}
                >
                  {t("navItemExchange")}
                </DisclosureButton>
                <DisclosureButton
                  as={Link}
                  to="/challenge-mission"
                  className={mobileLinkClasses("/challenge-mission")}
                >
                  {t("navItemChallengeMission")}
                </DisclosureButton>

                <button
                  type="button"
                  className="ml-3 mr-4 capitalize rounded bg-[#00A1FF] h-10 px-2 py-1 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={handleWalletConnect}
                >
                  {isConnected
                    ? trimWallet(address)
                    : `${t("navItemConnectWallet")}`}
                </button>

                <div className="ml-3 mr-4 w-28">
                  <LanguageSelector />
                </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
