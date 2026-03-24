"use client";

import { useState, useEffect } from "react";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"logo" | "text" | "fadeout" | "done">("logo");

  useEffect(() => {
    // Check if already shown this session
    if (typeof window !== "undefined" && sessionStorage.getItem("splashShown")) {
      setPhase("done");
      return;
    }

    const timers = [
      setTimeout(() => setPhase("text"), 600),
      setTimeout(() => setPhase("fadeout"), 2000),
      setTimeout(() => {
        setPhase("done");
        if (typeof window !== "undefined") {
          sessionStorage.setItem("splashShown", "1");
        }
      }, 2800),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary transition-opacity duration-700 ${
        phase === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <img
        src="/logo-new.png"
        alt="Emergenza Studio Logo"
        className={`w-24 h-24 md:w-32 md:h-32 rounded-full shadow-2xl mb-8 transition-all duration-700 ${
          phase === "logo" ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
        style={{
          animation: "splashLogoIn 0.7s ease-out 0.1s both",
        }}
      />

      {/* Text */}
      <h1
        className={`text-3xl md:text-5xl font-bold text-white tracking-wider transition-all duration-700 ${
          phase === "text" || phase === "fadeout"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        Emergenza Studio
      </h1>
    </div>
  );
}
