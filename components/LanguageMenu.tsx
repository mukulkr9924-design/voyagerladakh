"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { GlobeIcon } from "@/components/Icons";
import { LANGUAGES, LOCALES, localePath, splitLocale } from "@/lib/i18n";

/** The header's compact language picker: one button that opens the list of languages. */
export default function LanguageMenu() {
  const { locale, t } = useI18n();
  const { path } = splitLocale(usePathname());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on a click elsewhere or Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lang-menu" ref={ref}>
      <button
        type="button"
        className="lang-menu-button"
        aria-expanded={open}
        aria-controls="lang-menu-list"
        aria-label={`${t.common.language}: ${LANGUAGES[locale].name}`}
        onClick={() => setOpen((v) => !v)}
      >
        <GlobeIcon />
        {LANGUAGES[locale].short}
      </button>
      <ul id="lang-menu-list" className="lang-menu-list" hidden={!open}>
        {LOCALES.map((l) => (
          <li key={l}>
            {/* A full page load, so the page switches text direction and fonts cleanly. */}
            <a href={localePath(l, path)} hrefLang={l} lang={l} aria-current={l === locale ? "true" : undefined}>
              {LANGUAGES[l].name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
