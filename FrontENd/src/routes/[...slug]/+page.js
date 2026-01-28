// import { PAGES_API_URL } from "$lib/config";

// export async function load({ params, fetch }) {
//   let slug = params.slug;
//   let currentPath;

//   if (!slug) {
//     currentPath = "/";
//   } else if (Array.isArray(slug)) {
//     currentPath = "/" + slug.join("/");
//   } else {
//     currentPath = "/" + slug;
//   }

//   try {
//     const res = await fetch(`${PAGES_API_URL}/page?url=${currentPath}`);

//     if (!res.ok) {
//       return {
//         pageData: null,
//         error: true,
//       };
//     }

//     const json = await res.json();

//     return {
//       pageData: json.data,
//       error: false,
//     };
//   } catch (err) {
//     return {
//       pageData: null,
//       error: true,
//     };
//   }
// }

// import { PAGE_API_URL } from "$lib/config";

// export const ssr = false;

// export async function load({ params, fetch }) {
//   let slug = params.slug;

//   let currentPath =
//     !slug || slug.length === 0
//       ? "/"
//       : Array.isArray(slug)
//       ? "/" + slug.join("/")
//       : "/" + slug;

//   try {
//     const res = await fetch(`${PAGE_API_URL}/page?url=${currentPath}`);

//     if (!res.ok) {
//       return {
//         pageData: null,
//         error: true,
//       };
//     }

//     const json = await res.json();

//     return {
//       pageData: json.data,
//       error: false,
//     };
//   } catch (err) {
//     console.error("Page load error:", err);
//     return {
//       pageData: null,
//       error: true,
//     };
//   }
// }

import { PAGE_API_URL } from "$lib/config";
import { error } from "@sveltejs/kit";

export const ssr = false;

export async function load({ params, fetch, url }) {
  const pathname = url.pathname;

  // ✅ BLOCK CMS FROM ADMIN / APPOINTMENTS ROUTES
  if (pathname.startsWith("/Appointments")) {
    throw error(404, "Not a CMS page");
  }

  let slug = params.slug;

  let currentPath =
    !slug || slug.length === 0
      ? "/"
      : Array.isArray(slug)
      ? "/" + slug.join("/")
      : "/" + slug;

  try {
    const res = await fetch(`${PAGE_API_URL}/page?url=${currentPath}`);

    if (!res.ok) {
      return {
        pageData: null,
        error: true,
      };
    }

    const json = await res.json();

    return {
      pageData: json.data,
      error: false,
    };
  } catch (err) {
    console.error("Page load error:", err);
    return {
      pageData: null,
      error: true,
    };
  }
}
