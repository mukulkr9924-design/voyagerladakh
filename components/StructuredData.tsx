import JsonLd from "@/components/JsonLd";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/activities";

export default function StructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        description: "Leh-based adventure planning for trekking, mountaineering, motorbike touring and cultural journeys across Ladakh",
        url: SITE_URL,
        logo: `${SITE_URL}/voyager-ladakh-app-icon-512.png`,
        image: `${SITE_URL}/voyager-ladakh-horizontal.png`,
        telephone: CONTACT.phone,
        email: CONTACT.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Near Akama Restaurant, Zumpa Choglamsar",
          addressLocality: "Leh",
          addressRegion: "Ladakh",
          postalCode: "194104",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: 34.1526, longitude: 77.577 },
        areaServed: { "@type": "Place", name: "Ladakh, India" },
        sameAs: [CONTACT.instagram],
        priceRange: "₹₹",
        openingHours: "Mo-Su 09:00-18:00",
      }}
    />
  );
}
