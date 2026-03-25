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
    <div className="flex flex-col h-[600px] w-[400px] shadow-2xl rounded-lg justify-between bg-white">
      <div className="flex flex-col">
        <img
          src={image}
          alt="blog"
          className="rounded-t-lg h-56 w-full object-cover"
          onError={(e: any) => (e.target.src = "/blog1.png")}
        />
        <h1 className="font-bold text-xl mx-6 mt-6">{title}</h1>
        <p className="font-normal text-sm mx-6 mt-4 text-gray-500 text-justify line-clamp-4">
          {description}
        </p>
        <Link
          href={link}
          className="text-sm font-bold mx-6 mt-4 text-blue-900 hover:underline"
        >
          READ MORE
        </Link>
      </div>
      <div className="flex flex-col mb-5">
        <div className="w-full border border-gray-200"></div>
        <p className="text-gray-400 font-bold text-sm mt-3 mx-6">
          {formattedDate}
        </p>
      </div>
    </div>
  );
}
