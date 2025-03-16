// 'use client';

// import { useEffect, useState } from 'react';
// import { parseCookies, setCookie } from 'nookies';

// // Google Translate predefined cookie name
// const COOKIE_NAME = 'googtrans';

// // Define the structure for each language
// interface LanguageDescriptor {
//     name: string;
//     title: string;
// }

// // Types for JS-based declarations from public/assets/scripts/lang-config.js
// declare global {
//     namespace globalThis {
//         var __GOOGLE_TRANSLATION_CONFIG__: {
//             languages: LanguageDescriptor[];
//             defaultLanguage: string;
//         };
//     }
// }

// const LanguageSwitcher = () => {
//     const [currentLanguage, setCurrentLanguage] = useState<string>();
//     const [languageConfig, setLanguageConfig] = useState<any>();

//     useEffect(() => {
//         // Read the current language from Google Translate cookie
//         const cookies = parseCookies();
//         const existingLanguageCookieValue = cookies[COOKIE_NAME];

//         let languageValue;
//         if (existingLanguageCookieValue) {
//             const sp = existingLanguageCookieValue.split('/');
//             if (sp.length > 2) {
//                 languageValue = sp[2];
//             }
//         }

//         // If not set, use the default language from config
//         if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
//             languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
//         }
        
//         if (languageValue) {
//             setCurrentLanguage(languageValue);
//         }

//         if (global.__GOOGLE_TRANSLATION_CONFIG__) {
//             setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
//         }
//     }, []);

//     // If config is not ready, don't render
//     if (!currentLanguage || !languageConfig) {
//         return null;
//     }

//     // Handle language change
//     const switchLanguage = (lang: string) => {
//         setCookie(null, COOKIE_NAME, `/auto/${lang}`);
//         window.location.reload();
//     };

//     return (
//         <div className="relative inline-block">
//             <select
//                 value={currentLanguage}
//                 onChange={(e) => switchLanguage(e.target.value)}
//                 className="bg-red-800 text-white border focus:outline-none focus:ring-1 cursor-pointer border-white rounded-[5px]  font-semibold px-[15px] py-[10px]"
//             >
//                 {languageConfig.languages.map((ld: LanguageDescriptor) => (
//                     <option className='cursor-pointer' key={ld.name} value={ld.name}>
//                         {ld.title}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// };

// export default { LanguageSwitcher, COOKIE_NAME };
