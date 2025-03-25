"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../_components/AuthProviderContext";

export default function RegisterForm() {

  const route = useRouter()
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null indicates loading state
   const {isAuthenticated } = useAuth();


   useEffect(() => {
    if (isAuthenticated) {
      route.replace("/"); // or wherever you want to send authenticated users
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setIsAuthenticated(true);
  //     route.replace('/');
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, []);

  // If authentication state is still being determined, show a loading spinner
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // {for final result comment out this---------------------------}
    // Reset password error when typing
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  //  {for final result comment out this---------------------------}
  const validatePassword = (password: string) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("At least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("One uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("One lowercase letter");
    }
    if (!/\d/.test(password)) {
      errors.push("One number");
    }
    if (!/[\W_]/.test(password)) {
      errors.push("One special character");
    }

    if (errors.length > 0) {
      setPasswordError(`Password must contain: ${errors.join(", ")}`);
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // {for final result comment out this---------------------------}

    validatePassword(formData.password);

    if (passwordError) {
      setLoading(false)
      return;
    }

    // Confirm password match check
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      setLoading(false)
      return;
    }


    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json()

      // if(data.statusCode === 401){
      //     toast.error(data.message);
      // }

      if (data?.success) {
        toast.success('Registration Successful!');
        setTimeout(() => {
          route.push('/login');
        }, 500); // small delay to let the toast appear
      } else {
        toast.error(data?.message)
      }
    } catch (err) {
      console.error('Submission failed:', err);
      toast.error('Server error!');
    }finally{
      setLoading(false);
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Registrera</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-gray-600 mb-1">Namn</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="first_name"
                className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="last_name"
                className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-600 mb-1">E-post</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
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

          {/* Confirm Password Input */}
          <div>
            <label className="block text-gray-600 mb-1">Confirm Lösenord</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Confirm Lösenord"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* // {for final result comment out this---------------------------} */}
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          {/* Register Button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className={` bg-blue-500 cursor-pointer w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300`}
            >
              {loading ? <div className="flex justify-center gap-2.5"><span className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 border-solid rounded-full animate-spin"></span> Loading...</div> : "Registrera"}
            </button>
            <Link href="/login" className="w-full">
              <button
                className=" bg-blue-500 cursor-pointer w-full py-3 px-10 hover:bg-blue-600 text-white font-bold  rounded-lg transition-all duration-300"
              >
                Logga in
              </button>
            </Link>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
