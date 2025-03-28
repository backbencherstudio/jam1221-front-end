// Add TypeScript declarations for Google Translate
interface Window {
    google: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string
            includedLanguages: string
            autoDisplay: boolean
          },
          elementId: string,
        ) => void
      }
    }
    googleTranslateElementInit: () => void
  }
  