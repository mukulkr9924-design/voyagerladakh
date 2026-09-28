import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/activities";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {all.map((c, i) => (
            <li key={c.href}>
              {i === all.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.href}>{c.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${SITE_URL}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </>
  );
}

export default function PageHeader({
  kicker,
  title,
  intro,
  crumbs,
}: {
  kicker: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
}) {
  return (
    <header className="page-header">
      <div className="page-header-inner">
        <Breadcrumbs items={crumbs} />
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        {intro ? <p className="page-intro">{intro}</p> : null}
      </div>
    </header>
  );
}
