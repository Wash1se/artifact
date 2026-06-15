import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Check, Copy } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-button";
import { contacts } from "./contacts.config";

function ContactAction({
  label,
  value,
  icon: Icon,
  href,
  external,
}: (typeof contacts)[number]) {
  const [copied, setCopied] = useState(false);

  function openContact() {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.href = href;
  }

  async function copyContact() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="contact-action">
      <LiquidButton
        className="contact-liquid-button"
        onClick={openContact}
        size="xxl"
        type="button"
      >
        <Icon aria-hidden="true" />
        <span>{label}</span>
      </LiquidButton>

      <div className="contact-action__copy">
        <span>{value}</span>
        <button
          aria-label={`Скопировать ${label}`}
          onClick={copyContact}
          type="button"
        >
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          <span>{copied ? "Скопировано" : "Копировать"}</span>
        </button>
      </div>
    </div>
  );
}

function ContactsSection() {
  return (
    <section className="block-six" id="contacts">
      <div className="block-six__inner">
        <div className="block-six__copy">
          <p className="block-six__eyebrow">Пишите в любое время</p>
          <h2 className="block-six__title block-six__title--desktop">
            <span>Есть идея или хотите</span>
            <span>ее придумать?</span>
          </h2>
          <h2 className="block-six__title block-six__title--mobile">
            <span>Есть идея или</span>
            <span>хотите ее придумать?</span>
          </h2>
          <p className="block-six__description">
            Напишите нам — вместе разберемся и предложим сильные решения для
            вашего бренда и товара
          </p>
        </div>

        <div className="block-six__actions" aria-label="Контакты ARTIFACT">
          {contacts.map((contact) => (
            <ContactAction key={contact.label} {...contact} />
          ))}
        </div>
      </div>
    </section>
  );
}

const root = document.querySelector("#block-6-root");

if (root) {
  createRoot(root).render(<ContactsSection />);
}
