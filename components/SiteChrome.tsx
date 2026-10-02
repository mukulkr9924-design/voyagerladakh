import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StructuredData from "@/components/StructuredData";
import { getI18n } from "@/lib/locale";

/** Header, footer and site-wide extras around every page. */
export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const { t } = await getI18n();
  return (
    <>
      <a href="#main" className="skip-link">{t.common.skipToContent}</a>
      <StructuredData />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
