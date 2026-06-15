import { Mail, Send } from "lucide-react";

export const contacts = [
  {
    label: "Telegram",
    value: "@StepanIlyich",
    icon: Send,
    href: "https://t.me/StepanIlyich?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21",
    external: true,
  },
  {
    label: "Почта",
    value: "artifactagency@yandex.ru",
    icon: Mail,
    href: "mailto:artifactagency@yandex.ru",
    external: false,
  },
];
