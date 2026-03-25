"use client";

import { useEffect, useState } from "react";
import { BLOG_API_URL } from "@/lib/config";
import { currentLang } from "@/lib/stores/lang";
import { useParams } from "next/navigation";

type Blog = {
  blog_title: Record<string, string>;
  blog_content: Record<string, string>;
  blog_author: string;
  blog_date: string;
  blog_image: string;
  publish_date: string;
  is_active: boolean;
};

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [lang, setLang] = useState("en");
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // 🌐 Language store
  useEffect(() => {
    const unsubscribe = currentLang.subscribe((value: string) => {
      setLang(value);
    });

    return () => unsubscribe();
  }, []);

  // 📦 Fetch blog
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${BLOG_API_URL}/${id}`);
        const json = await res.json();

        const fetchedBlog = json.data.blog;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const publishDate = new Date(fetchedBlog.publish_date);
        publishDate.setHours(0, 0, 0, 0);

        if (!fetchedBlog.is_active || publishDate > today) {
          setBlog(null);
        } else {
          setBlog(fetchedBlog);
        }
      } catch (err) {
        console.error(err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className="pt-8 px-[80px]">
      {/* LANGUAGE SWITCH */}
      <div className="flex gap-3 mb-4">
        <button onClick={() => currentLang.set("en")}>EN</button>
        <button onClick={() => currentLang.set("ta")}>TA</button>
        <button onClick={() => currentLang.set("ar")}>AR</button>
        <button onClick={() => currentLang.set("ml")}>ML</button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading blog...</p>
      ) : blog ? (
        <>
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            {/* TITLE (RTL only for AR) */}
            <h1
              className={`text-3xl font-bold mb-4 ${
                lang === "ar" ? "text-right" : ""
              }`}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {blog.blog_title?.[lang] || blog.blog_title?.en}
            </h1>

            {/* BACK BUTTON */}
            <div className="flex justify-end mb-6">
              <div className="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl flex items-center justify-center">
                <i className="fas fa-angle-left text-[15px]"></i>
                <a href="/Dynamic_Blog" className="text-[15px] ml-1">
                  Back
                </a>
              </div>
            </div>
          </div>

          {/* META */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span>By {blog.blog_author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(blog.blog_date).toLocaleDateString()}</span>
          </div>

          {/* IMAGE */}
          <img
            src={blog.blog_image}
            alt="blog image"
            className="w-full h-[400px] object-contain rounded-lg mb-6"
          />

          {/* CONTENT (RTL only for AR) */}
          <p
            className={`text-gray-700 leading-relaxed whitespace-pre-line ${
              lang === "ar" ? "text-right" : ""
            }`}
            dir={lang === "ar" ? "rtl" : "ltr"}
            dangerouslySetInnerHTML={{
              __html: blog.blog_content?.[lang] || blog.blog_content?.en,
            }}
          />

          {/* BACK BUTTON */}
          <div className="mt-8 flex gap-4">
            <a
              href="/Dynamic_Blog"
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Back
            </a>
          </div>
        </>
      ) : (
        <p className="text-red-500">Blog not found</p>
      )}
    </div>
  );
}
