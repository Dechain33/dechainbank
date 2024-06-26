const data = [
    {
        id: 1,
        text: "Only one purchase per wallet."
    },
    {
        id: 2,
        text: "Each wallet is limited to purchases from a minimum of 1 USDT to a maximum of 5000 USDT."
    },
    {
        id: 3,
        text: "Each wallet purchase will receive 100% of the value quota of DB Token."
    },
    {
        id: 4,
        text: "If the purchase is successful, DB Token will be issued to your wallet."
    },
    {
        id: 5,
        text: "After receiving DB Token, 75% of the purchase amount can be exchanged for USDT or transferred out at any time on the platform, and the remaining 25% must be held for 18 months before it can be exchanged for USDT or transferred out."
    },
]
const Returns = () => {
    return (
        <div
            className="px-2 md:px-0  py-16 flex flex-col items-center"
            style={{
                backgroundImage: "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))"
            }}
        >
            <h1 className="text-xl sm:text-3xl text-center font-bold mb-5">THE FUTURE OF HIGH RETURNS</h1>
            <div className="shadow-xl shadow-gray-600 bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-2 rounded-3xl py-10 px-4">
                <h2 className="text-center text-xl sm:text-3xl font-bold mb-6 sm:mb-3">Purchase DB Token</h2>
                <div className="w-full lg:w-4/5 mx-auto">
                    <div className="text-xl font-medium ml-2 mb-2">Eligibility & Rules</div>
                    <ol className="space-y-1">
                        {
                            data.map((item) => (
                                <ListItem key={item.id} count={item.id} text={item.text}/>
                            ))
                        }
                    </ol>
                </div>
                <div className="lg:w-full lg:flex lg:flex-col lg:items-center mt-5">

                    <div className="w-full lg:w-4/5 px-5 flex justify-between items-center">
                        <div className="sm:text-lg font-medium">
                            0 USDT
                        </div>
                        <div className="sm:text-lg font-medium">
                            0 DB
                        </div>
                    </div>

                    <input
                        type="text"
                        name="number"
                        id="number"
                        className="w-full lg:w-4/5 block my-4 placeholder:text-center placeholder:font-bold sm:placeholder:text-lg text-center rounded-xl border-0 py-2.5 sm:py-4 px-2 shadow-lg ring-0 focus-visible:ring-0 focus:ring-0 outline-0 sm:text-sm sm:leading-6"
                        placeholder="Enter USDT Amount"
                        style={{
                            backgroundImage: "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))"
                        }}
                    />

                    <button
                        type="button"
                        className="rounded-md bg-[#00A1FF] max-w-full w-full lg:w-4/5 px-3.5 py-2 sm:py-4 sm:text-lg font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        Buy
                    </button>
                </div>
            </div>

        </div>
    );
};

const ListItem = ({count, text}) => {
    return (
        <li className="text-body-color dark:text-dark-6 flex text-base">
          <span
              className="flex h-[26px] w-full max-w-[26px] items-center justify-center font-bold rounded text-base">
            {count}.
          </span>
            <span className="text-justify sm:text-left">{text}</span>
        </li>
    );
};

export default Returns;