import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import { pageMeta, SITE_NAME } from "@/lib/activities";
import { getAboutPage } from "@/lib/content";
import { getI18n, getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, { seo, header, bannerImage }] = stegaClean(await Promise.all([getLocale(), getAboutPage()]));
  const title = seo?.title ?? header.title;
  const description = seo?.description ?? header.intro ?? "";
  return {
    title,
    description,
    keywords: seo?.keywords,
    ...pageMeta(locale, "/about", `${title} | ${SITE_NAME}`, description, bannerImage),
  };
}

export default async function AboutPage() {
  const [page, { t }] = await Promise.all([getAboutPage(), getI18n()]);
  const { bannerImage, founderImage } = page;

  return (
    <>
      <PageHeader
        kicker={page.header.kicker ?? ""}
        title={page.header.title}
        intro={page.header.intro}
        crumbs={[{ name: t.common.about, href: "/about" }]}
      />
      <section className="section section-flush-top">
        <div className="prose-split">
          <h2>{page.storyTitle}</h2>
          <div className="prose">
            {page.story.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
        {bannerImage && (
          <figure className="photo-banner reveal">
            <Image
              src={bannerImage.url}
              alt={bannerImage.alt}
              width={bannerImage.width}
              height={bannerImage.height}
              sizes="(max-width: 1240px) 100vw, 1240px"
            />
            {page.bannerCaption && <figcaption>{page.bannerCaption}</figcaption>}
          </figure>
        )}
      </section>
      {page.founderTitle && (
        <section className="section section-tint" aria-labelledby="founder-title">
          <div className="founder">
            {founderImage && (
              <figure className="founder-photo reveal">
                <Image
                  src={founderImage.url}
                  alt={founderImage.alt}
                  width={founderImage.width}
                  height={founderImage.height}
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
                {page.founderCaption && <figcaption>{page.founderCaption}</figcaption>}
              </figure>
            )}
            <div className="founder-bio">
              {page.founderKicker && <p className="kicker">{page.founderKicker}</p>}
              <h2 id="founder-title">{page.founderTitle}</h2>
              {page.founderMeta && <p className="founder-meta">{page.founderMeta}</p>}
              <div className="prose">
                {page.founderBio.map((p, i) => <p key={i}>{p}</p>)}
                {page.founderSignoff && <p className="founder-sign">{page.founderSignoff}</p>}
              </div>
            </div>
          </div>
        </section>
      )}
      {page.values.length > 0 && (
        <section className="section" aria-labelledby="values-title">
          <div className="section-heading">
            {page.valuesKicker && <p className="kicker">{page.valuesKicker}</p>}
            <h2 id="values-title">{page.valuesTitle}</h2>
          </div>
          <div className="reason-grid">
            {page.values.map((v, i) => (
              <div key={v.title} className="reason reveal">
                <span className="reason-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
