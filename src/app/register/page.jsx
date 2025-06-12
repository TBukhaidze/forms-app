"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiUser, CiMail } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-white flex flex-col">
        <div className="p-6">
          <h1 className="text-blue-600 font-bold text-2xl">THE APP</h1>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow py-10">
          <div className="w-full px-4 max-w-sm">
            <div className="mb-6">
              <p className="text-gray-500 text-sm mb-1">Start your journey</p>
              <h2 className="text-2xl font-semibold">Create your account</h2>
            </div>

            {error && (
              <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs text-gray-500 ml-1">Name</label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                  <input
                    type="text"
                    className="w-full focus:outline-none"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <CiUser className="text-xl text-gray-400" />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 ml-1">Email</label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                  <input
                    type="email"
                    className="w-full focus:outline-none"
                    placeholder="Your E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                  />
                  <CiMail className="text-xl text-gray-400" />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 ml-1">Password</label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full focus:outline-none"
                    placeholder="Create your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="ml-2 focus:outline-none"
                  >
                    {showPassword ? (
                      <FaRegEyeSlash className="text-xl text-gray-400" />
                    ) : (
                      <FaRegEye className="text-xl text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 ml-1">
                  Confirm Password
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                  <input
                    type="password"
                    className="w-full focus:outline-none"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
              >
                Register
              </button>
            </form>
          </div>
        </div>

        <div className="text-center py-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline font-semibold">
            Sign in
          </Link>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 min-h-screen" />
    </div>
  );
}
