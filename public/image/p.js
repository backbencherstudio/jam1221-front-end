const translations = {
  sv: {
    "page-title": "Teorimaster",
    "language-label": "Välj språk:",
    "title": "Körkortsfrågor",
    "why-title": "Varför TeoriMaster?",
    "why-text": "Drömmer du om att ta körkort snabbt och utan stress? TeoriMaster är din ultimata lösning! Vår plattform erbjuder en smart, effektiv och engagerande väg till körkortet, där vi samlat allt du behöver för att klara teoriprovet på första försöket.\n\nMed våra interaktiva teoritest, detaljerade vägskyltar och ständigt uppdaterade frågor får du en verklighetstrogen provupplevelse. Du kan studera när och var du vill, i din egen takt, och systemet hjälper dig att identifiera dina svaga punkter så att du kan förbättra dem.",
    "study-title": "Hur ska man plugga?",
    "study-text": "För att plugga till teoriprovet på ett effektivt sätt är det viktigt att använda uppdaterat material, såsom en körkortsteori-app eller en aktuell teoribok. Trafikregler och vägskyltar ska inte bara memoreras, utan verkligen tolkas och tillämpas i praktiska situationer.",
    "strategy-title": "Strategi",
    "strategy-text": "Kom ihåg, varje steg du tar i dina körkortsstudier är ett steg närmare den frihet och självständighet som körkortet ger. Det handlar inte bara om att klara ett prov – det handlar om att öppna dörren till nya möjligheter, spontanitet och oberoende.",
    "rule": "Trafikregler",
    "human": "Människan",
    "vehicle": "Fordon",
    "environment": "Miljö",
    "video-text": "Här kommer bra videos för att få in grunderna.",
    "video-button": "Klicka här",
    "next-text": "För att gå vidare till övningar klicka på nästa.",
    "next-button": "Nästa"
  },
  en: {
    "page-title": "TeoriMaster",
    "language-label": "Select language:",
    "title": "Driving License Questions",
    "why-title": "Why TeoriMaster?",
    "why-text": "Dreaming of getting your driver's license quickly and stress-free? TeoriMaster is your ultimate solution! Our platform offers a smart, effective, and engaging way to obtain your license, providing everything you need to pass the theory test on your first attempt.\n\nWith our interactive theory tests, detailed road signs, and constantly updated questions, you get a realistic test experience. Study anytime, anywhere, and let our system help you identify and improve weak areas.",
    "study-title": "How to Study?",
    "study-text": "To study effectively for the theory test, it's essential to use up-to-date materials, such as a driving theory app or an updated theory book. Traffic rules and road signs should not just be memorized but fully understood and applied in real-life situations.",
    "strategy-title": "Strategy",
    "strategy-text": "Remember, every step you take in your driving studies brings you closer to the freedom and independence of having a driver's license. It’s not just about passing a test – it’s about opening doors to new opportunities, spontaneity, and autonomy.",
    "rule": "Traffic Rules",
    "human": "The Human",
    "vehicle": "Vehicle",
    "environment": "Environment",
    "video-text": "Here are some great videos to help you understand the basics.",
    "video-button": "Click here",
    "next-text": "To proceed to exercises, click next.",
    "next-button": "Next"
  },
  ar: {
    "page-title": "تيوري ماستر",
    "language-label": "اختر اللغة:",
    "title": "أسئلة رخصة القيادة",
    "why-title": "لماذا تيوري ماستر؟",
    "why-text": "هل تحلم بالحصول على رخصة القيادة بسرعة وبدون توتر؟ تيوري ماستر هو الحل الأمثل لك! منصتنا توفر لك طريقة ذكية وفعالة وجذابة للحصول على رخصتك، حيث تحتوي على كل ما تحتاجه لاجتياز اختبار النظرية من المحاولة الأولى.\n\nمع اختباراتنا التفاعلية، وعلامات الطرق التفصيلية، والأسئلة المحدثة باستمرار، تحصل على تجربة اختبار واقعية. يمكنك الدراسة في أي وقت وأي مكان، ويساعدك النظام على تحديد نقاط ضعفك وتحسينها.",
    "study-title": "كيف تدرس؟",
    "study-text": "للدراسة الفعالة لاختبار النظرية، من الضروري استخدام مواد محدثة، مثل تطبيق نظرية القيادة أو كتاب حديث. لا يكفي حفظ قواعد المرور وعلامات الطرق فقط، بل يجب فهمها وتطبيقها في المواقف الحقيقية.",
    "strategy-title": "استراتيجية",
    "strategy-text": "تذكر، كل خطوة تخطوها في دراسات القيادة تقربك أكثر من الحرية والاستقلالية التي تمنحها لك رخصة القيادة. لا يتعلق الأمر فقط باجتياز اختبار – بل يتعلق بفتح أبواب جديدة للفرص والاستمتاع بالحياة بحرية تامة.",
    "rule": "قواعد المرور",
    "human": "الإنسان",
    "vehicle": "المركبة",
    "environment": "البيئة",
    "video-text": "إليك بعض الفيديوهات الممتازة لفهم الأساسيات.",
    "video-button": "اضغط هنا",
    "next-text": "للمتابعة إلى التمارين، اضغط على التالي.",
    "next-button": "التالي"
  }
};

function changeLanguage() {
  const lang = document.getElementById("language").value;
  Object.keys(translations[lang]).forEach(id => {
    document.getElementById(id).textContent = translations[lang][id];
  });
}
