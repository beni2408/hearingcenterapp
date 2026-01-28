import { API_BASE_URL } from "$lib/config";

export async function getFooter() {
  const res = await fetch(`${API_BASE_URL}/footer`);
  if (!res.ok) throw new Error("Failed to load footer");
  return await res.json();
}
