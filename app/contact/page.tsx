import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import PageHeader from "@/components/PageHeader";
import { CONTACT } from "@/lib/activities";

export const metadata: Metadata = {
  title: "Contact Us – Voyager Ladakh, Leh",
  description:
    "Get in touch with Voyager Ladakh in Choglamsar, Leh. Call +91 9541379356, WhatsApp or email contact@voyagerladakh.com to plan your Ladakh trek, climb or tour.",
  keywords: ["contact Voyager Ladakh", "Leh travel agent", "Ladakh tour booking", "Ladakh travel enquiry"],
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Talk to our team in Leh"
        intro="Questions about routes, permits, altitude or dates? Send us a message, call or drop in at our office in Choglamsar."
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />
      <section className="section section-flush-top">
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
            <a
              className="contact-card"
              href="https://www.google.com/maps/search/?api=1&query=34.1526,77.5770"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PinIcon />
              <span><strong>Visit</strong>{CONTACT.address[0]}, {CONTACT.address[1]}</span>
            </a>
            <a className="contact-card" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
              <span><strong>Instagram</strong>Photos from the trail</span>
            </a>
          </div>
          <div className="form-panel">
            <h2>Send us a message</h2>
            <EnquiryForm variant="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
