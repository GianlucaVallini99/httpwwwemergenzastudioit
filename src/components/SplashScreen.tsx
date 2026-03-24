"use client";

import { useState, useEffect, useCallback } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("splashShown")) {
      return false;
    }
    return true;
  });
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const startAnimation = useCallback(() => {
    const t1 = setTimeout(() => setShowLogo(true), 50);
    const t2 = setTimeout(() => setShowText(true), 700);
    const t3 = setTimeout(() => setFadeOut(true), 2200);
    const t4 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("splashShown", "1");
    }, 3000);
    return [t1, t2, t3, t4];
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Preload the logo image, then start animation
    const img = new Image();
    img.src = "/logo-splash.png";

    let timers: ReturnType<typeof setTimeout>[] = [];

    if (img.complete) {
      // Already cached
      timers = startAnimation();
    } else {
      img.onload = () => {
        timers = startAnimation();
      };
      // Fallback: if image fails, start animation anyway after 500ms
      img.onerror = () => {
        timers = startAnimation();
      };
    }

    return () => timers.forEach(clearTimeout);
  }, [visible, startAnimation]);

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
      <img
        src="/logo-splash.png"
        alt="Emergenza Studio Logo"
        width={130}
        height={130}
        style={{
          width: 130,
          height: 130,
          borderRadius: "50%",
          marginBottom: 28,
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          opacity: showLogo ? 1 : 0,
          transform: showLogo ? "scale(1)" : "scale(0.85)",
        }}
      />
      <h1
        style={{
          fontSize: "clamp(1.8rem, 5vw, 3rem)",
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "0.08em",
          fontFamily: "var(--font-display), sans-serif",
          margin: 0,
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          opacity: showText ? 1 : 0,
          transform: showText ? "translateY(0)" : "translateY(16px)",
        }}
      >
        Emergenza Studio
      </h1>
    </div>
  );
}
