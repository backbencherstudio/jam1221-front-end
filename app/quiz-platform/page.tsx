"use client"

// import { useEffect, useState } from 'react';
// import Loading from './loading';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { useAuth } from '../_components/AuthProviderContext';





export default function QuizPlatform() {

  // const route = useRouter()

  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // const {isAuthenticated } = useAuth();

  // useEffect(() => {
  //   // const token = localStorage.getItem("token");
  //   // if (!token) {
  //   //   route.push("/login");
  //   // } else {
  //   //   setIsAuthenticated(true);
  //   // }

  //   if(!isAuthenticated){
  //     route.replace("/login");
  //   }


  // }, [route]);

  // Show nothing until authentication check is done
  // if (!isAuthenticated) {
  //   return <Loading /> // or you can return a loader
  // }


  return (
       <div className="max-w-4xl w-full flex items-center justify-center mt-4 ">
      <div className="w-full  bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 text-white text-center py-6 px-8 w-full">
          <h1 className="md:text-4xl text-3xl font-bold tracking-wide">Omfattande frågesportplattform</h1>
        </div>
        
        <div className="grid  gap-6 p-8 w-full">
          <div className="grid grid-cols-1  gap-6 md:col-span-2">
            {[
              { 
                title: 'Teoriprov', 
                icon: '🧠',
                href: '/quiz-platform/theory-quiz'
              },
              { 
                title: 'Begrepp', 
                icon: '📚',
                href: '/quiz-platform/traffic-rules'
              },
              { 
                title: 'Trafiksäkerhet', 
                icon: '🚧',
                href: '/quiz-platform/human'
              },
              { 
                title: 'Trafikregler', 
                icon: '🚦',
                href: '/quiz-platform/vehicle'
              },
              { 
                title: 'Miljö', 
                icon: '🌍',
                href: '/quiz-platform/environment'
              },

            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white border border-blue-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6 text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 uppercase">{item.title}</h3>
                  <button className="w-full cursor-pointer bg-blue-500 text-white  rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium">
                    <Link className='w-full block py-3' 
                    href={item.href}
                    >Börja</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

