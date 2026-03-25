"use client";

import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

export default function CreatePage() {
  const [page_title, setPageTitle] = useState("");
  const [page_url, setPageUrl] = useState("");
  const [page_content, setPageContent] = useState("");
  const [page_status, setPageStatus] = useState(true);

  const [loading, setLoading] = useState(false);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<any>(null);

  // 📝 CKEditor setup
  useEffect(() => {
    const initEditor = async () => {
      const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic"))
        .default;

      if (editorRef.current) {
        ClassicEditor.create(editorRef.current, {
          placeholder: "Write page content here...",
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
        }).then((editor: any) => {
          editorInstance.current = editor;

          editor.model.document.on("change:data", () => {
            setPageContent(editor.getData() || "");
          });
        });
      }
    };

    initEditor();

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
      }
    };
  }, []);

  // 🚀 Submit
  const submitPage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      page_title,
      page_url,
      page_content,
      page_status,
    };

    const res = await fetch(`${API_BASE_URL}/pages/newpage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      alert("Page created successfully");
      window.location.href = "/Pages";
    } else {
      const err = await res.json();
      alert(err.message || "Failed to create page");
    }
  };

  return (
    <div className="px-[180px] pt-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">New Pages</h1>

        <div className="flex justify-end hover:cursor-pointer mb-6">
          <div className="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl items-center flex justify-center">
            <i className="fas fa-angle-left text-[15px]"></i>

            <a href="/" className="text-[15px]">
              Back
            </a>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={submitPage} className="space-y-5">
        {/* Page Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Page Title
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={page_title}
            onChange={(e) => setPageTitle(e.target.value)}
            placeholder="About Us"
            required
          />
        </div>

        {/* Page URL */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Page URL
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={page_url}
            onChange={(e) => setPageUrl(e.target.value)}
            placeholder="/about"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Must start with <code>/</code> (example: /about, /services)
          </p>
        </div>

        {/* Page Content */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Page Content
          </label>
          <div ref={editorRef}></div>
        </div>

        {/* Page Status */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Page Status
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={String(page_status)}
            onChange={(e) => setPageStatus(e.target.value === "true")}
          >
            <option value="true">Enable</option>
            <option value="false">Disable</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          className="bg-blue-900 text-white w-full py-2 rounded hover:bg-blue-800"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Page"}
        </button>
      </form>
    </div>
  );
}
