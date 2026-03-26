"use client";

import { useLanguage } from "@/lib/context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex gap-2">
      {["en", "ta", "ar", "ml"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l as any)}
          className={`px-3 py-1 border rounded ${
            lang === l ? "bg-black text-white" : ""
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
