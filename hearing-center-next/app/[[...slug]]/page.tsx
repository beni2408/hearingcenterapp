// app/[[...slug]]/page.tsx
import { notFound } from "next/navigation";
import { PAGE_API_URL } from "@/lib/config";

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const currentPath = !slug || slug.length === 0 ? "/" : "/" + slug.join("/");

  if (currentPath.startsWith("/Appointments")) return notFound();

  try {
    const res = await fetch(`${PAGE_API_URL}/page?url=${currentPath}`, {
      cache: "no-store",
    });

    if (!res.ok) return <div className="p-10">Page not found</div>;

    const json = await res.json();
    const pageData = json.data;

    return (
      <div dangerouslySetInnerHTML={{ __html: pageData?.content || "" }} />
    );
  } catch (err) {
    return <div className="p-10">Failed to load page</div>;
  }
}
