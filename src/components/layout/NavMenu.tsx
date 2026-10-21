"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  returnFocusRef?: React.RefObject<HTMLButtonElement | null>;
}

const sectionLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Tech Stack", href: "/#tech-stack" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/kevinvinn", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kevinriskyabadi/", external: true },
  { label: "Instagram", href: "https://www.instagram.com/kevinndebrun/", external: true },
  { label: "Email", href: "mailto:kevinrisky18@gmail.com", external: false },
];

export function NavMenu({ isOpen, onClose, onOpenSearch, returnFocusRef }: NavMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const restoreTriggerFocus = useCallback(() => {
    const trigger = triggerRef.current;
    if (trigger && document.contains(trigger)) {
      trigger.focus();
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = returnFocusRef?.current ?? (document.activeElement as HTMLElement);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!panelRef.current.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreTriggerFocus();
    };
  }, [isOpen, onClose, restoreTriggerFocus, returnFocusRef]);

  const handleSearch = () => {
    onClose();
    onOpenSearch();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] overflow-hidden">
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="absolute inset-0 bg-overlay-strong backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            id="site-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 32 }
            }
            className="absolute right-0 top-0 flex h-[100dvh] w-full flex-col overflow-y-auto overscroll-contain border-l border-border bg-surface px-5 pb-8 pt-6 text-foreground shadow-2xl sm:px-8 md:w-[62vw] md:max-w-[920px] md:px-14 md:pb-10 md:pt-8"
          >
            <div className="flex items-center justify-between border-b border-border pb-5">
              <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                Navigation
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Primary" className="mt-4 md:mt-5">
              <ul>
                {sectionLinks.map((link, index) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group flex items-center justify-between border-b border-border/70 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface md:py-2"
                    >
                      <span className="text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-foreground/85 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-foreground sm:text-4xl md:text-[2.55rem]">
                        {link.label}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              onClick={handleSearch}
              className="group mt-6 inline-flex w-fit items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface md:mt-8"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>Search projects</span>
              <span className="rounded border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                Ctrl K
              </span>
            </button>

            <div className="mt-auto pt-8">
              <div className="border-t border-border pt-6">
                <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Elsewhere</p>
                <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                  {socialLinks.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        {...(social.external ? { target: "_blank", rel: "noreferrer" } : {})}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      >
                        {social.label}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-muted-foreground/70">
                  &copy; 2026 Kevin Risky Abadi
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
