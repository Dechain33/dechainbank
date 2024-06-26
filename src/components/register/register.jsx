const Register = () => {
    return (
        <div style={{
            backgroundImage: "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))"
        }}
        >
            <div className="px-2 md:px-0 py-6 mx-auto max-w-2xl lg:max-w-4xl">
                <h2 className="text-center text-lg sm:text-3xl font-medium mt-6 mb-8 sm:mb-16">
                    BUY DB COINS AND START YOUR JOURNEY OF HIGH RETURNS
                </h2>
                <div
                    className="mb-10 flex flex-col items-center shadow-xl shadow-gray-600 bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-2 rounded-3xl py-10 px-4">

                    <h2 className="text-center text-2xl font-semibold mb-5 sm:mb-10">
                        Register
                    </h2>

                    <h5 className="text-center text-xl sm:text-lg font-medium mt-6 mb-6">
                        You must register to purchase DB Token
                    </h5>

                    <input
                        type="text"
                        name="number"
                        id="number"
                        className="w-full shadow-md mb-5 lg:w-4/5 block my-4 placeholder:text-center placeholder:font-bold sm:placeholder:text-lg text-center rounded-xl border-0 py-4 px-2 ring-0 focus-visible:ring-0 focus:ring-0 outline-0 sm:text-sm sm:leading-6"
                        placeholder="Enter your referral ID"
                        style={{
                            backgroundImage: "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))"
                        }}
                    />

                    <button
                        type="button"
                        className="rounded-md bg-[#00A1FF] max-w-full w-full lg:w-4/5 px-3.5 py-2 sm:py-4 text-lg font-semibold text-white shadow-lg shadow-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        Register
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Register;