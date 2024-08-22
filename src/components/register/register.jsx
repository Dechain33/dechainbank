import {useState, useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import UserDataContext from "@/context/userDataContext";
import {getParsedEthersError} from "@enzoferey/ethers-error-parser";
import {toast} from "react-toastify";
import options from "@/utils/options";
import {Trans, useTranslation} from "react-i18next";

const Register = () => {
    const [registrationStatus, setRegistrationStatus] = useState(false);
    const params = useParams();
    const context = useContext(UserDataContext);
    const [refVal, setRefVal] = useState();

    const {t} = useTranslation('register');
    // const {line1, line2} = t("description", {channel: "RoadsideCoder"});
    const {line1, line2, line3} = t("description",);
    const {lineOne, lineTwo, lineThree} = t("registrationStatus",);
    const {pending, successful, Insufficient, Error} = t("toastMessage",);


    useEffect(() => {
        if (params.address !== undefined) {
            context.setRefAddr(params.address);
            setRefVal(params.address);
        }
    }, [params.address, context]);

    const handleChange = (e) => {
        setRefVal(e.target.value);
        context.setRefAddr(e.target.value);
    };

    const handleRegister = async () => {
        try {
            const tx = await context.dbTokenContractIns.register(refVal);
            const id = toast.loading(`${pending}`, options);
            const res = await tx.wait();
            if (res) {
                toast.update(id, {
                    render: `${successful}`,
                    type: "success",
                    isLoading: false,
                    autoClose: 5000,
                });
                setRegistrationStatus(true);
            } else {
                toast.error(`${Error}`, options);
            }
        } catch (error) {
            console.log(error);
            const parsedEthersError = getParsedEthersError(error);
            if (parsedEthersError.context == -32603) {
                toast.error(`${Insufficient}`, options);
            } else if (parsedEthersError.context == undefined) {
                console.log(error);
            } else {
                toast.error(`${parsedEthersError.context}`, options);
            }
        }
    };
    return (
        <div
            style={{
                backgroundImage:
                    "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))",
                minHeight: "calc(100vh - 64px)",
            }}
        >
            <div className="px-2 md:px-0 py-6 mx-auto max-w-2xl lg:max-w-4xl">
                <h2 className="text-center text-lg sm:text-3xl font-medium mt-6 mb-8 sm:mb-16">
                    {t("title")}
                </h2>
                {registrationStatus ? (
                    <div
                        className="mb-10 flex flex-col items-center shadow-xl shadow-gray-600 bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-2 rounded-3xl py-10 px-4">
                        <h2 className="text-center text-3xl font-semibold">
                            {lineOne}
                            <br/>
                            {lineTwo}
                            <br/>
                            {lineThree}
                        </h2>
                    </div>
                ) : (
                    <div
                        className="mb-10 flex flex-col items-center shadow-xl shadow-gray-600 bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-2 rounded-3xl py-10 px-4">
                        <h2 className="text-center text-2xl font-semibold mb-5 sm:mb-10">
                            {t("greeting")}
                        </h2>

                        <div className="text-center text-xl sm:text-lg font-medium mt-6 mb-6 break-words w-full">
                            <p className="text-wrap break-words">
                                <span className="font-extrabold text-xl">
                                  {" "}
                                    {line1}
                                </span>
                                <br/>
                                {line2}
                                <br/>
                                <span className="font-extrabold">
                                  {line3}
                                </span>
                            </p>
                        </div>

                        <input
                            type="text"
                            name="number"
                            id="number"
                            className="w-full shadow-md mb-5 lg:w-4/5 block my-4 placeholder:text-center placeholder:font-bold sm:placeholder:text-lg text-center rounded-xl border-0 py-4 px-2 ring-0 focus-visible:ring-0 focus:ring-0 outline-0 sm:text-sm sm:leading-6"
                            placeholder={t("inputPlaceHolder")}
                            onChange={handleChange}
                            value={refVal}
                            style={{
                                backgroundImage:
                                    "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))",
                            }}
                        />

                        <button
                            type="button"
                            className="rounded-md bg-[#00A1FF] max-w-full w-full lg:w-4/5 px-3.5 py-2 sm:py-4 text-lg font-semibold text-white shadow-lg shadow-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            onClick={handleRegister}
                        >
                            {t("greeting")}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
