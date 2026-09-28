import { WhatsAppIcon } from "@/components/Icons";
import { CONTACT } from "@/lib/activities";

export default function FloatingWhatsApp() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}
