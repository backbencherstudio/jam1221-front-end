import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";


import Script from "next/script";
import { AuthProvider } from "./_components/AuthProviderContext";

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Interactive quiz application",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {/* Hidden dropdown */}
        {/* <div id="google_translate_element" style={{ display: "hidden" }}></div> */}

        {/* Google Translate Init Script */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({
        pageLanguage: 'sv',
        includedLanguages: 'en,sv,ar',
        autoDisplay: false
      }, 'google_translate_element');
    }
  `}
        </Script>

        {/* Google Translate External JS */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Providers>
          <AuthProvider>
              <div id="google_translate_element" className="hidden"></div>
              {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

