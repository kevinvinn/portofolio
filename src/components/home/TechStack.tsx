"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const stacks = [
  {
    id: "dev",
    category: "Development",
    items: [
      {
        name: "Nuxt",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "Vue",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      },
      {
        name: "Laravel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
      },
      {
        name: "PHP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
      },
      {
        name: "Tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      },
      {
        name: "Postman",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
      },
      {
        name: "Supabase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
      },
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      },
    ],
  },
  {
    id: "design",
    category: "Design",
    items: [
      {
        name: "Figma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
      },
      {
        name: "Photoshop",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg",
      },
    ],
  },
];

export function TechStack() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dev: true,
    design: true,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8 border-t border-border/50">
      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          My Stack
        </h2>

        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          The tools and technologies I use to bring ideas to life and create
          exceptional digital experiences
        </p>
      </div>

      {/* STACK CONTAINER */}
      <div
        className="
          w-full
          grid
          grid-cols-1
          md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
          gap-6
        "
      >
        {stacks.map((stack, index) => {
          const isOpen = openSections[stack.id];

          return (
            <div key={stack.id} className="w-full min-w-0 max-w-none">
              {/* CARD */}
              <div
                className="
                  w-full
                  min-w-0
                  border
                  border-gray-200
                  dark:border-gray-800
                  rounded-3xl
                  bg-white
                  dark:bg-[#111]
                  overflow-hidden
                "
              >
                {/* HEADER */}
                <button
                  type="button"
                  onClick={() => toggleSection(stack.id)}
                  className="
                    w-full
                    px-6
                    py-6
                    flex
                    items-center
                    justify-between
                    focus:outline-none
                  "
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* NUMBER */}
                    <div
                      className="
                        w-10
                        h-10
                        min-w-10
                        rounded-full
                        bg-black
                        dark:bg-white
                        text-white
                        dark:text-black
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-lg
                      "
                    >
                      {index + 1}
                    </div>

                    {/* TITLE */}
                    <h3 className="text-xl font-bold text-foreground">
                      {stack.category}
                    </h3>
                  </div>

                  {/* ARROW */}
                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                    }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                {/* CONTENT */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-8 flex flex-wrap gap-4">
                        {stack.items.map((item) => (
                          <div
                            key={item.name}
                            title={item.name}
                            className="
                              w-[52px]
                              h-[52px]
                              shrink-0
                              rounded-full
                              bg-[#f8f9fa]
                              dark:bg-[#2a2a2a]
                              flex
                              items-center
                              justify-center
                              p-3
                              hover:scale-110
                              transition-transform
                              cursor-pointer
                            "
                          >
                            <img
                              src={item.icon}
                              alt={item.name}
                              className="
                                w-full
                                h-full
                                object-contain
                              "
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
