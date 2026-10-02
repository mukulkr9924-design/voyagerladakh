import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { CogIcon } from "@sanity/icons/Cog";
import { DocumentIcon } from "@sanity/icons/Document";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { HomeIcon } from "@sanity/icons/Home";
import { PinIcon } from "@sanity/icons/Pin";
import { TagIcon } from "@sanity/icons/Tag";
import type { StructureResolver } from "sanity/structure";
import { ACTIVITY_TYPES, activityLabels } from "@/lib/trips";

export const tripTemplateId = (type: string) => `trip-${type}`;

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string, icon: typeof HomeIcon) =>
  S.listItem().title(title).icon(icon).child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Voyager Ladakh")
    .items([
      // One drag-to-reorder list per category; the order here is the order on the website.
      ...ACTIVITY_TYPES.map((type) =>
        orderableDocumentListDeskItem({
          type: "trip",
          id: `trips-${type}`,
          title: activityLabels[type],
          icon: PinIcon,
          filter: "activityType == $category",
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
        .child(S.documentTypeList("trip").title("All trips").defaultOrdering([{ field: "title", direction: "asc" }])),
      S.divider(),
      singleton(S, "homePage", "Home page", HomeIcon),
      singleton(S, "aboutPage", "About page", DocumentIcon),
      singleton(S, "contactPage", "Contact page", DocumentIcon),
      singleton(S, "planTripPage", "Plan your trip page", DocumentIcon),
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
    ]);
