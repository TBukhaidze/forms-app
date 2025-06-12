"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";

    const systemPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    setDarkMode(savedDarkMode || systemPrefersDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="border-b bg-white shadow-sm dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        <Link
          href="/"
          className="text-2xl font-bold text-primary tracking-tight dark:text-white"
        >
          FormBuilder
        </Link>

        <div className="flex items-center gap-3">
          {/* Кнопка переключения темы */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-500" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-700" />
            )}
          </button>

          {session ? (
            <>
              <Link href="/dashboard">
                <button className="px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 transition">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 transition">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 transition">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
