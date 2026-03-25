"use client";

import { useEffect, useState } from "react";
import { MENU_API_URL } from "@/lib/config";
import { useParams } from "next/navigation";

export default function EditMenuPage() {
  const params = useParams();
  const menuId = params?.id as string;

  const [menu_title, setMenuTitle] = useState("");
  const [menu_url, setMenuUrl] = useState("");
  const [menu_order, setMenuOrder] = useState(0);
  const [menu_status, setMenuStatus] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 📥 Load menu
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await fetch(`${MENU_API_URL}/${menuId}`);
        if (!res.ok) throw new Error("Menu fetch failed");

        const json = await res.json();
        const menu = json.data;

        setMenuTitle(menu.menu_title);
        setMenuUrl(menu.menu_url);
        setMenuOrder(menu.menu_order);
        setMenuStatus(menu.menu_status);
      } catch (err) {
        console.error(err);
        setError("Failed to load menu");
      } finally {
        setLoading(false);
      }
    };

    if (menuId) loadMenu();
  }, [menuId]);

  // 🚀 Update
  const updateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`${MENU_API_URL}/${menuId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menu_title,
          menu_url,
          menu_order,
          menu_status,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Update failed");
      }

      alert("Menu updated successfully");
      window.location.href = "/Menu";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-10 mx-[80px]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">Edit Menu</h1>

        <div className="flex justify-end hover:cursor-pointer mb-6">
          <div className="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl items-center flex justify-center">
            <i className="fas fa-angle-left text-[15px]"></i>

            <a href="/Menu" className="text-[15px]">
              Back
            </a>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="p-8">Loading menu...</p>
      ) : (
        <form onSubmit={updateMenu} className="space-y-4">
          <input
            type="text"
            placeholder="Menu Title"
            value={menu_title}
            onChange={(e) => setMenuTitle(e.target.value)}
            required
            className="w-full border rounded p-2"
          />

          <input
            type="text"
            placeholder="Menu URL (eg: /about, /contact)"
            value={menu_url}
            onChange={(e) => setMenuUrl(e.target.value)}
            required
            className="w-full border rounded p-2"
          />

          <input
            type="number"
            placeholder="Menu Order"
            value={menu_order}
            onChange={(e) => setMenuOrder(Number(e.target.value))}
            className="w-full border rounded p-2"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={menu_status}
              onChange={(e) => setMenuStatus(e.target.checked)}
            />
            Enable Menu
          </label>

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Menu"}
          </button>
        </form>
      )}
    </div>
  );
}
