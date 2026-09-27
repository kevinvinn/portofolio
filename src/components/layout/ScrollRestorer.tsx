"use client";

import { useEffect } from "react";

export function ScrollRestorer() {
  useEffect(() => {
    // Disable browser's default scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Always start at top immediately
    window.scrollTo(0, 0);

    const savedScroll = sessionStorage.getItem("scrollPosition");
    
    // Wait a brief moment to let user see the top, then smoothly scroll down
    if (savedScroll && parseInt(savedScroll) > 0) {
      const timeout = setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScroll),
          behavior: "smooth",
        });
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    // Save scroll position
    const handleScroll = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}