import ReferralsReward from "@/components/referrals-reward/referrals-reward.jsx";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

const AccountsPage = () => {
    const {t} = useTranslation('navbar')
    return (
        <>
            <Helmet>
                <title> {t('navItemAccounts')} </title>
            </Helmet>
            <ReferralsReward/>
        </>
    );
};

export default AccountsPage;