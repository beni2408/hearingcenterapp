// "use client";

// import { useEffect, useRef, useState } from "react";
// import { BLOG_API_URL } from "@/lib/config";

// export default function CreateBlogPage() {
//   const [blog_title, setBlogTitle] = useState("");
//   const [blog_content, setBlogContent] = useState("");
//   const [blog_author, setBlogAuthor] = useState("");
//   const [blog_date, setBlogDate] = useState("");
//   const [publish_date, setPublishDate] = useState("");
//   const [is_active, setIsActive] = useState(true);
//   const [blog_image, setBlogImage] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const editorRef = useRef<HTMLDivElement | null>(null);
//   const editorInstance = useRef<any>(null);

//   // 📝 CKEditor setup
//   useEffect(() => {
//     let isMounted = true;

//     const initEditor = async () => {
//       const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic"))
//         .default;

//       if (!editorRef.current) return;

//       // ✅ FIX: remove duplicate editor DOM
//       editorRef.current.innerHTML = "";

//       if (editorInstance.current) return;

//       const editor = await ClassicEditor.create(editorRef.current, {
//         placeholder: "Write your blog content here...",
//         toolbar: [
//           "bold",
//           "italic",
//           "underline",
//           "strikethrough",
//           "numberedList",
//           "bulletedList",
//           "link",
//           "blockQuote",
//           "insertTable",
//           "imageUpload",
//           "undo",
//           "redo",
//         ],
//       });

//       if (!isMounted) return;

//       editorInstance.current = editor;

//       editor.model.document.on("change:data", () => {
//         setBlogContent(editor.getData());
//       });
//     };

//     initEditor();

//     return () => {
//       isMounted = false;

//       if (editorInstance.current) {
//         editorInstance.current.destroy();
//         editorInstance.current = null;
//       }
//     };
//   }, []);

//   // 🚀 Submit function
//   const submitBlog = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!blog_content || blog_content.trim() === "") {
//       alert("Blog content is required");
//       setLoading(false);
//       return;
//     }

//     if (!blog_image) {
//       alert("Please select an image");
//       setLoading(false);
//       return;
//     }

//     if (blog_image.size > 5 * 1024 * 1024) {
//       alert("Image must be less than 5MB");
//       setLoading(false);
//       return;
//     }

//     let finalBlogDate = blog_date;
//     if (!finalBlogDate) {
//       finalBlogDate = new Date().toISOString();
//     }

//     const formData = new FormData();
//     formData.append("blog_title", blog_title);
//     formData.append("blog_content", blog_content);
//     formData.append("blog_author", blog_author);
//     formData.append("blog_date", finalBlogDate);
//     formData.append("blog_image", blog_image);
//     formData.append("publish_date", publish_date);
//     formData.append("is_active", String(is_active));

//     try {
//       const res = await fetch(`${BLOG_API_URL}/newblog`, {
//         method: "POST",
//         body: formData,
//       });

//       setLoading(false);

//       if (res.ok) {
//         alert("Blog created successfully!");
//         window.location.href = "/Dynamic_Blog";
//       } else {
//         const text = await res.text();
//         console.error("SERVER ERROR:", text);
//         alert("Failed to create blog");
//       }
//     } catch (error) {
//       console.error("ERROR:", error);
//       alert("Server error");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="px-[180px] pt-10">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold mb-6">Create Blog</h1>

//         <a href="/All_Blogs" className="bg-black text-white px-4 py-2 rounded">
//           ← Back
//         </a>
//       </div>

//       {/* FORM */}
//       <form onSubmit={submitBlog} className="space-y-5">
//         {/* TITLE */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Blog Title</label>
//           <input
//             className="w-full border rounded px-3 py-2"
//             value={blog_title}
//             onChange={(e) => setBlogTitle(e.target.value)}
//             required
//           />
//         </div>

//         {/* CONTENT */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Blog Content</label>
//           <div ref={editorRef}></div>
//         </div>

//         {/* AUTHOR */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Author Name</label>
//           <input
//             className="w-full border rounded px-3 py-2"
//             value={blog_author}
//             onChange={(e) => setBlogAuthor(e.target.value)}
//           />
//         </div>

//         {/* BLOG DATE */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Blog Date</label>
//           <input
//             type="date"
//             className="w-full border rounded px-3 py-2"
//             value={blog_date}
//             onChange={(e) => setBlogDate(e.target.value)}
//           />
//         </div>

