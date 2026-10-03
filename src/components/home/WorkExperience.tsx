"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Clock, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { experienceData } from "@/data/experience";

export function WorkExperience() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    manggala: true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        {/* Left Column: Heading */}
        <div className="w-full md:w-1/3 shrink-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground md:sticky top-24 leading-tight">
            Experience
          </h2>
        </div>

        {/* Right Column: Timeline */}
        <div className="w-full md:w-2/3 relative">
          {/* Continuous Vertical Line */}
          <div className="absolute top-[12px] bottom-0 left-[7px] w-[2px] bg-[#00d0ff]" />

          <div className="flex flex-col gap-12">
            {experienceData.map((exp, idx) => {
              const isOpen = openItems[exp.id];
              const isLast = idx === experienceData.length - 1;

              return (
                <div key={exp.id} className="relative pl-10 lg:pl-12">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-0 top-[6px] w-[16px] h-[16px] rounded-full border-[3px] border-background ${
                      exp.isCurrent ? "bg-[#00d0ff]" : "bg-[#9ca3af]"
                    }`}
                  />

                  {/* Gray line for non-current experience */}
                  {!exp.isCurrent && !isLast && (
                    <div className="absolute top-[22px] -bottom-[48px] left-[7px] w-[2px] bg-[#9ca3af] z-10" />
                  )}

                  {/* Last item gray line */}
                  {!exp.isCurrent && (
                    <div className="absolute top-[6px] bottom-0 left-[7px] w-[2px] bg-[#9ca3af] z-10" />
                  )}

                  {/* Header */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground tracking-tight">
                    {exp.company}
                    <span className="text-muted-foreground font-normal mx-1">
                      —
                    </span>
                    {exp.role}
                  </h3>

                  {/* Metadata */}
                  <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground font-medium mb-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>

                    <span className="text-border mx-1">|</span>

                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-xs font-medium text-muted-foreground mb-5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{exp.duration}</span>
                  </div>

                  {/* Accordion Toggle */}
                  <button
                    onClick={() => toggleItem(exp.id)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                  >
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}

                    <span>
                      {isOpen ? "Hide highlights" : "Show highlights"}
                    </span>

                    <span>({exp.highlights.length})</span>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pb-2">
                          <div className="flex flex-col gap-3">
                            {exp.highlights.map((highlight, hIdx) => (
                              <div
                                key={hIdx}
                                className="flex items-start gap-3 group"
                              >
                                <div className="mt-[3px] flex-shrink-0 w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300 shadow-sm">
                                  <ChevronRight className="w-3 h-3" />
                                </div>
                                <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                                  {highlight}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
