"use client";

import { useLanguage } from "@/lib/context/LanguageContext";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();

  return <div dir={lang === "ar" ? "rtl" : "ltr"}>{children}</div>;
}
