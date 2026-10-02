import { WhatsAppIcon } from "@/components/Icons";
import { getSettings } from "@/lib/content";

export default async function FloatingWhatsApp() {
  const { contact } = await getSettings();
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}
