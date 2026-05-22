"use client";

import { useEffect } from "react";

/**
 * Mount once near the top of a page (e.g. inside <main> root) and any
 * descendant element with the `.reveal` class will fade-and-rise in when
 * it scrolls into view. Add `.d1` / `.d2` / `.d3` / `.d4` to stagger.
 */
export default function RevealMount() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
