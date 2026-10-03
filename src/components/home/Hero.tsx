"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContactModal } from "../layout/ContactModal";

export function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl w-full mx-auto text-center flex flex-col items-center gap-6">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background/50 backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-foreground">
              Available for new project
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
              Turning ideas into{" "}
              <br className="hidden sm:block" />
              exceptional digital products.
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Fullstack Developer crafting clean interfaces and scalable systems —
            where thoughtful design meets solid engineering.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => setIsContactOpen(true)}
              className="group relative inline-flex items-center gap-3 bg-foreground text-background rounded-full pl-2 pr-6 py-2 transition-transform hover:scale-105 active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center overflow-hidden border-2 border-foreground">
                <img src="/pp.jfif" alt="Kevin R" className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-base">Get in touch</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal Link Hub */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
