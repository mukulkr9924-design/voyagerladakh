import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";
import { InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import PageHeader from "@/components/PageHeader";
import { SITE_NAME, socialFor } from "@/lib/activities";
import { getContactPage, getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, header, bannerImage } = stegaClean(await getContactPage());
  const title = seo?.title ?? header.title;
  const description = seo?.description ?? header.intro ?? "";
  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: { canonical: "/contact" },
    ...socialFor("/contact", `${title} | ${SITE_NAME}`, description, bannerImage),
  };
}

export default async function ContactPage() {
  const [page, { contact: CONTACT }] = await Promise.all([getContactPage(), getSettings()]);
  const { bannerImage } = page;

  return (
    <>
      <PageHeader
        kicker={page.header.kicker ?? ""}
        title={page.header.title}
        intro={page.header.intro}
        crumbs={[{ name: "Contact", href: "/contact" }]}
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
              <span><strong>Call {CONTACT.person}</strong>{CONTACT.phone}</span>
            </a>
            <a className="contact-card" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              <span><strong>WhatsApp</strong>Chat with us instantly</span>
            </a>
            <a className="contact-card" href={`mailto:${CONTACT.email}`}>
              <MailIcon />
              <span><strong>Email</strong>{CONTACT.email}</span>
            </a>
            <a className="contact-card" href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer">
              <PinIcon />
              <span><strong>Visit</strong>{CONTACT.address[0]}, {CONTACT.address[1]}</span>
            </a>
            {CONTACT.instagram && (
              <a className="contact-card" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
                <span><strong>Instagram</strong>Photos from the trail</span>
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
