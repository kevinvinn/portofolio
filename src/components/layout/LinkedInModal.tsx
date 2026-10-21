"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ThumbsUp, MessageSquare, Share2, Send, Globe, MoreHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface LinkedInModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string | null;
  postContent?: {
    date: string;
    text: string;
    likes?: number;
    comments?: number;
    shares?: number;
    images?: string[];
    url?: string;
  };
}

export function LinkedInModal({ isOpen, onClose, postId, postContent }: LinkedInModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement as HTMLElement;
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
      const remainingDialogs = document.querySelectorAll('[role="dialog"]');
      if (remainingDialogs.length <= 1) {
        document.body.style.overflow = "auto";
      }
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !postId || !postContent) return null;

  const renderTextWithLinks = (text: string) => {
    // Regex for URLs and Hashtags
    const regex = /(https?:\/\/[^\s]+|#\w+)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.match(/^https?:\/\/[^\s]+/)) {
        return (
          <a 
            key={index} 
            href={part} 
            target="_blank" 
            rel="noreferrer" 
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      } else if (part.match(/^#\w+/)) {
        return (
          <a 
            key={index} 
            href={`https://www.linkedin.com/feed/hashtag/?keywords=${part.slice(1)}`} 
            target="_blank" 
            rel="noreferrer" 
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        {/* Dark Overlay */}
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
          aria-labelledby="linkedin-dialog-type linkedin-modal-author"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[520px] bg-background rounded-xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden"
        >
          {/* Header - LinkedIn Style */}
          <div className="flex items-start justify-between p-4 border-b border-border/50">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted cursor-pointer relative">
                <Image 
                  src="/pp.jfif" 
                  alt="Kevin Risky Abadi" 
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col -mt-0.5">
                <div className="flex items-center gap-1 cursor-pointer">
                  <span id="linkedin-dialog-type" className="sr-only">LinkedIn Post by</span>
                  <h3 id="linkedin-modal-author" className="font-bold text-foreground text-[15px] leading-tight hover:text-blue-600 dark:hover:text-blue-400">Kevin Risky Abadi</h3>
                  <span className="text-muted-foreground text-sm leading-tight">• 2nd</span>
                </div>
                <p className="text-xs text-muted-foreground leading-tight mt-0.5">Full Stack Developer</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground leading-tight mt-0.5">
                  <span>{postContent.date}</span>
                  <span className="text-[10px]">•</span>
                  <Globe className="w-3 h-3" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="More post options"
                className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close LinkedIn post"
                className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content (Scrollable) */}
          <div className="p-0 overflow-y-auto custom-scrollbar flex-1 bg-background">
            <div className="px-4 py-3 text-sm md:text-base text-foreground/90 whitespace-pre-wrap leading-relaxed">
              {renderTextWithLinks(postContent.text)}
            </div>
            
            {/* Image Grid / Carousel */}
            {postContent.images && postContent.images.length > 0 && (
              <div className={`mt-2 ${postContent.images.length > 1 ? 'grid gap-0.5 bg-border' : ''} ${postContent.images.length === 2 ? 'grid-cols-2' : postContent.images.length >= 3 ? 'grid-cols-2' : ''}`}>
                {postContent.images.map((img, i) => {
                  if (postContent.images!.length > 4 && i > 3) return null;
                  const isLastVisible = i === 3 && postContent.images!.length > 4;
                  const extraCount = postContent.images!.length - 4;

                  return (
                    <div 
                      key={i} 
                      className={`relative bg-muted overflow-hidden ${
                        postContent.images?.length === 3 && i === 0 ? 'col-span-2' : ''
                      }`}
                      style={{
                        aspectRatio: postContent.images?.length === 1 ? 'auto' : '1/1',
                        maxHeight: postContent.images?.length === 1 ? '420px' : 'none'
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- LinkedIn CDN (media.licdn.com) rejects server-side requests with 403 Forbidden without browser headers; direct browser <img> loading is required */}
                      <img 
                        src={img} 
                        alt={`Post attachment ${i + 1}`} 
                        className={`w-full h-full object-cover cursor-pointer ${postContent.images?.length === 1 ? 'object-contain bg-black/5' : ''}`}
                        onClick={() => window.open(postContent.url || img, '_blank')}
                      />
                      {isLastVisible && (
                        <div 
                          className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                          onClick={() => window.open(postContent.url || img, '_blank')}
                        >
                          <span className="text-white text-2xl font-semibold">+{extraCount}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Metrics (Counts) */}
          <div className="px-4 py-2 flex items-center justify-between text-xs text-muted-foreground border-b border-border/50 bg-background">
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center -mr-0.5 z-10">
                <ThumbsUp className="w-2.5 h-2.5 text-blue-600" />
              </div>
              <span className="ml-1">{postContent.likes}</span>
            </div>
            <div className="flex gap-2">
              <span className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{postContent.comments} comments</span>
              <span>•</span>
              <span className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{postContent.shares} shares</span>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="px-2 py-1.5 flex items-center justify-between bg-background">
            <a href={postContent.url} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-md hover:bg-muted transition-colors text-muted-foreground font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50">
              <ThumbsUp className="w-5 h-5" />
              <span>Like</span>
            </a>
            <a href={postContent.url} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-md hover:bg-muted transition-colors text-muted-foreground font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50">
              <MessageSquare className="w-5 h-5" />
              <span>Comment</span>
            </a>
            <a href={postContent.url} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-md hover:bg-muted transition-colors text-muted-foreground font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50">
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">Share</span>
            </a>
            <a href={postContent.url} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-md hover:bg-muted transition-colors text-muted-foreground font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50">
              <Send className="w-5 h-5 -rotate-45 -mt-1" />
              <span className="hidden sm:inline">Send</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
