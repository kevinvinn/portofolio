"use client";

import React from "react";
import { motion } from "framer-motion";

const clients = [
  "Acme Corp",
  "Global Tech",
  "Innovate Labs",
  "Nexus Systems",
  "Quantum Web",
  "Starlight Media",
];

export function Marquee() {
  return (
    <section className="w-full border-y border-border/50 bg-muted/20 py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Trusted by innovative companies
        </p>
      </div>
      
      {/* Marquee Container */}
      <div className="relative flex max-w-[100vw] overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-12 md:gap-24 items-center px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {/* We duplicate the list to make the loop seamless */}
          {[...clients, ...clients].map((client, idx) => (
            <div 
              key={idx} 
              className="text-2xl md:text-3xl font-bold text-muted-foreground/40 hover:text-foreground/80 transition-colors cursor-default select-none grayscale hover:grayscale-0"
            >
              {client}
            </div>
          ))}
        </motion.div>
        
        {/* Gradient fades on the edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
