import { defineArrayMember, defineField, defineType } from "sanity";

const altField = defineField({
  name: "alt",
  title: "Alt text",
  type: "string",
  description: "Describe the photo for visitors using screen readers and for Google.",
  validation: (r) => r.required(),
});

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [altField],
});

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "image",
  options: { hotspot: true },
  fields: [
    altField,
    defineField({ name: "title", type: "string", description: "Short heading shown on the photo." }),
    defineField({ name: "caption", type: "text", rows: 3, description: "Shown when the photo is opened full screen." }),
    defineField({ name: "tag", type: "string", description: 'Where on the trip it belongs, e.g. "Day 02" or "Homestay".' }),
  ],
  preview: {
    select: { title: "title", subtitle: "alt", media: "asset" },
  },
});

export const seo = defineType({
  name: "seo",
  title: "Search engines & sharing",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", type: "string", description: "Browser tab and Google result title.", validation: (r) => r.max(70).warning("Google cuts titles after ~60 characters.") }),
    defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.max(170).warning("Google cuts descriptions after ~160 characters.") }),
    defineField({ name: "keywords", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
  ],
});

export const pageHeader = defineType({
  name: "pageHeader",
  title: "Page header",
  type: "object",
  fields: [
    defineField({ name: "kicker", type: "string", description: "Small label above the heading." }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3 }),
  ],
});

export const textItem = defineType({
  name: "textItem",
  title: "Item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "desc", title: "Description", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "desc" } },
});

export const dayPlan = defineType({
  name: "dayPlan",
  title: "Day",
  type: "object",
  fieldsets: [{ name: "stats", title: "Walking stats (optional, for treks)", options: { columns: 2 } }],
  fields: [
    defineField({ name: "day", type: "string", description: 'e.g. "Day 01"', validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "details", type: "text", rows: 4 }),
    defineField({ name: "distanceKm", title: "Distance (km)", type: "number", fieldset: "stats" }),
    defineField({ name: "hours", title: "Walking time", type: "string", description: 'e.g. "3–4 hrs"', fieldset: "stats" }),
    defineField({ name: "gainM", title: "Ascent (m)", type: "number", fieldset: "stats" }),
    defineField({ name: "lossM", title: "Descent (m)", type: "number", fieldset: "stats" }),
  ],
  preview: { select: { day: "day", title: "title" }, prepare: ({ day, title }) => ({ title: `${day ?? ""} · ${title ?? ""}` }) },
});

export const waypoint = defineType({
  name: "waypoint",
  title: "Waypoint",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "km", title: "Km from trailhead", type: "number", validation: (r) => r.required().min(0) }),
    defineField({ name: "altitude", title: "Altitude (m)", type: "number", validation: (r) => r.required() }),
    defineField({
      name: "kind",
      type: "string",
      options: { list: ["village", "camp", "pass"], layout: "radio", direction: "horizontal" },
      initialValue: "village",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { name: "name", km: "km", altitude: "altitude", kind: "kind" },
    prepare: ({ name, km, altitude, kind }) => ({ title: name, subtitle: `${km} km · ${altitude} m · ${kind}` }),
  },
});

export const faq = defineType({
  name: "faq",
  title: "Question",
  type: "object",
  fields: [
    defineField({ name: "q", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "a", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "q", subtitle: "a" } },
});

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "value",
      type: "string",
      description: "Write {trips} for the live number of trips, or {categories} for the number of trip categories.",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const mapStop = defineType({
  name: "mapStop",
  title: "Map stop",
  type: "object",
  fieldsets: [{ name: "position", title: "Position on the map", options: { collapsible: true, collapsed: true, columns: 3 } }],
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "altitude", type: "string", description: 'e.g. "3,500 m"' }),
    defineField({ name: "tag", type: "string", description: 'e.g. "Monastery"' }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "desc", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "highlights", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "x", type: "number", fieldset: "position", description: "0 (west) – 1000 (east)", validation: (r) => r.required().min(0).max(1000) }),
    defineField({ name: "y", type: "number", fieldset: "position", description: "0 (north) – 600 (south)", validation: (r) => r.required().min(0).max(600) }),
    defineField({
      name: "label",
      title: "Label side",
      type: "string",
      fieldset: "position",
      options: { list: ["top", "bottom", "left", "right"] },
      initialValue: "bottom",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "tagline" } },
});

export const objectTypes = [imageWithAlt, photo, seo, pageHeader, textItem, dayPlan, waypoint, faq, stat, mapStop];
