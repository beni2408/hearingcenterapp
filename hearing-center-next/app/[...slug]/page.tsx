// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// import Gallery from "@/components/Gallery";

// const PAGE_API_URL = "http://localhost:4000/api";
// export default function Page() {
//   const params = useParams();
//   const [pageData, setPageData] = useState<any>(null);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // ✅ Build currentPath (same logic as Svelte)
//   const getCurrentPath = () => {
//     const slug = params.slug;

//     if (!slug || slug.length === 0) return "/";
//     if (Array.isArray(slug)) return "/" + slug.join("/");
//     return "/" + slug;
//   };

//   // ✅ Split function
//   const splitByGallery = (content: string) => {
//     return content.split("[gallery]");
//   };
//   useEffect(() => {
//     const fetchPage = async () => {
//       try {
//         // ✅ FIX: safely read params
//         const slugArray = params?.slug ?? [];

//         const currentPath =
//           !slugArray || slugArray.length === 0
//             ? "/"
//             : "/" + slugArray.join("/");

//         // BLOCK route
//         if (currentPath.startsWith("/Appointments")) {
//           setError(true);
//           setLoading(false);
//           return;
//         }

//         const url = `http://localhost:4000/api/pages/page?url=${currentPath}`;
//         console.log("FINAL URL:", url);

//         const res = await fetch(url);

//         const text = await res.text();

//         const json = JSON.parse(text); // safe now

//         setPageData(json.data);
//         setError(false);
//       } catch (err) {
//         console.error("Page load error:", err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPage();
//   }, [params]);

//   // ✅ UI Rendering (same as Svelte)
//   if (error) {
//     return <p className="p-10 text-red-600">Page not found</p>;
//   }

//   if (loading || !pageData) {
//     return <p className="p-10">Loading...</p>;
//   }

//   return (
//     <div className="px-[80px] py-10">
//       <h1 className="text-3xl font-bold mb-6">{pageData.page_title}</h1>

//       {pageData.page_content.includes("[gallery]") ? (
//         splitByGallery(pageData.page_content).map(
//           (block: string, i: number) => (
//             <div key={i}>
//               <div
//                 className="prose max-w-none"
//                 dangerouslySetInnerHTML={{ __html: block }}
//               />

//               {i === 0 && <Gallery />}
//             </div>
//           )
//         )
//       ) : (
//         <div
//           className="prose max-w-none"
//           dangerouslySetInnerHTML={{
//             __html: pageData.page_content,
//           }}
//         />
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Gallery from "@/components/Gallery";

const PAGE_API_URL = "http://localhost:4000/api";

export default function Page() {
  const params = useParams();
  const [pageData, setPageData] = useState<any>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCurrentPath = () => {
    const slug = params.slug;

    if (!slug || slug.length === 0) return "/";
    if (Array.isArray(slug)) return "/" + slug.join("/");
    return "/" + slug;
  };

  const splitByGallery = (content: string) => {
    return content.split("[gallery]");
  };

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const slugArray = params?.slug ?? [];

        const currentPath =
          !slugArray || slugArray.length === 0
            ? "/"
            : "/" + slugArray.join("/");

        if (currentPath.startsWith("/Appointments")) {
          setError(true);
          setLoading(false);
          return;
        }

        const url = `http://localhost:4000/api/pages/page?url=${currentPath}`;
        console.log("FINAL URL:", url);

        const res = await fetch(url);
        const text = await res.text();
        const json = JSON.parse(text);

        setPageData(json.data);
        setError(false);
      } catch (err) {
        console.error("Page load error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [params]);

  // ✅ Improved UI States

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p className="text-red-500 text-sm sm:text-base font-medium">
          Page not found
        </p>
      </div>
    );
  }

  if (loading || !pageData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p className="text-gray-500 text-sm sm:text-base animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Center Container */}
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-6 lg:mb-8">
          {pageData.page_title}
        </h1>

        {/* Content */}
        <div className="space-y-6">
          {pageData.page_content.includes("[gallery]") ? (
            splitByGallery(pageData.page_content).map(
              (block: string, i: number) => (
                <div key={i} className="space-y-6">
                  <div
                    className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-gray leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: block }}
                  />

                  {i === 0 && (
                    <div className="pt-4">
                      <Gallery />
                    </div>
                  )}
                </div>
              )
            )
          ) : (
            <div
              className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-gray leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: pageData.page_content,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
