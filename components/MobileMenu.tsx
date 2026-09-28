"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/activities";

export default function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>

      <div className={`drawer-backdrop${open ? " is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <nav id="mobile-drawer" className={`mobile-drawer${open ? " is-open" : ""}`} aria-label="Mobile" inert={!open}>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <Link href="/plan-your-trip" className="btn primary">Plan your trip</Link>
        <a href={CONTACT.phoneHref} className="drawer-phone">{CONTACT.phone}</a>
      </nav>
    </>
  );
}
