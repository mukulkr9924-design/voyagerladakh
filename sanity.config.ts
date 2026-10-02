"use client";

// The Studio is served by the website at /studio (app/studio/[[...tool]]/page.tsx).
import { visionTool } from "@sanity/vision";
import { LexoRank } from "lexorank";
import { defineConfig, type InitialValueResolverContext } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { ACTIVITY_TYPES, activityLabels } from "@/lib/trips";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes, SINGLETONS } from "@/sanity/schemaTypes";
import { presentation } from "@/sanity/presentation";
import { structure, translationTemplateId, tripTemplateId } from "@/sanity/structure";
import { TRANSLATABLE_TYPES, translationLocale } from "@/sanity/translations";

// Category pages map to fixed routes, so editors can change them but not add or remove them.
const FIXED_TYPES = new Set([...SINGLETONS, "activity"]);
const FIXED_ACTIONS = new Set(["publish", "discardChanges", "restore"]);
// A translation can also be deleted, which puts the English text back on that language's pages.
const TRANSLATION_ACTIONS = new Set([...FIXED_ACTIONS, "unpublish", "delete"]);

export default defineConfig({
  name: "default",
  title: "Voyager Ladakh",
  basePath: "/studio",
  projectId,
  dataset,

  plugins: [structureTool({ structure }), presentationTool(presentation), visionTool({ defaultApiVersion: apiVersion })],

  schema: {
    types: schemaTypes,
    // "Add trip" starts in the chosen category and goes to the end of its list.
    templates: (prev) => [
      ...prev.filter((t) => !FIXED_TYPES.has(t.schemaType)),
      ...ACTIVITY_TYPES.map((type) => ({
        id: tripTemplateId(type),
        title: `${activityLabels[type]} trip`,
        schemaType: "trip",
        value: async (_params: unknown, { getClient }: InitialValueResolverContext) => {
          const last: string | null = await getClient({ apiVersion }).fetch(`*[_type == "trip" && defined(orderRank)] | order(orderRank desc)[0].orderRank`);
          const orderRank = (last ? LexoRank.parse(last) : LexoRank.middle()).genNext().genNext().toString();
          return { activityType: type, orderRank };
        },
      })),
      // A new translation starts as a copy of the English document (opened from the language sections).
      ...TRANSLATABLE_TYPES.map((schemaType) => ({
        id: translationTemplateId(schemaType),
        title: "Translation",
        schemaType,
        parameters: [
          { name: "id", type: "string" },
          { name: "locale", type: "string" },
        ],
        value: async ({ id, locale }: { id: string; locale: string }, { getClient }: InitialValueResolverContext) => {
          const english: Record<string, unknown> | null = await getClient({ apiVersion }).fetch(
            `coalesce(*[_id == $id][0], *[_id == "drafts." + $id][0])`,
            { id },
          );
          const content = { ...english };
          for (const key of ["_id", "_rev", "_type", "_createdAt", "_updatedAt", "orderRank"]) delete content[key];
          return { ...content, language: locale };
        },
      })),
    ],
  },

  document: {
    // Only trips appear in the global "Create" menu.
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId.startsWith("trip-")),
    actions: (prev, { schemaType, documentId }) => {
      if (translationLocale(documentId)) return prev.filter(({ action }) => action && TRANSLATION_ACTIONS.has(action));
      return FIXED_TYPES.has(schemaType) ? prev.filter(({ action }) => action && FIXED_ACTIONS.has(action)) : prev;
    },
  },
});
