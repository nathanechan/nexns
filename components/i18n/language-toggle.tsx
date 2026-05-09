"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();
  const nextLocale = locale === "en" ? "zh" : "en";

  return (
    <Button variant="secondary" size="sm" onClick={() => setLocale(nextLocale)} title={t.language}>
      <Languages size={16} />
      {locale === "en" ? "ZH" : "EN"}
    </Button>
  );
}
