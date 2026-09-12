# Voyager Ladakh

A modern, responsive travel website showcasing the beauty and adventures of Ladakh, India. Built with Next.js 16, Tailwind CSS, and advanced animations using Framer Motion and GSAP.

## Features

- **Tour Packages**: Multiple tour categories including cultural tours, motorbike touring, spiritual journeys, and trekking/hiking
- **Interactive Components**: Animated route maps, itinerary accordions, and trip cards
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion and GSAP
- **WhatsApp Integration**: Floating WhatsApp button for instant contact
- **Modern UI**: Clean, contemporary design with custom branding

## Tech Stack

- **Framework**: Next.js 16.3.4 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 13.2.0, GSAP 3.15.0
- **Language**: TypeScript
- **Runtime**: React 19.2.8

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
│   ├── cultural-tours/    # Cultural tour packages
│   ├── motorbike-touring/ # Motorbike tour packages
│   ├── spiritual-journeys/# Spiritual journey packages
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
