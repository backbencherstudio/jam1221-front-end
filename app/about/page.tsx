"use client"

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../_components/LanguageContext';

const AboutPage: React.FC = () => {

    const {t,language,setLanguage} = useLanguage()


  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full bg-[#007BFF] text-white p-[10px]">
        <div className="container mx-auto text-center ">
          <Link href="/">
            <button className="bg-[#0056b3] shadow-md cursor-pointer hover:scale-105 duration-300 scale-100 text-white text-lg py-3 px-6 rounded">
              Home
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-500 text-black">
        <div className="container mx-auto px-4 py-4">
          {/* Language Selector */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <span className="mr-2 text-white md:text-2xl text-lg">Select language:</span>
              <select
               value={language}
               onChange={(e) => setLanguage(e.target.value as "en" | "sv" | "ar")}
                className="bg-red-800 text-white border focus:outline-none focus:ring-1 border-white rounded-[5px]  font-semibold px-[15px] py-[10px]">
                <option value="en">EN</option>
                <option value="ar">Arabic</option>
                <option value="sv">Swedish</option>
              </select>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-[32px] font-bold text-center mb-8">Driving License Questions</h1>

          {/* Why TeoriMaster Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-center mb-4">{t("whyTitle")}</h2>
            <p className="text-center text-white px-4 md:px-20">
              {t("whyText")}
            </p>
          </section>

          {/* How to Study Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-center mb-4">{t("studyTitle")}</h2>
            <p className="text-center text-white px-4 md:px-20">{t("studyText")}
            </p>
          </section>

          {/* Strategy Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-center mb-4">{t("strategyTitle")}</h2>
            <p className="text-center text-white px-4 md:px-20 mb-6">
              {t("strategyText")}
            </p>

            {/* Bullet Points */}
            <div className="flex justify-center mb-6">
              <ul className="list-disc text-white pl-8">
                <li>{t("rule")}</li>
                <li>{t("human")}</li>
                <li>{t("vehicle")}</li>
                <li>{t("environment")}</li>
              </ul>
            </div>

            {/* Videos Section */}
            <p className="text-center text-white mb-4">
              {t("videoText")}
            </p>

            <div className="flex justify-center mb-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                {t("videoButton")}
              </button>
            </div>

            {/* Navigation */}
            <p className="text-center text-white mb-4">
              {t("nextText")}
            </p>

            <div className="flex justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                {t("nextButton")}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;