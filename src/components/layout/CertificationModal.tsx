"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
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
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set initial focus to close button or first focusable element
    const focusFrame = requestAnimationFrame(() => {
      if (!modalRef.current) return;
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        const closeBtn = Array.from(focusableElements).find(el => el.getAttribute('aria-label')?.toLowerCase().includes('close'));
        (closeBtn || focusableElements[0]).focus();
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        // Boundary guard: pull focus inside if it escaped outside the modal
        if (!modalRef.current.contains(document.activeElement)) {
          e.preventDefault();
          if (e.shiftKey) {
            last.focus();
          } else {
            first.focus();
          }
          return;
        }

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose]);

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
          className="fixed inset-0 bg-overlay backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Section: Header & Meta */}
          <div className="flex-shrink-0 bg-background px-4 pt-5 sm:px-8 sm:pt-8">
            
            {/* Title Row & Close Button */}
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 id="cert-modal-title" className="mb-3 text-xl font-bold leading-snug text-foreground sm:text-2xl md:text-3xl">
                  {cert.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                  <span className="text-foreground">{cert.issuer}</span>
                  <div className="flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified
                  </div>
                </div>
              </div>
              <button 
                type="button"
                onClick={onClose} 
                aria-label="Close certification details"
                className="flex-shrink-0 rounded-full bg-surface-muted p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-border my-6" />

            {/* Date Row */}
            {(cert.date || cert.validity) && (
              <div className="flex items-center gap-2 text-sm text-foreground font-medium mb-6">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Year / Period:</span> {cert.date || cert.validity}
              </div>
            )}

          </div>

          {/* Bottom Section: Image Viewer (Scrollable) */}
          <div className="custom-scrollbar flex-1 overflow-y-auto px-4 pb-6 sm:px-8 sm:pb-8">
            <div className="flex w-full items-center justify-center rounded-2xl border border-border bg-surface-muted p-6 md:p-10">
              <Image 
                src={cert.image} 
                alt={cert.title} 
                width={1200}
                height={850}
                className="max-w-full h-auto object-contain shadow-sm"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
