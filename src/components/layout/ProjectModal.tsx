"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ExternalLink, Calendar, Building2, ChevronRight, ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { projectsData } from "@/data/projects";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
}

export function ProjectModal({ isOpen, onClose, projectId }: ProjectModalProps) {
  const [prevProjectId, setPrevProjectId] = useState(projectId);
  const [currentProjectId, setCurrentProjectId] = useState(projectId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Adjust state during render when projectId prop changes
  if (projectId !== prevProjectId) {
    setPrevProjectId(projectId);
    setCurrentProjectId(projectId);
    setCurrentImageIndex(0); // Reset image index when project changes
  }

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const projectIndex = currentProjectId ? projectsData.findIndex(p => p.id === currentProjectId) : -1;
  const project = projectIndex !== -1 ? projectsData[projectIndex] : null;
  const hasGallery = Boolean(project?.gallery && project.gallery.length > 0);
  const galleryLength = project?.gallery?.length ?? 0;

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
      if (e.key === "ArrowLeft" && hasGallery && galleryLength > 1) {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
        return;
      }
      if (e.key === "ArrowRight" && hasGallery && galleryLength > 1) {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % galleryLength);
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
  }, [isOpen, onClose, hasGallery, galleryLength]);

  if (!isOpen || !project) return null;

  const currentImage = hasGallery ? project.gallery[currentImageIndex] : project.image;

  const goToNextProject = () => {
    const nextIndex = (projectIndex + 1) % projectsData.length;
    setCurrentProjectId(projectsData[nextIndex].id);
    setCurrentImageIndex(0);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasGallery) {
      setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasGallery) {
      setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-overlay backdrop-blur-sm"
        />

        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl h-full max-h-[85vh] sm:max-h-[90vh] bg-background rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Sticky Header */}
          <div className="flex items-center justify-between p-4 px-6 border-b border-border bg-background sticky top-0 z-10">
            <div className="flex-1"></div>
            <h3 className="font-semibold text-muted-foreground flex-1 text-center truncate px-4">{project.title.split(' - ')[0]}</h3>
            <div className="flex items-center justify-end gap-3 flex-1">
              <button 
                type="button"
                onClick={goToNextProject}
                aria-label="Go to next project"
                className="hidden sm:flex items-center gap-1 px-4 py-2 rounded-full bg-muted text-sm font-medium hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                type="button"
                onClick={onClose} 
                aria-label="Close project details"
                className="p-2 bg-muted rounded-full hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Body (2 Columns) */}
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
            
            {/* Left Column: Description */}
            <div className="w-full md:w-3/5 lg:w-2/3 p-6 md:p-10 overflow-y-auto custom-scrollbar">
              
              {/* Image Gallery Header inside Left Column */}
              <div className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden bg-muted mb-8 group select-none">
                <Image 
                  src={currentImage} 
                  alt={project.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 650px"
                  className="object-contain bg-muted"
                  priority
                />
                
                {/* Navigation Arrows */}
                {hasGallery && project.gallery.length > 1 && (
                  <>
                    <button 
                      type="button"
                      onClick={prevImage}
                      aria-label="Previous gallery image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 hover:bg-background text-foreground rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      type="button"
                      onClick={nextImage}
                      aria-label="Next gallery image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 hover:bg-background text-foreground rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter Badge */}
                {hasGallery && project.gallery.length > 1 && (
                  <div className="absolute top-4 left-4 bg-foreground/80 backdrop-blur text-background px-4 py-1.5 rounded-full text-sm font-bold">
                    {currentImageIndex + 1} / {project.gallery.length}
                  </div>
                )}
              </div>

              <h2 className="text-xl font-bold text-foreground mb-6">Description</h2>
              
              <div className="prose prose-sm md:prose-base dark:prose-invert text-muted-foreground leading-relaxed space-y-6 whitespace-pre-wrap">
                {project.description}
              </div>
            </div>

            {/* Right Column: Metadata */}
            <div className="w-full md:w-2/5 lg:w-1/3 border-t md:border-t-0 md:border-l border-border bg-muted/10 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-8">
                <h1 id="project-modal-title" className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {project.title.split(' - ')[0]}
                </h1>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit project: ${project.title.split(' - ')[0]}`}
                    title="Visit project"
                    className="w-10 h-10 flex-shrink-0 bg-foreground text-background flex items-center justify-center rounded-full hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              {/* Info List */}
              <div className="space-y-6 mb-8 pb-8 border-b border-border">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Created at</div>
                    <div className="font-bold text-foreground">{project.date}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Category</div>
                    <div className="font-bold text-foreground">{project.category}</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="font-bold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-background border border-border rounded-full text-xs font-medium text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connect With Me */}
              <div className="mt-auto pt-8 border-t border-border">
                <div className="flex sm:hidden mb-6">
                  <button 
                    type="button"
                    onClick={goToNextProject}
                    aria-label="Go to next project"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-foreground text-background font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
                  >
                    Next Project <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="font-bold text-foreground mb-4">Connect With Me</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Interested in collaborating or have a question? Let&apos;s get in touch!
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/kevinvinn"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Kevin Risky on GitHub"
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.8 0-1.5-.5-2.8-1.5-3.8.1-.4.7-1.8-.1-3.8 0 0-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.6 5 2 5 2a10.8 10.8 0 0 0-.1 3.8A5.4 5.4 0 0 0 3.4 9.6c0 5.3 3 6.5 6 6.8-.4.3-.8 1-.9 2-.9.4-3.1 1.1-4.5-1.3 0 0-.8-1.5-2.2-1.6 0 0-1.4-.1-.1 1 0 0 1 1.7 1.6 3.8 0 0 1.5.5 3.3-.2.1 1 .1 2.2.1 2.2"/></svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kevinriskyabadi/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Kevin Risky on LinkedIn"
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
