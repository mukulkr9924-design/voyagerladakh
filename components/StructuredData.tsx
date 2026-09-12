export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Voyager Ladakh",
    "description": "Leh-based adventure planning for trekking, biking, spiritual and cultural journeys across Ladakh",
    "url": "https://voyagerladakh.com",
    "telephone": "+91 9541379356",
    "email": "contact@voyagerladakh.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Akama Restaurant, Zumpa Choglamsar",
      "addressLocality": "Leh",
      "addressRegion": "Ladakh",
      "postalCode": "194104",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.1526",
      "longitude": "77.5770"
    },
    "sameAs": [
      "https://www.instagram.com/8_wonders_itself/"
    ],
    "priceRange": "₹₹",
    "openingHours": "Mo-Su 09:00-18:00"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
