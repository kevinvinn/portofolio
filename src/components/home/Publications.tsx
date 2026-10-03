"use client";

import React, { useState } from "react";
import { ExternalLink, Search } from "lucide-react";

const publications = [
  {
    id: "1",
    year: "2026",
    title:
      "Evaluasi YOLOv8 Nano Untuk Deteksi Logistik Pendaki Pada Clutter Ekstrem",
    author: "Kevin Risky Abadi, Erna Daniati, Aidina Ristyawan",
    journal: "Bulletin of Information Technology (BIT), 7(2), 289-301",
    link: "https://doi.org/10.47065/bit.v7i2.2786",
    pdf: "https://journal.fkpt.org/index.php/BIT/article/view/2786",
  },
  {
    id: "2",
    year: "2026",
    title:
      "KOPINANG : Inisiatif Lokal dalam Pemberdayaan Ekonomi Masyarakat Kelurahan Pakelan",
    author:
      "Fikka Yuliastuti, Diky Chandra, Rohan Ananta, Syahril Ghufron Akhsani, Kevin Risky Abadi, et al.",
    journal:
      "Proceedings of The National Conference on Community Engagement, 3, 600-609",
    link: "https://doi.org/10.29407/qmw7t959",
    pdf: "https://proceeding.unpkediri.ac.id/index.php/pncce/article/view/qmw7t959",
  },
  {
    id: "3",
    year: "2025",
    title:
      "Analisis Sentimen Dalam Tokopedia Terhadap Ulasan Pelanggan Menggunakan Metode Naïve Bayes",
    author: "Rayhan Ferdiansyah, Kevin Risky Abadi, Erna Daniati",
    journal:
      "Prosiding SEMNAS INOTEK (Seminar Nasional Inovasi Teknologi), 9(1), 024-029",
    link: "https://proceeding.unpkediri.ac.id/index.php/inotek/article/view/5239",
    pdf: "#",
  },
];

export function Publications() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPubs = publications.filter(
    (pub) =>
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8 border-t border-border/50">
      {/* Header with Metrics */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
          Publications
        </h2>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto mb-8">
          Research and writing that goes beyond the screen — ideas documented, peer-reviewed, and published.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-10 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-foreground text-background">
            All
          </span>
          <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-border cursor-pointer">
            2025
          </span>
          <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-border cursor-pointer">
            2024
          </span>
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-6">
        {filteredPubs.map((pub, idx) => (
          <div
            key={pub.id}
            className="group flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-6 rounded-2xl hover:bg-muted/30 transition-colors border border-transparent hover:border-border/50"          >
            {/* Year Column */}
            <div className="md:w-16 flex-shrink-0 pt-1">
              <div className="font-bold text-foreground">{pub.year}</div>
              <div className="text-xs text-muted-foreground mt-1">
                #{filteredPubs.length - idx}
              </div>
            </div>

            {/* Content Column */}
            <div className="flex-1">
              <a
                href={pub.link}
                className="inline-flex items-start gap-2 group/link"
              >
                <h3 className="text-lg font-bold text-foreground underline decoration-border group-hover/link:decoration-foreground transition-colors leading-tight">
                  {pub.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/link:text-foreground mt-1 flex-shrink-0" />
              </a>
              <div className="text-foreground font-medium mt-2 text-sm">
                {pub.author}
              </div>
              <div className="text-muted-foreground italic text-sm mt-1 leading-relaxed">
                {pub.journal}
              </div>
            </div>

            {/* Action Column */}
            <div className="pt-2 md:pt-0 flex items-start justify-start md:justify-end">
              <a
                href={pub.pdf}
                className="bg-foreground text-background px-5 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform"
              >
                PDF
              </a>
            </div>
          </div>
        ))}
        {filteredPubs.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No publications found.
          </div>
        )}
      </div>
    </section>
  );
}
