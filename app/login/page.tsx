"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { useAuth } from "../_components/AuthProviderContext";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { isAuthenticated, login } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data?.success) {
        toast.success(data.message);
        login(data?.authorization?.token);
        router.push("/subscription");
      } else {
        setTimeout(() => {
          toast.error(data?.message?.message || 'Login failed!');
        }, 300);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while checking auth state
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // Prevent showing login form if already authenticated
  if (isAuthenticated) return null;

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
          <div className="relative">
            <label className="block text-gray-600 mb-1">Lösenord</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-2xl text-gray-800/60 top-[70%] -translate-y-1/2 cursor-pointer -translate-x-8"
            >
              {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className={`bg-blue-500 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300`}
            >
              {loading ? (
                <div className="flex justify-center gap-2.5">
                  <span className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 border-solid rounded-full animate-spin"></span>
                  Loading...
                </div>
              ) : (
                "Logga in"
              )}
            </button>
            <Link href="/signup" className="w-full">
              <button
                type="button"
                className="bg-gray-200 w-full cursor-pointer py-2 px-4 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-all duration-300"
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
