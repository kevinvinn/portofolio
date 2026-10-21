"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  dictionaries,
  isLanguage,
  type Dictionary,
  type Language,
} from "@/lib/i18n";

interface LanguageContextValue {
  language: Language;
  copy: Dictionary;
  setLanguage: (language: Language) => void;
}

const fallbackValue: LanguageContextValue = {
  language: DEFAULT_LANGUAGE,
  copy: dictionaries[DEFAULT_LANGUAGE],
  setLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextValue>(fallbackValue);

const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useBrowserLayoutEffect(() => {
    let nextLanguage = DEFAULT_LANGUAGE;

    try {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isLanguage(storedLanguage)) {
        nextLanguage = storedLanguage;
      }
    } catch {
      // Storage can be unavailable in private browsing or restricted contexts.
    }

    document.documentElement.lang = nextLanguage;
    setLanguageState(nextLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== LANGUAGE_STORAGE_KEY) return;
      if (isLanguage(event.newValue)) {
        setLanguageState(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    document.documentElement.lang = nextLanguage;

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // Keep the in-memory selection when persistence is unavailable.
    }
  }, []);

  const value = useMemo(
    () => ({ language, copy: dictionaries[language], setLanguage }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
