import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const CountDown = () => {
    const [countdownDate] = useState(new Date('12/25/2024').getTime());
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const {t} = useTranslation("Exchange")
    const {days, hours, minutes, seconds} = t('time')
    useEffect(() => {
        setInterval(() => setNewTime(), 1000);
    }, []);
    const setNewTime = () => {
        if (countdownDate) {
            const currentTime = new Date().getTime();

            const distanceToDate = countdownDate - currentTime;

            let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
            let hours = Math.floor(
                (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            let minutes = Math.floor(
                (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
            );
            let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

            days = `${days}`;
            hours = hours < 10 ? `0${hours}` : `${hours}`;
            minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            setTimeLeft({days: days, hours: hours, minutes, seconds});
        }
    };

    return (
        <div
            className="py-10"
            style={{
                backgroundImage: "linear-gradient(to bottom, rgba(213, 227, 255, 1), rgba(213, 227, 255, 0.1))"
            }}
        >
            <div
                className="px-2 md:px-0 py-6 mx-auto max-w-2xl lg:max-w-4xl"
            >
                <div
                    className="shadow-xl shadow-gray-600 bg-white max-w-2xl lg:max-w-4xl border-[#00A2FF] border-2 rounded-3xl py-10 px-2 sm:px-6">
                    <h2 className="text-center text-xl sm:text-3xl font-bold mb-6 sm:mb-14">{t('heading')}</h2>

                    <div
                        className="bg-[#00A1FF] shadow-lg shadow-gray-400 px-2 py-3 sm:py-6 rounded-2xl w-full flex justify-center items-center">
                        <div className="w-44 md:w-52 flex justify-between items-center text-white text-lg sm:text-xl font-bold">
                            <div className="">
                                1 DB
                            </div>
                            <div className=""> =</div>
                            <div className="">
                                0.10 USDT
                            </div>
                        </div>
                    </div>

                    <h3 className="text-center text-lg sm:text-3xl font-medium my-6 sm:mt-14 sm:mb-10">{t('subheading')}</h3>

                    {
                        timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0
                            ? <h3 className="text-center text-xl font-bold">Busted!</h3>
                            :
                            <div className="w-full flex justify-around sm:justify-center items-center">
                                <div className="md:max-w-xl flex justify-center sm:justify-between items-center flex-wrap gap-1 sm:gap-8">
                                    <section className="flex items-center justify-center flex-col gap-2">
                                        <div className="relative">
                                            <div
                                                className="w-14 h-14 sm:w-20 sm:h-20 bg-black rounded-lg flex items-center justify-center text-white text-md sm:text-4xl">
                                                {timeLeft.days || '00'}
                                            </div>
                                        </div>
                                        <div className="font-medium text-[12px] sm:text-md">
                                            {days}
                                        </div>
                                    </section>
                                    <section className="flex items-center justify-center flex-col gap-2">
                                        <div className="relative">
                                            <div
                                                className="w-14 h-14 sm:w-20 sm:h-20 bg-black rounded-lg flex items-center justify-center text-white text-md sm:text-4xl">
                                                {timeLeft.hours || '00'}
                                            </div>
                                        </div>
                                        <div className="font-medium text-[12px] sm:text-md">
                                            {hours}
                                        </div>
                                    </section>
                                    <section className="flex items-center justify-center flex-col gap-2">
                                        <div className="relative">
                                            <div
                                                className="w-14 h-14 sm:w-20 sm:h-20 bg-black rounded-lg flex items-center justify-center text-white text-md sm:text-4xl">
                                                {timeLeft.minutes || '00'}
                                            </div>
                                        </div>
                                        <div className="font-medium text-[12px] sm:text-md">
                                            {minutes}
                                        </div>
                                    </section>
                                    <section className="flex items-center justify-center flex-col gap-2">
                                        <div className="relative">
                                            <div
                                                className="w-14 h-14 sm:w-20 sm:h-20 bg-black rounded-lg flex items-center justify-center text-white text-md sm:text-4xl">
                                                {timeLeft.seconds || '00'}
                                            </div>
                                        </div>
                                        <div className="font-medium text-[12px] sm:text-md">
                                            {seconds}
                                        </div>
                                    </section>
                                </div>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default CountDown;