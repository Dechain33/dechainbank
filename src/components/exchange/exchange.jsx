import {ArrowRightLeft} from "lucide-react";

const Exchange = () => {
    return (
        <div
            style={{
            backgroundImage: "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))"
        }}
        >
        <div
            className="px-2 md:px-0 py-10 mx-auto max-w-2xl lg:max-w-4xl"
        >
            <div
                className="shadow-lg shadow-gray-600 flex flex-col items-center bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-2 rounded-3xl py-10 px-2 sm:px-4">
                <h2 className="text-center text-3xl font-medium mt-6 mb-8 sm:mb-16">Exchange</h2>

                <div className="w-full lg:w-4/5 px-5 flex justify-between items-center mb-5">
                    <div className="sm:text-lg font-medium">
                        0 DB
                    </div>
                    <div className="sm:text-lg font-medium">
                        0 USDT
                    </div>
                </div>

                <div className="bg-[#00A1FF] shadow-lg shadow-gray-400 py-3 sm:py-5 w-full lg:w-4/5 flex justify-center mb-5 sm:mb-10 rounded-3xl">

                    <div className="px-4 lg:px-0 lg:w-2/4 flex  sm:flex-row justify-between items-center gap-2 sm:gap-4">
                        <input
                            type="text"
                            name="number1"
                            id="number1"
                            className="w-20 bg-[#DEE9FF] lg:w-2/5 block placeholder:text-center placeholder:font-bold placeholder:text-lg text-center rounded-xl border-0 py-2.5 sm:py-4 px-2 shadow-sm ring-0 focus-visible:ring-0 focus:ring-0 outline-0 sm:text-sm sm:leading-6"
                            placeholder="0"
                        />

                        <ArrowRightLeft  className="text-white cursor-pointer"/>

                        <input
                            type="text"
                            name="number2"
                            id="number2"
                            className="w-20 bg-[#DEE9FF] lg:w-2/5 block placeholder:text-center placeholder:font-bold placeholder:text-lg text-center rounded-xl border-0 py-2.5 sm:py-4 px-2 shadow-sm ring-0 focus-visible:ring-0 focus:ring-0 outline-0 sm:text-sm sm:leading-6"
                            placeholder="0"
                        />
                    </div>

                </div>

                <button
                    type="button"
                    className="rounded-2xl bg-[#00A1FF] max-w-full w-full lg:w-4/5 px-3.5 py-4 sm:text-3xl font-semibold text-white shadow-lg shadow-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    Swap
                </button>
            </div>
        </div>
        </div>
    );
};

export default Exchange;