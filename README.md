# Voyager Ladakh

A modern, responsive travel website showcasing the beauty and adventures of Ladakh, India. Built with Next.js 16, Tailwind CSS, and advanced animations using Framer Motion and GSAP.

## Features

- **Tour Packages**: Multiple tour categories including soul of Ladakh (spiritual & cultural experiences), motorbike touring, and trekking/hiking
- **Interactive Components**: Animated route maps, itinerary accordions, and trip cards
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion and GSAP
- **WhatsApp Integration**: Floating WhatsApp button for instant contact
- **Modern UI**: Clean, contemporary design with custom branding

## Content (Sanity CMS)

All website content (trips, category pages, home/about/contact/plan pages, contact details, SEO text and photos) lives in Sanity project `2brjvlhw`, dataset `production`. The Studio is part of this app and is deployed with it:

- **Live:** https://voyagerladakh.com/studio
- **Local:** `npm run dev`, then http://localhost:3000/studio

Editors sign in with the account they were invited with (manage members at sanity.io/manage).

### Managing trips

- **Add:** open a category (e.g. *Trekking & Hiking*), click **+** / *Add … trip*, fill in the fields, click **Generate** next to *Web address*, then **Publish**.
- **Edit:** open the trip, change it, then **Publish**.
- **Reorder:** drag trips within a category list. The order is the order on the website.
- **Remove:** open the trip and choose **Delete** from the menu next to Publish (or **Unpublish** to hide it but keep it).

Published changes appear on the site immediately (via the webhook below), or within a minute at most.

### Live preview (Presentation)

Open **Live preview** in the Studio's top bar to edit beside a live view of the site. Unpublished drafts show in the preview,
and clicking any text on the page opens the field that holds it. Visitors only ever see published content.

### Environment variables

Set these in Vercel (Project → Settings → Environment Variables) and in `.env.local` for local development:

| Variable | Used for |
| --- | --- |
| `SANITY_API_READ_TOKEN` | Draft previews in Live preview. A Viewer token from sanity.io/manage → API → Tokens. |
| `SANITY_REVALIDATE_SECRET` | Verifies calls from the Sanity webhook to `/api/revalidate`. Must match the webhook's secret. |

The webhook "Revalidate voyagerladakh.com" (sanity.io/manage → API → Webhooks) calls `https://voyagerladakh.com/api/revalidate`
on every create, update or delete, so published changes go live straight away.

### Code layout

- `sanity.config.ts`: Studio config (served at `/studio` by `app/studio/[[...tool]]/page.tsx`)
- `sanity/schemaTypes/`: content model; `sanity/structure.ts` sets up the Studio sidebar
- `sanity/presentation.ts`: which pages each document appears on in Live preview
- `lib/content.ts`: GROQ queries used by the pages
- `app/(site)/`: the website routes, with header/footer in `app/(site)/layout.tsx`

## Tech Stack

- **Framework**: Next.js 16.3.4 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 13.2.0, GSAP 3.15.0
- **Language**: TypeScript
- **Runtime**: React 19.2.8
- **CMS**: Sanity (embedded Studio via next-sanity)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── motorbike-touring/ # Motorbike tour packages
│   ├── soul-of-ladakh/    # Soul of Ladakh (spiritual & cultural) packages
│   ├── trekking-hiking/   # Trekking & hiking packages
│   ├── plan-your-trip/    # Trip planning page
│   └── coming-soon/       # Coming soon page
├── components/            # Reusable React components
│   ├── AnimatedRouteMap.tsx
│   ├── FloatingWhatsApp.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ItineraryAccordion.tsx
│   ├── TripCard.tsx
│   └── TripDetailTemplate.tsx
├── lib/                   # Utility functions and data
│   └── trips.ts          # Trip data management
└── public/               # Static assets
    └── voyager-logo.jpg
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
