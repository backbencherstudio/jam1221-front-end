"use client"

import Head from 'next/head';
import React from 'react';
import LanguageSwitcher from '../_components/LanguageSwitcher';
import { useRouter } from 'next/navigation';
import ProtectedRoute from './ProtectedRoute';
import img from "@/public/img2.png"

export default function QuizPlatformLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();

    return (
        <>
        <div className="bg-[#FAD0C4] min-h-screen flex flex-col items-center p-4">
            <Head>
                <title>Quiz App</title>
                <meta name="description" content="Interactive quiz application" />
                <link rel="icon" href={img.src} />
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
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </div>
        </>
    );
}

// "use client"

// import Head from "next/head"
// import type React from "react"
// import { useEffect } from "react"
// import LanguageSwitcher from "../_components/LanguageSwitcher"
// import { useRouter } from "next/navigation"
// import ProtectedRoute from "./ProtectedRoute"

// export default function QuizPlatformLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   const router = useRouter()

//   // Add a script to handle Google Translate conflicts
//   useEffect(() => {
//     // This function helps manage Google Translate's DOM modifications
//     const handleGoogleTranslate = () => {
//       // Add a class to the html element to indicate Google Translate is active
//       if (
//         document.documentElement.classList.contains("translated-rtl") ||
//         document.documentElement.classList.contains("translated-ltr")
//       ) {
//         document.body.classList.add("google-translate-active")
//       }
//     }

//     // Run once on mount
//     handleGoogleTranslate()

//     // Set up a mutation observer to detect Google Translate changes
//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach(() => {
//         handleGoogleTranslate()
//       })
//     })

//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["class"],
//     })

//     return () => {
//       observer.disconnect()
//     }
//   }, [])

//   return (
//     <>
//       <div className="bg-[#FAD0C4] min-h-screen flex flex-col items-center p-4">
//         <Head>
//           <title>Quiz App</title>
//           <meta name="description" content="Interactive quiz application" />
//           <link rel="icon" href="/favicon.ico" />
//         </Head>

//         <div className="w-full max-w-lg flex justify-center mt-30 mb-4">
//           <nav className="absolute top-15 left-1/2 -translate-x-1/2 bg-gradient-to-r hover:from-[#ff9966] hover:to-[#ff5e62] scale-100 hover:scale-110 transition-all duration-300 from-[#ff7e5f] to-[#feb47b] rounded-[30px] text-white text-center">
//             <button onClick={() => router.back()} className="md:text-xl text:lg px-[40px] py-[15px] block font-bold">
//               Gå tillbaka
//             </button>
//           </nav>
//         </div>

//         <div className="flex justify-center mb-6">
//           <div className="flex items-center">
//             <span className="mr-2 md:text-2xl text-lg font-bold text-[#1E1E33]">Välj språk:</span>
//             <LanguageSwitcher />
//           </div>
//         </div>
//         <ProtectedRoute>
//           <div className="google-translate-container">{children}</div>
//         </ProtectedRoute>
//       </div>
//     </>
//   )
// }

