"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { translations } from "@/app/_Translationdata/translations";

type Language = "en" | "sv" | "ar";

interface LanguageContextProps {
    language: Language;
    setLanguage:(lang: Language) => void;
    t:(key: string) => string;
}

    const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

 export const LanguageProvider  = ({children}:{children:ReactNode}) => {
    const [language,setLanguage] = useState<Language>("en")
    
    const t = (key:string): string => translations[language]?.[key] || key;

    return (
        <LanguageContext.Provider value={{language,setLanguage,t}}>
            {children}
        </LanguageContext.Provider>
    )

}


export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
  };
