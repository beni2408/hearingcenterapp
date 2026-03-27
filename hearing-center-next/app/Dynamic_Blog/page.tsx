// // "use client";

// // import { useEffect, useState } from "react";
// // import Blogcard from "@/components/Blogcard";
// // import { BLOG_API_URL } from "@/lib/config";
// // import { currentLang } from "@/lib/stores/lang";

// // type Blog = {
// //   _id: string;
// //   publish_date: string;
// //   is_active: boolean;
// //   [key: string]: any;
// // };

// // export default function DynamicBlogPage() {
// //   const [blogs, setBlogs] = useState<Blog[]>([]);
// //   const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
// //   const [lang, setLang] = useState("en");

// //   // 🌐 Language store
// //   useEffect(() => {
// //     const unsubscribe = currentLang.subscribe((value: string) => {
// //       setLang(value);
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   useEffect(() => {
// //     loadBlogs();
// //   }, []);

// //   const loadBlogs = async () => {
// //     try {
// //       const res = await fetch(`${BLOG_API_URL}/allblogs`);
// //       const json = await res.json();

// //       const blogsData = json.data.blogs;
// //       setBlogs(blogsData);

// //       const today = new Date();
// //       today.setHours(0, 0, 0, 0);

// //       const filtered = blogsData.filter((blog: Blog) => {
// //         const publishDate = new Date(blog.publish_date);
// //         publishDate.setHours(0, 0, 0, 0);

// //         return blog.is_active === true && publishDate <= today;
// //       });

// //       setFilteredBlogs(filtered);
// //     } catch (err) {
// //       console.error("Error fetching blogs:", err);
// //     }
// //   };

// //   return (
// //     <div className="pt-8 px-[80px]">
// //       {/* 🌐 LANGUAGE SWITCH */}
// //       <div className="flex gap-3 mb-4">
// //         <button onClick={() => currentLang.set("en")}>EN</button>
// //         <button onClick={() => currentLang.set("ta")}>TA</button>
// //         <button onClick={() => currentLang.set("ar")}>AR</button>
// //         <button onClick={() => currentLang.set("ml")}>ML</button>
// //       </div>

// //       {/* HEADER */}
// //       <div className="flex justify-between items-center mb-6">
// //         <h1
// //           className={`text-2xl font-bold ${
// //             lang === "ar" ? "text-right w-full" : ""
// //           }`}
// //           dir={lang === "ar" ? "rtl" : "ltr"}
// //         >
// //           {/* Static translation fallback */}
// //           {lang === "ta"
// //             ? "வலைப்பதிவுகள்"
// //             : lang === "ar"
// //             ? "المدونات"
// //             : lang === "ml"
// //             ? "ബ്ലോഗുകൾ"
// //             : "Dynamic Blogs"}
// //         </h1>
// //       </div>

// //       {/* BLOG GRID */}
// //       <div
// //         className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
// //           lang === "ar" ? "text-right" : ""
// //         }`}
// //         dir={lang === "ar" ? "rtl" : "ltr"}
// //       >
// //         {filteredBlogs.length === 0 ? (
// //           <p className="text-gray-500">
// //             {lang === "ta"
// //               ? "வலைப்பதிவுகள் இல்லை"
// //               : lang === "ar"
// //               ? "لا توجد مدونات"
// //               : lang === "ml"
// //               ? "ബ്ലോഗുകൾ ലഭ്യമല്ല"
// //               : "No blogs found"}
// //           </p>
// //         ) : (
// //           filteredBlogs.map((blog) => (
// //             <Blogcard
// //               key={blog._id}
// //               blog={blog}
// //               lang={lang}
// //               link={`/Dynamic_Blog/${blog._id}`}
// //             />
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import Blogcard from "@/components/Blogcard";
// import { BLOG_API_URL } from "@/lib/config";
// import { useLanguage } from "@/lib/context/LanguageContext";

// type Blog = {
//   _id: string;
//   publish_date: string;
//   is_active: boolean;
//   [key: string]: any;
// };

// export default function DynamicBlogPage() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

//   // ✅ Correct usage
//   const { lang, setLang } = useLanguage();

//   useEffect(() => {
//     loadBlogs();
//   }, []);

//   const loadBlogs = async () => {
//     try {
//       const res = await fetch(`${BLOG_API_URL}/allblogs`);
//       const json = await res.json();

//       const blogsData = json.data.blogs;
//       setBlogs(blogsData);

//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       const filtered = blogsData.filter((blog: Blog) => {
//         const publishDate = new Date(blog.publish_date);
//         publishDate.setHours(0, 0, 0, 0);

//         return blog.is_active === true && publishDate <= today;
//       });

//       setFilteredBlogs(filtered);
//     } catch (err) {
//       console.error("Error fetching blogs:", err);
//     }
//   };

//   return (
//     <div className="pt-8 px-[80px]">
//       {/* 🌐 LANGUAGE SWITCH */}
//       {/* <div className="flex gap-3 mb-4">
//         <button onClick={() => setLang("en")}>EN</button>
//         <button onClick={() => setLang("ta")}>TA</button>
//         <button onClick={() => setLang("ar")}>AR</button>
//         <button onClick={() => setLang("ml")}>ML</button>
//       </div> */}

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1
//           className={`text-2xl font-bold ${
//             lang === "ar" ? "text-right w-full" : ""
//           }`}
//           dir={lang === "ar" ? "rtl" : "ltr"}
//         >
//           {lang === "ta"
//             ? "வலைப்பதிவுகள்"
//             : lang === "ar"
//             ? "المدونات"
//             : lang === "ml"
//             ? "ബ്ലോഗുകൾ"
//             : "Dynamic Blogs"}
//         </h1>
//       </div>

//       {/* BLOG GRID */}
//       <div
//         className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
//           lang === "ar" ? "text-right" : ""
//         }`}
//         dir={lang === "ar" ? "rtl" : "ltr"}
//       >
//         {filteredBlogs.length === 0 ? (
//           <p className="text-gray-500">
//             {lang === "ta"
//               ? "வலைப்பதிவுகள் இல்லை"
//               : lang === "ar"
//               ? "لا توجد مدونات"
//               : lang === "ml"
//               ? "ബ്ലോഗുകൾ ലഭ്യമല്ല"
//               : "No blogs found"}
//           </p>
//         ) : (
//           filteredBlogs.map((blog) => (
//             <Blogcard
//               key={blog._id}
//               blog={blog}
//               lang={lang}
//               link={`/Dynamic_Blog/${blog._id}`}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Blogcard from "@/components/Blogcard";
import { BLOG_API_URL } from "@/lib/config";
import { useLanguage } from "@/lib/context/LanguageContext";

type Blog = {
  _id: string;
  publish_date: string;
  is_active: boolean;
  [key: string]: any;
};

export default function DynamicBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  const { lang } = useLanguage();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const res = await fetch(`${BLOG_API_URL}/allblogs`);
      const json = await res.json();

      const blogsData = json.data.blogs;
      setBlogs(blogsData);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const filtered = blogsData.filter((blog: Blog) => {
        const publishDate = new Date(blog.publish_date);
        publishDate.setHours(0, 0, 0, 0);

        return blog.is_active === true && publishDate <= today;
      });

      setFilteredBlogs(filtered);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 bg-gradient-to-b from-white to-gray-50">
      {/* Container */}
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 lg:mb-12">
          <h1
            className={`text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight ${
              lang === "ar" ? "text-right" : ""
            }`}
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
              {lang === "ta"
                ? "வலைப்பதிவுகள்"
                : lang === "ar"
                ? "المدونات"
                : lang === "ml"
                ? "ബ്ലോഗുകൾ"
                : "Dynamic Blogs"}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            {lang === "ta"
              ? "சமீபத்திய பதிவுகளை ஆராயுங்கள்"
              : lang === "ar"
              ? "استكشف أحدث المدونات"
              : lang === "ml"
              ? "പുതിയ ബ്ലോഗുകൾ കണ്ടെത്തുക"
              : "Explore our latest updates and insights"}
          </p>

          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        {/* BLOG GRID */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 ${
            lang === "ar" ? "text-right" : ""
          }`}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {filteredBlogs.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="text-gray-400 text-sm sm:text-base">
                {lang === "ta"
                  ? "வலைப்பதிவுகள் இல்லை"
                  : lang === "ar"
                  ? "لا توجد مدونات"
                  : lang === "ml"
                  ? "ബ്ലോഗുകൾ ലഭ്യമല്ല"
                  : "No blogs found"}
              </div>
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <div
                key={blog._id} // ✅ FIX: key should be here
                className="transition-transform duration-200 hover:-translate-y-1"
              >
                <Blogcard
                  blog={blog}
                  lang={lang}
                  link={`/Dynamic_Blog/${blog._id}`}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
