import { lang } from "next/root-params";
import { dictionaries } from "@/lib/dictionaries";
import { DEFAULT_LOCALE, hasLocale, type Locale } from "@/lib/i18n";

// Server components only: reads the language from the URL's [lang] segment without passing it down.

export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return hasLocale(value) ? value : DEFAULT_LOCALE;
}

/** The current page's language and its interface text. */
export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}
