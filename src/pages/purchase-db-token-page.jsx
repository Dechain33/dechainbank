import Returns from "@/components/returns/returns.jsx";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

const PurchaseDbTokenPage = () => {
    const {t} = useTranslation('navbar')
    return (
        <>
            <Helmet>
                <title> {t('navItemPurchaseDBToken')} </title>
            </Helmet>
            <Returns/>
        </>
    );
};

export default PurchaseDbTokenPage;