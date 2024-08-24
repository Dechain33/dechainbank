import { useEffect, useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers5/react";
import usdtABI from "@/abis/usdttoken.json";
import dbTokenABI from "@/abis/dbtoken.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import options from "@/utils/options.jsx";
import { ethToWei, WeiToETH } from "@/utils/weiToETH";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";

const AdminDashboard = () => {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [withdrawAmt, setWithdrawAmt] = useState(0);
  const [withdrawAddress, setWithdrawAddress] = useState();
  const [newOwner, setNewOwner] = useState("");
  const [tranId, setTranId] = useState(0);
  const [dbCont, setDbCont] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [dbTokenBalance, setDbTokenBalance] = useState(0);
  const [totalUsdtDeposit, setTotalUsdtDeposit] = useState(0);
  const [circulationAmount, setCirculationAmount] = useState(0);
  const [exhangeAmount, setExhangeAmount] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [unconfirmedTrans, setUnconfirmedTrans] = useState([]);
  const [pool1Users, setPool1Users] = useState(0);

  const ownerWallet1 = import.meta.env.VITE_OWNER_WALLET1;
  const ownerWallet2 = import.meta.env.VITE_OWNER_WALLET2;

  const connectOwnerWallet = async () => {
    if (isConnected) {
      if (
        (isConnected && address.toLowerCase() == ownerWallet1.toLowerCase()) ||
        address.toLowerCase() == ownerWallet2.toLowerCase()
      ) {
        setIsOwner(true);
        fetchCotractData();
      } else {
        toast.error("Please connect owner wallet", options);
      }
    } else {
      await open();
    }
  };

  const usdtContractAddr = import.meta.env.VITE_USDT_CONTRACT_ADDRESS;
  const dbTokenContractAddr = import.meta.env.VITE_DB_CONTRACT_ADDRESS;

  const fetchCotractData = async () => {
    if (
      (isConnected && address.toLowerCase() == ownerWallet1.toLowerCase()) ||
      address.toLowerCase() == ownerWallet2.toLowerCase()
    ) {
      setIsOwner(true);
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
        setDbCont(DBTokenContractIns);

        const usdtBal =
          Number(await USDTContractIns.balanceOf(dbTokenContractAddr)) /
          1000000;
        setUsdtBalance(usdtBal);

        const dbBal = Number(WeiToETH(await DBTokenContractIns.totalSupply()));
        setDbTokenBalance(dbBal);
        setCirculationAmount(dbBal);

        const totalDepo =
          Number(await DBTokenContractIns.totalUsdtDeposit()) / 1000000;
        setTotalUsdtDeposit(totalDepo);

        const flashEx =
          Number(await DBTokenContractIns.totalUsdtFlashed()) / 1000000;
        setExhangeAmount(flashEx);

        const totalWithdraw =
          Number(await DBTokenContractIns.totalUsdtWithdraw()) / 1000000;
        setTotalWithdraw(totalWithdraw);

        const totalPool1Users = await DBTokenContractIns.getPoolParticipants(1);

        setPool1Users(totalPool1Users.length);

        const tranIds = await DBTokenContractIns.getUnconfirmedTransactions();
        setUnconfirmedTrans(tranIds);
        console.log("tran ids", tranIds);
      }
    }
  };

  const handleWithdrawAddress = (e) => {
    const val = e.target.value;
    setWithdrawAddress(val);
  };
  const handleWithdrawAmt = (e) => {
    const val = e.target.value;
    setWithdrawAmt(val);
  };

  const handlenewOwnerChange = (e) => {
    const val = e.target.value;
    setNewOwner(val);
  };

  const handleTransactionChange = (e) => {
    const val = e.target.value;
    setTranId(val);
  };

  const transferOwnership = async () => {
    if (isOwner) {
      try {
        const tx = await dbCont.transferOwnership(newOwner);
        const id = toast.loading("Transaction pending...", options);
        const res = await tx.wait();
        if (res) {
          toast.update(id, {
            render: "Transaction submitted successfully",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          toast.error("Error", options);
        }
      } catch (error) {
        console.log(error);
        const parsedEthersError = getParsedEthersError(error);
        if (parsedEthersError.context == -32603) {
          toast.error("Insufficient Balance", options);
        } else if (parsedEthersError.context == undefined) {
          console.log(error);
        } else {
          toast.error(`${parsedEthersError.context}`, options);
        }
      }
    } else {
      toast.error("Please connect owner wallet", options);
    }
  };

  const handleConfirmTransaction = async () => {
    try {
      const tx = await dbCont.confirmTransaction(tranId);
      const id = toast.loading("Transaction pending...", options);
      const res = await tx.wait();
      if (res) {
        toast.update(id, {
          render: "Transaction Successful",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        toast.error("Error", options);
      }
    } catch (error) {
      console.log(error);
      const parsedEthersError = getParsedEthersError(error);
      if (parsedEthersError.context == -32603) {
        toast.error("Insufficient Balance", options);
      } else if (parsedEthersError.context == undefined) {
        console.log(error);
      } else {
        toast.error(`${parsedEthersError.context}`, options);
      }
    }
  };

  const withdrawFund = async () => {
    const amount = ethToWei(withdrawAmt);
    if (isOwner) {
      try {
        const tx = await dbCont.withdrawUSDT(withdrawAddress, amount);
        const id = toast.loading("Transaction pending...", options);
        const res = await tx.wait();
        if (res) {
          toast.update(id, {
            render: "Withdraw Successful",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          toast.error("Error", options);
        }
      } catch (error) {
        console.log(error);
        const parsedEthersError = getParsedEthersError(error);
        if (parsedEthersError.context == -32603) {
          toast.error("Insufficient Balance", options);
        } else if (parsedEthersError.context == undefined) {
          console.log(error);
        } else {
          toast.error(`${parsedEthersError.context}`, options);
        }
      }
    } else {
      toast.error("Please connect owner wallet", options);
    }
  };

  useEffect(() => {
    fetchCotractData();
  }, [isConnected]);

  return (
    <div className=" flex h-screen bg-[#121936] overflow-auto flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mt-20 pt-20 sm:mx-auto sm:w-full sm:max-w-screen-sm ">
        <div className="mt-20 bg-white px-6 py-12 border border-gray-600 sm:rounded-lg sm:px-12">
          <div className="text-center">
            <button
              className="inline-flex w-full items-center justify-center rounded-lg bg-green-400 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:w-auto"
              onClick={connectOwnerWallet}
            >
              {isConnected && isOwner
                ? "Admin Connected"
                : "Connect Admin Wallet"}
            </button>
          </div>

          <div className="mt-5 sm:flex sm:justify-center sm:items-center gap-2 bg-rose-600 rounded-lg px-3 py-2">
            <div>
              <h3 className="text-center text-white text-xl sm:text-2xl font-bold">
                USDT Contract balance:{" "}
              </h3>
            </div>

            <div>
              <h3 className="text-center text-xl font-bold">
                {usdtBalance} USDT
              </h3>
            </div>
          </div>
          <div className="mt-5 sm:flex sm:justify-center sm:items-center gap-2 bg-pink-600 rounded-lg px-3 py-2">
            <div>
              <h3 className="text-center text-white text-xl sm:text-2xl font-bold">
                Total Deposit:{" "}
              </h3>
            </div>

            <div>
              <h3 className="text-center text-xl font-bold">
                {totalUsdtDeposit} USDT
              </h3>
            </div>
          </div>
          <div className="mt-5 sm:flex sm:justify-center sm:items-center gap-2 bg-orange-600 rounded-lg px-3 py-2">
            <div>
              <h3 className="text-center text-white text-xl sm:text-2xl font-bold">
                DB Circulation amount:{" "}
              </h3>
            </div>

            <div>
              <h3 className="text-center text-xl font-bold">
                {circulationAmount} DB
              </h3>
            </div>
          </div>
          <div className="mt-5 sm:flex sm:justify-center sm:items-center gap-2 bg-green-600 rounded-lg px-3 py-2">
            <div>
              <h3 className="text-center text-white text-xl sm:text-2xl font-bold">
                DB flash exchange amount:{" "}
              </h3>
            </div>

            <div>
              <h3 className="text-center text-xl font-bold">
                {exhangeAmount} USDT
              </h3>
            </div>
          </div>
          <div className="mt-5 sm:flex sm:justify-center sm:items-center gap-2 bg-violet-600 rounded-lg px-3 py-2">
            <div>
              <h3 className="text-center text-white text-xl sm:text-2xl font-bold">
                USDT withdrawal amount:{" "}
              </h3>
            </div>

            <div>
              <h3 className="text-center text-xl font-bold">
                {totalWithdraw} USDT
              </h3>
            </div>
          </div>

          <div className="mt-5 sm:flex sm:justify-center sm:items-center gap-2 bg-teal-600 rounded-lg px-3 py-2">
            <div>
              <h3 className="text-center text-white text-xl sm:text-2xl font-bold">
                Pool 1 Participants:{" "}
              </h3>
            </div>

            <div>
              <h3 className="text-center text-xl font-bold">{pool1Users}</h3>
            </div>
          </div>
          <div className="mt-5 sm:flex sm:justify-center sm:items-center gap-2 bg-lime-600 rounded-lg px-3 py-2">
            <div>
              <h3 className="text-center text-white text-xl sm:text-2xl font-bold">
                Pending Transaction Ids:{" "}
              </h3>
            </div>

            <div>
              <h3 className="text-center text-xl font-bold">
                {unconfirmedTrans.map((item, index) => {
                  return (
                    <span key={index}>
                      {Number(item)}
                      {index < numbers.length - 1 && ", "}
                    </span>
                  );
                })}
              </h3>
            </div>
          </div>
          <div className="mt-5 sm:flex sm:justify-start sm:items-center gap-2">
            <div className="w-full sm:w-[395px]">
              <label htmlFor="amount" className="sr-only">
                amount
              </label>
              <input
                type="text"
                name="amount"
                id="amount"
                className="block w-full rounded-lg border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Wallet Address"
                onChange={handlenewOwnerChange}
              />
            </div>
            <button
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 sm:ml-3 sm:mt-0 sm:w-32"
              onClick={transferOwnership}
            >
              Transfer Ownership
            </button>
          </div>

          <div className="mt-5 sm:flex sm:justify-start sm:items-center gap-2">
            <div className="w-full sm:w-[395px]">
              <label htmlFor="amount" className="sr-only">
                amount
              </label>
              <input
                type="text"
                name="amount"
                id="amount"
                className="block w-full rounded-lg border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Pending Transaction Id"
                onChange={handleTransactionChange}
              />
            </div>
            <button
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 sm:ml-3 sm:mt-0 sm:w-32"
              onClick={handleConfirmTransaction}
            >
              Confirm Transaction
            </button>
          </div>

          {/* <div className="mt-5 sm:flex sm:justify-center sm:items-center gap-2">
            <div className="w-full sm:w-[395px]">
              <label htmlFor="amount" className="sr-only">
                amount
              </label>
              <input
                type="text"
                name="amount"
                id="amount"
                className="block w-full rounded-lg border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Wallet Address"
                onChange={handleWithdrawWallet}
              />
            </div>
            <button
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:ml-3 sm:mt-0 sm:w-32"
              onClick={withdrawWallet}
            >
              Update Withdraw Wallet
            </button>
          </div> */}
          <div className="mt-7 sm:flex sm:justify-center sm:items-center gap-2">
            <div className="w-full sm:w-[395px]">
              <label htmlFor="amount" className="sr-only">
                amount
              </label>
              <input
                type="text"
                name="amount"
                id="amount"
                className="block w-full rounded-lg border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Withdraw Address"
                onChange={handleWithdrawAddress}
              />
              <input
                type="text"
                name="amount"
                id="amount"
                className="mt-2 block w-full rounded-lg border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Withdraw Amount"
                onChange={handleWithdrawAmt}
              />
            </div>
            <button
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:ml-3 sm:mt-0 sm:w-32"
              onClick={withdrawFund}
            >
              Withdraw USDT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
