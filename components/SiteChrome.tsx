import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StructuredData from "@/components/StructuredData";

/** Header, footer and site-wide extras around a page. Also used by the 404 page, which renders outside app/(site). */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <StructuredData />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
