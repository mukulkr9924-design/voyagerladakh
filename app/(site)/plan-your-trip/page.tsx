import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import EnquiryForm from "@/components/EnquiryForm";
import PageHeader from "@/components/PageHeader";
import { openGraphFor, SITE_NAME } from "@/lib/activities";
import { getActivities, getPlanTripPage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, header } = stegaClean(await getPlanTripPage());
  const title = seo?.title ?? header.title;
  const description = seo?.description ?? header.intro ?? "";
  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: { canonical: "/plan-your-trip" },
    openGraph: openGraphFor("/plan-your-trip", `${title} | ${SITE_NAME}`, description),
  };
}

export default async function PlanTripPage() {
  const [page, activities] = await Promise.all([getPlanTripPage(), getActivities()]);

  return (
    <>
      <PageHeader
        kicker={page.header.kicker ?? ""}
        title={page.header.title}
        intro={page.header.intro}
        crumbs={[{ name: "Plan your trip", href: "/plan-your-trip" }]}
      />
      <section className="section section-flush-top">
        <div className="contact-layout">
          <ol className="steps">
            {page.steps.map((s, i) => (
              <li key={s.title}>
                <span className="step-num">{i + 1}</span>
                <div>
                  <h2>{s.title}</h2>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="form-panel">
            <EnquiryForm variant="plan_trip" journeyTypes={activities.map((a) => stegaClean(a.name))} />
          </div>
        </div>
      </section>
    </>
  );
}
