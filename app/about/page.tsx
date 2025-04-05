"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage, LanguageProvider } from '../_components/LanguageContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '../_components/AuthProviderContext';

const AboutPageContent: React.FC = () => {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const { token, loading, logout, user } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading && !token) {
        router.replace("/login");
      }
    };
    checkAuth();
  }, [loading, token, router]);

  const handleRoute = () => {
    router.push("/");
  };

  const handleLogOut = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center gap-2.5">
        <span className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 border-solid rounded-full animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen notranslate">
      <header className="w-full bg-[#007BFF] text-white p-[10px]">
        <div className="w-full justify-end flex text-center gap-4">
          <button 
            onClick={handleRoute}
            className="bg-blue-300 border text-black justify-self-center shadow-md cursor-pointer hover:scale-105 duration-300 scale-100 text-lg py-3 px-6 rounded-lg"
          >
            {t("home")}
          </button>
          
          {/* Admin Dashboard Button */}
          {user?.type === 'admin' && (
            <button 
              onClick={() => router.push('/admin')}
              className="bg-blue-300 border text-black justify-self-center shadow-md cursor-pointer hover:scale-105 duration-300 scale-100 text-lg py-3 px-6 rounded-lg"
            >
              Dashboard
            </button>
          )}

          <button 
            onClick={handleLogOut}
            className="bg-blue-300 border shadow-md cursor-pointer hover:scale-105 duration-300 scale-100 text-black text-lg py-3 px-6 rounded-lg flex items-center justify-center justify-self-end gap-2 transform transition-all ease-in-out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {t("logout")}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-[#808080] text-black">
        <div className="max-w-[800px] mx-auto px-4 2xl:px-0 py-4">
          {/* Language Selector */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <span className="mr-2 text-white md:text-2xl text-lg">{t("languageSelect")}</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "sv" | "ar")}
                className="bg-red-800 text-white border focus:outline-none focus:ring-1 border-white rounded-[5px] font-semibold px-[15px] py-[10px]"
              >
                <option value="en">EN</option>
                <option value="ar">Arabic</option>
                <option value="sv">Swedish</option>
              </select>
            </div>
          </div>

          <h1 className="text-[32px] font-bold text-center mb-8">{t("title")}</h1>

          <section className="mb-8">
            <h2 className="md:text-2xl text-xl font-bold text-center mb-4">{t("whyTitle")}</h2>
            <p className="text-center text-white text-lg">{t("whyText")}</p>
          </section>

          <section className="mb-8">
            <h2 className="md:text-2xl text-xl font-bold text-center mb-4">{t("studyTitle")}</h2>
            <p className="text-center text-white text-lg">{t("studyText")}</p>
          </section>

          <section className="mb-8">
            <h2 className="md:text-2xl text-xl font-bold text-center mb-4">{t("strategyTitle")}</h2>
            <p className="text-center text-white text-lg mb-6">{t("strategyText")}</p>

            <div className="flex justify-center mb-10">
              <ul className="list-disc text-lg text-white pl-8">
                <li>{t("rule")}</li>
                <li>{t("human")}</li>
                <li>{t("vehicle")}</li>
                <li>{t("environment")}</li>
              </ul>
            </div>

            <p className="text-center text-lg text-white mb-4">{t("videoText")}</p>

            <div className="flex justify-center mb-10">
              <a className="scale-100 hover:scale-105 duration-300" href="https://youtu.be/ClYvqgpq5zQ?si=rMrDGm6KUUTbi9XL" target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-600 text-lg cursor-pointer hover:bg-blue-700 text-white py-2 px-4 rounded">
                  {t("videoButton")}
                </button>
              </a>
            </div>

            <p className="text-center text-lg text-white mb-4">{t("nextText")}</p>

            <div className="flex justify-center">
              <Link href="/quiz-platform">
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

// ✅ Wrap it in LanguageProvider ONLY for this page
const AboutPage: React.FC = () => {
  return (
    <LanguageProvider>
      <AboutPageContent />
    </LanguageProvider>
  );
};

export default AboutPage;