//         {/* PUBLISH DATE */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Publish Date</label>
//           <input
//             type="date"
//             className="w-full border rounded px-3 py-2"
//             value={publish_date}
//             onChange={(e) => setPublishDate(e.target.value)}
//             required
//           />
//         </div>

//         {/* STATUS */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Blog Status</label>
//           <select
//             className="w-full border rounded px-3 py-2"
//             value={String(is_active)}
//             onChange={(e) => setIsActive(e.target.value === "true")}
//           >
//             <option value="true">Active</option>
//             <option value="false">Inactive</option>
//           </select>
//         </div>

//         {/* IMAGE */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Blog Image</label>
//           <input
//             type="file"
//             className="w-full border rounded px-3 py-2"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) setBlogImage(file);
//             }}
//             required
//           />
//         </div>

//         {/* SUBMIT */}
//         <button
//           className="bg-blue-900 text-white w-full py-2 rounded"
//           disabled={loading}
//         >
//           {loading ? "Uploading..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { BLOG_API_URL } from "@/lib/config";

export default function CreateBlogPage() {
  const [blog_title, setBlogTitle] = useState("");
  const [blog_content, setBlogContent] = useState("");
  const [blog_author, setBlogAuthor] = useState("");
  const [blog_date, setBlogDate] = useState("");
  const [publish_date, setPublishDate] = useState("");
  const [is_active, setIsActive] = useState(true);
  const [blog_image, setBlogImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initEditor = async () => {
      const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic"))
        .default;

      if (!editorRef.current) return;

      editorRef.current.innerHTML = "";

      if (editorInstance.current) return;

      const editor = await ClassicEditor.create(editorRef.current, {
        placeholder: "Write your blog content here...",
        toolbar: [
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "numberedList",
          "bulletedList",
          "link",
          "blockQuote",
          "insertTable",
          "imageUpload",
          "undo",
          "redo",
        ],
      });

      if (!isMounted) return;

      editorInstance.current = editor;

      editor.model.document.on("change:data", () => {
        setBlogContent(editor.getData());
      });
    };

    initEditor();

    return () => {
      isMounted = false;

      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  const submitBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!blog_content || blog_content.trim() === "") {
      alert("Blog content is required");
      setLoading(false);
      return;
    }

    if (!blog_image) {
      alert("Please select an image");
      setLoading(false);
      return;
    }

    if (blog_image.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      setLoading(false);
      return;
    }

    let finalBlogDate = blog_date;
    if (!finalBlogDate) {
      finalBlogDate = new Date().toISOString();
    }

    const formData = new FormData();
    formData.append("blog_title", blog_title);
    formData.append("blog_content", blog_content);
    formData.append("blog_author", blog_author);
    formData.append("blog_date", finalBlogDate);
    formData.append("blog_image", blog_image);
    formData.append("publish_date", publish_date);
    formData.append("is_active", String(is_active));

    try {
      const res = await fetch(`${BLOG_API_URL}/newblog`, {
        method: "POST",
        body: formData,
      });

      setLoading(false);

      if (res.ok) {
        alert("Blog created successfully!");
        window.location.href = "/Dynamic_Blog";
      } else {
        const text = await res.text();
        console.error("SERVER ERROR:", text);
        alert("Failed to create blog");
      }
    } catch (error) {
      console.error("ERROR:", error);
      alert("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Create Blog
          </h1>

          <a
            href="/All_Blogs"
            className="text-sm text-gray-600 hover:text-black"
          >
            ← Back
          </a>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={submitBlog}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8 space-y-6"
        >
          {/* TITLE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Blog Title
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              value={blog_title}
              onChange={(e) => setBlogTitle(e.target.value)}
              required
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Blog Content
            </label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div ref={editorRef}></div>
            </div>
          </div>

          {/* GRID FIELDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* AUTHOR */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Author Name
              </label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                value={blog_author}
                onChange={(e) => setBlogAuthor(e.target.value)}
              />
            </div>

            {/* BLOG DATE */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Blog Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                value={blog_date}
                onChange={(e) => setBlogDate(e.target.value)}
              />
            </div>

            {/* PUBLISH DATE */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Publish Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
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
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                value={String(is_active)}
                onChange={(e) => setIsActive(e.target.value === "true")}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Blog Image
            </label>
            <input
              type="file"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-gray-100 file:rounded-md"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setBlogImage(file);
              }}
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
