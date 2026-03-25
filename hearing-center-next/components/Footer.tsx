// components/Footer.tsx
"use client";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

export default function Footer() {
  const [footer, setFooter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/footer`)
      .then((r) => r.json())
      .then((json) => setFooter(json.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <footer className="p-10 text-center">Loading footer...</footer>;
  if (!footer) return null;

  return (
    <footer className="bg-[#eaf2f6] px-20 py-12">
      <div className="grid grid-cols-4 gap-10">
        {/* Logo + Contact */}
        <div>
          {footer?.company?.logo && (
            <img src={footer.company.logo} alt="Logo" className="w-40 mb-4" />
          )}
          <p className="font-bold">{footer.company?.name}</p>
          <p>{footer.company?.address}</p>
          <p>{footer.company?.phone}</p>
          <p>{footer.company?.email}</p>
        </div>

        {/* Office Hours */}
        <div>
          <h3 className="font-bold mb-3">Office Hours</h3>
          {footer.office_hours?.map((h: any, i: number) => (
            <p key={i}>
              {h.day} – {h.time}
            </p>
          ))}
        </div>

        {/* Pages */}
        <div>
          <h3 className="font-bold mb-3">Pages</h3>
          <ul>
            {footer.footer_links?.map((link: any, i: number) => (
              <li key={i}>
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div>
          <iframe
            src={footer.map_url}
            className="w-full h-40 rounded"
            loading="lazy"
          />
        </div>
      </div>

      <div className="border-t mt-8 pt-4 text-center">{footer.copyright}</div>
    </footer>
  );
}
