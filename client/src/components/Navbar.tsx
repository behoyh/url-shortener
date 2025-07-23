"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import useThemeStore from "@/store/themeStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { theme, setTheme } = useThemeStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme as "dark" | "light");
    } else {
      setTheme(systemTheme);
    }
  }, [setTheme]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  return (
    <div
      className={`flex items-center justify-between py-3 px-5 bg-nt text-inv drop-shadow-lg ${theme}`}
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/chain.png"
            alt="logo"
            height="24"
            width="24"
            className={`${theme === "dark" ? "invert" : ""}`}
          />
          <h1 className="ml-3 text-2xl font-extrabold">Short.Url</h1>
        </Link>
      </div>
      <div className="flex items-center">
        {isAuthenticated ? (
          <>
            <Link href="/dashboard" className="mr-4">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="mr-4">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="mr-4">
              Login
            </Link>
            <Link href="/auth/signup" className="mr-4">
              Sign Up
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
