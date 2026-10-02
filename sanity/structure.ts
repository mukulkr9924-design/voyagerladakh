import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { CogIcon } from "@sanity/icons/Cog";
import { DocumentIcon } from "@sanity/icons/Document";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { HomeIcon } from "@sanity/icons/Home";
import { PinIcon } from "@sanity/icons/Pin";
import { TagIcon } from "@sanity/icons/Tag";
import { TranslateIcon } from "@sanity/icons/Translate";
import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { LANGUAGES, TRANSLATED_LOCALES } from "@/lib/i18n";
import { ACTIVITY_TYPES, activityLabels } from "@/lib/trips";
import { translationId } from "@/sanity/translations";

export const tripTemplateId = (type: string) => `trip-${type}`;

/** Starts a translation as a copy of the English document (see sanity.config.ts). */
export const translationTemplateId = (schemaType: string) => `translation-${schemaType}`;

// English documents only; translations are reached through the language sections below.
const ENGLISH = "!defined(language)";

const PAGES = [
  { type: "homePage", title: "Home page", icon: HomeIcon },
  { type: "aboutPage", title: "About page", icon: DocumentIcon },
  { type: "contactPage", title: "Contact page", icon: DocumentIcon },
  { type: "planTripPage", title: "Plan your trip page", icon: DocumentIcon },
];

const singleton = (S: StructureBuilder, type: string, title: string, icon: typeof HomeIcon) =>
  S.listItem().title(title).icon(icon).child(S.document().schemaType(type).documentId(type).title(title));

/**
 * The editor for an English document's translation. The first time it's opened it's filled in with
 * a copy of the English content, ready to be translated and published.
 */
const translationEditor = (S: StructureBuilder, schemaType: string, englishId: string, locale: string, title?: string) => {
  const doc = S.document()
    .schemaType(schemaType)
    .documentId(translationId(englishId, locale))
    .initialValueTemplate(translationTemplateId(schemaType), { id: englishId, locale });
  return title ? doc.title(`${title} · ${LANGUAGES[locale as keyof typeof LANGUAGES].name}`) : doc;
};

/** Everything that can be translated into one language, mirroring the English menu. */
const languageSection = (S: StructureBuilder, locale: (typeof TRANSLATED_LOCALES)[number]) => {
  const language = LANGUAGES[locale].name;
  return S.listItem()
    .id(`language-${locale}`)
    .title(language)
    .icon(TranslateIcon)
    .child(
      S.list()
        .id(`language-${locale}-items`)
        .title(language)
        .items([
          // Pick an English trip to open its translation.
          ...ACTIVITY_TYPES.map((type) =>
            S.listItem()
              .id(`trips-${type}-${locale}`)
              .title(activityLabels[type])
              .icon(PinIcon)
              .child(
                S.documentList()
                  .id(`trips-${type}-${locale}-list`)
                  .title(`${activityLabels[type]} · ${language}`)
                  .schemaType("trip")
                  .filter(`_type == "trip" && activityType == $category && ${ENGLISH}`)
                  .params({ category: type })
                  .defaultOrdering([{ field: "orderRank", direction: "asc" }])
                  .initialValueTemplates([])
                  .child((id) => translationEditor(S, "trip", id, locale)),
              ),
          ),
          S.divider(),
          ...PAGES.map(({ type, title, icon }) =>
            S.listItem().id(`${type}-${locale}`).title(title).icon(icon).child(translationEditor(S, type, type, locale, title)),
          ),
          S.listItem()
            .id(`categories-${locale}`)
            .title("Category pages")
            .icon(TagIcon)
            .child(
              S.list()
                .id(`categories-${locale}-items`)
                .title(`Category pages · ${language}`)
                .items(
                  ACTIVITY_TYPES.map((type) =>
                    S.listItem()
                      .id(`activity-${type}-${locale}`)
                      .title(activityLabels[type])
                      .icon(TagIcon)
                      .child(translationEditor(S, "activity", `activity-${type}`, locale, activityLabels[type])),
                  ),
                ),
            ),
          S.divider(),
          S.listItem()
            .id(`siteSettings-${locale}`)
            .title("Site settings")
            .icon(CogIcon)
            .child(translationEditor(S, "siteSettings", "siteSettings", locale, "Site settings")),
        ]),
    );
};

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Voyager Ladakh")
    .items([
      // One drag-to-reorder list per category; the order here is the order on the website, in every language.
      ...ACTIVITY_TYPES.map((type) =>
        orderableDocumentListDeskItem({
          type: "trip",
          id: `trips-${type}`,
          title: activityLabels[type],
          icon: PinIcon,
          filter: `activityType == $category && ${ENGLISH}`,
          params: { category: type },
          createIntent: false,
          menuItems: [
            S.menuItem()
              .title(`Add ${activityLabels[type]} trip`)
              .intent({ type: "create", params: { type: "trip", template: tripTemplateId(type) } })
              .serialize(),
          ],
          S,
          context,
        }),
      ),
      S.listItem()
        .title("All trips")
        .icon(DocumentsIcon)
        .child(
          S.documentTypeList("trip")
            .title("All trips")
            .filter(`_type == "trip" && ${ENGLISH}`)
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.divider(),
      ...PAGES.map(({ type, title, icon }) => singleton(S, type, title, icon)),
      S.listItem()
        .title("Category pages")
        .icon(TagIcon)
        .child(
          S.list()
            .title("Category pages")
            .items(
              ACTIVITY_TYPES.map((type) =>
                S.listItem()
                  .title(activityLabels[type])
                  .icon(TagIcon)
                  .child(S.document().schemaType("activity").documentId(`activity-${type}`).title(activityLabels[type])),
              ),
            ),
        ),
      S.divider(),
      singleton(S, "siteSettings", "Site settings", CogIcon),
      S.divider(),
      // Translations: the English menu again, per language.
      ...TRANSLATED_LOCALES.map((locale) => languageSection(S, locale)),
    ]);
