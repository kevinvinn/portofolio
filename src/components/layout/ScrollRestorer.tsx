"use client";

import { useEffect, useRef } from "react";

export function ScrollRestorer() {
  const isRestoredRef = useRef(false);

  useEffect(() => {
    // Disable browser's default scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Always start at top immediately
    window.scrollTo(0, 0);

    const isHomepage = window.location.pathname === "/";
    let hasSeenIntro = false;
    try {
      hasSeenIntro = sessionStorage.getItem("hasSeenIntro") === "true";
    } catch {
      hasSeenIntro = true;
    }

    // Read saved scroll position BEFORE any initial scroll events can overwrite it.
    // Only the homepage is restored; nested routes always open at the top.
    let targetScroll = 0;
    if (isHomepage) {
      try {
        const savedScroll = sessionStorage.getItem("scrollPosition");
        if (savedScroll) {
          targetScroll = parseInt(savedScroll, 10);
        }
      } catch {
        targetScroll = 0;
      }
    }

    const restoreScroll = () => {
      if (targetScroll > 0) {
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }
      // Allow future user scroll events to be saved after restoration has settled
      setTimeout(() => {
        isRestoredRef.current = true;
      }, 300);
    };

    // If on homepage and intro is active for this session, wait for intro completion
    if (isHomepage && !hasSeenIntro) {
      let restored = false;
      let transitionTimer: NodeJS.Timeout | null = null;

      const onIntroComplete = () => {
        if (restored) return;
        restored = true;
        // Wait briefly for intro curtain exit transition (450ms)
        transitionTimer = setTimeout(restoreScroll, 200);
      };

      window.addEventListener("introComplete", onIntroComplete, { once: true });

      // Fallback timeout adjusted to 8s (well beyond the 5.5s intro duration)
      // ensures scroll restoration is never blocked if an event is dropped
      const fallbackTimeout = setTimeout(() => {
        if (!restored) {
          restored = true;
          restoreScroll();
        }
      }, 8000);

      return () => {
        window.removeEventListener("introComplete", onIntroComplete);
        clearTimeout(fallbackTimeout);
        if (transitionTimer) clearTimeout(transitionTimer);
      };
    }

    // On subsequent visits or non-homepage routes, restore after standard delay
    const timeout = setTimeout(restoreScroll, 400);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Save scroll position only after initial restoration has completed.
    // This prevents window.scrollTo(0, 0) or layout initialization from
    // overwriting the saved scroll position with 0.
    const handleScroll = () => {
      if (!isRestoredRef.current) return;
      try {
        sessionStorage.setItem("scrollPosition", window.scrollY.toString());
      } catch {
        // Ignore storage restrictions
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
