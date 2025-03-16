"use client"

import React from 'react';
import Link from 'next/link';
import { LanguageProvider, useLanguage } from '../_components/LanguageContext';
// import Lang from "@/app/_components/Lang"

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
      <main className="flex-grow bg-[#808080] text-black">
        <div className="max-w-[800px] mx-auto px-4 2xl:px-0 py-4">
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
          <h1 className="text-[32px] font-bold text-center mb-8">{t("title")}</h1>

          {/* Why TeoriMaster Section */}
          <section className="mb-8">
            <h2 className="md:text-2xl text-xl font-bold text-center mb-4">{t("whyTitle")}</h2>
            <p className="text-center text-white   text-lg">
              {t("whyText")}
            </p>
          </section>

          {/* How to Study Section */}
          <section className="mb-8">
            <h2 className="md:text-2xl text-xl font-bold text-center mb-4">{t("studyTitle")}</h2>
            <p className="text-center text-white  text-lg">{t("studyText")}
            </p>
          </section>

          {/* Strategy Section */}
          <section className="mb-8">
            <h2 className="md:text-2xl text-xl font-bold text-center mb-4">{t("strategyTitle")}</h2>
            <p className="text-center text-white text-lg mb-6">
              {t("strategyText")}
            </p>

            {/* Bullet Points */}
            <div className="flex justify-center mb-10">
              <ul className="list-disc text-lg text-white pl-8">
                <li>{t("rule")}</li>
                <li>{t("human")}</li>
                <li>{t("vehicle")}</li>
                <li>{t("environment")}</li>
              </ul>
            </div>

            {/* Videos Section */}
            <p className="text-center text-lg text-white mb-4">
              {t("videoText")}
            </p>

            <div className="flex justify-center mb-10">
              <a className='scale-100 hover:scale-105 duration-300' href="https://youtu.be/ClYvqgpq5zQ?si=rMrDGm6KUUTbi9XL" target='_blank'>
              <button className="bg-blue-600 text-lg cursor-pointer hover:bg-blue-700 text-white py-2 px-4 rounded">
                {t("videoButton")}
              </button>
              </a>
            </div>

            {/* Navigation */}
            <p className="text-center text-lg text-white mb-4">
              {t("nextText")}
            </p>

            <div className="flex justify-center">
              <Link href="/theory-quiz">
              <button className="bg-blue-600 cursor-pointer scale-100 hover:scale-105 duration-300 text-lg hover:bg-blue-700 text-white py-2 px-4 rounded">
                {t("nextButton")}
              </button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;