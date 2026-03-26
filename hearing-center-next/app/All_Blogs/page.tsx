"use client";

import { useEffect, useState } from "react";
import { BLOG_API_URL } from "@/lib/config";

import { translations } from "@/lib/i18n";
import { useLanguage } from "@/lib/context/LanguageContext";
import Link from "next/link";
type Blog = {
  _id: string;
  blog_title: Record<string, string>;
  blog_author: string;
  blog_date: string;
  publish_date: string;
  is_active: boolean;
};

export default function AllBlogsPage() {
  const { lang, setLang } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // 🌍 Language store

  // 🌍 Translation
  const t = translations[lang] || translations.en;

  // 📊 Publish check
  const isPublished = (publishDate: string, isActive: boolean) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = new Date(publishDate);
    date.setHours(0, 0, 0, 0);

    return isActive === true && date <= today;
  };

  // ❌ Delete
  const deleteBlog = async (id: string) => {
    const confirmed = confirm(t.delete + "?");
    if (!confirmed) return;

    const res = await fetch(`${BLOG_API_URL}/deleteblog/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } else {
      alert("Failed to delete blog");
    }
  };

  // 📥 Load blogs
  useEffect(() => {
    const loadBlogs = async () => {
      const res = await fetch(`${BLOG_API_URL}/allblogs`);
      const json = await res.json();
      setBlogs(json.data.blogs);
      setLoading(false);
    };

    loadBlogs();
  }, []);

  return (
    <div className="pt-8 px-[80px]" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        {/* <div className="flex gap-3 mb-4">
          <button
            onClick={() => setLang("en")}
            className="px-3 py-1 border rounded"
          >
            EN
          </button>
          <button
            onClick={() => setLang("ta")}
            className="px-3 py-1 border rounded"
          >
            TA
          </button>
          <button
            onClick={() => setLang("ar")}
            className="px-3 py-1 border rounded"
          >
            AR
          </button>
          <button
            onClick={() => setLang("ml")}
            className="px-3 py-1 border rounded"
          >
            ML
          </button>
        </div> */}

        <h1 className="text-2xl font-bold">{t.allBlogs}</h1>

        <Link
          href="/Dynamic_Blog/new"
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {t.newBlog}
        </Link>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>{t.loading}</p>
      ) : blogs.length === 0 ? (
        <p>{t.noBlogs}</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">{t.title}</th>
              <th className="border p-2">{t.author}</th>
              <th className="border p-2">{t.date}</th>
              <th className="border p-2">{t.publishedStatus}</th>
              <th className="border p-2">{t.actions}</th>
              <th className="border p-2">{t.publishDate}</th>
              <th className="border p-2">{t.activeStatus}</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                {/* TITLE */}
                <td className="border p-2">
                  {blog.blog_title?.[lang] || blog.blog_title?.en}
                </td>

                {/* AUTHOR */}
                <td className="border p-2">{blog.blog_author}</td>

                {/* DATE */}
                <td className="border p-2">
                  {new Date(blog.blog_date).toDateString()}
                </td>

                {/* PUBLISH STATUS */}
                <td className="border p-2">
                  {isPublished(blog.publish_date, blog.is_active) ? (
                    <span className="text-green-600 font-semibold">
                      {t.published}
                    </span>
                  ) : (
                    <span className="text-orange-600 font-semibold">
                      {t.notPublished}
                    </span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="border p-2 space-x-3">
                  <a
                    href={`/Dynamic_Blog/${blog._id}/edit`}
                    className="w-[70px] rounded text-blue-900 hover:underline hover:bg-blue-900 hover:text-white px-2 py-1"
                  >
                    {t.edit}
                  </a>

                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="w-[70px] rounded text-red-600 hover:underline hover:bg-red-600 hover:text-white px-2 py-1"
                  >
                    {t.delete}
                  </button>
                </td>

                {/* PUBLISH DATE */}
                <td className="border p-2">
                  {new Date(blog.publish_date).toLocaleDateString("en-GB")}
                </td>

                {/* ACTIVE */}
                <td className="border p-2">
                  {blog.is_active ? t.active : t.inactive}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
