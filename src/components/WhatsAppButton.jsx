import { useStore } from "../context/StoreContext";
import { useI18n } from "../context/LanguageContext";
import { whatsappHref } from "../../public/api/store";

export default function WhatsAppButton({ text, className = "btn btn-whatsapp" }) {
  const { settings } = useStore();
  const { t } = useI18n();
  if (!settings?.hasWhatsApp) return null;
  return (
    <a className={className} href={whatsappHref()} target="_blank" rel="noreferrer">
      {text || t.footer.whatsapp}
    </a>
  );
}
