"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogForm } from "@/components/admin/BlogForm";

export default function EditBlogPage() {
  const params = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/admin/blogs/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        } else {
          console.error("Failed to load blog");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) fetchBlog();
  }, [params.id]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit Blog Post</h2>
        <p className="text-sm text-slate-500">Update content and attributes.</p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading editor...</div>
      ) : blog ? (
        <BlogForm initialData={blog} />
      ) : (
        <div className="text-red-500">Blog not found.</div>
      )}
    </div>
  );
}
