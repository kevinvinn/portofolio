"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavMenu } from "./NavMenu";
import { SearchModal } from "./SearchModal";

const SCROLL_DELTA = 8;
const TOP_OFFSET = 32;
const SOLID_OFFSET = 24;

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const menuOpenRef = useRef(false);
  const searchTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const suppressScrollUntil = useRef(0);

  const isHome = pathname === "/";
  const showIntroMeta = isHome && !isScrolled;

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  useEffect(() => {
    menuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  // Global search shortcut stays available even though the header trigger moved into the panel.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsHidden(false);
        setIsMenuOpen(false);
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset visibility on navigation so a new page never starts with a hidden header.
  useEffect(() => {
    suppressScrollUntil.current = performance.now() + 500;
    const frame = window.requestAnimationFrame(() => {
      setIsHidden(false);
      lastScrollY.current = window.scrollY;
      setIsScrolled(window.scrollY > SOLID_OFFSET);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  // Keep the off-screen header out of the tab order while it is tucked away.
  useEffect(() => {
    headerRef.current?.toggleAttribute("inert", isHidden && !isMenuOpen);
  }, [isHidden, isMenuOpen]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const update = () => {
      ticking.current = false;
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastScrollY.current;

      if (menuOpenRef.current) {
        setIsHidden(false);
      } else if (currentY <= TOP_OFFSET) {
        setIsHidden(false);
      } else if (
        performance.now() > suppressScrollUntil.current &&
        Math.abs(delta) > SCROLL_DELTA
      ) {
        setIsHidden(delta > 0);
      }

      setIsScrolled(currentY > SOLID_OFFSET);
      lastScrollY.current = currentY;
    };

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimer.current !== null) window.clearTimeout(searchTimer.current);
    };
  }, []);

  const openSearchFromMenu = useCallback(() => {
    if (searchTimer.current !== null) window.clearTimeout(searchTimer.current);
    // Let the panel close and return focus to the menu button before search captures its trigger.
    searchTimer.current = window.setTimeout(() => {
      setIsHidden(false);
      setIsSearchOpen(true);
    }, 220);
  }, []);

  const openMenu = () => {
    setIsHidden(false);
    setIsMenuOpen(true);
  };

  return (
    <>
      <header
        ref={headerRef}
        aria-hidden={isHidden && !isMenuOpen ? true : undefined}
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform motion-reduce:transition-none",
          isHidden && !isMenuOpen ? "-translate-y-full" : "translate-y-0",
          showIntroMeta ? "text-hero-fg" : "text-foreground",
        ].join(" ")}
      >
        <div
          data-header-scrim="true"
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/40 to-transparent transition-opacity duration-500 motion-reduce:transition-none",
            showIntroMeta ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
        <div className="relative mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 md:h-24 md:px-10">
          <div className="flex min-w-0 items-center gap-4 md:gap-6">
            <Link
              href="/"
              aria-label="Kevin Risky Abadi, home"
              className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:h-16 md:w-16"
            >
              <svg
                viewBox="0 0 100 100"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full motion-safe:animate-[spin_28s_linear_infinite]"
              >
                <defs>
                  <path
                    id="kra-badge-path"
                    d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                  />
                </defs>
                <text className="fill-current" fontSize="8" letterSpacing="1.2">
                  <textPath
                    href="#kra-badge-path"
                    startOffset="0"
                    textLength="234"
                    lengthAdjust="spacingAndGlyphs"
                  >
                    KEVIN.DEV • FULLSTACK DEVELOPER •
                  </textPath>
                </text>
              </svg>
              <span className="text-[11px] font-semibold tracking-[0.08em] md:text-sm">KRA</span>
            </Link>

            {isHome && (
              <span
                data-header-meta="true"
                aria-hidden={!showIntroMeta || undefined}
                className={[
                  "hidden min-w-0 items-center gap-3 text-[10px] uppercase tracking-[0.28em] transition-[opacity,transform] duration-300 motion-reduce:transition-none sm:flex md:gap-4",
                  showIntroMeta
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0",
                ].join(" ")}
              >
                <span className="whitespace-nowrap text-hero-body">Portfolio 2026</span>
                <span aria-hidden="true" className="h-3 w-px bg-hero-divider" />
                <span className="whitespace-nowrap text-hero-body">Nganjuk, Indonesia</span>
              </span>
            )}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={openMenu}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="site-nav-panel"
            className={[
              "group inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:h-14 md:w-14",
              showIntroMeta
                ? "border-hero-border bg-hero-ghost-bg text-hero-fg hover:border-hero-border-strong hover:bg-hero-ghost-hover"
                : "border-border bg-background/55 text-foreground backdrop-blur-md hover:bg-surface-muted/85",
            ].join(" ")}
          >
            <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
              <span className="block h-px w-full bg-current transition-transform duration-300 group-hover:translate-x-0.5" />
              <span className="block h-px w-full bg-current transition-transform duration-300" />
            </span>
          </button>
        </div>
      </header>

      <NavMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        onOpenSearch={openSearchFromMenu}
        returnFocusRef={menuButtonRef}
      />
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
