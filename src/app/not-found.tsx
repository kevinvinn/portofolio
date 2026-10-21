"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export default function NotFound() {
  const { copy } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 text-center">
      <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-foreground mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-8">
        {copy.notFound.title}
      </h2>
      <p className="text-base text-muted-foreground max-w-md mx-auto mb-8">
        {copy.notFound.description}
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-3 text-sm font-medium transition-transform hover:scale-105 active:scale-95"
      >
        {copy.notFound.backHome}
      </Link>
    </div>
  );
}
