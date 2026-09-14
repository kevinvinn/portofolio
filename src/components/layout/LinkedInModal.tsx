"use client";

import React, { useEffect } from "react";
import { X, Heart, MessageSquare, Share2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface LinkedInModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string | null;
  postContent?: {
    date: string;
    text: string;
    likes?: number;
    images?: string[];
  };
}

export function LinkedInModal({ isOpen, onClose, postId, postContent }: LinkedInModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  if (!isOpen || !postId || !postContent) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Dark Overlay */}
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
          className="relative w-full max-w-2xl bg-background rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                <img 
                  src="/pp.jfif" 
                  alt="Kevin Risky Abadi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Kevin Risky Abadi</h3>
                <p className="text-xs text-muted-foreground">{postContent.date}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground flex-shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content (Scrollable) */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
            <div className="prose prose-sm md:prose-base dark:prose-invert text-foreground whitespace-pre-wrap leading-relaxed mb-6">
              {postContent.text}
            </div>
            
            {/* Image Grid / Carousel */}
            {postContent.images && postContent.images.length > 0 && (
              <div className={`grid gap-2 ${postContent.images.length === 1 ? 'grid-cols-1' : postContent.images.length === 2 ? 'grid-cols-2' : postContent.images.length === 3 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                {postContent.images.map((img, i) => (
                  <div key={i} className={`rounded-lg overflow-hidden border border-border bg-muted ${postContent.images?.length === 3 && i === 0 ? 'col-span-2' : ''}`}>
                    <img 
                      src={img} 
                      alt={`Post attachment ${i + 1}`} 
                      className="w-full h-full object-cover max-h-[300px] hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => window.open(img, '_blank')}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Metrics */}
          <div className="p-4 px-6 border-t border-border bg-muted/30 flex items-center justify-between">
            <div className="flex gap-6">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors text-sm font-medium">
                <Heart className="w-5 h-5" /> {postContent.likes}
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors text-sm font-medium">
                <MessageSquare className="w-5 h-5" /> Comment
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors text-sm font-medium">
                <Share2 className="w-5 h-5" /> Share
              </button>
            </div>
            
            <button onClick={onClose} className="hidden md:block bg-foreground text-background px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
