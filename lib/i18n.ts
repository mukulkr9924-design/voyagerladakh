// Languages the site is published in. English lives at the root (/about); the others under a
// prefix (/fr/about, /he/about). Safe to import from client components.

export const LOCALES = ["en", "fr", "he"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Languages edited as translations of the English content in the Studio. */
export const TRANSLATED_LOCALES = LOCALES.filter((l): l is Exclude<Locale, "en"> => l !== DEFAULT_LOCALE);

export const LANGUAGES: Record<Locale, { name: string; short: string; dir: "ltr" | "rtl"; tag: string; og: string }> = {
  en: { name: "English", short: "EN", dir: "ltr", tag: "en-IN", og: "en_IN" },
  fr: { name: "Français", short: "FR", dir: "ltr", tag: "fr-FR", og: "fr_FR" },
  he: { name: "עברית", short: "HE", dir: "rtl", tag: "he-IL", og: "he_IL" },
};

export const hasLocale = (value: string | undefined): value is Locale => (LOCALES as readonly string[]).includes(value ?? "");

/** A site path ("/about") in the given language ("/fr/about"). Anchors and full URLs are left alone. */
export function localePath(locale: Locale, path: string) {
  if (locale === DEFAULT_LOCALE || !path.startsWith("/")) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Splits "/fr/about" into its language and the path shared by every language ("/about"). */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (hasLocale(first)) return { locale: first, path: `/${rest.join("/")}` };
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}

/** Canonical URL plus hreflang links to the same page in every language. */
export function pageAlternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
      "x-default": path,
    },
  };
}

/** Fills {name} placeholders in a dictionary string. */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

export type PluralForms = { one: string; two?: string; other: string };

/** Picks the plural form for `n` ("1 journey", "2 journeys") and fills in {n}. */
export function plural(locale: Locale, n: number, forms: PluralForms) {
  const rule = new Intl.PluralRules(LANGUAGES[locale].tag).select(n);
  return format((rule === "one" || rule === "two" ? forms[rule] : undefined) ?? forms.other, { n });
}
