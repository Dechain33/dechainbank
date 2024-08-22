import RegisterComponent from "@/components/register/register.jsx";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

const RegisterPage = () => {
    const {t} = useTranslation('navbar')
    return (
        <>
            <Helmet>
                <title> {t('navItemRegister')} </title>
            </Helmet>
            <RegisterComponent/>
        </>
    );
};

export default RegisterPage;