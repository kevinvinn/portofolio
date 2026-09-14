"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    id: "manggala",
    company: "PT Manggala Teknologi Nusantara",
    role: "Backend Development Intern / Peserta PKL",
    location: "Kediri, Jawa Timur",
    period: "Juli 2025 — September 2025",
    duration: "3 months",
    isCurrent: false,
    highlights: [
      "Mengembangkan backend JEPRETIN menggunakan Node.js, Express.js, PostgreSQL, dan Prisma.",
      "Mengembangkan REST API, database, authentication, authorization, dan validasi.",
      "Mengintegrasikan Midtrans, membuat API documentation, testing dengan Jest, dan deployment Railway.",
      "Berkolaborasi dalam tim 4 orang menggunakan GitHub, branching, pull request, dan merge.",
    ],
  },
  {
    id: "sky-ticket",
    company: "Binar Academy",
    role: "Back End JavaScript - With AI Literacy & Global Certification Class — MSIB Studi Independen",
    location: "Remote",
    period: "September 2024 — Desember 2024",
    duration: "4 months",
    isCurrent: false,
    highlights: [
      "Mengembangkan backend Sky Ticket, website pemesanan tiket pesawat bersama tim 8 orang.",
      "Mendesain database dan relasi menggunakan PostgreSQL dan Prisma serta mengembangkan REST API.",
      "Mengimplementasikan authentication menggunakan JWT, OTP email, Google OAuth, role-based access, dan refresh token.",
      "Melakukan testing dengan Jest serta deployment ke AWS menggunakan CI/CD GitHub Actions.",
    ],
  },
  {
    id: "unpkediri",
    company: "Universitas Nusantara PGRI Kediri",
    role: "S1 Sistem Informasi",
    location: "Kediri, Jawa Timur",
    period: "2022 — 2026",
    duration: "4 years",
    isCurrent: false,
    highlights: [
      "Mempelajari pemrograman, analisis dan perancangan sistem, database, web development, proses bisnis, dan UI/UX.",
      "Menyelesaikan skripsi mengenai evaluasi kinerja YOLOv8 Nano untuk deteksi multi-objek logistik pendaki.",
      "Mengembangkan kemampuan analisis, problem solving, dan kerja tim melalui berbagai project selama perkuliahan.",
    ],
  },
];

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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground sticky top-24 leading-tight">
            Experience
          </h2>
        </div>

        {/* Right Column: Timeline */}
        <div className="w-full md:w-2/3 relative">
          {/* Continuous Vertical Line */}
          <div className="absolute top-[12px] bottom-0 left-[7px] w-[2px] bg-[#00d0ff]" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, idx) => {
              const isOpen = openItems[exp.id];
              const isLast = idx === experiences.length - 1;

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
                          <ul className="space-y-3 pl-4 border-l-[1.5px] border-border/60">
                            {exp.highlights.map((highlight, hIdx) => (
                              <li
                                key={hIdx}
                                className="relative text-sm text-muted-foreground leading-relaxed pl-1 before:content-[''] before:absolute before:-left-[21px] before:top-[8px] before:w-[5px] before:h-[5px] before:bg-muted-foreground/50 before:rounded-full"
                              >
                                {highlight}
                              </li>
                            ))}
                          </ul>
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
