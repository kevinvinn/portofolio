"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { fill } from "@/lib/i18n";

interface ProjectGalleryProps {
  title: string;
  gallery: string[];
  mainImage: string;
}

export function ProjectGallery({ title, gallery, mainImage }: ProjectGalleryProps) {
  const { copy } = useLanguage();
  // Use gallery if populated, fallback to mainImage
  const images = gallery && gallery.length > 0 ? gallery : [mainImage];
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation when user is focused on the gallery area
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (images.length <= 1) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Scroll the active thumbnail within the strip without moving the page
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const activeThumb = thumbnailRefs.current[currentIndex];
    const strip = thumbnailStripRef.current;
    if (!activeThumb || !strip) return;

    const stripRect = strip.getBoundingClientRect();
    const thumbRect = activeThumb.getBoundingClientRect();
    const targetLeft =
      strip.scrollLeft +
      thumbRect.left -
      stripRect.left -
      (strip.clientWidth - thumbRect.width) / 2;

    strip.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [currentIndex]);

  const currentSrc = images[currentIndex];

  return (
    <section 
      ref={galleryRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={fill(copy.gallery.galleryAria, { title })}
      className="relative w-full flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 rounded-3xl"
    >
      {/* Main Image Stage */}
      <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden bg-muted border border-border/50 shadow-md group select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full"
          >
            <Image
              src={currentSrc}
              alt={fill(copy.gallery.previewAlt, {
                title,
                current: currentIndex + 1,
                total: images.length,
              })}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority={currentIndex === 0}
              className="object-contain bg-muted"
            />
          </motion.div>
        </AnimatePresence>

        {/* Counter Badge */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border text-xs font-semibold text-foreground tracking-wider shadow-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Arrow Navigation (Desktop + Mobile Tap Targets >= 44px) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label={copy.gallery.previous}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/80 hover:bg-background text-foreground flex items-center justify-center shadow-md backdrop-blur-sm transition-all opacity-90 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={copy.gallery.next}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/80 hover:bg-background text-foreground flex items-center justify-center shadow-md backdrop-blur-sm transition-all opacity-90 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Carousel */}
      {images.length > 1 && (
        <div 
          ref={thumbnailStripRef}
          className="flex items-center gap-3 overflow-x-auto custom-scrollbar py-2 px-1"
          role="tablist"
          aria-label={copy.gallery.thumbnails}
        >
          {images.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={img + idx}
                ref={(el) => {
                  thumbnailRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={fill(copy.gallery.thumbnailAria, {
                  current: idx + 1,
                  total: images.length,
                })}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden transition-all duration-200 border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                  isActive
                    ? "border-foreground shadow-md scale-105 opacity-100"
                    : "border-border/60 opacity-50 hover:opacity-90 hover:border-border"
                }`}
              >
                <Image
                  src={img}
                  alt={fill(copy.gallery.thumbnailAlt, { current: idx + 1 })}
                  fill
                  sizes="96px"
                  className="object-cover bg-muted"
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
