"use client";

import { usePathname } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";
import { LANGUAGES, LOCALES, localePath, splitLocale } from "@/lib/i18n";

/** Links to the current page in each language. */
export default function LanguageSwitcher({ className = "", full = false }: { className?: string; full?: boolean }) {
  const { locale, t } = useI18n();
  const { path } = splitLocale(usePathname());

  return (
    <nav className={`lang-switch ${className}`} aria-label={t.common.language}>
      <ul>
        {LOCALES.map((l) => (
          <li key={l}>
            {/* A full page load, so the page switches text direction and fonts cleanly. */}
            <a
              href={localePath(l, path)}
              hrefLang={l}
              lang={l}
              aria-label={full ? undefined : LANGUAGES[l].name}
              aria-current={l === locale ? "true" : undefined}
            >
              {full ? LANGUAGES[l].name : LANGUAGES[l].short}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
