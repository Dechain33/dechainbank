import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';


const LanguageSelector = () => {
    const {i18n} = useTranslation();
    // Read the language from localStorage or default to 'en'
    const [selectedLanguage, setSelectedLanguage] = React.useState(localStorage.getItem('i18nextLng') || 'en');

    const {t} = useTranslation('navbar')

    const languages = [
        {code: 'en', lang: `${t('english')}`},
        {code: 'cn', lang: `${t('chinese')}`},
    ];

    useEffect(() => {
        document.body.dir = i18n.dir(); // Uncomment if you need to handle direction
        i18n.changeLanguage(selectedLanguage); // Set the initial language
    }, [i18n, i18n.language]);

    const changeLanguage = (lng) => {
        // i18n.changeLanguage(lng); // Ensure i18n is correctly imported and initialized
        i18n.changeLanguage(lng).then(() => {
            setSelectedLanguage(lng);
        });
    };

    return (
        <div className="h-16 flex justify-center items-center">
            <Select
                defaultValue={selectedLanguage === 'en-US' ? "en" : selectedLanguage}
                onValueChange={(e) => changeLanguage(e)}
            >
                <SelectTrigger className=" focus:outline-none focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Select a language"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{t('languages')}</SelectLabel>
                        {languages.map((lng) => (
                            <SelectItem key={lng.code} value={lng.code}>
                                {lng.lang}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default LanguageSelector;
