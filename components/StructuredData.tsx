import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/activities";
import { getSettings } from "@/lib/content";
import { LANGUAGES, LOCALES } from "@/lib/i18n";

export default async function StructuredData() {
  const { contact: CONTACT, organizationDescription } = await getSettings();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        description: organizationDescription,
        url: SITE_URL,
        logo: `${SITE_URL}/voyager-ladakh-app-icon-512.png`,
        image: `${SITE_URL}/voyager-ladakh-horizontal.png`,
        telephone: CONTACT.phone,
        email: CONTACT.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.streetAddress,
          addressLocality: CONTACT.locality,
          addressRegion: CONTACT.region,
          postalCode: CONTACT.postalCode,
          addressCountry: "IN",
        },
        geo: CONTACT.latitude !== undefined && CONTACT.longitude !== undefined
          ? { "@type": "GeoCoordinates", latitude: CONTACT.latitude, longitude: CONTACT.longitude }
          : undefined,
        areaServed: { "@type": "Place", name: "Ladakh, India" },
        sameAs: CONTACT.instagram ? [CONTACT.instagram] : [],
        openingHours: CONTACT.openingHours,
        knowsLanguage: LOCALES.map((l) => LANGUAGES[l].tag),
      }}
    />
  );
}
