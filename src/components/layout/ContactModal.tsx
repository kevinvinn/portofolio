"use client";

import React from "react";
import { Mail, Link as LinkIcon, ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const GithubIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.8 0-1.5-.5-2.8-1.5-3.8.1-.4.7-1.8-.1-3.8 0 0-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.6 5 2 5 2a10.8 10.8 0 0 0-.1 3.8A5.4 5.4 0 0 0 3.4 9.6c0 5.3 3 6.5 6 6.8-.4.3-.8 1-.9 2-.9.4-3.1 1.1-4.5-1.3 0 0-.8-1.5-2.2-1.6 0 0-1.4-.1-.1 1 0 0 1 1.7 1.6 3.8 0 0 1.5.5 3.3-.2.1 1 .1 2.2.1 2.2"/></svg>;
const LinkedinIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const InstagramIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contactLinks = [
  { name: "Email", handle: "kevinrisky18@gmail.com", href: "mailto:kevinrisky18@gmail.com", icon: Mail },
  { name: "LinkedIn", handle: "linkedin.com/in/kevinriskyabadi", href: "https://www.linkedin.com/in/kevinriskyabadi/", icon: LinkedinIcon },
  { name: "GitHub", handle: "github.com/kevinvinn", href: "https://github.com/kevinvinn", icon: GithubIcon },
  { name: "Instagram", handle: "@kevinndebrun", href: "https://www.instagram.com/kevinndebrun/", icon: InstagramIcon },
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        {/* Dark Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-sm bg-background rounded-3xl shadow-2xl overflow-hidden border border-border flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-border/50">
            <div>
              <h2 className="text-xl font-bold text-foreground">Get in touch</h2>
              <p className="text-sm text-muted-foreground mt-1">Choose a platform to connect</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links List */}
          <div className="p-6 pt-4 space-y-3">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl border border-border hover:border-foreground/20 hover:shadow-sm transition-all group bg-background"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                    <link.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{link.name}</div>
                    <div className="text-xs text-muted-foreground">{link.handle}</div>
                  </div>
                </div>
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}