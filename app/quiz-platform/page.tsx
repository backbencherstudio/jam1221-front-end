import Link from "next/link";


const quizItems = [
  { 
    title: 'Teoriprov', 
    icon: '🧠',
    href: '/quiz-platform/theory-quiz'
  },
  { 
    title: 'Begrepp', 
    icon: '📚',
    href: '/quiz-platform/concept'
  },
  { 
    title: 'Trafiksäkerhet', 
    icon: '🚧',
    href: '/quiz-platform/trafic-safety'
  },
  { 
    title: 'Trafikregler', 
    icon: '🚦',
    href: '/quiz-platform/traffic-rules'
  },
  { 
    title: 'Miljö', 
    icon: '🌍',
    href: '/quiz-platform/environment'
  },
];

export default function QuizPlatform() {

  return (
    <div className="max-w-4xl w-full flex items-center justify-center mt-4">
      <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 text-white text-center py-6 px-8 w-full">
          <h1 className="md:text-4xl text-3xl font-bold tracking-wide">
            Omfattande frågesportplattform
          </h1>
        </div>
        
        <div className="grid gap-6 p-8 w-full">
          <div className="grid grid-cols-1 gap-6 md:col-span-2">
            {quizItems.map((item, index) => (
              <div 
                key={item.href} 
                className="bg-white border border-blue-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6 text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 uppercase">
                    {item.title}
                  </h3>
                  <Link
                    href={item.href}
                    className="w-full block py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium"
                  >
                    Börja
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

