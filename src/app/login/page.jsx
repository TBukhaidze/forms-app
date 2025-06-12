"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Улучшенная обработка ошибок
        if (result.error === "CredentialsSignin") {
          setError("Invalid email or password");
        } else if (result.error.includes("User account is blocked")) {
          setError("Your account has been blocked. Contact support for help.");
        } else {
          setError(result.error);
        }
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col bg-white p-8 md:p-16">
        <h1 className="text-3xl font-bold mb-8 text-indigo-500">Forms App</h1>
        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <p className="text-gray-500">Start your journey</p>
            <h2 className="text-3xl font-semibold my-4">
              Sign in to Forms App
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="text-red-600 bg-red-50 p-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  E-mail
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <CiMail className="text-gray-400 text-lg mr-2" />
                  <input
                    type="email"
                    className="outline-none bg-transparent ml-2 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                    placeholder="test@example.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="flex-1 outline-none bg-transparent w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="**********"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 focus:outline-none"
                    disabled={isLoading}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className={`w-full ${
                  isLoading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="mt-6 flex w-full justify-between text-sm">
              <a
                href="/register"
                className="underline font-medium text-primary"
              >
                Sign up
              </a>
              <a
                href="#"
                className="underline text-gray-600"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    "To reset password, contact admin at admin@example.com"
                  );
                }}
              >
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600" />
    </div>
  );
}
