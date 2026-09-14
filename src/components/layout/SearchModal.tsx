"use client";

import React, { useEffect, useState } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { projectsData } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = ["All", "Web Development", "Mobile App", "UI/UX Design", "Machine Learning"];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Handle Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Ctrl+K is now handled in Navbar, but preventing default here just in case
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setActiveCategory("All");
    }
  }, [isOpen]);

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const searchString = `${project.title} ${project.category} ${project.tags.join(" ")}`.toLowerCase();
    const matchesQuery = query.length < 2 || searchString.includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const showResults = query.length >= 2 || activeCategory !== "All";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-background rounded-2xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[80vh]"
          >
            {/* Search Input Area */}
            <div className="flex items-center px-4 py-4 border-b border-border flex-shrink-0">
              <Search className="w-6 h-6 text-muted-foreground mr-3" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects by name, tech, tags, or category..."
                className="flex-1 bg-transparent border-none outline-none text-foreground text-lg placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-2">
                <span className="hidden md:inline-block px-2 py-1 text-xs text-muted-foreground bg-muted rounded">
                  Esc
                </span>
                <button onClick={onClose} className="p-1 hover:bg-muted rounded-full md:hidden">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filters & Results Area */}
            <div className="p-4 bg-muted/30 flex-1 overflow-y-auto">
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-border hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {!showResults ? (
                <div className="text-center mt-12 mb-12">
                  <p className="text-muted-foreground text-sm">
                    Type at least 2 characters to search...
                  </p>
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="space-y-3">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProjectId(project.id)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-muted cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-[#00d0ff] transition-colors">{project.title}</h4>
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                            <span className="font-medium">{project.category}</span>
                            <span>•</span>
                            <span className="truncate max-w-[200px] sm:max-w-xs">{project.tags.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center mt-12 mb-12">
                  <p className="text-muted-foreground text-sm">
                    No projects found for "{query}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <ProjectModal 
        isOpen={!!selectedProjectId} 
        onClose={() => setSelectedProjectId(null)} 
        projectId={selectedProjectId} 
      />
    </AnimatePresence>
  );
}
