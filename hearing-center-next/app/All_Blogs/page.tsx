// "use client";

// import { useEffect, useState } from "react";
// import { BLOG_API_URL } from "@/lib/config";

// import { translations } from "@/lib/i18n";
// import { useLanguage } from "@/lib/context/LanguageContext";
// import Link from "next/link";
// type Blog = {
//   _id: string;
//   blog_title: Record<string, string>;
//   blog_author: string;
//   blog_date: string;
//   publish_date: string;
//   is_active: boolean;
// };

// export default function AllBlogsPage() {
//   const { lang, setLang } = useLanguage();
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 🌍 Language store

//   // 🌍 Translation
//   const t = translations[lang] || translations.en;

//   // 📊 Publish check
//   const isPublished = (publishDate: string, isActive: boolean) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const date = new Date(publishDate);
//     date.setHours(0, 0, 0, 0);

//     return isActive === true && date <= today;
//   };

//   // ❌ Delete
//   const deleteBlog = async (id: string) => {
//     const confirmed = confirm(t.delete + "?");
//     if (!confirmed) return;

//     const res = await fetch(`${BLOG_API_URL}/deleteblog/${id}`, {
//       method: "DELETE",
//     });

//     if (res.ok) {
//       setBlogs((prev) => prev.filter((blog) => blog._id !== id));
//     } else {
//       alert("Failed to delete blog");
//     }
//   };

//   // 📥 Load blogs
//   useEffect(() => {
//     const loadBlogs = async () => {
//       const res = await fetch(`${BLOG_API_URL}/allblogs`);
//       const json = await res.json();
//       setBlogs(json.data.blogs);
//       setLoading(false);
//     };

//     loadBlogs();
//   }, []);

//   return (
//     <div className="pt-8 px-[80px]" dir={lang === "ar" ? "rtl" : "ltr"}>
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         {/* <div className="flex gap-3 mb-4">
//           <button
//             onClick={() => setLang("en")}
//             className="px-3 py-1 border rounded"
//           >
//             EN
//           </button>
//           <button
//             onClick={() => setLang("ta")}
//             className="px-3 py-1 border rounded"
//           >
//             TA
//           </button>
//           <button
//             onClick={() => setLang("ar")}
//             className="px-3 py-1 border rounded"
//           >
//             AR
//           </button>
//           <button
//             onClick={() => setLang("ml")}
//             className="px-3 py-1 border rounded"
//           >
//             ML
//           </button>
//         </div> */}

//         <h1 className="text-2xl font-bold">{t.allBlogs}</h1>

//         <Link
//           href="/Dynamic_Blog/new"
//           className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {t.newBlog}
//         </Link>
//       </div>

//       {/* CONTENT */}
//       {loading ? (
//         <p>{t.loading}</p>
//       ) : blogs.length === 0 ? (
//         <p>{t.noBlogs}</p>
//       ) : (
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">{t.title}</th>
//               <th className="border p-2">{t.author}</th>
//               <th className="border p-2">{t.date}</th>
//               <th className="border p-2">{t.publishedStatus}</th>
//               <th className="border p-2">{t.actions}</th>
//               <th className="border p-2">{t.publishDate}</th>
//               <th className="border p-2">{t.activeStatus}</th>
//             </tr>
//           </thead>

//           <tbody>
//             {blogs.map((blog) => (
//               <tr key={blog._id}>
//                 {/* TITLE */}
//                 <td className="border p-2">
//                   {blog.blog_title?.[lang] || blog.blog_title?.en}
//                 </td>

//                 {/* AUTHOR */}
//                 <td className="border p-2">{blog.blog_author}</td>

//                 {/* DATE */}
//                 <td className="border p-2">
//                   {new Date(blog.blog_date).toDateString()}
//                 </td>

