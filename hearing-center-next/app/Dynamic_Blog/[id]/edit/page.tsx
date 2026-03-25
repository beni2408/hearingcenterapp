"use client";

import { useEffect, useRef, useState } from "react";
import { BLOG_API_URL } from "@/lib/config";
import { useParams } from "next/navigation";

type Blog = {
  blog_title: { en: string };
  blog_content: { en: string };
  blog_author: string;
  blog_date: string;
  blog_image: string;
  publish_date: string;
  is_active: boolean;
};

export default function EditBlogPage() {
  const params = useParams();
  const id = params?.id as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [blog_image, setBlogImage] = useState<File | null>(null);
  const [publish_date, setPublishDate] = useState("");
  const [is_active, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<any>(null);

  // 🔥 Fetch + Editor Init
  useEffect(() => {
    if (!id) return;

    const init = async () => {
      const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic"))
        .default;

      const res = await fetch(`${BLOG_API_URL}/${id}`);
      const json = await res.json();

      const fetchedBlog = json.data.blog;

      // ✅ Fix date format
      fetchedBlog.blog_date = fetchedBlog.blog_date?.split("T")[0];
      const pubDate = fetchedBlog.publish_date?.split("T")[0];

      setBlog(fetchedBlog);
      setPublishDate(pubDate);
      setIsActive(fetchedBlog.is_active);

      // ⏳ wait for DOM render
      setTimeout(async () => {
        if (editorRef.current) {
          editorInstance.current = await ClassicEditor.create(
            editorRef.current,
            {
              placeholder: "Edit your blog content here...",
            }
          );

          // ✅ Set EN content only
          editorInstance.current.setData(fetchedBlog.blog_content?.en || "");

          editorInstance.current.model.document.on("change:data", () => {
            setBlog((prev) =>
              prev
                ? {
                    ...prev,
                    blog_content: {
                      ...prev.blog_content,
                      en: editorInstance.current.getData(),
                    },
                  }
                : prev
            );
          });
        }
      }, 0);
    };

    init();

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
      }
    };
  }, [id]);

  // 🚀 Update
  const updateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("blog_title", blog.blog_title.en);
    formData.append("blog_content", blog.blog_content.en);
    formData.append("blog_author", blog.blog_author);
    formData.append("blog_date", blog.blog_date);
    formData.append("publish_date", publish_date);
    formData.append("is_active", String(is_active));

    if (blog_image) {
      formData.append("blog_image", blog_image);
    }

    try {
      const res = await fetch(`${BLOG_API_URL}/updateblog/${id}`, {
        method: "PUT",
        body: formData,
      });

      setLoading(false);

      if (res.ok) {
        alert("Blog updated successfully!");
        window.location.href = "/All_Blogs";
      } else {
        const text = await res.text();
        console.error("SERVER ERROR:", text);
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="px-[180px] pt-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>

        <a href="/All_Blogs" className="bg-black text-white px-4 py-2 rounded">
          ← Back
        </a>
      </div>

      {blog ? (
        <form onSubmit={updateBlog} className="space-y-5">
          {/* TITLE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Blog Title
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              value={blog.blog_title.en}
              onChange={(e) =>
                setBlog({
                  ...blog,
                  blog_title: { ...blog.blog_title, en: e.target.value },
                })
              }
              required
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Blog Content
            </label>
            <div className="w-full rounded py-2">
              <div ref={editorRef}></div>
            </div>
          </div>

          {/* AUTHOR */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Author Name
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              value={blog.blog_author}
              onChange={(e) =>
                setBlog({ ...blog, blog_author: e.target.value })
              }
            />
          </div>

          {/* BLOG DATE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Blog Date
            </label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={blog.blog_date}
              onChange={(e) => setBlog({ ...blog, blog_date: e.target.value })}
            />
          </div>

          {/* PUBLISH DATE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Publish Date
            </label>
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
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Blog Status
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={String(is_active)}
              onChange={(e) => setIsActive(e.target.value === "true")}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* CURRENT IMAGE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Current Image
            </label>
            <img
              src={blog.blog_image}
              alt="current blog"
              className="w-full h-48 object-contain rounded border"
            />
          </div>

          {/* CHANGE IMAGE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Change Image
            </label>
            <input
              type="file"
              className="border rounded px-3 py-2 w-full"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setBlogImage(file);
              }}
            />
          </div>

          {/* SUBMIT */}
          <button
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      ) : (
        <p>Loading blog...</p>
      )}
    </div>
  );
}
