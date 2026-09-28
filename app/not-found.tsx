import type { Metadata } from "next";
import Link from "next/link";
import { ActivityIcon } from "@/components/Icons";
import { activities } from "@/lib/activities";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="status-page">
      <p className="kicker">404 · Off the map</p>
      <h1>This trail doesn&apos;t exist — yet.</h1>
      <p>The page you&apos;re looking for may have moved or is still being planned. Try one of these routes instead.</p>
      <ul className="status-links">
        {activities.map((a) => (
          <li key={a.type}>
            <Link href={`/${a.type}`}><ActivityIcon type={a.type} />{a.name}</Link>
          </li>
        ))}
      </ul>
      <div className="hero-actions">
        <Link href="/" className="btn primary">Back to home</Link>
        <Link href="/contact" className="btn outline">Contact us</Link>
      </div>
    </section>
  );
}
