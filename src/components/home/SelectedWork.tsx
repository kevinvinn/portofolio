"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import { ProjectModal } from "../layout/ProjectModal";

export function SelectedWork() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Selected Work</h2>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          A showcase of my recent projects highlighting creativity, detail, and innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 lg:gap-x-12">
        {projectsData.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group cursor-pointer flex flex-col"
            onClick={() => setSelectedProject(project.id)}
          >
            {/* Image Container - clean, no overlay */}
            <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-[2rem] overflow-hidden bg-muted mb-6">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
                {project.category}
              </div>
            </div>

            {/* Title Row: Title on left, action buttons on right */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-2xl md:text-[26px] font-semibold text-foreground leading-tight flex-1">
                {project.title}
              </h3>
              <div className="flex items-center gap-3 flex-shrink-0 pt-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="w-11 h-11 rounded-full bg-[#111] dark:bg-white flex items-center justify-center text-white dark:text-black hover:scale-105 transition-transform"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedProject(project.id); }}
                  className="w-11 h-11 rounded-full bg-[#111] dark:bg-white flex items-center justify-center text-white dark:text-black hover:scale-105 transition-transform"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2.5">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-4 py-1.5 text-[13px] font-medium bg-[#f3f4f6] dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        projectId={selectedProject} 
      />
    </section>
  );
}
