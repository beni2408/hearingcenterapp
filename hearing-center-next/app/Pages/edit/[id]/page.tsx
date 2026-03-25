"use client";

import { useEffect, useRef, useState } from "react";
import { PAGE_API_URL } from "@/lib/config";
import { useParams } from "next/navigation";

export default function EditPage() {
  const params = useParams();
  const id = params?.id as string;

  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<any>(null);

  const [page_title, setPageTitle] = useState("");
  const [page_url, setPageUrl] = useState("");
  const [page_content, setPageContent] = useState("");
  const [page_status, setPageStatus] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 📥 Load page
  const loadPage = async () => {
    try {
      const res = await fetch(`${PAGE_API_URL}/${id}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch page data`);
      }

      const json = await res.json();
      const page = json.data;

      setPageTitle(page.page_title || "");
      setPageUrl(page.page_url || "");
      setPageStatus(page.page_status ?? true);
      setPageContent(page.page_content || "");

      // ✅ inject into editor
      if (editorInstance.current) {
        editorInstance.current.setData(page.page_content || "");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading page:", error);
      setLoading(false);
    }
  };

  // 🚀 Update
  const updatePage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        page_title,
        page_url,
        page_content,
        page_status,
      };

      const res = await fetch(`${PAGE_API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Failed to update page`);
      }

      alert("Page updated successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating page:", error);
      alert("Failed to update page. Check console.");
    } finally {
      setSaving(false);
    }
  };

  // 📝 CKEditor init + load page
  useEffect(() => {
    const initEditor = async () => {
      try {
        const ClassicEditor = (
          await import("@ckeditor/ckeditor5-build-classic")
        ).default;

        if (editorRef.current) {
          editorInstance.current = await ClassicEditor.create(
            editorRef.current,
            {
              toolbar: [
                "bold",
                "italic",
                "numberedList",
                "bulletedList",
                "link",
                "blockQuote",
                "insertTable",
                "undo",
                "redo",
              ],
            }
          );

          editorInstance.current.model.document.on("change:data", () => {
            setPageContent(editorInstance.current.getData() || "");
          });
        }

        await loadPage();
      } catch (error) {
        console.error("Editor init error:", error);
        alert("Editor failed to load");
        setLoading(false);
      }
    };

    if (id) initEditor();

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
      }
    };
  }, [id]);

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2 mx-[80px] mt-10">
        <h1 className="text-2xl font-bold mb-6">Update Page</h1>

        <div className="flex justify-end hover:cursor-pointer mb-6">
          <div className="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl items-center flex justify-center">
            <i className="fas fa-angle-left text-[15px]"></i>

            <a href="/Pages" className="text-[15px]">
              Back
            </a>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={updatePage} className="space-y-5 px-20 pt-10">
        {loading && <p className="p-5">Loading page...</p>}

        <div>
          <label className="block text-sm font-medium">Page Title</label>
          <input
            className="border p-2 w-full"
            value={page_title}
            onChange={(e) => setPageTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Page URL</label>
          <input
            className="border p-2 w-full"
            value={page_url}
            onChange={(e) => setPageUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Page Content</label>
          <div ref={editorRef}></div>
        </div>

        <div>
          <label>Page Status</label>
          <select
            value={String(page_status)}
            onChange={(e) => setPageStatus(e.target.value === "true")}
          >
            <option value="true">Enable</option>
            <option value="false">Disable</option>
          </select>
        </div>

        <button
          className="bg-blue-900 text-white px-6 py-2 rounded"
          disabled={saving}
        >
          {saving ? "Updating..." : "Update Page"}
        </button>
      </form>
    </>
  );
}
