'use client';

import { useEffect, useState, useRef } from 'react';

// Define structure for languages
interface LanguageDescriptor {
  name: string;
  title: string;
}

// Types for JS-based config (from external file)
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace globalThis {
    // eslint-disable-next-line no-var
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}
type DropdownType = string

const LanguageSwitcher = () => {

  const [languageDropDown, setLanguageDropDown] = useState(false)
  const [language, setLanguage] = useState("English")
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (lang: string) => {
    const languageMap: Record<string, string> = {
      'English': 'en',
      'Swedish': 'sv',
      'Arabic': 'ar',
    };

    const langCode = languageMap[lang];

    if (langCode) {
      try {
        const selectElement =
          document.querySelector('#google_translate_element select.goog-te-combo') ||
          document.querySelector('.goog-te-combo');

        if (selectElement) {
          // Create a new change event
          const event = new Event('change', { bubbles: true });

          // Set language and dispatch event
          (selectElement as HTMLSelectElement).value = langCode;
          selectElement.dispatchEvent(event);

          // Update local state
          const displayNames = {
            'en': 'English',
            'sv': 'Svenska',
            'ar': 'عربي'
          };
          setLanguage(displayNames[langCode as keyof typeof displayNames]);

          // Close dropdown after selection
          setLanguageDropDown(false);
        }
      } catch (error) {
        console.error('Error changing language:', error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      try {
        const target = event.target as HTMLElement;
        if (languageDropdownRef.current && !languageDropdownRef.current.contains(target)) {
          setLanguageDropDown(false);
        }
      } catch (error) {
        console.error('Error in click handler:', error);
        setLanguageDropDown(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, []);

  const handleDropdownToggle = (dropdownType: DropdownType) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (dropdownType === 'language') {
      setLanguageDropDown(!languageDropDown);
    }
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropDown(false); // Close dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <span suppressHydrationWarning>
      <div className='flex items-center gap-4'>
        <div className='flex gap-4 items-center'>
          {/* Language Dropdown */}
          <div ref={languageDropdownRef} className='relative w-[120px] inline-block text-left  '>
            <button
              className='flex justify-between cursor-pointer items-center w-full  px-4 py-2 gap-x-1.5 rounded-md bg-white text-sm font-semibold text-gray-900 '
              onClick={handleDropdownToggle('language')}
            >
              {/* <img src={languageLogo} alt='Language' className='w-6 h-6' /> */}
              <div className='text-base md:text-lg'>
                {language}
              </div>
              <svg
                className={`-mr-1 size-5 w-6 h-6 text-[#475467] ${languageDropDown ? "rotate-180 transform duration-300" : "rotate-0 transform duration-300"}`}
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            {languageDropDown && (
              <div className={`absolute  right-0 z-10 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5  `}>
                <div className='py-1 '>
                  <button
                    onClick={() => handleLanguageChange('English')}
                    className='block cursor-pointer px-4 py-2  text-gray-700  text-base hover:bg-gray-100 w-full notranslate'
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('Swedish')}
                    className='block cursor-pointer px-4 py-2  text-base text-gray-700 hover:bg-gray-100 w-full notranslate'
                  >
                    Svenska
                  </button>
                  <button
                    onClick={() => handleLanguageChange('Arabic')}
                    className='block cursor-pointer px-4 py-2  text-base text-gray-700 hover:bg-gray-100 w-full notranslate'
                  >
                    عربي
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </span>
  );
};

export default LanguageSwitcher;
