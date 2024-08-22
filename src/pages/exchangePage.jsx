import ExchangeComponent from "@/components/exchange/exchange.jsx";
import CountDown from "@/components/count-down/count-down.jsx";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
const ExchangePage = () => {
    const {t} = useTranslation('navbar')
    return (
        <>
            <Helmet>
                <title> {t('navItemExchange')} </title>
            </Helmet>
            <CountDown/>
            <ExchangeComponent />
        </>
    );
};

export default ExchangePage;