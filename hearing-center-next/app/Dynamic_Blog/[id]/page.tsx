"use client";

import { useEffect, useState } from "react";
import { BLOG_API_URL } from "@/lib/config";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useAuth } from "@/lib/context/AuthContext";

import Link from "next/link";

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

  const { lang } = useLanguage();
  const { user } = useAuth();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

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
      {loading ? (
        <p className="text-gray-500">Loading blog...</p>
      ) : blog ? (
        <>
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1
              className={`text-3xl font-bold mb-4 ${
                lang === "ar" ? "text-right" : ""
              }`}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {blog.blog_title?.[lang] || blog.blog_title?.en}
            </h1>

            {/* BACK BUTTON */}
            <Link
              href="/Dynamic_Blog"
              className="bg-black text-white text-sm px-4 py-2 rounded-full flex items-center gap-2"
            >
              <i className="fas fa-angle-left"></i>
              Back
            </Link>
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

          {/* CONTENT BLOCK */}
          {(() => {
            const content = blog.blog_content?.[lang] || blog.blog_content?.en;

            const preview = content.split("</p>").slice(0, 1).join("</p>");

            return (
              <>
                {/* PREVIEW */}
                <div
                  className={`text-gray-700 leading-relaxed ${
                    lang === "ar" ? "text-right" : ""
                  }`}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  dangerouslySetInnerHTML={{ __html: preview }}
                />

                {/* LOCK SECTION (NOT LOGGED IN) */}
                {!user && (
                  <div className="mt-12 text-center border-t pt-8">
                    <h2 className="text-xl font-semibold mb-5">
                      Create an account to read the full blog
                    </h2>

                    <Link
                      href="/signup"
                      className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-700"
                    >
                      Sign up with email
                    </Link>

                    <p className="text-sm text-gray-500 mt-4">
                      Already have an account?{" "}
                      <Link href="/login" className="text-blue-900 underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                )}

                {/* FULL CONTENT (LOGGED IN) */}
                {user && (
                  <div
                    className={`mt-6 text-gray-700 leading-relaxed ${
                      lang === "ar" ? "text-right" : ""
                    }`}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                )}
              </>
            );
          })()}
        </>
      ) : (
        <p className="text-red-500">Blog not found</p>
      )}
    </div>
  );
}
