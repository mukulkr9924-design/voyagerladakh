import { defineField, type SanityDocument } from "sanity";
import { LANGUAGES, TRANSLATED_LOCALES } from "@/lib/i18n";

// French and Hebrew documents are copies of the English ones (see sanity/translations.ts).

/** Set on French and Hebrew copies; English documents leave it empty and don't show it. */
export const languageField = (group?: string) =>
  defineField({
    name: "language",
    type: "string",
    group,
    readOnly: true,
    hidden: ({ value }) => !value,
    description: "This is a translation of the English document. Fields left empty show the English text.",
    options: { list: TRANSLATED_LOCALES.map((value) => ({ value, title: LANGUAGES[value].name })) },
  });

/**
 * For fields the English document controls for every language (web addresses, figures, map
 * positions). Translations show them read-only; the website always uses the English values.
 */
export const isTranslation = ({ document }: { document?: SanityDocument }) => Boolean(document?.language);

/** "Home page" for English, "Home page · Français" for a translation. */
export const titleWithLanguage = (title: string, language?: string) =>
  language && language in LANGUAGES ? `${title} · ${LANGUAGES[language as keyof typeof LANGUAGES].name}` : title;
