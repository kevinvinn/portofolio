"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun, ArrowUp } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

export function FloatingActions() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <button
        onClick={toggleTheme}
        className="w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors group"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
}
