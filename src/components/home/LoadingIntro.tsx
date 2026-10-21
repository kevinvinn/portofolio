"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface GreetingItem {
  text: string;
  lang: string;
}

const GREETINGS: GreetingItem[] = [
  { text: "Selamat datang", lang: "Indonesian" },
  { text: "Welcome", lang: "English" },
  { text: "ようこそ", lang: "Japanese" },
  { text: "欢迎", lang: "Chinese" },
  { text: "Sugeng rawuh", lang: "Javanese" },
];

const INTRO_SEEN_KEY = "hasSeenIntro";

export function LoadingIntro() {
  const [active, setActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const completedRef = useRef(false);
  const skipButtonRef = useRef<HTMLButtonElement>(null);

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    } catch {
      // Ignore storage restrictions (e.g. private browsing)
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("introComplete"));
    }

    setActive(false);
  }, []);

  // Check session storage on mount to avoid hydration mismatch
  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem(INTRO_SEEN_KEY);
      if (!hasSeen) {
        const timer = setTimeout(() => {
          setActive(true);
        }, 0);
        return () => clearTimeout(timer);
      }
    } catch {
      // In private browsing without sessionStorage access, bypass intro
    }
  }, []);

  // Lock body scroll while intro overlay is active
  useEffect(() => {
    if (!active) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [active]);

  // Focus skip button on activation for immediate keyboard accessibility
  useEffect(() => {
    if (active) {
      skipButtonRef.current?.focus();
    }
  }, [active]);

  // Keyboard Escape listener to skip
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, handleComplete]);

  // Main animation and sequence timer
  useEffect(() => {
    if (!active) return;

    // Reduced motion path: show final greeting statically, reach 100%, and finish quickly
    if (prefersReducedMotion) {
      const stepTimer = setTimeout(() => {
        setCurrentIndex(4);
        setProgress(100);
      }, 50);

      const finishTimer = setTimeout(() => {
        handleComplete();
      }, 350);

      return () => {
        clearTimeout(stepTimer);
        clearTimeout(finishTimer);
      };
    }

    // Sequence schedule (target 900–1,100ms per greeting, slightly longer hold on final greeting,
    // total duration ~5.45s to dismiss, ~5.9s including exit transition):
    //
    // - t = 30ms:    Greeting 0 (Indonesian: "Selamat datang") -> progress 22% (displayed 0 -> 1000ms: 1000ms)
    // - t = 1000ms:  Greeting 1 (English: "Welcome")          -> progress 44% (displayed 1000 -> 2000ms: 1000ms)
    // - t = 2000ms:  Greeting 2 (Japanese: "ようこそ")        -> progress 66% (displayed 2000 -> 3000ms: 1000ms)
    // - t = 3000ms:  Greeting 3 (Chinese: "欢迎")             -> progress 88% (displayed 3000 -> 4000ms: 1000ms)
    // - t = 4000ms:  Greeting 4 (Javanese: "Sugeng rawuh")    -> progress 95% (held at 95% while reading: 1200ms)
    // - t = 5200ms:  Final greeting reading duration complete -> progress 100%
    // - t = 5450ms:  250ms confirmation at 100%               -> trigger handleComplete()
    //
    // Safety fallback: guaranteed dismiss at 7.5s if timers stall or tab is backgrounded.
    const timeouts: NodeJS.Timeout[] = [];

    // Greeting 0: Indonesian
    timeouts.push(
      setTimeout(() => {
        setCurrentIndex(0);
        setProgress(22);
      }, 30)
    );

    // Greeting 1: English
    timeouts.push(
      setTimeout(() => {
        setCurrentIndex(1);
        setProgress(44);
      }, 1000)
    );

    // Greeting 2: Japanese
    timeouts.push(
      setTimeout(() => {
        setCurrentIndex(2);
        setProgress(66);
      }, 2000)
    );

    // Greeting 3: Chinese
    timeouts.push(
      setTimeout(() => {
        setCurrentIndex(3);
        setProgress(88);
      }, 3000)
    );

    // Greeting 4: Javanese (Sugeng rawuh) — progress held at 95% while user reads text
    timeouts.push(
      setTimeout(() => {
        setCurrentIndex(4);
        setProgress(95);
      }, 4000)
    );

    // Final greeting reading completes: reach 100%
    timeouts.push(
      setTimeout(() => {
        setProgress(100);
      }, 5200)
    );

    // Brief confirmation at 100% before starting dismissal
    timeouts.push(
      setTimeout(() => {
        handleComplete();
      }, 5450)
    );

    // Hard safety fallback to ensure page interaction is never permanently blocked
    const safetyTimeout = setTimeout(() => {
      handleComplete();
    }, 7500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(safetyTimeout);
    };
  }, [active, prefersReducedMotion, handleComplete]);

  if (!active) {
    return null;
  }

  return (
    <AnimatePresence>
      {active && (
        <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="Loading introduction"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -24,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] bg-background text-foreground select-none overflow-hidden"
        >
          {/* Top Bar: Editorial Brand & Accessible Skip Button */}
          <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-6 sm:p-10 md:p-12">
            <span className="font-signature text-2xl sm:text-3xl text-foreground/80 tracking-wide select-none">
              Kevin Risky
            </span>
            <button
              ref={skipButtonRef}
              type="button"
              onClick={handleComplete}
              aria-label="Skip introduction"
              className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded border border-border/60 hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer"
            >
              Skip [Esc]
            </button>
          </header>

          {/* Exact Viewport Center: Active Greeting */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 14 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -14 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.28,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center justify-center gap-3.5 sm:gap-5"
                >
                  <span
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary shrink-0 animate-pulse"
                    aria-hidden="true"
                  />
                  <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground select-text font-sans">
                    {GREETINGS[currentIndex].text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Bar: Language Tag & Progress Indicator */}
          <footer className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-10 md:p-12 space-y-3">
            <div className="max-w-4xl mx-auto w-full space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between text-xs font-mono tracking-wider">
                <span className="text-muted-foreground uppercase">
                  {GREETINGS[currentIndex].lang}
                </span>
                <span className="text-foreground font-semibold tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-[2px] bg-border overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-primary"
                  style={{ width: `${progress}%` }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.35,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
          </footer>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
