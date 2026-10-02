import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";
import { InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import PageHeader from "@/components/PageHeader";
import { pageMeta, SITE_NAME } from "@/lib/activities";
import { getContactPage, getSettings } from "@/lib/content";
import { format } from "@/lib/i18n";
import { getI18n, getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, { seo, header, bannerImage }] = stegaClean(await Promise.all([getLocale(), getContactPage()]));
  const title = seo?.title ?? header.title;
  const description = seo?.description ?? header.intro ?? "";
  return {
    title,
    description,
    keywords: seo?.keywords,
    ...pageMeta(locale, "/contact", `${title} | ${SITE_NAME}`, description, bannerImage),
  };
}

export default async function ContactPage() {
  const [page, { contact: CONTACT }, { t }] = await Promise.all([getContactPage(), getSettings(), getI18n()]);
  const { bannerImage } = page;

  return (
    <>
      <PageHeader
        kicker={page.header.kicker ?? ""}
        title={page.header.title}
        intro={page.header.intro}
        crumbs={[{ name: t.common.contact, href: "/contact" }]}
      />
      <section className="section section-flush-top">
        {bannerImage && (
          <figure className="photo-banner">
            <Image
              src={bannerImage.url}
              alt={bannerImage.alt}
              width={bannerImage.width}
              height={bannerImage.height}
              sizes="(max-width: 1240px) 100vw, 1240px"
              preload
            />
          </figure>
        )}
        <div className="contact-layout">
          <div className="contact-cards">
            <a className="contact-card" href={CONTACT.phoneHref}>
              <PhoneIcon />
              <span><strong>{format(t.contact.call, { name: CONTACT.person })}</strong><bdi dir="ltr">{CONTACT.phone}</bdi></span>
            </a>
            <a className="contact-card" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              <span><strong>{t.contact.whatsapp}</strong>{t.contact.whatsappText}</span>
            </a>
            <a className="contact-card" href={`mailto:${CONTACT.email}`}>
              <MailIcon />
              <span><strong>{t.contact.email}</strong>{CONTACT.email}</span>
            </a>
            <a className="contact-card" href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer">
              <PinIcon />
              <span><strong>{t.contact.visit}</strong>{CONTACT.address[0]}, {CONTACT.address[1]}</span>
            </a>
            {CONTACT.instagram && (
              <a className="contact-card" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
                <span><strong>{t.contact.instagram}</strong>{t.contact.instagramText}</span>
              </a>
            )}
          </div>
          <div className="form-panel">
            {page.formTitle && <h2>{page.formTitle}</h2>}
            <EnquiryForm variant="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
