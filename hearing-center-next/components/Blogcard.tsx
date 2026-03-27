// import Link from "next/link";
// import { BACKEND_BASE_URL } from "@/lib/config";

// export default function Blogcard({ blog, lang = "en", link = "#" }: any) {
//   const image = blog?.blog_image
//     ? blog.blog_image.startsWith("http")
//       ? blog.blog_image
//       : `${BACKEND_BASE_URL}/${blog.blog_image}`
//     : "/blog1.png";

//   const title =
//     typeof blog?.blog_title === "string"
//       ? blog.blog_title
//       : blog?.blog_title?.[lang] || "No Title";
//   const content =
//     typeof blog?.blog_content === "string"
//       ? blog.blog_content
//       : blog?.blog_content?.[lang] || "";
//   const description = content.replace(/<[^>]+>/g, "").slice(0, 120);
//   const formattedDate = blog?.blog_date
//     ? new Date(blog.blog_date).toLocaleDateString("en-GB")
//     : "";

//   return (
//     <div className="flex flex-col h-[600px] w-[400px] shadow-2xl rounded-lg justify-between bg-white">
//       <div className="flex flex-col">
//         <img
//           src={image}
//           alt="blog"
//           className="rounded-t-lg h-56 w-full object-cover"
//           onError={(e: any) => (e.target.src = "/blog1.png")}
//         />
//         <h1 className="font-bold text-xl mx-6 mt-6">{title}</h1>
//         <p className="font-normal text-sm mx-6 mt-4 text-gray-500 text-justify line-clamp-4">
//           {description}
//         </p>
//         <Link
//           href={link}
//           className="text-sm font-bold mx-6 mt-4 text-blue-900 hover:underline"
//         >
//           READ MORE
//         </Link>
//       </div>
//       <div className="flex flex-col mb-5">
//         <div className="w-full border border-gray-200"></div>
//         <p className="text-gray-400 font-bold text-sm mt-3 mx-6">
//           {formattedDate}
//         </p>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import { BACKEND_BASE_URL } from "@/lib/config";

export default function Blogcard({ blog, lang = "en", link = "#" }: any) {
  const image = blog?.blog_image
    ? blog.blog_image.startsWith("http")
      ? blog.blog_image
      : `${BACKEND_BASE_URL}/${blog.blog_image}`
    : "/blog1.png";

  const title =
    typeof blog?.blog_title === "string"
      ? blog.blog_title
      : blog?.blog_title?.[lang] || "No Title";

  const content =
    typeof blog?.blog_content === "string"
      ? blog.blog_content
      : blog?.blog_content?.[lang] || "";

  const description = content.replace(/<[^>]+>/g, "").slice(0, 120);

  const formattedDate = blog?.blog_date
    ? new Date(blog.blog_date).toLocaleDateString("en-GB")
    : "";

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt="blog"
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e: any) => (e.target.src = "/blog1.png")}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-5 py-5">
        <h1 className="font-semibold text-lg text-gray-900 line-clamp-2">
          {title}
        </h1>

        <p className="text-sm text-gray-500 mt-3 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Read More */}
        <Link
          href={link}
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 mt-4 group-hover:gap-2 transition-all"
        >
          Read more →
        </Link>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5">
        <div className="h-px bg-gray-100 mb-3" />
        <p className="text-xs text-gray-400 font-medium">{formattedDate}</p>
      </div>
    </div>
  );
}
