"use client";

import React, { useEffect } from "react";
import { X, Calendar, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  cert: {
    title: string;
    issuer: string;
    date?: string;
    validity?: string;
    image: string;
  } | null | undefined;
}

export function CertificationModal({ isOpen, onClose, cert }: CertificationModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  if (!isOpen || !cert) return null;

  return (
    <AnimatePresence>
      {/* Wrapper with very high z-index to cover Navbar */}
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-12">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-full bg-background rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Section: Header & Meta */}
          <div className="flex-shrink-0 bg-background pt-8 px-8">
            
            {/* Title Row & Close Button */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
                  {cert.title}
                </h2>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <span className="text-foreground">{cert.issuer}</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2.5 bg-muted rounded-full hover:bg-border transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-border my-6" />

            {/* Date Row */}
            <div className="flex items-center gap-2 text-sm text-foreground font-medium mb-6">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Issued:</span> {cert.date}
            </div>

          </div>

          {/* Bottom Section: Image Viewer (Scrollable) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-8 pb-8">
            <div className="w-full bg-[#f3f4f6] dark:bg-[#1a1a1a] rounded-2xl p-6 md:p-10 flex items-center justify-center">
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="max-w-full h-auto object-contain shadow-sm"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
