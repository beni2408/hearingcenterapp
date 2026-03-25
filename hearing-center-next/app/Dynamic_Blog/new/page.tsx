"use client";

import { useEffect, useRef, useState } from "react";
import { BLOG_API_URL } from "@/lib/config";

export default function CreateBlogPage() {
  const [blog_title, setBlogTitle] = useState("");
  const [blog_content, setBlogContent] = useState("");
  const [blog_author, setBlogAuthor] = useState("");
  const [blog_date, setBlogDate] = useState("");
  const [publish_date, setPublishDate] = useState("");
  const [is_active, setIsActive] = useState(true);
  const [blog_image, setBlogImage] = useState<File | null>(null);
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
          placeholder: "Write your blog content here...",
          toolbar: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "numberedList",
            "bulletedList",
            "link",
            "blockQuote",
            "insertTable",
            "imageUpload",
            "undo",
            "redo",
          ],
        }).then((editor: any) => {
          editorInstance.current = editor;

          editor.model.document.on("change:data", () => {
            setBlogContent(editor.getData());
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

  // 🚀 Submit function
  const submitBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!blog_content || blog_content.trim() === "") {
      alert("Blog content is required");
      setLoading(false);
      return;
    }

    if (!blog_image) {
      alert("Please select an image");
      setLoading(false);
      return;
    }

    if (blog_image.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      setLoading(false);
      return;
    }

    let finalBlogDate = blog_date;
    if (!finalBlogDate) {
      finalBlogDate = new Date().toISOString();
    }

    const formData = new FormData();
    formData.append("blog_title", blog_title);
    formData.append("blog_content", blog_content);
    formData.append("blog_author", blog_author);
    formData.append("blog_date", finalBlogDate);
    formData.append("blog_image", blog_image);
    formData.append("publish_date", publish_date);
    formData.append("is_active", String(is_active));

    try {
      const res = await fetch(`${BLOG_API_URL}/newblog`, {
        method: "POST",
        body: formData,
      });

      setLoading(false);

      if (res.ok) {
        alert("Blog created successfully!");
        window.location.href = "/Dynamic_Blog";
      } else {
        const text = await res.text();
        console.error("SERVER ERROR:", text);
        alert("Failed to create blog");
      }
    } catch (error) {
      console.error("ERROR:", error);
      alert("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="px-[180px] pt-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">Create Blog</h1>

        <a href="/All_Blogs" className="bg-black text-white px-4 py-2 rounded">
          ← Back
        </a>
      </div>

      {/* FORM */}
      <form onSubmit={submitBlog} className="space-y-5">
        {/* TITLE */}
        <div>
          <label className="block mb-1 text-sm font-medium">Blog Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={blog_title}
            onChange={(e) => setBlogTitle(e.target.value)}
            required
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="block mb-1 text-sm font-medium">Blog Content</label>
          <div ref={editorRef}></div>
        </div>

        {/* AUTHOR */}
        <div>
          <label className="block mb-1 text-sm font-medium">Author Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={blog_author}
            onChange={(e) => setBlogAuthor(e.target.value)}
          />
        </div>

        {/* BLOG DATE */}
        <div>
          <label className="block mb-1 text-sm font-medium">Blog Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={blog_date}
            onChange={(e) => setBlogDate(e.target.value)}
          />
        </div>

        {/* PUBLISH DATE */}
        <div>
          <label className="block mb-1 text-sm font-medium">Publish Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={publish_date}
            onChange={(e) => setPublishDate(e.target.value)}
            required
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="block mb-1 text-sm font-medium">Blog Status</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={String(is_active)}
            onChange={(e) => setIsActive(e.target.value === "true")}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* IMAGE */}
        <div>
          <label className="block mb-1 text-sm font-medium">Blog Image</label>
          <input
            type="file"
            className="w-full border rounded px-3 py-2"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setBlogImage(file);
            }}
            required
          />
        </div>

        {/* SUBMIT */}
        <button
          className="bg-blue-900 text-white w-full py-2 rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
