import { useState, useContext } from "react";
import UserDataContext from "@/context/userDataContext";
import { toast } from "react-toastify";
import options from "@/utils/options";
import PoolProgressbar from "@/components/progress/pool-progressbar.jsx";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ethToWei } from "@/utils/weiToETH";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { trimWallet } from "@/utils/trimWalletAddr";

const complete = [
  {
    id: 1,
    text: "0x6B8...795A9",
    status: "completed",
    phase: "phase 2",
  },
  {
    id: 2,
    text: "0x6B8...882A9",
    status: "completed",
    phase: "phase 1",
  },
  {
    id: 3,
    text: "0x7C8...795A9",
    status: "completed",
    phase: "phase 3",
  },
  {
    id: 4,
    text: "0x4C9...723A9",
    status: "completed",
    phase: "phase 1",
  },
  {
    id: 5,
    text: "0x7D8...795A9",
    status: "completed",
    phase: "phase 1",
  },
];

const ChallengeMission = () => {
  const context = useContext(UserDataContext);
  const { address } = useWeb3ModalAccount();
  const [inputRef, setInputRef] = useState();

  const { t } = useTranslation("ChallengeMission");

  console.log("checking", context.pool3Winners);

  const handleChange = (e) => {
    setInputRef(e.target.value);
  };

  const handleParticipatePool = async () => {
    // const amount = ethToWei(context.poolEntryFee.toString());
    try {
      const tx = await context.dbTokenContractIns.participateInPool(
        inputRef,
        1
      );
      const id = toast.loading("Transaction pending...", options);
      const res = await tx.wait();
      if (res) {
        toast.update(id, {
          render: "Pool Joining Successful",
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

  return (
    <>
      <Helmet>
        <title> {t("TitleChallengeMission")} </title>
      </Helmet>
      <div
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))",
        }}
      >
        <div className="px-2 md:px-0 py-6 mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-center text-lg sm:text-3xl font-medium mt-6 mb-8 sm:mb-16">
            {t("heading")}
          </h2>

          <div className="shadow-lg shadow-gray-600 bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-4 rounded-3xl py-10 px-4">
            <h2 className="text-center text-xl sm:text-3xl font-bold mb-6 sm:mb-3">
              {t("title")}
            </h2>
            <div className="w-full lg:w-4/5 mx-auto">
              <div className="text-xl font-medium ml-2 mb-2">
                {t("subTitle")}
              </div>
              <ol className="space-y-1">
                {t("data").map((item) => (
                  <ListItem
                    key={item.id}
                    subitem={item?.subitem}
                    count={item.id}
                    text={item.text}
                  />
                ))}
              </ol>
            </div>

            <div className="w-full flex justify-center">
              <input
                type="text"
                name="text"
                id="text"
                className="w-full shadow-md  lg:w-4/5 block my-4 placeholder:text-center placeholder:font-bold sm:placeholder:text-lg text-center rounded-xl border-0 py-4 px-2 ring-0 focus-visible:ring-0 focus:ring-0 outline-0 sm:text-sm sm:leading-6"
                placeholder={t("inputPlaceholder")}
                onChange={handleChange}
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))",
                }}
              />
            </div>

            <div className="w-full flex flex-col justify-center items-center my-6">
              <button
                type="button"
                className="rounded-full border-[#FFD932] border-4 text-[#FFD932] bg-black  max-w-full w-full lg:w-52 px-3.5 py-2 sm:py-4 text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={handleParticipatePool}
              >
                {t("btnText")}
              </button>
            </div>
          </div>

          <div className=" my-10 shadow-lg shadow-gray-600 bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-4 rounded-3xl py-10 px-4">
            <h2 className="text-center text-xl sm:text-3xl font-bold mb-6 sm:mb-3">
              {t("GameWinnerText")}
            </h2>
            <div className="overflow-x-auto sm:flex flex-col justify-center items-center">
              <table className="w-full lg:w-7/12 ">
                <tbody className="">
                  {context.pool3Winners.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {trimWallet(item)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="my-10 shadow-lg shadow-gray-600 bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-4 py-10 px-4">
            <div className="flex flex-col text-center justify-center items-center ">
              <h2 className="text-center text-xl sm:text-3xl font-bold mb-6 sm:mb-3">
                {t("dividendPoolText")} :
              </h2>
              <div className="text-lg w-64">
                {t("ReferralsBonusText")} : {context.refBonus}
              </div>
              <div className="text-lg w-64">
                {t("ReferralsNumberText")} : {context.poolRefCount}
              </div>
            </div>
          </div>

          <div className="shadow-lg shadow-gray-600 bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-4 rounded-3xl py-10 px-4">
            <h2 className="text-center text-xl sm:text-3xl font-bold mb-6 sm:mb-3">
              {t("CommunityCompletedText")}
            </h2>
            <div className="overflow-x-auto sm:flex flex-col justify-center items-center">
              <table className="w-full lg:w-7/12 ">
                <tbody className="">
                  {context.poolsHistory.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {item.text}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.phase}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="my-10 shadow-lg shadow-gray-600 bg-white max-w-2xl lg:max-w-4xl flex justify-center border-[#00A2FF] border-4 rounded-3xl py-10 px-4">
            <div className="w-full lg:w-7/12">
              <PoolProgressbar
                title={t("Phase_1")}
                range={context.pool1Details.range}
                numberOne={context.pool1Details.balance}
                numberTwo={context.pool1Details.total}
              />
              <PoolProgressbar
                title={t("Phase_2")}
                range={context.pool2Details.range}
                numberOne={context.pool2Details.balance}
                numberTwo={context.pool2Details.total}
              />
              <PoolProgressbar
                title={t("Phase_3")}
                range={context.pool3Details.range}
                numberOne={context.pool3Details.balance}
                numberTwo={context.pool3Details.total}
              />
            </div>
          </div>

          {/* <div className="my-10 shadow-lg shadow-gray-600 bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-4 py-10 px-4">
          <div className="flex flex-col justify-center items-center ">
            <div className="text-lg w-64">Unclaim Dividend : 0</div>
            <div className="text-lg w-64">Claim Dividend : 0</div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center my-10">
          <button
            type="button"
            className="rounded-full border-[#FFD932] border-4 text-[#FFD932] bg-black  max-w-full w-full lg:w-52 px-3.5 py-2 sm:py-4 text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Claim
          </button>
        </div> */}
        </div>
      </div>
    </>
  );
};

const ListItem = ({ count, text, subitem }) => {
  return (
    <li className="text-body-color dark:text-dark-6 flex text-base">
      <span className="flex h-[26px] w-full max-w-[26px] items-center justify-center font-bold rounded text-base">
        {count}.
      </span>
      <span className="text-justify sm:text-left">
        {text}
        {subitem?.map((item) => (
          <div key={item.id} className="mt-1">
            {item.text}
          </div>
        ))}
      </span>
    </li>
  );
};

export default ChallengeMission;
