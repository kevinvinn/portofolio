"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Clock, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { experienceData } from "@/data/experience";
import { useLanguage } from "@/components/language-provider";
import { fill } from "@/lib/i18n";

export function WorkExperience() {
  const { language, copy } = useLanguage();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    manggala: true,
  });
  const prefersReducedMotion = useReducedMotion();

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 border-t border-border/60">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs font-mono font-semibold tracking-widest text-primary uppercase">
          {copy.experience.eyebrow}
        </span>
        <div className="h-[1px] w-12 bg-border" />
      </div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        {/* Left Column: Heading */}
        <div className="w-full md:w-1/3 shrink-0">
          <div className="md:sticky top-28 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
              {copy.experience.title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {copy.experience.intro}
            </p>
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="w-full md:w-2/3 relative">
          {/* Continuous Vertical Track Line */}
          <div className="absolute top-[12px] bottom-0 left-[7px] w-[2px] bg-border" />

          <div className="flex flex-col gap-12">
            {experienceData.map((exp, idx) => {
              const isOpen = openItems[exp.id];
              const isLast = idx === experienceData.length - 1;

              return (
                <motion.div
                  key={exp.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    delay: prefersReducedMotion ? 0 : idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative pl-10 lg:pl-12 group/card"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-0 top-[6px] w-[16px] h-[16px] rounded-full border-[3px] border-background z-20 transition-transform duration-300 group-hover/card:scale-125 ${
                      exp.isCurrent
                        ? "bg-primary shadow-[0_0_12px_var(--color-primary)]"
                        : "bg-muted-foreground/60"
                    }`}
                  />

                  {/* Active segment line highlight */}
                  {exp.isCurrent && !isLast && (
                    <div className="absolute top-[22px] -bottom-[48px] left-[7px] w-[2px] bg-primary z-10" />
                  )}

                  {/* Card Container with subtle hover glow */}
                  <div className="p-5 sm:p-6 rounded-2xl border border-transparent hover:border-border/80 hover:bg-surface-muted/50 dark:hover:bg-surface-muted/20 transition-all duration-300">
                    {/* Header */}
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground tracking-tight">
                      {exp.company}
                      <span className="text-muted-foreground font-normal mx-2">
                        —
                      </span>
                      <span className="text-foreground/90 font-semibold text-lg md:text-xl">
                        {exp.role[language]}
                      </span>
                    </h3>

                    {/* Metadata */}
                    <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground font-medium mb-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-muted-foreground/80" />
                        <span>{exp.location[language]}</span>
                      </div>

                      <span className="text-border mx-1">|</span>

                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-muted-foreground/80" />
                        <span>{exp.period[language]}</span>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-muted border border-border/60 rounded-full text-xs font-mono text-muted-foreground mb-4">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{exp.duration[language]}</span>
                    </div>

                    {/* Accordion Toggle */}
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleItem(exp.id)}
                        aria-expanded={isOpen}
                        aria-controls={`exp-highlights-${exp.id}`}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md py-1 px-1.5 -ml-1.5 cursor-pointer"
                      >
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-primary" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}

                        <span>
                          {isOpen
                            ? copy.experience.hideAchievements
                            : copy.experience.viewAchievements}
                        </span>

                        <span className="text-xs font-mono text-muted-foreground/70">
                          ({exp.highlights[language].length})
                        </span>
                      </button>
                    </div>

                    {/* Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`exp-highlights-${exp.id}`}
                          role="region"
                          aria-label={fill(copy.experience.highlightsFor, {
                            company: exp.company,
                          })}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: prefersReducedMotion ? 0 : 0.28,
                            ease: "easeInOut",
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pb-2">
                            <ul role="list" className="flex flex-col gap-2.5">
                              {exp.highlights[language].map((highlight, hIdx) => (
                                <li
                                  key={hIdx}
                                  className="flex items-start gap-3 group/item"
                                >
                                  <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-surface-muted border border-border flex items-center justify-center text-muted-foreground group-hover/item:text-primary group-hover/item:border-primary transition-colors">
                                    <ChevronRight className="w-3 h-3" />
                                  </div>
                                  <span className="text-sm text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors">
                                    {highlight}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
