"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Locale } from "@/lib/i18n/dictionaries";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof dictionaries)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("nexns-locale") as Locale | null;
    if (saved === "en" || saved === "zh") {
      setLocaleState(saved);
      return;
    }

    if (window.navigator.language.toLowerCase().startsWith("zh")) {
      setLocaleState("zh");
    }
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      locale,
      setLocale(nextLocale) {
        setLocaleState(nextLocale);
        window.localStorage.setItem("nexns-locale", nextLocale);
      },
      t: dictionaries[locale]
    };
  }, [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return value;
}
