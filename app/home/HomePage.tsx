"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import img from "@/public/img1.jpeg"
import { useRouter } from "next/navigation";
import { useAuth } from "../_components/AuthProviderContext";

const HomePage = () => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {isAuthenticated } = useAuth();
  const route = useRouter()

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = 400;
        canvas.height = 200;
        ctx.fillStyle = "lightgray";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "blue";
        ctx.font = "20px Arial";
        ctx.fillText("Välkommen till TeoriMaster!", 50, 100);
      }
    }
  }, []);

  const handleRoute = () => {
    // const token = localStorage.getItem("token")
    // if(token){
    //   route.push("/about")
    // }else{
    //   route.push("/login")
    // }
    if(isAuthenticated === true){
      route.push("/about")
    }else{  
      route.push("/login")
    }


  }

  return (
    <div className=" bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${img.src})` }}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {/* Navbar */}
        {/* <nav className="w-full bg-blue-600 p-4 text-white text-center">
          <Link href="/payment" className="text-lg font-semibold">Gå vidare</Link>
        </nav> */}

        {/* Main Container */}
        <div className="bg-white max-w-[840px]   mx-auto lg:p-6 md:p-4 p-2 rounded-lg shadow-lg mt-6 text-center">
          <h1 className="xl:text-[50px] lg:text-[40px] md:text-[30px] text-2xl font-bold shadow-lg lg:p-5 md:p-3 p-2">Välkommen till TeoriMaster, Sveriges bästa körkortsapp!</h1>

          {/* Image Container */}
          <div className="flex justify-center md:my-4 my-2 relative">
            <Image src={img} alt="TeoriMaster Bild" className="rounded-lg shadow-md" />

            <nav className="absolute top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r hover:from-[#ff9966] hover:to-[#ff5e62] scale-100 hover:scale-110 transition-all duration-300 from-[#ff7e5f] to-[#feb47b] rounded-[30px]  text-white text-center">
              <button onClick={handleRoute} className="md:text-xl text:lg px-[40px] py-[15px] block font-bold">
                Gå vidare
              </button>
            </nav>
          </div>

          {/* Canvas */}
          <canvas ref={canvasRef} className="border mx-auto border-gray-300 my-4"></canvas>

          {/* Comments Section */}
          <h2 className="text-xl font-semibold mt-4">Kommentarer</h2>
          <div className="max-h-64 overflow-y-auto bg-blue-600 p-4 rounded-lg text-white">
            <div className="bg-white text-black p-3 my-2 rounded">&quot;Lär dig reglerna nu, så slipper du lära dig dem av en polis senare!&quot; 🚓💨</div>
            <div className="bg-white text-black p-3 my-2 rounded">&quot;Teorin är bara en checkpoint – målet är körkortet!&quot; 🏆🚗</div>
            <div className="bg-white text-black p-3 my-2 rounded">&quot;Ju fler frågor du pluggar, desto färre misstag på vägen!&quot; 📚🔥</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;