"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ContactModal } from "../layout/ContactModal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Hold the entrance until the loading intro finishes so both read as one sequence.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("hasSeenIntro") === "true";
    } catch {
      seen = true;
    }

    if (seen) {
      const frame = window.requestAnimationFrame(() => setReady(true));
      return () => window.cancelAnimationFrame(frame);
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      setReady(true);
    };

    window.addEventListener("introComplete", finish, { once: true });
    const fallback = window.setTimeout(finish, 8000);

    return () => {
      window.removeEventListener("introComplete", finish);
      window.clearTimeout(fallback);
    };
  }, []);

  const enter = (delay: number) =>
    prefersReducedMotion
      ? { initial: { opacity: 0 }, animate: ready ? { opacity: 1 } : { opacity: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 26 },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
          transition: { duration: 0.8, delay: ready ? delay : 0, ease: EASE },
        };

  const scrollIntoPage = () => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    // Move by a controlled portion of the Hero, not to the About anchor. This
    // reveals the next section while the lower Hero stays in view, with no URL
    // change.
    const distance = Math.round(
      Math.min(hero.offsetHeight * 0.55, window.innerHeight * 0.6),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: window.scrollY + distance,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <section
        id="hero"
        className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-hero-bg text-hero-fg"
      >
        {/* Local silk backgrounds. These scrims only protect text contrast. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-hero-bg" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat dark:hidden"
            style={{ backgroundImage: "url('/images/hero/hero-light.png')" }}
          />
          <div
            className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat dark:block"
            style={{ backgroundImage: "url('/images/hero/hero-dark.png')" }}
          />

          {/* Light mode stays open and paper-white. */}
          <div
            className="absolute inset-0 dark:hidden"
            style={{
              background:
                "linear-gradient(90deg, rgba(248,248,247,0.50) 0%, rgba(248,248,247,0.22) 42%, rgba(248,248,247,0.05) 72%, rgba(248,248,247,0.02) 100%)",
            }}
          />

          {/* Dark mode keeps the white type clear over the brighter folds. */}
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(4,4,6,0.62) 0%, rgba(4,4,6,0.32) 44%, rgba(4,4,6,0.10) 74%, rgba(4,4,6,0.18) 100%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background dark:to-hero-bg" />
        </div>

        {/* Vertical edge microtype */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-2 top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.45em] text-hero-micro [writing-mode:vertical-rl] xl:block"
        >
          Kevin.dev / 2026
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rotate-180 whitespace-nowrap text-[10px] uppercase tracking-[0.45em] text-hero-micro [writing-mode:vertical-rl] xl:block"
        >
          Nganjuk / East Java
        </span>

        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-5 pb-16 pt-28 sm:px-8 md:px-10 md:pb-24 md:pt-32 lg:pt-36 xl:px-24">
          <div className="grid flex-1 grid-cols-1 items-center gap-10 py-10 lg:grid-cols-12 lg:gap-6 lg:pb-16 lg:pt-0">
            {/* Name */}
            <motion.div {...enter(0.05)} className="lg:col-span-9">
              <h1 className="font-sans text-[clamp(3rem,15vw,10.5rem)] font-semibold leading-[0.84] tracking-[-0.05em] text-hero-fg lg:text-[clamp(6rem,10.8vw,10.5rem)]">
                <span className="block">Kevin</span>
                <span className="block">Risky Abadi</span>
              </h1>
            </motion.div>

            {/* Role and focus */}
            <motion.div
              {...enter(0.18)}
              className="text-left lg:col-span-3 lg:justify-self-end lg:pr-12 lg:text-right xl:pr-16"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-hero-subtle">Role</p>
              <p className="mt-3 text-base font-semibold leading-snug text-hero-fg-strong sm:text-lg md:text-xl">
                Fullstack Developer
                <br />
                Backend Developer
              </p>

              <div className="mt-6 h-px w-40 bg-hero-divider lg:ml-auto" />

              <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-hero-subtle">Focus</p>
              <p className="mt-3 text-sm leading-relaxed text-hero-body sm:text-base">
                Web Apps, REST APIs
                <br className="hidden lg:block" /> &amp; Databases
              </p>
            </motion.div>
          </div>

          {/* Bio, actions, and scroll cue */}
          <motion.div
            {...enter(0.28)}
            className="grid grid-cols-1 items-end gap-8 pb-2 lg:grid-cols-12 lg:gap-6"
          >
            <p className="max-w-md text-sm leading-relaxed text-hero-body sm:text-[15px] lg:col-span-5">
              Fullstack and Backend Developer based in Nganjuk, Indonesia. I build reliable web
              applications, clean REST APIs, and the data systems behind them.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 lg:col-span-7 lg:justify-end lg:pr-12 xl:pr-16">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-hero-control px-5 py-2.5 text-xs font-semibold text-hero-control-fg transition-colors hover:bg-hero-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-ring focus-visible:ring-offset-2 focus-visible:ring-offset-hero-bg"
              >
                Get in touch
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <a
                href="https://github.com/kevinvinn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-hero-border px-5 py-2.5 text-xs font-medium text-hero-link transition-colors hover:border-hero-border-strong hover:text-hero-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-ring focus-visible:ring-offset-2 focus-visible:ring-offset-hero-bg"
              >
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/in/kevinriskyabadi/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-hero-border px-5 py-2.5 text-xs font-medium text-hero-link transition-colors hover:border-hero-border-strong hover:text-hero-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-ring focus-visible:ring-offset-2 focus-visible:ring-offset-hero-bg"
              >
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>

              <a
                href="https://www.instagram.com/kevinndebrun/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-hero-border px-5 py-2.5 text-xs font-medium text-hero-link transition-colors hover:border-hero-border-strong hover:text-hero-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-ring focus-visible:ring-offset-2 focus-visible:ring-offset-hero-bg"
              >
                Instagram
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={scrollIntoPage}
            className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 cursor-pointer items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-hero-subtle transition-colors hover:text-hero-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-ring focus-visible:ring-offset-2 focus-visible:ring-offset-hero-bg md:inline-flex"
          >
            Scroll
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
