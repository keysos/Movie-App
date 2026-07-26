import translations from "../translations";
import { useLanguage } from '../context/LanguageContext';

export function useTranslation () {

    const { language } = useLanguage();

    return translations[language] || translations["pt-BR"]
}