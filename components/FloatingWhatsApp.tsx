import { WhatsAppIcon } from "@/components/Icons";
import { getSettings } from "@/lib/content";
import { getI18n } from "@/lib/locale";

export default async function FloatingWhatsApp() {
  const [{ contact }, { t }] = await Promise.all([getSettings(), getI18n()]);
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label={t.floatingWhatsApp}
    >
      <WhatsAppIcon />
    </a>
  );
}
