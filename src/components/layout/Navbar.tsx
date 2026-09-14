"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { MenuDropdown } from "./MenuDropdown";
import { SearchModal } from "./SearchModal";

const GithubIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.8 0-1.5-.5-2.8-1.5-3.8.1-.4.7-1.8-.1-3.8 0 0-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.6 5 2 5 2a10.8 10.8 0 0 0-.1 3.8A5.4 5.4 0 0 0 3.4 9.6c0 5.3 3 6.5 6 6.8-.4.3-.8 1-.9 2-.9.4-3.1 1.1-4.5-1.3 0 0-.8-1.5-2.2-1.6 0 0-1.4-.1-.1 1 0 0 1 1.7 1.6 3.8 0 0 1.5.5 3.3-.2.1 1 .1 2.2.1 2.2"/></svg>;
const LinkedinIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <nav className="max-w-6xl mx-auto px-4 lg:py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <img 
                  src="/header.png" 
                  alt="Kevin R Logo" 
                  className="h-8 w-auto object-contain dark:invert transition-transform duration-300 group-hover:scale-105" 
                />
              </Link>
            </div>

            {/* Desktop & Right Side */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-border hover:bg-foreground hover:text-background transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                <span className="absolute top-full mt-2 px-2 py-1 rounded bg-foreground text-background text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Search (Ctrl+K)
                </span>
              </button>

              {/* Social Icons (Hidden on very small screens) */}
              <div className="hidden md:flex items-center space-x-4 ml-2">
                <a href="https://github.com/kevinvinn" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <GithubIcon className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/kevinriskyabadi/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <LinkedinIcon className="w-6 h-6" />
                </a>
              </div>

              {/* Hamburger Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="ml-2 relative p-2 focus:outline-none transition-transform duration-300 hover:scale-105"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
        
        {/* Floating Dropdown Component */}
        <MenuDropdown isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </header>

      {/* Command Palette Search Modal Component */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
