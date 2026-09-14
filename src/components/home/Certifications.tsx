"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { CertificationModal } from "../layout/CertificationModal";

const certifications = [
  {
    id: "1",
    title:
      "Back End JavaScript - With AI Literacy & Global Certification Class",
    issuer: "Binar Academy",
    validity: "2024",
    image: "/docs/sertif 1.png",
  },
  {
    id: "2",
    title: "Red Hat System Administration I (RH124 - RHA) - Ver. 9.3",
    issuer: "Red Hat",
    validity: "2026",
    // Ganti dengan file sertifikat Red Hat milik Kevin
    image: "/docs/sertif 2.png",
  },
  {
    id: "3",
    title: "Magang PT Manggala Teknologi Nusantara",
    issuer: "PT Manggala Teknologi Nusantara",
    validity: "2025",
    image: "/docs/sertif 3.png",
  },
];

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8 border-t border-border/50 bg-muted/10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          My Certifications
        </h2>

        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          Certificates and achievements from my academic and professional
          development journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group flex flex-col bg-background border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedCert(cert.id)}
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] bg-muted w-full overflow-hidden">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col">
              {/* Metadata */}
              <div className="flex items-center justify-between mb-4 gap-3">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-sm font-semibold text-muted-foreground truncate">
                    {cert.issuer}
                  </span>

                  <BadgeCheck className="w-4 h-4 text-green-500 shrink-0" />
                </div>

                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full text-xs font-bold tracking-wide shrink-0">
                  {cert.validity}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-6 line-clamp-2">
                {cert.title}
              </h3>

              {/* Action */}
              <div className="mt-auto pt-4">
                <button className="w-full py-3 rounded-full bg-muted text-foreground font-semibold text-sm group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <CertificationModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        cert={certifications.find((c) => c.id === selectedCert)}
      />
    </section>
  );
}
