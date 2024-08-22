import CountDown from "@/components/count-down/count-down.jsx";
import Faq from "@/components/faq/faq.jsx";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

const HomePage = () => {
    const {t} = useTranslation('navbar')
    return (
        <>
            <Helmet>
                <title> {t('navItemHome')} </title>
            </Helmet>
            <CountDown/>
            <Faq/>
        </>
    );
};

export default HomePage;