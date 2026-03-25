"use client";

import { useEffect, useState } from "react";
import { PAGE_API_URL } from "@/lib/config";

type Page = {
  _id: string;
  page_title: string;
  page_url: string;
  page_status: boolean;
  page_menu: boolean;
};

export default function PagesListPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  // 📥 Load pages
  useEffect(() => {
    const loadPages = async () => {
      const res = await fetch(PAGE_API_URL);
      const json = await res.json();
      setPages(json.data.pages);
      setLoading(false);
    };

    loadPages();
  }, []);

  // ❌ Delete
  const deletePage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;

    try {
      const res = await fetch(`${PAGE_API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Delete failed");
      }

      // remove instantly
      setPages((prev) => prev.filter((page) => page._id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 mx-[80px]">Pages List</h1>

      <a
        href="/Pages/new"
        className="bg-blue-900 text-white px-4 py-2 rounded mx-[80px]"
      >
        + New Page
      </a>

      {loading ? (
        <p className="mt-6">Loading...</p>
      ) : (
        <table className="w-[1300px] border mt-6 mx-[80px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">URL</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Menu</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {pages.map((page) => (
              <tr key={page._id}>
                <td className="p-2 border">{page.page_title}</td>

                <td className="p-2 border">{page.page_url}</td>

                <td className="p-2 border">
                  {page.page_status ? "Enabled" : "Disabled"}
                </td>

                <td className="p-2 border">
                  {page.page_menu ? "Enabled" : "Disabled"}
                </td>

                <td className="p-2 border space-x-4">
                  <a
                    href={`/Pages/edit/${page._id}`}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </a>

                  <button
                    onClick={() => deletePage(page._id)}
                    className="text-red-600 underline cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
