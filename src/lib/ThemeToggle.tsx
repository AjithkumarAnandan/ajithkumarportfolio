"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mode, setMode] = useState("light");

  // Initialize from localStorage or default
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "light";
    setMode(initialTheme);
    document.documentElement.setAttribute("class", initialTheme);
  }, []);

  function toggleTheme() {
    const newTheme = mode === "dark" ? "light" : "dark";
    setMode(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("class", newTheme);
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded text-black transition-colors h-24"
    >
      {mode === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
