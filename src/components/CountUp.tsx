"use client";

import { useEffect, useRef } from "react";

/**
 * Numero che "conta" da 0 al valore quando entra nello schermo.
 * Accetta stringhe come "100+", "15+", "4.9★": anima la parte numerica
 * e lascia intatto il resto. Il server renderizza già il valore finale
 * (lo vedono Google e chi ha JS spento o ha chiesto meno movimento).
 */
export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const target = parseFloat(match[1].replace(",", "."));
    const decimals = (match[1].split(/[.,]/)[1] ?? "").length;
    const suffix = match[2];
    const format = (n: number) => n.toFixed(decimals).replace(".", match[1].includes(",") ? "," : ".") + suffix;

    let raf = 0;
    el.textContent = format(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = format(target * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
}
