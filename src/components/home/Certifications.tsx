"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CertificationModal } from "../layout/CertificationModal";
import { certificationsData } from "@/data/certifications";
import { useLanguage } from "@/components/language-provider";
import { fill } from "@/lib/i18n";

export function Certifications() {
  const { copy } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track mouse coordinates within the certifications section for floating preview
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const activeCert = certificationsData.find((c) => c.id === hoveredCert);

  return (
    <section
      id="certifications"
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden border-t border-border bg-background px-4 py-24 text-foreground sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="relative z-10 mx-auto max-w-6xl" ref={containerRef}>
        {/* Editorial Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                {copy.certifications.eyebrow}
              </span>
              <div className="h-[1px] w-12 bg-border" />
            </div>
            <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {copy.certifications.title}
            </h2>
          </div>
          <p className="max-w-md text-sm font-light text-muted-foreground sm:text-base">
            {copy.certifications.intro}
          </p>
        </div>

        {/* Editorial Horizontal List */}
        <div className="divide-y divide-border border-b border-border">
          {certificationsData.map((cert) => (
            <button
              key={cert.id}
              type="button"
              onClick={() => setSelectedCert(cert.id)}
              aria-label={fill(copy.certifications.openDetails, {
                title: cert.title,
              })}
              onMouseEnter={() => setHoveredCert(cert.id)}
              onMouseLeave={() => setHoveredCert(null)}
              onFocus={() => setHoveredCert(cert.id)}
              onBlur={() => setHoveredCert(null)}
              className="group -mx-4 flex w-full cursor-pointer flex-col justify-between gap-4 rounded-xl px-4 py-8 text-left transition-colors duration-200 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-6 sm:py-10 md:flex-row md:items-center"
            >
              {/* Left Column: Year */}
              <div className="w-24 shrink-0 font-mono text-sm font-semibold text-muted-foreground transition-colors group-hover:text-primary sm:text-base">
                [{cert.validity}]
              </div>

              {/* Center Column: Certificate Title */}
              <div className="min-w-0 flex-1 pr-4">
                <h3 className="text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-2xl md:text-3xl">
                  {cert.title}
                </h3>
              </div>

              {/* Right Column: Issuer & Action */}
              <div className="flex shrink-0 items-center justify-between gap-6 pt-2 md:justify-end md:pt-0">
                <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground sm:text-base">
                  {cert.issuer}
                </span>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Hover Preview (Follows pointer on desktop without obscuring title) */}
      {!prefersReducedMotion && (
        <AnimatePresence>
          {activeCert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mousePos.x + 24,
                y: mousePos.y - 120,
              }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="pointer-events-none fixed z-50 hidden aspect-[4/3] w-72 overflow-hidden rounded-2xl border-2 border-border bg-surface shadow-2xl lg:block"
              style={{ left: 0, top: 0 }}
            >
              <Image
                src={activeCert.image}
                alt={activeCert.title}
                fill
                sizes="288px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 truncate font-mono text-xs font-medium text-white">
                {activeCert.issuer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Detailed Certificate Modal */}
      <CertificationModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        cert={certificationsData.find((c) => c.id === selectedCert)}
      />
    </section>
  );
}
