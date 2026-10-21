# React i18next Kılavuzu & Başlangıç Rehberi

Bu repo, modern React projelerinde çoklu dil (`i18n`) desteği sağlamak amacıyla `i18next` ve `react-i18next` kütüphanelerinin kurulumunu, kullanım mantığını ve gelişmiş özelliklerini (namespace, çoğul ekleri, dil kalıcılığı) içeren kapsamlı bir referans rehberidir.

---

## 🚀 `i18next` Nedir?

`i18next`, JavaScript tabanlı uygulamalar için geliştirilmiş popüler ve güçlü bir uluslararasılaştırma (internationalization) kütüphanesidir. Arayüzdeki sabit metinlerinizi harici JSON dosyalarına taşıyarak uygulamanızın sayfayı yenilemeden dinamik olarak dil değiştirmesini sağlar.

---

## 📂 Önerilen Proje Klasör Yapısı

Temiz ve sürdürülebilir bir mimari için çeviri dosyalarınızı `src/locales/` klasörü altında toplamak en iyi pratiktir:

```text
src/
 ├── locales/
 │    ├── en.json
 │    └── tr.json
 ├── i18n.js
 ├── App.jsx
 └── main.jsx
```

---

## ⚙️ Konfigürasyon Dosyası (`i18n.js`)

`i18next` kütüphanesini React projenize bağlamak, tarayıcı dilini otomatik algılamak ve JSON dosyalarınızı sisteme tanıtmak için `src/i18n.js` dosyasını şu şekilde oluşturabilirsiniz:

```javascript
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// Çeviri JSON dosyalarımızı içe aktarıyoruz
import TrLocalization from './locales/tr.json';
import EnLocalization from './locales/en.json';

// Kaynakları ve Namespace (İsim Alanı) tanımlamalarını yapıyoruz
const resources = {
    en: {
        translation: EnLocalization
    },
    tr: {
        translation: TrLocalization
    }
};

i18next
  .use(initReactI18next)       // React köprüsünü entegre eder
  .use(LanguageDetector)      // Tarayıcı dilini ve son seçimi algılar
  .init({
      fallbackLng: "tr",      // Algılanan dil bulunamazsa varsayılan dil
      resources: resources,   // Çeviri nesnemiz
      interpolation: {
          escapeValue: false  // React zaten XSS koruması sağladığı için false olmalıdır
      }
  });

export default i18next;
```

> **Önemli Not:** Hazırladığınız bu `i18n.js` dosyasını uygulamanızın ana giriş noktasında (`src/main.jsx` veya `src/index.js`) içeri aktarmayı unutmayın:
> ```javascript
> import './i18n.js';
> ```

---

## 🏷️ Namespace (İsim Alanı) Mantığı Nedir?

### 1. Namespace Nedir?
`i18next`, çevirileri mantıksal gruplara ayırmak için **Namespace (İsim Alanı)** kavramını kullanır. Eğer özel bir isim alanı belirtmezseniz, kütüphane otomatik olarak **`translation`** adındaki varsayılan isim alanını arar. Kodumuzdaki `translation: EnLocalization` tanımı bu yüzden yapılmaktadır.

### Neden Kullanılır?
Büyük ölçekli projelerde tüm metinleri tek bir devasa JSON dosyasına doldurmak yönetimi zorlaştırır. Namespace'ler sayesinde çevirilerinizi modüllere bölebilir (örneğin `common.json`, `auth.json`, `dashboard.json`) ve yalnızca ihtiyaç duyulan dosyaların yüklenmesini sağlayabilirsiniz.

---

## 📝 Örnek JSON Çeviri Dosyaları

### `src/locales/en.json`
```json
{
  "name-input": "Enter your name...",
  "userName-confirm": "Confirm",
  "welcome": "Welcome, ",
  "notification_one": "You have 1 notification",
  "notification_other": "You have {{count}} notifications"
}
```

### `src/locales/tr.json`
```json
{
  "name-input": "Adınızı giriniz...",
  "userName-confirm": "Onayla",
  "welcome": "Hoş geldin, ",
  "notification_one": "1 bildiriminiz var",
  "notification_other": "{{count}} bildiriminiz var"
}
```

---

## 💻 Bileşen İçerisinde Kullanım (`App.jsx`)

Çevirileri okuma, dinamik veri ekleme (interpolation), çoğul yapı yönetimi ve anlık dil değiştirme işlemlerinin toplu örneği:

```jsx
import { useState } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [messageCount, setMessageCount] = useState(0);

  // Dili değiştiren fonksiyon
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleSubmit = () => {
    console.log(name);
    setName("");
  };

  return (
    <>
      <header style={{ padding: '20px' }}>
        {/* Placeholder çevirisi */}
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          type="text" 
          placeholder={t("name-input")} 
        />
        <button type='submit' onClick={handleSubmit}>
          {t("userName-confirm")}
        </button>

        {/* Dil Seçim Menüsü */}
        <select onChange={handleLanguageChange} value={i18n.language}>
          <option value="tr">Türkçe</option>
          <option value="en">English</option>
        </select>
      </header>

      {/* Dinamik veri geçişi */}
      <p>{t("welcome")}{name}</p>

      {/* Pluralization (Çoğul Eki) Örneği */}
      <div> 
        <p>{t("notification", { count: messageCount })}</p>
        <button onClick={() => setMessageCount(messageCount + 1)}>
          Bildirim Arttır
        </button>    
      </div>
    </>
  );
}

export default App;
```

---

## 🔍 Önemli İpuçları ve Özet

1. **Dil Kalıcılığı (`localStorage`):** `i18n.changeLanguage('tr')` komutu çalıştırıldığında, seçilen dil `LanguageDetector` tarafından otomatik olarak tarayıcının `localStorage` alanına kaydedilir. Sayfa yenilense bile kullanıcı son seçtiği dilde kalır.
2. **Otomatik Çoğul Yönetimi (`Pluralization`):** `{ count: sayı }` parametresi gönderildiğinde `i18next`, sayı `1` olduğunda `_one`, diğer durumlarda `_other` uzantılı anahtarları otomatik olarak seçer.
3. **Değişken Kullanımı (Interpolation):** Metinlerin içine dinamik veriler gömmek için JSON içinde `{{degiskenAdi}}` formatı kullanılabilir.