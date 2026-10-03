"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LinkedInModal } from "../layout/LinkedInModal";
import { linkedinPostsData } from "@/data/linkedin";

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
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">My Recently in LinkedIn</h2>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          Real updates, real growth — a window into my professional world, straight from LinkedIn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {linkedinPostsData.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative bg-[#f3f4f6] dark:bg-zinc-900 border border-transparent dark:border-zinc-800 rounded-xl p-4 flex flex-col min-h-[200px] sm:h-[220px] overflow-hidden cursor-pointer"
            onClick={() => setSelectedPost(post.id)}
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
            <div className="absolute bottom-3 right-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
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
        postContent={linkedinPostsData.find(p => p.id === selectedPost)}
      />
    </section>
  );
}
