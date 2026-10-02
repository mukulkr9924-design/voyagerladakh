"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "@/components/I18nProvider";
import { localePath } from "@/lib/i18n";

/** next/link that keeps the visitor in their language: "/about" goes to "/fr/about" on French pages. */
export default function LocaleLink({ href, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const { locale } = useI18n();
  return <Link href={localePath(locale, href)} {...props} />;
}
