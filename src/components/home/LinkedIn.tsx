"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LinkedInModal } from "../layout/LinkedInModal";

const linkedinPosts = [
  {
    id: "1",
    date: "1 bln",
    text: `Beberapa bulan terakhir saya cukup banyak menghabiskan waktu ngulik backend untuk sebuah MVP project bernama Jepretin, platform marketplace jasa fotografi & videografi berbasis lokasi.

Di project ini saya berperan sebagai Backend Developer dalam tim berisi 4 orang. Fokus utama saya ada di API architecture, order workflow, payment integration, wallet system, sampai deployment menggunakan Railway + Docker.

Awalnya saya pikir backend itu mostly tentang CRUD API. Tapi setelah project mulai berkembang, ternyata challenge sebenarnya justru ada di business flow dan edge case.

Contohnya di order workflow.

Provider tidak bisa langsung mengubah order menjadi COMPLETED tanpa konfirmasi customer terlebih dahulu. Kelihatannya sederhana, tapi flow seperti ini cukup penting untuk customer protection dan mencegah premature order completion.

Selain itu, saya juga banyak belajar saat handling:
- Midtrans payment webhook
- wallet transaction flow
- modular API structure
- Prisma & PostgreSQL deployment
- Swagger API documentation
- Docker environment setup

Tech stack yang digunakan:
Node.js, Express.js, PostgreSQL, Prisma ORM, Midtrans, Railway, dan Docker.

Saat ini backend MVP sudah berhasil dideploy dan memiliki:
- Authentication & Role Management
- Provider Onboarding
- Booking & Order Workflow
- Payment Integration
- Wallet & Withdrawal System
- Review & Notification System
- OpenAPI Documentation

Project ini masih jauh dari sempurna, tapi dari sini saya mulai paham kalau backend development bukan cuma soal endpoint berjalan, tapi juga tentang bagaimana sebuah system bisa tetap reliable ketika business flow mulai kompleks.

Big thanks untuk seluruh tim yang sudah berkolaborasi di project ini ( Mochamad Abdul Azis, Aditya Arya Respati, AZRA'I MAHENDRA )

Swagger Docs:
https://lnkd.in/dZZQDN4Y
GitHub Repository:
https://lnkd.in/ddfJEqxh`,
    images: ["/1.1.jfif", "/1.2.jfif", "/1.3.jfif", "/1.4.jfif", "/1.5.jfif", "/1.6.jfif"]
  },
  {
    id: "2",
    date: "2 bln",
    text: `Pada 18 Juni 2025, saya berkesempatan mengikuti Pekan Inovasi kampus untuk menampilkan project aplikasi cuaca yang kami kembangkan di mata kuliah Pemrograman Mobile.
Di project ini saya dipercaya sebagai Project Manager sekaligus ikut membantu di sisi backend. Saya membagi tim ke dalam beberapa divisi dengan tech lead (Backend, Frontend, UI/UX) dan mengatur workflow menggunakan ClickUp dan berkolaborasi dengan GitHub agar proses kerja lebih terstruktur.
Melalui pengalaman ini, saya banyak belajar tentang koordinasi tim, komunikasi, dan bagaimana mempresentasikan hasil kerja di depan juri maupun pengunjung.
Terima kasih untuk seluruh tim yang sudah berkontribusi dan bekerja sama hingga project ini bisa kami tampilkan dengan baik. 
Mochamad Abdul Azis
Aditya Arya Respati
Rizal Syihab`,
    images: ["/2.1.jfif", "/2.2.jfif", "/2.3.jfif", "/2.4.jfif"]
  },
  {
    id: "3",
    date: "6 bln",
    text: `Halo semuanya! Saya Kevin Risky Abadi dari Universitas Nusantara PGRI Kediri, jurusan Sistem Informasi. Siap memulai petualangan baru di dunia Back-End Development bersama Binar Academy dalam program MSIB Kampus Merdeka Batch 7! 🚀

Saya tahu tentang Binar Academy lewat platform Kampus Merdeka, dan langsung tertarik buat ikut belajar di sini. Nggak sabar buat memperdalam ilmu dan pengalaman di bidang ini! 😄💻

Spesial terima kasih untuk Binar Academy dan Kampus Merdeka atas kesempatan luar biasa ini 🙏🙌 
#part_of_bejs_class_binar #MSIBBatch7 #BinarAcademy #BackEndJourney`,
    images: ["/3.1.jfif"]
  },
];

const LinkedinLogoFull = () => (
  <div className="flex items-center text-[#0a66c2] font-bold text-xl tracking-tighter">
    Linked<span className="bg-[#0a66c2] text-white rounded-[4px] px-1 ml-0.5 text-lg leading-tight">in</span>
  </div>
);

export function LinkedIn() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">My Recently in LinkedIn</h2>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          A glimpse into my latest activities, thoughts, and professional journey—directly from my LinkedIn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {linkedinPosts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col h-[220px] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-2.5">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src="/pp.jfif" 
                    alt="Kevin Risky Abadi" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-sm leading-tight">
                    <span className="font-semibold text-foreground">Kevin Risky Abadi</span>
                    <span className="text-muted-foreground ml-1 text-xs"> • Ke-2</span>
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight mt-0.5">Full Stack Developer</div>
                  <div className="text-xs text-muted-foreground leading-tight mt-0.5">{post.date}</div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <LinkedinLogoFull />
              </div>
            </div>

            {/* Scrollable text area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 text-foreground/90 leading-relaxed text-sm whitespace-pre-wrap">
              {post.text}
            </div>

            {/* Hover Action Button (Bottom Right) */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <button 
                onClick={() => setSelectedPost(post.id)}
                className="bg-[#111] dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full font-semibold text-[13px] shadow-sm pointer-events-auto"
              >
                View
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <LinkedInModal 
        isOpen={!!selectedPost} 
        onClose={() => setSelectedPost(null)} 
        postId={selectedPost} 
        postContent={linkedinPosts.find(p => p.id === selectedPost)}
      />
    </section>
  );
}
