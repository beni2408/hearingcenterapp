// lib/config.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
export const MENU_API_URL = `${API_BASE_URL}/menu`;
// export const PAGE_API_URL = `${API_BASE_URL}/pages`;

// export const PAGE_API_URL = `${API_BASE_URL}`;
export const BLOG_API_URL = `${API_BASE_URL}/blogs`;
export const APPOINTMENT_API_URL = `${API_BASE_URL}/appointments`;
export const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:4000";
export const PAGE_API_URL = "http://localhost:4000/api";