//                 {/* PUBLISH STATUS */}
//                 <td className="border p-2">
//                   {isPublished(blog.publish_date, blog.is_active) ? (
//                     <span className="text-green-600 font-semibold">
//                       {t.published}
//                     </span>
//                   ) : (
//                     <span className="text-orange-600 font-semibold">
//                       {t.notPublished}
//                     </span>
//                   )}
//                 </td>

//                 {/* ACTIONS */}
//                 <td className="border p-2 space-x-3">
//                   <a
//                     href={`/Dynamic_Blog/${blog._id}/edit`}
//                     className="w-[70px] rounded text-blue-900 hover:underline hover:bg-blue-900 hover:text-white px-2 py-1"
//                   >
//                     {t.edit}
//                   </a>

//                   <button
//                     onClick={() => deleteBlog(blog._id)}
//                     className="w-[70px] rounded text-red-600 hover:underline hover:bg-red-600 hover:text-white px-2 py-1"
//                   >
//                     {t.delete}
//                   </button>
//                 </td>

//                 {/* PUBLISH DATE */}
//                 <td className="border p-2">
//                   {new Date(blog.publish_date).toLocaleDateString("en-GB")}
//                 </td>

//                 {/* ACTIVE */}
//                 <td className="border p-2">
//                   {blog.is_active ? t.active : t.inactive}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
// //

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
  const { lang } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const t = translations[lang] || translations.en;

  const isPublished = (publishDate: string, isActive: boolean) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = new Date(publishDate);
    date.setHours(0, 0, 0, 0);

    return isActive === true && date <= today;
  };

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
    <div
      className="w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 bg-gradient-to-b from-white to-gray-50"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
                {t.allBlogs}
              </span>
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Manage and control all blog posts
            </p>

            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          <Link href="/Dynamic_Blog/new" className="btn-primary">
            + {t.newBlog}
          </Link>
        </div>

        {/* TABLE CARD */}
        <div className="relative bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 sm:p-6 overflow-x-auto">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/40 to-transparent pointer-events-none" />

          {loading ? (
            <div className="text-center py-10 text-gray-500 animate-pulse">
              {t.loading}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-10 text-gray-500">{t.noBlogs}</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3 px-3 font-medium">{t.title}</th>
                  <th className="py-3 px-3 font-medium">{t.author}</th>
                  <th className="py-3 px-3 font-medium">{t.date}</th>
                  <th className="py-3 px-3 font-medium">{t.publishedStatus}</th>
                  <th className="py-3 px-3 font-medium">{t.publishDate}</th>
                  <th className="py-3 px-3 font-medium">{t.activeStatus}</th>
                  <th className="py-3 px-3 font-medium text-right">
                    {t.actions}
                  </th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* TITLE */}
                    <td className="py-3 px-3 font-medium text-gray-900">
                      {blog.blog_title?.[lang] || blog.blog_title?.en}
                    </td>

                    {/* AUTHOR */}
                    <td className="py-3 px-3 text-gray-600">
                      {blog.blog_author}
                    </td>

                    {/* DATE */}
                    <td className="py-3 px-3 text-gray-600">
                      {new Date(blog.blog_date).toLocaleDateString()}
                    </td>

                    {/* STATUS */}
                    <td className="py-3 px-3">
                      {isPublished(blog.publish_date, blog.is_active) ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600 font-medium">
                          {t.published}
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-600 font-medium">
                          {t.notPublished}
                        </span>
                      )}
                    </td>

                    {/* PUBLISH DATE */}
                    <td className="py-3 px-3 text-gray-600">
                      {new Date(blog.publish_date).toLocaleDateString("en-GB")}
                    </td>

                    {/* ACTIVE */}
                    <td className="py-3 px-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          blog.is_active
                            ? "bg-blue-50 text-blue-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {blog.is_active ? t.active : t.inactive}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3 px-3 text-right space-x-3">
                      <a
                        href={`/Dynamic_Blog/${blog._id}/edit`}
                        className="text-gray-700 hover:text-black text-sm"
                      >
                        {t.edit}
                      </a>

                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        {t.delete}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
