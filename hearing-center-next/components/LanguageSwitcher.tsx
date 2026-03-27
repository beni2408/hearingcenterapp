"use client";

import { useLanguage } from "@/lib/context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const languages = ["en", "ta", "ar", "ml"];

  return (
    <div className="flex items-center gap-1 bg-white/70 backdrop-blur border border-gray-200 rounded-full p-1 shadow-sm">
      {languages.map((l) => {
        const isActive = lang === l;

        return (
          <button
            key={l}
            onClick={() => setLang(l as any)}
            className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200
              ${
                isActive
                  ? "bg-black text-white shadow"
                  : "text-gray-600 hover:text-black"
              }
            `}
          >
            {/* active glow */}
            {isActive && (
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent" />
            )}

            <span className="relative z-10">{l.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}
