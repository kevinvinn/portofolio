"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const EMAIL = "kevinrisky18@gmail.com";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/kevinvinn",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kevinriskyabadi/",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kevinndebrun/",
    external: true,
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    external: false,
  },
];

export function Footer() {
  const [localTime, setLocalTime] = useState<string | null>(null);

  useEffect(() => {
    const formatTime = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
        .format(new Date())
        .replace(":", ".");

    const update = () => setLocalTime(formatTime());
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer
      id="contact"
      className="relative w-full scroll-mt-24 border-t border-border bg-background text-foreground"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 pb-10 pt-24 sm:px-8 md:px-10 md:pb-12 md:pt-32">
        <p className="max-w-4xl text-2xl font-medium leading-[1.25] tracking-[-0.02em] text-foreground/90 sm:text-3xl md:text-[2.35rem]">
          Have a project in mind, or just want to say hello?
          <br className="hidden sm:block" /> I&apos;d be glad to hear what you&apos;re building.
        </p>

        <a
          href={`mailto:${EMAIL}`}
          aria-label={`Email Kevin Risky Abadi at ${EMAIL}`}
          className="group mt-12 inline-flex max-w-full items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background md:mt-16 md:gap-5"
        >
          <span className="text-[clamp(3rem,14.5vw,11rem)] font-bold leading-[0.86] tracking-[-0.055em]">
            Let&apos;s Talk
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-[0.35em] h-10 w-10 shrink-0 stroke-[1.5] text-muted-foreground transition-[transform,color] duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground sm:h-14 sm:w-14 md:h-20 md:w-20"
          />
        </a>

        <div className="mt-20 h-px w-full bg-border md:mt-28" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pt-8 text-sm md:grid-cols-4 md:gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
              ++ kevin.dev
            </p>
            <p className="mt-3 text-muted-foreground">All rights reserved &copy; 2026</p>
          </div>

          <div>
            <p className="text-foreground/85">Nganjuk, Indonesia</p>
            <p className="mt-3 text-muted-foreground">Fullstack &amp; Backend Developer</p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Local Time</p>
            <p className="mt-3 font-mono text-foreground/80" aria-live="off">
              {localTime ? `${localTime} WIB` : "WIB (GMT+7)"}
            </p>
          </div>

          <ul className="space-y-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  {...(social.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {social.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
