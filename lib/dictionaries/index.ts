import type { Locale } from "@/lib/i18n";
import en, { type Dictionary } from "./en";
import fr from "./fr";
import he from "./he";

export type { Dictionary };

export const dictionaries: Record<Locale, Dictionary> = { en, fr, he };
