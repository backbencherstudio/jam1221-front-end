"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    try {
      const res = await fetch(`http://localhost:4000/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data?.success) {
        toast.success(data.message);

        if (data?.authorization?.token) {
          localStorage.setItem('token', data?.authorization?.token);
          console.log('Token saved:', data?.authorization?.token);
        }

        setTimeout(() => {
          router.push('/subscription');
        }, 600); // small delay to let the toast appear
      } else {
        toast.error(data?.message?.message || 'Login failed!');
      }

    }

    catch (err) {
      console.error('Submission failed:', err);
    }

    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Logga in</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-gray-600 mb-1">Användarnamn eller E-post</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 text-gray-700 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="E-post"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-600 mb-1">Lösenord</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className=" bg-blue-500 cursor-pointer w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
            >
              Logga in
            </button>
            <Link href="/signup" className=" w-full">
              <button
                type="button"
                className=" bg-gray-200 w-full cursor-pointer py-2 px-4 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-all duration-300"
              >
                Registrera
              </button>
            </Link>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
