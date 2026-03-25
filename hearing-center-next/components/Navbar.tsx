// components/Navbar.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MENU_API_URL } from "@/lib/config";

type Menu = { menu_url: string; menu_title: string };

export default function Navbar() {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    fetch(`${MENU_API_URL}/active`)
      .then((r) => r.json())
      .then((json) => setMenus(json.data || []))
      .catch(console.error);
  }, []);

  return (
    <div
      className="w-full"
      style={{ backgroundColor: "#266985", height: "200px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 70px",
          alignItems: "center",
          height: "150px",
        }}
      >
        <div style={{ display: "flex", gap: "30px" }}>
          {menus.map((menu) => (
            <Link
              key={menu.menu_url}
              href={menu.menu_url}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >
              {menu.menu_title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
