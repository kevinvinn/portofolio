"use client";

import type { Language } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";

const LANGUAGE_OPTIONS: Language[] = ["id", "en"];

interface LanguageToggleProps {
  tone?: "hero" | "page";
}

export function LanguageToggle({ tone = "page" }: LanguageToggleProps) {
  const { language, copy, setLanguage } = useLanguage();
  const isHero = tone === "hero";

  return (
    <div
      role="group"
      aria-label={copy.language.groupLabel}
      className={[
        "inline-flex h-12 shrink-0 items-center gap-0.5 rounded-full border p-0.5 transition-colors",
        isHero
          ? "border-hero-border bg-hero-ghost-bg"
          : "border-border bg-background/55 backdrop-blur-md",
      ].join(" ")}
    >
      {LANGUAGE_OPTIONS.map((option) => {
        const isActive = language === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => setLanguage(option)}
            aria-pressed={isActive}
            aria-label={copy.language.names[option]}
            title={copy.language.names[option]}
            className={[
              "inline-flex h-11 w-11 items-center justify-center rounded-full font-mono text-[11px] font-bold tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isHero
                ? "focus-visible:ring-hero-ring focus-visible:ring-offset-transparent"
                : "focus-visible:ring-ring focus-visible:ring-offset-transparent",
              isActive
                ? isHero
                  ? "bg-hero-control text-hero-control-fg"
                  : "bg-foreground text-background"
                : isHero
                  ? "text-hero-link hover:bg-hero-ghost-hover hover:text-hero-fg"
                  : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
            ].join(" ")}
          >
            <span lang={option}>{option.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}
