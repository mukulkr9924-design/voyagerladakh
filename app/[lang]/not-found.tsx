import type { Metadata } from "next";
import { ActivityIcon } from "@/components/Icons";
import Link from "@/components/LocaleLink";
import { getActivities } from "@/lib/content";
import { getI18n } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.notFound.title, robots: { index: false } };
}

export default async function NotFound() {
  const [activities, { t }] = await Promise.all([getActivities(), getI18n()]);
  return (
    <section className="status-page">
      <p className="kicker">{t.notFound.kicker}</p>
      <h1>{t.notFound.heading}</h1>
      <p>{t.notFound.text}</p>
      <ul className="status-links">
        {activities.map((a) => (
          <li key={a.type}>
            <Link href={`/${a.type}`}><ActivityIcon type={a.type} />{a.name}</Link>
          </li>
        ))}
      </ul>
      <div className="hero-actions">
        <Link href="/" className="btn primary">{t.common.backToHome}</Link>
        <Link href="/contact" className="btn outline">{t.common.contactUs}</Link>
      </div>
    </section>
  );
}
