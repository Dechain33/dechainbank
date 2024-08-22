import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Hand, Minus, Plus } from "lucide-react";
import {useTranslation} from "react-i18next";

const faqs = [
  {
    id: 1,
    text: "Why choose Dechain Bank?",
    answer_one_heading: "(a) Safe and transparent financial services",
    answer_one:
      "Blockchain technology ensures the security and transparency of every transaction. Without\n" +
      "intermediaries, all transaction records are permanent and cannot be tampered with, ensuring\n" +
      "the safety of users' funds.",
    answer_two_heading: "(b) Global financial platform",
    answer_two:
      "No longer subject to the geographical restrictions of traditional banks, Dechain Bank allows\n" +
      "users to freely transfer money and conduct financial operations around the world, truly\n" +
      "realizing seamless cross-border connection.",
    answer_three_heading: "(c) Efficient decentralized system",
    answer_three:
      "Dechain Bank's smart contracts automatically execute all financial agreements without\n" +
      "manual intervention, greatly reducing operating costs and improving transaction efficiency.",
    answer_four_heading: "(d) Innovative investment opportunities",
    answer_four:
      "Through Dechain Bank's platform, participants will be able to invest in future financial\n" +
      "infrastructure and share the rich benefits brought by the platform's growth.",
  },
  {
    id: 2,
    text: "Products and services.",
    answer_one_heading: "(a) Digital asset management",
    answer_one:
      "A safe and simple cryptocurrency storage and management solution that allows your assets to steadily increase in value on the blockchain",
    answer_two_heading: "(b) Decentralized lending",
    answer_two:
      "By providing fast and transparent lending services through smart contracts, borrowing and lending are more convenient and secure.",
    answer_three_heading: "(c) Seamless cross-border payment",
    answer_three:
      "Through blockchain technology, we can achieve real-time and low-cost international payment, making the flow of funds borderless",
    answer_four_heading: "(d) Blockchain investment and financial management",
    answer_four:
      "Diverse investment tools and strategies help you realize wealth appreciation in the blockchain field",
  },
  {
    id: 3,
    text: "Technical advantages.",
    answer_one_heading: "(a) State-of-the-art blockchain architecture",
    answer_one:
      "Adopting the latest blockchain technology, we provide high throughput and low-latency\n" +
      "transaction processing capabilities to ensure the efficient operation of the platform.",
    answer_two_heading: "(b) Smart contract automatic execution",
    answer_two:
      "Use smart contracts to simplify and automate complex financial agreements to ensure fair\n" +
      "and efficient execution.",
    answer_three_heading: "(c) Multi-layer security protection",
    answer_three:
      "From hardware to software, our multi-layer security protection system ensures the highest\n" +
      "security level for user data and assets.",
  },
  {
    id: 4,
    text: "Investor benefits.",
    answer_one_heading: "(a) Dividends for token holders",
    answer_one:
      "As a DB token holder, you will have the right to share the platform's revenue and profits and\n" +
      "enjoy continuous financial returns.",
    answer_two_heading: "(b) Exclusive investment return plan",
    answer_two:
      "The platform has designed an exclusive return plan for early investors, providing additional\n" +
      "token rewards and priority investment opportunities.",
    answer_three_heading: "(c) Participation in community governance",
    answer_three:
      "Investors holding tokens can participate in the governance and decision-making of the\n" +
      "platform and truly become part of the project.",
  },
  {
    id: 5,
    text: "How to participate in Dechain Bank's ICO.",
    answer_one_heading: "(a) RegisterPage an account",
    answer_one:
      "Create your account on the official website of Dechain Bank and join the transformation of\n" +
      "global blockchain banks..",
    answer_two_heading: "(b) Buy tokens",
    answer_two:
      "Easily buy [DB] tokens through the Dechain Bank platform and become a member of the\n" +
      "future financial ecosystem.",
    answer_three_heading: "(c) Start your investment journey",
    answer_three:
      "Hold tokens, participate in our rich financial products and services, and witness your\n" +
      "investment grow.",
  },
  {
    id: 6,
    text: "Team introduction",
    answer_one:
      "Dechain Bank is composed of a group of experienced blockchain experts and financial\n" +
      "industry veterans who are committed to combining the most advanced technology with deep\n" +
      "financial experience to create a new financial experience for users.",
  },
  {
    id: 7,
    text: "Join us to shape the future of finance",
    answer_one:
      "With Dechain Bank, you are not just an investor, you are also part of driving financial innovation. Join our community and witness and participate in this exciting journey together!",
  },
  {
    id: 8,
    text: "Contact us",
    answer_one: `If you have any questions or need more information, please feel free to contact our support team: `,
    answer_one_link: "https://t.me/DECHAIN_DB_SUPPOER",
  },
  {
    id: 9,
    text: "Social media",
    answer_one:
      "Follow our social media to get the latest project updates and industry information: ",
    answer_one_link: "https://x.com/DbDechain?t=OA0lOPsGKYWK4OO8bLCbhQ&s=09",
  },
];
const Faq = () => {
  const navigate = useNavigate();
  const {t} = useTranslation("home")
  const handleClick = () => {
    navigate("/register");
  };
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))",
      }}
    >
      <div className="px-2 md:px-0 py-6 mx-auto max-w-2xl lg:max-w-4xl">
        <h2 className="text-center text-xl sm:text-3xl font-medium mt-6 mb-8 sm:mb-16">
          {t('titleFirstHalf')} <br className="hidden sm:flex" /> {t('titleSecondHalf')}
        </h2>

        <p className="text-center text-xl sm:text-2xl mb-10">
          {t('subTitle')}
        </p>

        <div className="flex flex-col items-center shadow-xl shadow-gray-600 bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-2 rounded py-10 px-4">
          <h3 className="text-center text-2xl font-medium mb-10">
            {t('DechainBank')}
          </h3>

          <p className="text-justify font-semibold text-md">
            {t('DechainBankText')}
          </p>

          <div className="w-full md:w-3/4 bg-black text-white px-5 sm:px-10 rounded-2xl py-10 mt-10">
            <h2 className="text-2xl text-center font-bold leading-10 tracking-tight text-white">
              {t('FAQ')}
            </h2>
            <dl className="mt-5 space-y-6 divide-y divide-white-900/10">
              {t('faqs').map((faq) => (
                <Disclosure as="div" key={faq.id} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <DisclosureButton className="flex w-full items-start justify-between text-left text-white">
                          <span className="text-[14px] sm:text-base font-semibold leading-7">
                            {faq.id}. {faq.text}
                          </span>
                          <span className="ml-3 sm:ml-6 flex h-7 items-center">
                            {open ? (
                              <Minus className="h-6 w-6" aria-hidden="true" />
                            ) : (
                              <Plus className="h-6 w-6" aria-hidden="true" />
                            )}
                          </span>
                        </DisclosureButton>
                      </dt>
                      <DisclosurePanel as="dd" className="mt-2 pr-3 sm:pr-12">
                        <p className="text-base leading-7 text-white font-semibold">
                          {faq.answer_one_heading}
                        </p>
                        <p className="text-[14px] sm:text-base leading-7 text-white  sm:text-left">
                          {faq.answer_one}
                          {(faq.id === 8 || faq.id === 9) && (
                            <a
                              href={faq.answer_one_link}
                              className="text-blue-500 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {faq.answer_one_link}
                            </a>
                          )}
                        </p>
                        <p className="text-base leading-7 text-white font-semibold my-2">
                          {faq.answer_two_heading}
                        </p>
                        <p className="text-[14px] sm:text-base leading-7 text-white text-justify sm:text-left">
                          {faq.answer_two}
                        </p>
                        <p className="text-base leading-7 text-white font-semibold my-2">
                          {faq.answer_three_heading}
                        </p>
                        <p className="text-[14px] sm:text-base leading-7 text-white text-justify sm:text-left">
                          {faq.answer_three}
                        </p>

                        <p className="text-base leading-7 text-white font-semibold my-2">
                          {faq.answer_four_heading}
                        </p>
                        <p className="text-[14px] sm:text-base leading-7 text-white text-justify sm:text-left">
                          {faq.answer_four}
                        </p>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>

        <div className="w-full flex flex-col items-center mt-10">
          <button
            type="button"
            className="rounded-md bg-[#00A1FF] max-w-full w-full sm:w-80 px-3.5 py-2 sm:py-4 text-lg sm:text-2xl font-semibold text-white shadow-lg shadow-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={handleClick}
          >
            {t('btntext')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faq;
