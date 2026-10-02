import { CogIcon } from "@sanity/icons/Cog";
import { DocumentIcon } from "@sanity/icons/Document";
import { HomeIcon } from "@sanity/icons/Home";
import { TagIcon } from "@sanity/icons/Tag";
import { defineArrayMember, defineField, defineType } from "sanity";
import { ACTIVITY_TYPES, activityLabels } from "@/lib/trips";
import { isTranslation, languageField, titleWithLanguage } from "./language";

/** Preview for a one-off page, naming its language when it's a translation. */
const pagePreview = (title: string) => ({
  select: { language: "language" },
  prepare: ({ language }: { language?: string }) => ({ title: titleWithLanguage(title, language) }),
});

const seoField = defineField({ name: "seo", title: "Search engines & sharing", type: "seo" });
const headerField = defineField({ name: "header", type: "pageHeader", validation: (r) => r.required() });

export const activity = defineType({
  name: "activity",
  title: "Category page",
  type: "document",
  icon: TagIcon,
  fields: [
    languageField(),
    defineField({
      name: "type",
      type: "string",
      readOnly: true,
      description: "Fixed: it sets the page's web address.",
      options: { list: ACTIVITY_TYPES.map((value) => ({ value, title: activityLabels[value] })) },
    }),
    defineField({ name: "name", type: "string", description: "Used in menus, breadcrumbs and buttons.", validation: (r) => r.required() }),
    defineField({ name: "short", title: "Short description", type: "string", description: "One line shown on the home page category cards." }),
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 4 }),
    defineField({ name: "metaTitle", title: "Google title", type: "string", validation: (r) => r.max(70).warning() }),
    defineField({ name: "metaDescription", title: "Google description", type: "text", rows: 3, validation: (r) => r.max(170).warning() }),
    defineField({ name: "keywords", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
  ],
  preview: {
    select: { title: "name", subtitle: "heading", language: "language" },
    prepare: ({ title, subtitle, language }) => ({ title: titleWithLanguage(title, language), subtitle }),
  },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "seo", title: "Search engines" },
    { name: "text", title: "Footer & banners" },
  ],
  fields: [
    languageField("contact"),
    defineField({ name: "contactPerson", type: "string", group: "contact", readOnly: isTranslation }),
    defineField({ name: "phone", type: "string", group: "contact", readOnly: isTranslation, description: 'With country code, e.g. "+91 9541379356".', validation: (r) => r.required() }),
    defineField({ name: "email", type: "string", group: "contact", readOnly: isTranslation, validation: (r) => r.required().email() }),
    defineField({ name: "whatsapp", title: "WhatsApp link", type: "url", group: "contact", readOnly: isTranslation, validation: (r) => r.required() }),
    defineField({ name: "instagram", title: "Instagram link", type: "url", group: "contact", readOnly: isTranslation }),
    defineField({ name: "streetAddress", type: "string", group: "contact", readOnly: isTranslation, validation: (r) => r.required() }),
    defineField({ name: "locality", title: "Town", type: "string", group: "contact", initialValue: "Leh" }),
    defineField({ name: "region", type: "string", group: "contact", initialValue: "Ladakh" }),
    defineField({ name: "postalCode", type: "string", group: "contact", readOnly: isTranslation }),
    defineField({ name: "latitude", type: "number", group: "contact", readOnly: isTranslation, description: "Office location for the map link." }),
    defineField({ name: "longitude", type: "number", group: "contact", readOnly: isTranslation }),
    defineField({ name: "openingHours", type: "string", group: "contact", readOnly: isTranslation, description: 'For Google, e.g. "Mo-Su 09:00-18:00".' }),
    defineField({ name: "defaultTitle", title: "Home page title", type: "string", group: "seo", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Default description", type: "text", rows: 3, group: "seo" }),
    defineField({ name: "keywords", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" }, group: "seo" }),
    defineField({ name: "organizationDescription", type: "text", rows: 2, group: "seo", description: "One-line business description given to Google." }),
    defineField({ name: "footerBlurb", type: "text", rows: 3, group: "text" }),
    defineField({ name: "ctaTitle", title: "Enquiry banner heading", type: "string", group: "text", description: "The green banner near the bottom of most pages." }),
    defineField({ name: "ctaText", title: "Enquiry banner text", type: "text", rows: 2, group: "text" }),
    defineField({ name: "listingCtaTitle", title: "Category page banner heading", type: "string", group: "text" }),
    defineField({ name: "listingCtaText", title: "Category page banner text", type: "text", rows: 2, group: "text" }),
  ],
  preview: pagePreview("Site settings"),
});

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "featured", title: "Featured trips" },
    { name: "sections", title: "Sections" },
    { name: "map", title: "Route map" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    languageField("hero"),
    defineField({ name: "heroKicker", title: "Kicker", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "Heading", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "heroTitleEmphasis", title: "Heading (italic ending)", type: "string", group: "hero", description: "Shown in italics after the heading." }),
    defineField({ name: "heroLede", title: "Intro", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "heroSlides",
      title: "Slideshow photos",
      type: "array",
      group: "hero",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      options: { layout: "grid" },
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "heroStats", title: "Stats", type: "array", group: "hero", of: [defineArrayMember({ type: "stat" })] }),
    defineField({ name: "journeysKicker", type: "string", group: "sections" }),
    defineField({ name: "journeysTitle", type: "string", group: "sections" }),
    defineField({ name: "featuredKicker", title: "Kicker", type: "string", group: "featured" }),
    defineField({ name: "featuredTitle", title: "Heading", type: "string", group: "featured" }),
    defineField({
      name: "featuredTrips",
      title: "Featured trips",
      type: "array",
      group: "featured",
      readOnly: isTranslation,
      description: "Up to 6 trips shown on the home page, in this order, in every language. Leave empty to show the first trip from each of the first three categories.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "trip" }], options: { disableNew: true, filter: "!defined(language)" } })],
      validation: (r) => r.unique().max(6),
    }),
    defineField({ name: "whyKicker", type: "string", group: "sections" }),
    defineField({ name: "whyTitle", type: "string", group: "sections" }),
    defineField({ name: "reasons", type: "array", group: "sections", of: [defineArrayMember({ type: "textItem" })] }),
    defineField({ name: "mapKicker", type: "string", group: "map" }),
    defineField({ name: "mapTitle", type: "string", group: "map" }),
    defineField({ name: "mapIntro", type: "text", rows: 2, group: "map" }),
    defineField({
      name: "mapStops",
      title: "Stops",
      type: "array",
      group: "map",
      description: "Stops are joined in this order by the animated road.",
      of: [defineArrayMember({ type: "mapStop" })],
      validation: (r) => r.min(2),
    }),
    defineField({ name: "faqKicker", type: "string", group: "faq" }),
    defineField({ name: "faqTitle", type: "string", group: "faq" }),
    defineField({ name: "faqs", type: "array", group: "faq", of: [defineArrayMember({ type: "faq" })] }),
  ],
  preview: pagePreview("Home page"),
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "story", title: "Story", default: true },
    { name: "founder", title: "Founder" },
    { name: "values", title: "Values" },
  ],
  fields: [
    languageField("story"),
    { ...seoField, group: "story" },
    { ...headerField, group: "story" },
    defineField({ name: "storyTitle", type: "string", group: "story" }),
    defineField({ name: "story", type: "array", group: "story", description: "One entry per paragraph.", of: [defineArrayMember({ type: "text", rows: 4 })] }),
    defineField({ name: "bannerImage", type: "imageWithAlt", group: "story" }),
    defineField({ name: "bannerCaption", type: "string", group: "story" }),
    defineField({ name: "founderKicker", type: "string", group: "founder" }),
    defineField({ name: "founderTitle", type: "string", group: "founder" }),
    defineField({ name: "founderMeta", type: "string", group: "founder", description: "Short credentials line under the heading." }),
    defineField({ name: "founderImage", type: "imageWithAlt", group: "founder" }),
    defineField({ name: "founderCaption", type: "string", group: "founder" }),
    defineField({ name: "founderBio", type: "array", group: "founder", description: "One entry per paragraph.", of: [defineArrayMember({ type: "text", rows: 4 })] }),
    defineField({ name: "founderSignoff", type: "text", rows: 2, group: "founder" }),
    defineField({ name: "valuesKicker", type: "string", group: "values" }),
    defineField({ name: "valuesTitle", type: "string", group: "values" }),
    defineField({ name: "values", type: "array", group: "values", of: [defineArrayMember({ type: "textItem" })] }),
  ],
  preview: pagePreview("About page"),
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    languageField(),
    seoField,
    headerField,
    defineField({ name: "bannerImage", type: "imageWithAlt" }),
    defineField({ name: "formTitle", type: "string" }),
  ],
  preview: pagePreview("Contact page"),
});

export const planTripPage = defineType({
  name: "planTripPage",
  title: "Plan your trip page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    languageField(),
    seoField,
    headerField,
    defineField({ name: "steps", type: "array", of: [defineArrayMember({ type: "textItem" })] }),
  ],
  preview: pagePreview("Plan your trip page"),
});

export const SINGLETONS = ["siteSettings", "homePage", "aboutPage", "contactPage", "planTripPage"];

export const pageTypes = [activity, siteSettings, homePage, aboutPage, contactPage, planTripPage];
