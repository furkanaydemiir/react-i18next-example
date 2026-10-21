import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'js-cookie';
import { getSystemLanguage } from './utils/LanguageUtils.js';

import userTableEnglish from './locales/en.json'
import userTableTurkish from './locales/tr.json'

// Dil değiştiğinde seçim yenileme sonrasında da korunsun.
i18n.on('languageChanged', (language) => {
    document.documentElement.setAttribute('lang', language);
    Cookies.set('Accept-Language', language, { expires: 365, sameSite: 'Lax', path: '/' });
});

i18n.use(initReactI18next)
    .init({
        resources: {
            en: {
                usertable:userTableEnglish
            },
            tr: {
                usertable:userTableTurkish
            },
        },
        interpolation: { escapeValue: false }, // Çeviri metinlerindeki yer tutucu değerlerin işlenmesi için yapılandırmaları sağlar.
        ns: ['usertable'],
        defaultNS: 'usertable', // Varsayılan çeviri alanını belirtir.
        lng: getSystemLanguage(), // özelliği doğru dil için ayarlanmış olur.
        fallbackLng: 'en',
        supportedLngs: ['en', 'tr'],
    });

export default i18n; 
