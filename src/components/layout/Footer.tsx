"use client";

import React, { useState } from "react";
import { MessageCircle, Link as LinkIcon, Send } from "lucide-react";
import { ContactModal } from "../layout/ContactModal";

const YoutubeIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>;

export function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-background border-t border-border pt-20 pb-8 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top CTA Area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20">
            <div className="max-w-md">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 leading-tight">
                <span className="flex items-center gap-3">
                  <span className="text-4xl md:text-5xl">💡</span>
                  Let's build something
                </span>
                <span className="block mt-1">remarkable.</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Have a project in mind or just want to connect? I'm always open to meaningful collaborations and new challenges.
              </p>
            </div>
            
            <div className="relative flex flex-col items-center gap-4">
              <button
                onClick={() => setIsContactOpen(true)}
                className="relative inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black rounded-full pl-2 pr-6 py-2 transition-transform hover:scale-105 shadow-xl"
              >
                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center overflow-hidden">
                  <img src="/pp.jfif" alt="Kevin" className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold text-sm">Get in touch</span>
              </button>
              <div className="hidden md:block absolute -left-12 -bottom-12 w-20 h-20 opacity-80 pointer-events-none animate-pulse">
                {/* SVG representing the cursor/arrow graphic */}
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 20 L80 40 L50 50 L40 80 Z" fill="#4f46e5" stroke="#312e81" strokeWidth="2" />
                  <path d="M50 50 L80 40 L65 55 Z" fill="#818cf8" />
                  <path d="M50 50 L40 80 L55 65 Z" fill="#3730a3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-muted-foreground text-sm font-medium">
              2026 • <span className="font-signature text-foreground text-lg ml-1">Kevin Risky</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="mailto:kevinrisky18@gmail.com" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted text-foreground transition-colors">
                <span className="font-bold text-xl leading-none">@</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted text-foreground transition-colors">
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted text-foreground transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://sfauzi.dev/connect" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted text-foreground transition-colors">
                <LinkIcon className="w-5 h-5" />
              </a>
            </div>

            <div className="text-muted-foreground text-sm font-medium">
              ID Nganjuk, Indonesia
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal Link Hub */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
