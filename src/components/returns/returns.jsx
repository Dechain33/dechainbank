import { useState, useContext } from "react";
import UserDataContext from "@/context/userDataContext";
import { toast } from "react-toastify";
import options from "@/utils/options";
import { ethToWei, WeiToETH } from "@/utils/weiToETH";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";
import { useTranslation } from "react-i18next";
const Returns = () => {
  const [purchaseStatus, setPurchaseStatus] = useState(false);
  const context = useContext(UserDataContext);
  const { address } = useWeb3ModalAccount();
  const [usdtAmt, setUsdtAmt] = useState(0);
  const [tokenAmt, setTokenAmt] = useState(0);

  const { t } = useTranslation("PurchaseDBToken");

  const { textOne, textTwo, textThree } = t("purchaseStatus");

  const handleChange = (e) => {
    setUsdtAmt(e.target.value);
    setTokenAmt(e.target.value / context.tokenPrice);
  };

  const handleBuyToken = async () => {
    if (usdtAmt >= context.minAmount && usdtAmt <= context.maxAmount) {
      const amount = usdtAmt * 1000000;
      try {
        const allowedAmt = await context.usdtContractIns.allowance(
          address,
          context.dbTokenContractIns.address
        );

        if (amount <= allowedAmt) {
          const tx = await context.dbTokenContractIns.buyTokens(amount);
          const id = toast.loading("Transaction pending...", options);
          const res = await tx.wait();
          if (res) {
            toast.update(id, {
              render: "Purchase Successful",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
            setPurchaseStatus(true);
          } else {
            toast.error("Error", options);
          }
        } else {
          const tx = await context.usdtContractIns.approve(
            context.dbTokenContractIns.address,
            amount
          );
          const id = toast.loading("Transaction pending...", options);
          const res = await tx.wait();
          if (res) {
            toast.update(id, {
              render: "Approved",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });

            const tx1 = await context.dbTokenContractIns.buyTokens(amount);
            const id1 = toast.loading("Transaction pending...", options);
            const res1 = await tx1.wait();
            if (res1) {
              toast.update(id1, {
                render: "Purchase Successful",
                type: "success",
                isLoading: false,
                autoClose: 5000,
              });
              setPurchaseStatus(true);
            } else {
              toast.error("Error", options);
            }
          } else {
            toast.error("Error", options);
          }
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
      toast.error("Min or max amount error", options);
    }
  };
  return (
    <div
      className="px-2 md:px-0  py-16 flex flex-col items-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <h1 className="text-xl sm:text-3xl text-center font-bold mb-5">
        {t("heading")}
      </h1>
      <div className="px-2 md:px-0 py-6 mx-auto max-w-2xl lg:max-w-4xl">
        {purchaseStatus ? (
          <div className="shadow-xl shadow-gray-600 bg-white w-full lg:min-w-[56rem] border-[#00A2FF] border-2 rounded-3xl py-9 px-8">
            <h2 className="text-center text-xl sm:text-3xl font-bold">
              {textOne},
              <br />
              {textTwo}
              <br />
              {textThree}
            </h2>
          </div>
        ) : (
          <div className="shadow-xl shadow-gray-600 bg-white border-[#00A2FF] border-2 rounded-3xl py-10 px-4">
            <h2 className="text-center text-xl sm:text-3xl font-bold mb-6 sm:mb-3">
              {t("title")}
            </h2>
            <div className="w-full lg:w-4/5 mx-auto">
              <div className="text-xl font-medium ml-2 mb-2">
                {t("subTitle")}
              </div>
              <ol className="space-y-1">
                {t("data").map((item) => (
                  <ListItem key={item.id} count={item.id} text={item.text} />
                ))}
              </ol>
            </div>
            <div className="lg:w-full lg:flex lg:flex-col lg:items-center mt-5">
              <div className="w-full lg:w-4/5 px-5 flex justify-between items-center">
                <div className="sm:text-lg font-medium">{usdtAmt} USDT</div>
                <div className="sm:text-lg font-medium">{tokenAmt} DB</div>
              </div>

              <input
                type="text"
                name="number"
                id="number"
                className="w-full lg:w-4/5 block my-4 placeholder:text-center placeholder:font-bold sm:placeholder:text-lg text-center rounded-xl border-0 py-2.5 sm:py-4 px-2 shadow-lg ring-0 focus-visible:ring-0 focus:ring-0 outline-0 sm:text-sm sm:leading-6"
                placeholder={t("inputPlaceholder")}
                onChange={handleChange}
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))",
                }}
              />

              <button
                type="button"
                className="rounded-md bg-[#00A1FF] max-w-full w-full lg:w-4/5 px-3.5 py-2 sm:py-4 sm:text-lg font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={handleBuyToken}
              >
                {t("btnText")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ListItem = ({ count, text }) => {
  return (
    <li className="text-body-color dark:text-dark-6 flex text-base">
      <span className="flex h-[26px] w-full max-w-[26px] items-center justify-center font-bold rounded text-base">
        {count}.
      </span>
      <span className="text-justify sm:text-left">{text}</span>
    </li>
  );
};

export default Returns;
