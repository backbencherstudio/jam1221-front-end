'use client'

import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();
    
    return (
        <div className="w-full max-w-lg flex justify-center mt-30 mb-4">
            <nav className="absolute top-15 left-1/2 -translate-x-1/2 bg-gradient-to-r hover:from-[#ff9966] hover:to-[#ff5e62] scale-100 hover:scale-110 transition-all duration-300 from-[#ff7e5f] to-[#feb47b] rounded-[30px] text-white text-center">
                <button 
                    onClick={() => router.back()} 
                    className="md:text-xl text:lg px-[40px] py-[15px] block font-bold"
                >
                    Gå tillbaka
                </button>
            </nav>
        </div>
    );
}