import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";

i18n
  .use(LanguageDetector) // detects browser language
  .use(initReactI18next) // connects with React
  .init({
    resources: {
      en: { translation: translationEN },
      fr: { translation: translationFR },
    },
    fallbackLng: "en", // default language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
