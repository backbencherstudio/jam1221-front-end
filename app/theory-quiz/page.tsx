"use client"

import Head from 'next/head';
import Link from 'next/link';
import LanguageSwitcher from '../_components/LanguageSwitcher';
import QuizComponent from './_component/QuizComponent';
import { useEffect, useState } from 'react';
import Loading from './loading';
import { useRouter } from 'next/navigation';





export default function TheoryQuiz() {

  const route = useRouter()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      route.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [route]);

  // Show nothing until authentication check is done
  if (isAuthenticated === null) {
    return <Loading /> // or you can return a loader
  }


  return (
    <div className="bg-[#FAD0C4] min-h-screen flex flex-col items-center p-4">
      <Head>
        <title>Quiz App</title>
        <meta name="description" content="Interactive quiz application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full max-w-lg flex justify-center mt-30 mb-8">
        <nav className="absolute top-15 left-1/2 -translate-x-1/2 bg-gradient-to-r hover:from-[#ff9966] hover:to-[#ff5e62] scale-100 hover:scale-110 transition-all duration-300 from-[#ff7e5f] to-[#feb47b] rounded-[30px] text-white text-center">
          <Link href="/" className="md:text-xl text:lg px-[40px] py-[15px] block font-bold">
          Gå tillbaka
          </Link>
        </nav>
      </div>

      <div className="flex justify-center mb-6">
        <div className="flex items-center">
          <span className="mr-2  md:text-2xl text-lg font-bold text-[#1E1E33]">Välj språk:</span>
          <LanguageSwitcher />
        </div>
      </div>
     
      <QuizComponent />

    </div>
  );
}

