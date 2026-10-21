"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Share2, ArrowUpRight, Check } from "lucide-react";
import { projectsData, localizeProject, type LocalizedProject } from "@/data/projects";
import { ProjectModal } from "../layout/ProjectModal";
import { useLanguage } from "@/components/language-provider";
import { fill } from "@/lib/i18n";

export function SelectedWork() {
  const { language, copy } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const localizedProjects = projectsData.map((project) =>
    localizeProject(project, language),
  );

  const handleShare = async (project: LocalizedProject, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/projects/${project.slug}`
        : "";
    const shareData = {
      title: project.title,
      text: `${project.title} - ${copy.selectedWork.shareText}`,
      url: shareUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedId(project.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch {
        // Clipboard permission denied or unavailable
      }
    }
  };

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 border-t border-border/60">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs font-mono font-semibold tracking-widest text-primary uppercase">
          {copy.selectedWork.eyebrow}
        </span>
        <div className="h-[1px] w-12 bg-border" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            {copy.selectedWork.title}
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mt-3">
            {copy.selectedWork.intro}
          </p>
        </div>
      </div>

      {/* 2-Column Neo-Brutalist Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {localizedProjects.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : idx * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group rounded-3xl bg-surface border-2 border-border-strong p-6 sm:p-8 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image Container - Primary Visual Focus */}
              <Link
                href={`/projects/${project.slug}`}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-border-strong bg-surface-muted mb-6 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group/img"
                aria-label={fill(copy.selectedWork.viewCaseStudy, {
                  title: project.title,
                })}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
                {/* Category Pill */}
                <div className="absolute top-4 left-4 bg-background border-2 border-border-strong text-foreground px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                  {project.category}
                </div>
              </Link>

              {/* Title & Actions Row */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug flex-1 min-w-0">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                  >
                    {project.title}
                  </Link>
                </h3>

                <div className="flex items-center gap-2.5 flex-shrink-0 pt-0.5">
                  {/* Share / Copy Button */}
                  <button
                    type="button"
                    onClick={(e) => handleShare(project, e)}
                    aria-label={
                      copiedId === project.id
                        ? copy.selectedWork.linkCopied
                        : fill(copy.selectedWork.shareLink, {
                            title: project.title,
                          })
                    }
                    title={
                      copiedId === project.id
                        ? copy.selectedWork.linkCopiedShort
                        : copy.selectedWork.shareProject
                    }
                    className="w-10 h-10 rounded-full border-2 border-border-strong bg-surface hover:bg-foreground hover:text-background flex items-center justify-center text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                  >
                    {copiedId === project.id ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  {/* Dedicated Case Study Link */}
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={fill(copy.selectedWork.readCaseStudy, {
                      title: project.title,
                    })}
                    title={copy.selectedWork.viewCaseStudyTitle}
                    className="w-10 h-10 rounded-full border-2 border-border-strong bg-foreground text-background hover:bg-primary hover:border-primary hover:text-primary-foreground flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Summary */}
              {project.summary && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {project.summary}
                </p>
              )}
            </div>

            {/* Tags Ribbon */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
              {project.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono font-medium rounded-lg border border-border bg-surface-muted text-foreground/80"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 6 && (
                <span className="px-2.5 py-1 text-xs font-mono text-muted-foreground/70">
                  +{project.tags.length - 6}
                </span>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Retained ProjectModal for backward compatibility during transition */}
      <ProjectModal isOpen={false} onClose={() => {}} projectId={null} />
    </section>
  );
}
