// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import SummaryApi from "@/services/SummaryApi";

interface BlogDetailProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  return {
    title: `Blog - ${params.slug}`,
  };
}

const getBlogDetail = async (slug: string) => {
  try {
    const res = await fetch(`${SummaryApi.getBlogBySlug.url}/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data
  } catch (err) {
    return null;
  }
};

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const blog = await getBlogDetail(params.slug);

  if (!blog) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-4">
        {new Date(blog.date).toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <img src={blog.img} alt={blog.title} className="w-full mb-6 rounded-lg" />
      <div
        className="prose prose-lg prose-invert"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
