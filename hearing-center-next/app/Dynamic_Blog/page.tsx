"use client";

import { useEffect, useState } from "react";
import Blogcard from "@/components/Blogcard";
import { BLOG_API_URL } from "@/lib/config";
import { currentLang } from "@/lib/stores/lang";

type Blog = {
  _id: string;
  publish_date: string;
  is_active: boolean;
  [key: string]: any;
};

export default function DynamicBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [lang, setLang] = useState<any>(null);

  // Subscribe to store (Svelte → React conversion)
  useEffect(() => {
    const unsubscribe = currentLang.subscribe((value: any) => {
      setLang(value);
    });

    return () => unsubscribe();
  }, []);

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
    <div className="pt-8 px-[80px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dynamic Blogs</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length === 0 ? (
          <p className="text-gray-500">No blogs found</p>
        ) : (
          filteredBlogs.map((blog) => (
            <Blogcard
              key={blog._id}
              blog={blog}
              lang={lang}
              link={`/Dynamic_Blog/${blog._id}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
