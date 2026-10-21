import { tr, enUS } from 'date-fns/locale';
import { LANGUAGE_CODES } from "../language.js";
import Cookies from "js-cookie";

//Sistem dilini ayarlamak için kullanılır.
// Burdaki cookies browser'da saklanan çerezlere erişmeyi sağlayan bir kütüphanedir, (js-cookie)
// Eğer çerede Accept-Language yoksa tr değerini döndürür.
export const getSystemLanguage = () => {
    const language = Cookies.get('Accept-Language') || LANGUAGE_CODES.TR;
    const code = language.toLowerCase().split('-')[0];
    return code === LANGUAGE_CODES.EN ? LANGUAGE_CODES.EN : LANGUAGE_CODES.TR;
};

// date-fns kütüphanesi için lokalizasyon ayarlarını döndürür.
// getFnsLocale() fonksiyonu, sistem diline göre doğru lokalizasyon ayarlarını döndürür.
// Dil koduna (LANGUAGE_CODES.TR veya LANGUAGE_CODES.EN) göre switch-case yapısı kullanılır.

export const getFnsLocale = () => {
    const lang = getSystemLanguage();
    switch (lang) {
        case LANGUAGE_CODES.TR:
            return tr; // Türkçe lokalizasyon ayarlarını döndürür.
        case LANGUAGE_CODES.EN:
            return enUS; // İngilizce (ABD) lokalizasyon ayarlarını döndürür.
        default:
            return tr; // Varsayılan olarak Türkçe lokalizasyon ayarlarını döndürür.
    }
};

// Kullanıcı arayüzü dil kodunu döndürür.
// getLocale() fonksiyonu, sistem diline göre doğru dil kodunu döndürür.
// Dil koduna (LANGUAGE_CODES.TR veya LANGUAGE_CODES.EN) göre switch-case yapısı kullanılır.
export const getLocale = () => {
    const lang = getSystemLanguage();
    switch (lang) {
        case LANGUAGE_CODES.TR:
            return LANGUAGE_CODES.TR; // Türkçe dil kodunu döndürür.
        case LANGUAGE_CODES.EN:
            return LANGUAGE_CODES.EN; // İngilizce dil kodunu döndürür.
        default:
            return LANGUAGE_CODES.TR; // Varsayılan olarak Türkçe dil kodunu döndürür.
    }
};
