// "use client";

// import { useEffect, useState } from "react";
// import { BLOG_API_URL } from "@/lib/config";
// import { useParams } from "next/navigation";
// import { useLanguage } from "@/lib/context/LanguageContext";
// import { useAuth } from "@/lib/context/AuthContext";

// import Link from "next/link";

// type Blog = {
//   blog_title: Record<string, string>;
//   blog_content: Record<string, string>;
//   blog_author: string;
//   blog_date: string;
//   blog_image: string;
//   publish_date: string;
//   is_active: boolean;
// };

// export default function BlogDetailPage() {
//   const params = useParams();
//   const id = params?.id as string;

//   const { lang } = useLanguage();
//   const { user } = useAuth();

//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);

//   // 📦 Fetch blog
//   useEffect(() => {
//     if (!id) return;

//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`${BLOG_API_URL}/${id}`);
//         const json = await res.json();

//         const fetchedBlog = json.data.blog;

//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         const publishDate = new Date(fetchedBlog.publish_date);
//         publishDate.setHours(0, 0, 0, 0);

//         if (!fetchedBlog.is_active || publishDate > today) {
//           setBlog(null);
//         } else {
//           setBlog(fetchedBlog);
//         }
//       } catch (err) {
//         console.error(err);
//         setBlog(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   return (
//     <div className="pt-8 px-[80px]">
//       {loading ? (
//         <p className="text-gray-500">Loading blog...</p>
//       ) : blog ? (
//         <>
//           {/* HEADER */}
//           <div className="flex justify-between items-center mb-6">
//             <h1
//               className={`text-3xl font-bold mb-4 ${
//                 lang === "ar" ? "text-right" : ""
//               }`}
//               dir={lang === "ar" ? "rtl" : "ltr"}
//             >
//               {blog.blog_title?.[lang] || blog.blog_title?.en}
//             </h1>

//             {/* BACK BUTTON */}
//             <Link
//               href="/Dynamic_Blog"
//               className="bg-black text-white text-sm px-4 py-2 rounded-full flex items-center gap-2"
//             >
//               <i className="fas fa-angle-left"></i>
//               Back
//             </Link>
//           </div>

//           {/* META */}
//           <div className="flex items-center text-sm text-gray-500 mb-6">
//             <span>By {blog.blog_author}</span>
//             <span className="mx-2">•</span>
//             <span>{new Date(blog.blog_date).toLocaleDateString()}</span>
//           </div>

//           {/* IMAGE */}
//           <img
//             src={blog.blog_image}
//             alt="blog image"
//             className="w-full h-[400px] object-contain rounded-lg mb-6"
//           />

//           {/* CONTENT BLOCK */}
//           {(() => {
//             const content = blog.blog_content?.[lang] || blog.blog_content?.en;

//             const preview = content.split("</p>").slice(0, 1).join("</p>");

//             return (
//               <>
//                 {/* PREVIEW */}
//                 <div
//                   className={`text-gray-700 leading-relaxed ${
//                     lang === "ar" ? "text-right" : ""
//                   }`}
//                   dir={lang === "ar" ? "rtl" : "ltr"}
//                   dangerouslySetInnerHTML={{ __html: preview }}
//                 />

//                 {/* LOCK SECTION (NOT LOGGED IN) */}
//                 {!user && (
//                   <div className="mt-12 text-center border-t pt-8">
//                     <h2 className="text-xl font-semibold mb-5">
//                       Create an account to read the full blog
//                     </h2>

//                     <Link
//                       href="/signup"
//                       className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-700"
//                     >
//                       Sign up with email
//                     </Link>

//                     <p className="text-sm text-gray-500 mt-4">
//                       Already have an account?{" "}
//                       <Link href="/login" className="text-blue-900 underline">
//                         Sign in
//                       </Link>
//                     </p>
//                   </div>
//                 )}

//                 {/* FULL CONTENT (LOGGED IN) */}
//                 {user && (
//                   <div
//                     className={`mt-6 text-gray-700 leading-relaxed ${
//                       lang === "ar" ? "text-right" : ""
//                     }`}
//                     dir={lang === "ar" ? "rtl" : "ltr"}
//                     dangerouslySetInnerHTML={{ __html: content }}
//                   />
//                 )}
//               </>
//             );
//           })()}
//         </>
//       ) : (
//         <p className="text-red-500">Blog not found</p>
//       )}
//     </div>
//   );
// }

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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-3xl mx-auto">
        {loading ? (
          <div className="text-center text-gray-500 animate-pulse">
            Loading blog...
          </div>
        ) : blog ? (
          <>
            {/* BACK */}
            <div className="mb-6">
              <Link
                href="/Dynamic_Blog"
                className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
              >
                ← Back to blogs
              </Link>
            </div>

            {/* TITLE */}
            <h1
              className={`text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-4 ${
                lang === "ar" ? "text-right" : ""
              }`}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {blog.blog_title?.[lang] || blog.blog_title?.en}
            </h1>

            {/* META */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-6">
              <span>By {blog.blog_author}</span>
              <span>•</span>
              <span>{new Date(blog.blog_date).toLocaleDateString()}</span>
            </div>

            {/* IMAGE */}
            <div className="mb-8 overflow-hidden rounded-xl">
              <img
                src={blog.blog_image}
                alt="blog image"
                className="w-full h-[220px] sm:h-[300px] lg:h-[400px] object-cover"
              />
            </div>

            {/* CONTENT */}
            {(() => {
              const content =
                blog.blog_content?.[lang] || blog.blog_content?.en;

              const preview = content.split("</p>").slice(0, 1).join("</p>");

              return (
                <>
                  {/* PREVIEW */}
                  <div
                    className={`prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 ${
                      lang === "ar" ? "text-right" : ""
                    }`}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    dangerouslySetInnerHTML={{ __html: preview }}
                  />

                  {/* LOCK */}
                  {!user && (
                    <div className="mt-12 p-6 sm:p-8 rounded-xl border border-gray-200 bg-white shadow-sm text-center">
                      <h2 className="text-lg sm:text-xl font-semibold mb-4">
                        Create an account to read the full blog
                      </h2>

                      <Link
                        href="/signup"
                        className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm hover:bg-gray-800 transition"
                      >
                        Sign up with email
                      </Link>

                      <p className="text-sm text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-black underline">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  )}

                  {/* FULL CONTENT */}
                  {user && (
                    <div
                      className={`prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 mt-6 ${
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
          <div className="text-center text-red-500">Blog not found</div>
        )}
      </div>
    </div>
  );
}
