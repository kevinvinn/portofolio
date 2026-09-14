"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ArrowRight } from "lucide-react";

const galleryImages = [
  "/exploration/Screenshot 2024-12-27 211520.png",
  "/exploration/Screenshot 2024-12-27 211632.png",
  "/exploration/Screenshot 2025-01-06 203503.png",
  "/exploration/Screenshot 2025-01-06 204117.png",
  "/exploration/Screenshot 2025-07-14 091733.png",
  "/exploration/Screenshot 2025-12-11 182655.png",
  "/exploration/Screenshot 2025-12-11 182702.png",
  "/exploration/Screenshot 2026-05-14 163423.png",
  "/exploration/Screenshot 2026-05-14 163456.png",
  "/exploration/Screenshot 2026-05-18 152021.png",
  "/exploration/Screenshot 2026-05-18 170351.png",
  "/exploration/Screenshot 2026-09-14 085344.png",
];

export function Exploration() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, galleryImages.length));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Exploration</h2>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          A collection of creative projects, experiments, and visual explorations that showcase my design process and innovative thinking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {galleryImages.slice(0, visibleCount).map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-muted group cursor-pointer border border-border/30"
            onClick={() => setSelectedImage(src)}
          >
            <img 
              src={src} 
              alt={`Exploration ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {visibleCount < galleryImages.length && (
        <div className="flex justify-center">
          <button 
            onClick={loadMore}
            className="flex items-center gap-2 px-8 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors"
          >
            Load More <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl max-h-full flex items-center justify-center z-10 pointer-events-none"
            >
              <img 
                src={selectedImage} 
                alt="Expanded Exploration" 
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl pointer-events-auto"
              />
              
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 md:-right-12 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors pointer-events-auto"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
