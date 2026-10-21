"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { User, Layers, Briefcase, FolderGit2, Award, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const GithubIcon = (props: React.ComponentProps<"svg">) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.8 0-1.5-.5-2.8-1.5-3.8.1-.4.7-1.8-.1-3.8 0 0-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.6 5 2 5 2a10.8 10.8 0 0 0-.1 3.8A5.4 5.4 0 0 0 3.4 9.6c0 5.3 3 6.5 6 6.8-.4.3-.8 1-.9 2-.9.4-3.1 1.1-4.5-1.3 0 0-.8-1.5-2.2-1.6 0 0-1.4-.1-.1 1 0 0 1 1.7 1.6 3.8 0 0 1.5.5 3.3-.2.1 1 .1 2.2.1 2.2"/></svg>;
const LinkedinIcon = (props: React.ComponentProps<"svg">) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const InstagramIcon = (props: React.ComponentProps<"svg">) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "About", href: "/#about", description: "Personal introduction & background", icon: User },
  { name: "Tech Stack", href: "/#tech-stack", description: "Tools, languages & frameworks", icon: Layers },
  { name: "Experience", href: "/#experience", description: "Career journey & education", icon: Briefcase },
  { name: "Projects", href: "/#projects", description: "Selected engineering case studies", icon: FolderGit2 },
  { name: "Certifications", href: "/#certifications", description: "Verified credentials & awards", icon: Award },
];

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/kevinndebrun/", icon: InstagramIcon },
  { name: "GitHub", href: "https://github.com/kevinvinn", icon: GithubIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/kevinriskyabadi/", icon: LinkedinIcon },
];

export function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu-dropdown"
          role="region"
          aria-label="Navigation menu"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-2 md:right-8 top-full mt-2 w-[min(320px,calc(100vw-1rem))] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden z-50"
        >
          <div className="p-4">
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-muted transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2"
                >
                  <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center group-hover:bg-background transition-colors">
                    <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{link.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs text-muted-foreground">{link.description}</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <h5 className="text-xs font-semibold text-center text-muted-foreground mb-4 uppercase tracking-wider">
                Connect With Me
              </h5>
              <div className="flex justify-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Kevin Risky on ${social.name}`}
                    title={social.name}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-foreground hover:text-background transition-colors text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
