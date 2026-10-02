"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LocaleLink from "@/components/LocaleLink";
import { splitLocale } from "@/lib/i18n";

export default function MobileMenu({ links, phone, phoneHref }: { links: { href: string; label: string }[]; phone: string; phoneHref: string }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { path } = splitLocale(pathname);

  // Close after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`menu-button${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="mobile-drawer"
        aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>

      <div className={`drawer-backdrop${open ? " is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <nav id="mobile-drawer" className={`mobile-drawer${open ? " is-open" : ""}`} aria-label={t.nav.mobile} inert={!open}>
        <LocaleLink href="/" className="drawer-logo">
          <Image src="/voyager-ladakh-horizontal.svg" alt={t.common.logoAlt} width={467} height={140} />
        </LocaleLink>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <LocaleLink href={l.href} aria-current={path === l.href ? "page" : undefined}>{l.label}</LocaleLink>
            </li>
          ))}
        </ul>
        <LocaleLink href="/plan-your-trip" className="btn primary">{t.common.planYourTrip}</LocaleLink>
        <a href={phoneHref} className="drawer-phone" dir="ltr">{phone}</a>
        <LanguageSwitcher className="drawer-lang" full />
      </nav>
    </>
  );
}
