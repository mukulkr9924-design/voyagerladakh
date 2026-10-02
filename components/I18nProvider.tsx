"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

const I18nContext = createContext<{ locale: Locale; t: Dictionary } | null>(null);

/** Gives client components the page's language and interface text. */
export default function I18nProvider({ locale, t, children }: { locale: Locale; t: Dictionary; children: React.ReactNode }) {
  return <I18nContext value={{ locale, t }}>{children}</I18nContext>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}
