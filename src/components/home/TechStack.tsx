"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";
import { techCategories } from "@/data/tech";

export function TechStack() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="tech-stack" className="w-full py-24 border-t border-border/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Chapter Marker */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono font-semibold tracking-widest text-primary uppercase">
            02 // TECH STACK
          </span>
          <div className="h-[1px] w-12 bg-border" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Tools &amp; Technologies
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mt-3">
              The languages, frameworks, databases, and workflow tools I use to design and build software.
            </p>
          </div>
          <span className="text-xs font-mono text-muted-foreground/80 hidden sm:inline-block">
            HOVER OR FOCUS TO PAUSE
          </span>
        </div>
      </div>

      {/* 4 Category Rows */}
      <div className="w-full space-y-12">
        {techCategories.map((category, catIdx) => {
          const isMoveLeft = catIdx % 2 === 0;
          // Repeat items sufficiently so the ribbon seamlessly loops on wide viewports
          const repeatCount = category.items.length <= 4 ? 6 : 4;
          const repeatedItems = Array.from({ length: repeatCount }, () => category.items).flat();

          return (
            <div key={category.id} className="w-full">
              {/* Category Label */}
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground/90 font-semibold">
                  {`0${catIdx + 1}. ${category.label}`}
                </span>
              </div>

              {/* Reduced Motion Static Fallback */}
              {prefersReducedMotion ? (
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ul
                    role="list"
                    aria-label={`${category.label} technologies`}
                    className="flex flex-wrap items-center gap-8 py-3"
                  >
                    {category.items.map((item) => (
                      <li
                        key={item.name}
                        className="inline-flex items-center gap-3 py-1.5 focus:outline-none"
                      >
                        {item.icon ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={item.icon}
                            alt=""
                            aria-hidden="true"
                            className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-red-600 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0"
                          >
                            {item.fallbackText || "ODC"}
                          </span>
                        )}
                        <span className="text-base sm:text-lg font-medium text-foreground">
                          {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                /* Moving Marquee Track */
                <div
                  tabIndex={0}
                  aria-label={`${category.label} list. Press Tab or hover to pause motion.`}
                  className="marquee-pause relative flex w-full max-w-[100vw] overflow-hidden py-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
                >
                  {/* Left and Right Gradient Fade Masks */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-background to-transparent z-10" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-background to-transparent z-10" />

                  <div
                    className={`flex whitespace-nowrap gap-12 sm:gap-16 items-center px-4 ${
                      isMoveLeft ? "animate-marquee-left" : "animate-marquee-right"
                    }`}
                  >
                    {repeatedItems.map((item, idx) => (
                      <div
                        key={`${category.id}-${item.name}-${idx}`}
                        className="group/item inline-flex items-center gap-3 cursor-default select-none transition-transform duration-200 hover:scale-105"
                      >
                        {item.icon ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={item.icon}
                            alt=""
                            aria-hidden="true"
                            className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform group-hover/item:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-red-600 text-white font-mono font-bold text-[11px] flex items-center justify-center shrink-0 shadow-sm"
                          >
                            {item.fallbackText || "ODC"}
                          </span>
                        )}
                        <span className="text-lg sm:text-xl font-medium tracking-tight text-foreground/85 group-hover/item:text-foreground transition-colors">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
