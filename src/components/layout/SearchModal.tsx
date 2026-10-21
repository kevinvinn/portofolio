"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { projectsData, localizeProject, type LocalizedProject } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { useLanguage } from "@/components/language-provider";
import { fill } from "@/lib/i18n";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryKey = "all" | "web" | "mobile" | "uiux" | "ai";

const categories: CategoryKey[] = ["all", "web", "mobile", "uiux", "ai"];

// Canonical category matching stays language-independent while the archive and
// visible filter labels change with the selected language.
const categoryAliases: Record<CategoryKey, string[]> = {
  all: [],
  web: ["web development", "web-based", "web app", "pengembangan web", "aplikasi web"],
  mobile: [
    "mobile development",
    "mobile app",
    "aplikasi mobile",
    "pengembangan aplikasi mobile",
  ],
  uiux: [
    "ui/ux",
    "ui design",
    "ux design",
    "user experience",
    "user interface",
    "desain ui/ux",
  ],
  ai: [
    "machine learning",
    "artificial intelligence",
    "computer vision",
    "yolov8",
    "kecerdasan buatan",
    "visi komputer",
    "deteksi objek",
    "pembelajaran mesin",
  ],
};

interface SearchableProject {
  project: LocalizedProject;
  searchString: string;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { language, copy } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleSelectProject = (slug: string) => {
    onClose();
    router.push(`/projects/${slug}`);
  };

  // Manage scroll lock, initial focus, and focus restoration to the opening trigger.
  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  // Manage Escape key and focus trap.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Ctrl+K is handled in Navbar, prevent default here.
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
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

        // Boundary guard: pull focus inside if it escaped outside the modal.
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
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // Reset state during render when modal closes.
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setQuery("");
      setActiveCategory("all");
    }
  }

  const searchableProjects: SearchableProject[] = projectsData.map((project) => {
    const localizedProject = localizeProject(project, language);
    const searchString = [
      localizedProject.title,
      localizedProject.category,
      localizedProject.tags.join(" "),
      project.title,
      project.category,
      project.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return { project: localizedProject, searchString };
  });

  const filteredProjects = searchableProjects
    .filter(({ searchString }) => {
      const matchesCategory =
        activeCategory === "all" ||
        categoryAliases[activeCategory].some((alias) => searchString.includes(alias));
      const matchesQuery = query.length < 2 || searchString.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    })
    .map(({ project }) => project);

  const showResults = query.length >= 2 || activeCategory !== "all";
  const trimmedQuery = query.trim();
  const resultLabel = `${filteredProjects.length} ${
    filteredProjects.length === 1
      ? copy.search.resultSingular
      : copy.search.resultPlural
  }`;

  const resetSearch = () => {
    setQuery("");
    setActiveCategory("all");
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center px-3 pb-4 pt-4 sm:px-6 sm:pt-[9vh]">
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
            aria-labelledby="search-modal-title"
            initial={{ opacity: 0, scale: 0.97, y: -14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -14 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-2xl sm:max-h-[min(82vh,780px)] sm:rounded-[1.75rem]"
          >
            <h2 id="search-modal-title" className="sr-only">
              {copy.search.title}
            </h2>
            <p id="search-help" className="sr-only">
              {copy.search.help}
            </p>

            {/* Search input */}
            <div className="group flex items-center gap-3 border-b border-border px-4 py-2.5 transition-colors focus-within:bg-surface-muted/45 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary/25 sm:gap-4 sm:px-6 sm:py-3">
              <Search
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary"
              />
              <label htmlFor="project-search" className="sr-only">
                {copy.search.inputLabel}
              </label>
              <input
                ref={inputRef}
                id="project-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.search.placeholder}
                aria-describedby="search-help"
                className="min-w-0 flex-1 bg-transparent py-2 text-base text-foreground caret-primary outline-none placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none sm:text-lg"
              />
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <kbd className="hidden h-7 items-center rounded-md border border-border bg-surface-muted px-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:inline-flex">
                  Esc
                </kbd>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={copy.search.close}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  <X className="h-4.5 w-4.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Category filters */}
            <div className="border-b border-border px-4 py-3 sm:px-6">
              <div
                role="group"
                aria-label={copy.search.filterGroup}
                className="flex flex-wrap gap-x-2 gap-y-2"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={activeCategory === cat}
                    className={`min-h-8 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:px-3.5 sm:text-[13px] ${
                      activeCategory === cat
                        ? "bg-foreground text-background"
                        : "border border-border bg-surface text-muted-foreground hover:border-foreground/25 hover:bg-surface-muted hover:text-foreground"
                    }`}
                  >
                    {copy.search.categories[cat]}
                  </button>
                ))}
              </div>
            </div>

            <p className="sr-only" role="status" aria-live="polite">
              {showResults ? resultLabel : copy.search.statusPrompt}
            </p>

            {/* Results */}
            <div className="custom-scrollbar min-h-[clamp(10rem,34vh,20rem)] flex-1 overflow-y-auto px-2.5 py-3 sm:px-4 sm:py-4">
              {!showResults ? (
                <div className="flex h-full min-h-[clamp(10rem,34vh,20rem)] flex-col items-center justify-center px-6 py-10 text-center">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface-muted text-muted-foreground">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{copy.search.emptyTitle}</p>
                  <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {copy.search.emptyBody}
                  </p>
                </div>
              ) : filteredProjects.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between px-2 pb-2 sm:px-3">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {copy.search.results}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">{resultLabel}</span>
                  </div>

                  <div className="space-y-1">
                    {filteredProjects.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => handleSelectProject(project.slug)}
                        className="group flex w-full min-w-0 items-center gap-3 rounded-xl border border-transparent px-2 py-2.5 text-left transition-colors hover:border-border hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:gap-4 sm:px-3"
                      >
                        <span className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-muted sm:h-14 sm:w-16">
                          <Image
                            src={project.image}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-[15px]">
                            {project.title}
                          </span>
                          <span className="mt-1 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                            <span className="shrink-0 font-medium text-foreground/70">
                              {project.category}
                            </span>
                            <span aria-hidden="true">•</span>
                            <span className="truncate">{project.tags.join(", ")}</span>
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-muted-foreground opacity-50 transition-[opacity,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground group-hover:opacity-100"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[clamp(10rem,34vh,20rem)] flex-col items-center justify-center px-6 py-10 text-center">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface-muted text-muted-foreground">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {trimmedQuery.length >= 2
                      ? fill(copy.search.noMatch, { query: trimmedQuery })
                      : copy.search.noCategory}
                  </p>
                  <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {copy.search.noResultsBody}
                  </p>
                  <button
                    type="button"
                    onClick={resetSearch}
                    className="mt-5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-foreground/25 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    {copy.search.reset}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Retained ProjectModal for backward compatibility during transition */}
      <ProjectModal isOpen={false} onClose={() => {}} projectId={null} />
    </AnimatePresence>
  );
}
