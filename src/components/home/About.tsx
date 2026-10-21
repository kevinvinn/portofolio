"use client";

import React from "react";
import { Server, Lightbulb, Users, Layers, GraduationCap, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

const PILLARS = [
  { id: "backend", icon: Server },
  { id: "problem-solving", icon: Lightbulb },
  { id: "collaboration", icon: Users },
  { id: "fullstack", icon: Layers },
] as const;

export function About() {
  const { copy } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="w-full max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 border-t border-border/60">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs font-mono font-semibold tracking-widest text-primary uppercase">
          {copy.about.eyebrow}
        </span>
        <div className="h-[1px] w-12 bg-border" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* Left Column: Natural Personal Narrative */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex flex-col space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {copy.about.heading}
          </h2>

          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>{copy.about.paragraphs.intro}</p>
            <p>{copy.about.paragraphs.craft}</p>
          </div>

          {/* Verified Metadata Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-surface-muted text-xs font-medium text-foreground">
              <GraduationCap className="w-4 h-4 text-primary shrink-0" />
              <span>{copy.about.education}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-surface-muted text-xs font-medium text-foreground">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>{copy.about.location}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 2x2 Neo-Brutalist Strengths Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const pillarCopy = copy.about.pillars[pillar.id];
            return (
              <motion.div
                key={pillar.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : idx * 0.1 }}
                className="group p-6 rounded-2xl bg-surface border-2 border-border-strong shadow-brutal-sm hover:shadow-brutal hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-surface-muted border border-border flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">
                    {pillarCopy.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillarCopy.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
