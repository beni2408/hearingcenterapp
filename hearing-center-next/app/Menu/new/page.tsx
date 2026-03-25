"use client";

import { useState } from "react";
import { MENU_API_URL } from "@/lib/config";

export default function CreateMenuPage() {
  const [menu_title, setMenuTitle] = useState("");
  const [menu_url, setMenuUrl] = useState("");
  const [menu_order, setMenuOrder] = useState(0);
  const [menu_status, setMenuStatus] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🚀 Submit
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(MENU_API_URL, {
        method: "POST",
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
        throw new Error(err.message || "Failed to create menu");
      }

      alert("Menu created successfully");
      window.location.href = "/Menu";
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10 mx-[80px]">
      <form onSubmit={submitForm} className="space-y-4 mx-[0px]">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-6">Create Menu</h1>
        </div>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Menu Title"
          value={menu_title}
          onChange={(e) => setMenuTitle(e.target.value)}
          required
          className="w-full border rounded p-2"
        />

        {/* URL */}
        <input
          type="text"
          placeholder="Menu URL (eg: /about, /contact)"
          value={menu_url}
          onChange={(e) => setMenuUrl(e.target.value)}
          required
          className="w-full border rounded p-2"
        />

        {/* ORDER */}
        <input
          type="number"
          placeholder="Menu Order"
          value={menu_order}
          onChange={(e) => setMenuOrder(Number(e.target.value))}
          className="w-full border rounded p-2"
        />

        {/* STATUS */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={menu_status}
            onChange={(e) => setMenuStatus(e.target.checked)}
          />
          Enable Menu
        </label>

        {/* ERROR */}
        {error && <p className="text-red-600">{error}</p>}

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Create Menu"}
        </button>
      </form>
    </div>
  );
}
