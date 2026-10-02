import Link from "@/components/LocaleLink";
import { getI18n } from "@/lib/locale";

export default async function ComingSoonContent() {
  const { t } = await getI18n();
  return (
    <section className="status-page">
      <p className="kicker">{t.comingSoon.kicker}</p>
      <h1>{t.comingSoon.heading}</h1>
      <p>{t.comingSoon.text}</p>
      <div className="hero-actions">
        <Link href="/" className="btn primary">{t.common.backToHome}</Link>
        <Link href="/contact" className="btn outline">{t.common.contactUs}</Link>
      </div>
    </section>
  );
}
