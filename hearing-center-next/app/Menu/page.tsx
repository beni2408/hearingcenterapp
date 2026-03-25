"use client";

import { useEffect, useState } from "react";
import { MENU_API_URL } from "@/lib/config";

type Menu = {
  _id: string;
  menu_title: string;
  menu_url: string;
  menu_order: number;
  menu_status: boolean;
};

export default function MenuPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  // 📥 Fetch menus
  const fetchMenus = async () => {
    const res = await fetch(MENU_API_URL);
    const json = await res.json();
    setMenus(json.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // ❌ Delete
  const deleteMenu = async (menuId: string) => {
    const ok = confirm("Are you sure you want to delete this menu?");
    if (!ok) return;

    const res = await fetch(`${MENU_API_URL}/${menuId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    fetchMenus();
  };

  // 🔁 Toggle status
  const toggleStatus = async (menu: Menu) => {
    await fetch(`${MENU_API_URL}/${menu._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menu_status: !menu.menu_status,
      }),
    });

    fetchMenus();
  };

  return (
    <div className="pt-8 mx-[80px]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>

        <a
          href="/Menu/new"
          className="bg-blue-900 text-white px-4 py-2 rounded"
        >
          + New Menu
        </a>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading menus...</p>
      ) : menus.length === 0 ? (
        <p>No menus created yet.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">URL</th>
              <th className="text-left p-3">Order</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {menus.map((menu) => (
              <tr key={menu._id} className="border-t">
                <td className="p-3">{menu.menu_title}</td>
                <td className="p-3">{menu.menu_url}</td>
                <td className="p-3">{menu.menu_order}</td>

                <td className="p-3">
                  <button
                    className={`px-3 py-1 rounded text-white ${
                      menu.menu_status ? "bg-green-500" : "bg-red-500"
                    }`}
                    onClick={() => toggleStatus(menu)}
                  >
                    {menu.menu_status ? "Enabled" : "Disabled"}
                  </button>
                </td>

                <td className="p-3 space-x-4">
                  <a
                    href={`/Menu/edit/${menu._id}`}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </a>

                  <button
                    className="text-red-600 underline cursor-pointer"
                    onClick={() => deleteMenu(menu._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
