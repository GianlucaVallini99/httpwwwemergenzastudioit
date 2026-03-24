"use client";

import { useState, useEffect } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("splashShown")) {
      setVisible(false);
      return;
    }

    // Staggered reveal
    const t1 = setTimeout(() => setShowLogo(true), 100);       // logo fades in
    const t2 = setTimeout(() => setShowText(true), 800);       // text fades in
    const t3 = setTimeout(() => setFadeOut(true), 2400);       // whole screen fades out
    const t4 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("splashShown", "1");
    }, 3200);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a3a5c 0%, #0f2a42 100%)",
        transition: "opacity 0.8s ease-in-out",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" as const : "auto" as const,
      }}
    >
      {/* Logo */}
      <img
        src="/logo-new.png"
        alt="Emergenza Studio Logo"
        style={{
          width: 130,
          height: 130,
          borderRadius: "50%",
          marginBottom: 28,
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          opacity: showLogo ? 1 : 0,
          transform: showLogo ? "scale(1)" : "scale(0.85)",
        }}
      />

      {/* Text */}
      <h1
        style={{
          fontSize: "clamp(1.8rem, 5vw, 3rem)",
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "0.08em",
          fontFamily: "var(--font-display), sans-serif",
          margin: 0,
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          opacity: showText ? 1 : 0,
          transform: showText ? "translateY(0)" : "translateY(16px)",
        }}
      >
        Emergenza Studio
      </h1>
    </div>
  );
}
