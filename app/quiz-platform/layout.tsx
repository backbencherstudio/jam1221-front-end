"use client"

import Head from 'next/head';
import React from 'react';
import LanguageSwitcher from '../_components/LanguageSwitcher';
import { useRouter } from 'next/navigation';

export default function QuizPlatformLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();

    return (
        <div className="bg-[#FAD0C4] min-h-screen flex flex-col items-center p-4">
            <Head>
                <title>Quiz App</title>
                <meta name="description" content="Interactive quiz application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="w-full max-w-lg flex justify-center mt-30 mb-4">
                <nav className="absolute top-15 left-1/2 -translate-x-1/2 bg-gradient-to-r hover:from-[#ff9966] hover:to-[#ff5e62] scale-100 hover:scale-110 transition-all duration-300 from-[#ff7e5f] to-[#feb47b] rounded-[30px] text-white text-center">
                    <button onClick={() => router.back()} className="md:text-xl text:lg px-[40px] py-[15px] block font-bold">
                        Gå tillbaka
                    </button>
                </nav>
            </div>

            <div className="flex justify-center mb-6">
                <div className="flex items-center">
                    <span className="mr-2  md:text-2xl text-lg font-bold text-[#1E1E33]">Välj språk:</span>
                    <LanguageSwitcher />
                </div>
            </div>
                {children}
        </div>
    );
}

