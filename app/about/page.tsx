"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../_components/LanguageContext';
import { useRouter } from 'next/navigation';
import Loading from '../quiz-platform/loading';
import { CiMenuFries } from "react-icons/ci";
import { useAuth } from '../_components/AuthProviderContext';




const AboutPage: React.FC = () => {

  const route = useRouter()
  const [sidebar, setSidebar] = useState(false)
  const { t, language, setLanguage } = useLanguage()


  const handleRoute = () => {
    route.push("/")
  }

  const {isAuthenticated,logout } = useAuth();

        if(isAuthenticated === (false || null)){
            return <Loading />
        }
        useEffect(() => {
            if (isAuthenticated === false ) {
                route.replace("/login"); // or wherever you want to send authenticated users
            }
        }, [isAuthenticated]);


const handleLogOut = () => {
  logout()
  route.push("/login")
}



  return (
    <div className="flex flex-col min-h-screen notranslate">
      {/* Header */}
      <header className="w-full bg-[#007BFF] text-white p-[10px]">
        <div className="w-full justify-end flex text-center  gap-4 ">
          <button onClick={handleRoute} className="bg-blue-300 border text-black justify-self-center shadow-md cursor-pointer hover:scale-105 duration-300 scale-100 text-lg py-3 px-6 rounded-lg">
            {t("home")}
          </button>
          <button onClick={() => {
            // localStorage.removeItem("token");
            // route.push("/login");
            handleLogOut()

          }}
            className="bg-blue-300 border shadow-md cursor-pointer hover:scale-105 duration-300 scale-100 text-black text-lg py-3 px-6 rounded-lg flex items-center justify-center justify-self-end gap-2 transform transition-all ease-in-out  "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            {t("logout")}
          </button>

          {/* <Button variant="outline"
            className=" text-black h-full py-3 bg-blue-300 px-6 rounded-lg font-semibold text-lg transition duration-300 ease-in-out  ">
            <Link href={"../cancel-subscription"}>
              Cancel Subscription
            </Link>
          </Button> */}
        </div>
        <button className='hidden ml-auto' onClick={() => setSidebar(!sidebar)}>
          <span className=''>
            <CiMenuFries className='text-2xl' />
          </span>
        </button>


      </header>

      {/* {sidebar && (
        <div className='fixed top-0 left-0 min-h-screen bg-gray-300'>
          <div className="w-[250px] mt-6 justify-end flex flex-col w text-center  gap-4 ">
            <button onClick={handleRoute} className="border border-red-50 cursor-pointer hover:scale-105 duration-300 scale-100 text-black  py-1 px-2 text-base rounded-sm flex items-center  gap-2 transform transition-all ease-in-out ">
              {t("home")}
            </button>
            <button onClick={() => {
              localStorage.removeItem("token");
              route.push("/login");
            }}
              className="border border-red-50 cursor-pointer hover:scale-105 duration-300 scale-100 text-black  py-1 px-2 text-base rounded-sm flex items-center  gap-2 transform transition-all ease-in-out "
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              {t("logout")}
            </button>

            <Button variant="outline"
              className="border border-red-50 cursor-pointer hover:scale-105 duration-300 scale-100 text-black  py-1 px-2 text-base rounded-sm flex items-center  gap-2 transform transition-all ease-in-out  ">
              <Link href={"../cancel-subscription"}>
                Cancel Subscription
              </Link>
            </Button>
          </div>
        </div>
      )} */}

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

export default AboutPage;