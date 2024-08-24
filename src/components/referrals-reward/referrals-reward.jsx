import React, {useState, useContext} from "react";
import {useWeb3ModalAccount} from "@web3modal/ethers5/react";
import UserDataContext from "@/context/userDataContext";
import {toast} from "react-toastify";
import options from "@/utils/options";
import {useTranslation} from "react-i18next";

const ReferralsReward = () => {
    const context = useContext(UserDataContext);
    const [copied, setCopied] = useState(false);
    const {address} = useWeb3ModalAccount();

    const {t} = useTranslation("accounts");

    const {textOne, textTwo, textThree} = t("boxText");

    const copyToClipboard = (text) => {
        setCopied(true);
        navigator.clipboard.writeText(text).then(
            () => {
                toast.success("Copied!", options);
            },
            (err) => {
                console.error(err);
            }
        );
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const url = `${import.meta.env.VITE_DOMAIN}/${address}`;

    return (
        <div
            style={{
                backgroundImage:
                    "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))",
            }}
        >
            <div className="px-2 md:px-0 py-10 mx-auto max-w-2xl lg:max-w-4xl">
                <div
                    className="shadow-xl shadow-gray-600 flex flex-col items-center bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-2 rounded-3xl py-10 px-4">
                    <h2 className="text-center text-2xl sm:text-3xl font-medium mt-6 mb-8 sm:mb-16">
                        {t("heading")}
                    </h2>

                    <div className="w-full lg:w-4/5 mx-auto">
                        <div className="text-xl font-medium ml-2 mb-2">{t("title")}</div>
                        <ol className="space-y-1">
                            {t("data")?.map((item) => (
                                <ListItem key={item.id} count={item.id} text={item.text}/>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="flex items-center my-8 pt-5 flex-wrap gap-3 sm:gap-0">
                    <div className="w-full sm:w-9/12">
                        <div className="border-2 border-black text-lg font-medium px-4 py-2 sm:w-10/12 break-words">
                            <p className="underline text-wrap">{url}</p>
                        </div>
                    </div>

                    {copied ? (
                        <button
                            type="button"
                            className="rounded-md bg-[#00A1FF] w-full sm:w-3/12 px-3.5 py-2 text-xl font-semibold text-white shadow-md shadow-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            {t("btnText2")}
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="rounded-md bg-[#00A1FF] w-full sm:w-3/12 px-3.5 py-2 text-xl font-semibold text-white shadow-md shadow-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            onClick={() => copyToClipboard(url)}
                        >
                            {t("btnText")}
                        </button>
                    )}
                </div>

                <div
                    className="w-full flex justify-center sm:justify-between items-center flex-wrap gap-2 sm:gap-4 my-8 sm:my-20">
                    <section className="flex items-center justify-center flex-col gap-2 ">
                        <div className="font-semibold text-xs lg:text-xl text-center">
                            {textOne}
                            {/*Community <br className="flex sm:hidden"/> Group*/}
                        </div>
                        <div className="relative">
                            <div
                                className="shadow-2xl shadow-gray-600 w-20 h-20 sm:w-32 sm:h-32 text-[#00A2FF] lg:w-40 lg:h-40 rounded-lg flex items-center justify-center sm:text-2xl md:text-3xl lg:text-4xl border-[#00A2FF] border-2"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))",
                                }}
                            >
                                {context.totalAmountRefPurchase}
                            </div>
                        </div>
                    </section>
                    <section className="flex items-center justify-center flex-col gap-2">
                        <div className="font-semibold text-xs lg:text-xl text-center">
                            {textTwo}
                            {/*Referrals <br className="flex sm:hidden"/> Reward*/}
                        </div>
                        <div className="relative">
                            <div
                                className="shadow-2xl shadow-gray-600 w-20 h-20 sm:w-32 sm:h-32 text-[#00A2FF] lg:w-40 lg:h-40 rounded-lg flex items-center justify-center sm:text-2xl md:text-3xl lg:text-4xl border-[#00A2FF] border-2"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))",
                                }}
                            >
                                {context.totalRefRewards}
                            </div>
                        </div>
                    </section>
                    <section className="flex items-center justify-center flex-col gap-2">
                        <div className="font-semibold text-xs lg:text-xl text-center">
                            {textThree}
                            {/*Direct <br className="flex sm:hidden"/> Referrals*/}
                        </div>
                        <div className="relative">
                            <div
                                className="shadow-2xl shadow-gray-600 w-20 h-20 sm:w-32 sm:h-32 text-[#00A2FF] lg:w-40 lg:h-40 rounded-lg flex items-center justify-center sm:text-2xl md:text-3xl lg:text-4xl border-[#00A2FF] border-2"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))",
                                }}
                            >
                                {context.totalRef}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const ListItem = ({count, text}) => {
    return (
        <li className="text-body-color dark:text-dark-6 flex text-base">
      <span className="flex h-[26px] w-full max-w-[26px] items-center justify-center font-bold rounded text-base">
        {count}.
      </span>
            <span className="text-justify sm:text-left">{text}</span>
        </li>
    );
};

export default ReferralsReward;
