"use client";
import { fetchApi } from "@/lib/api-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Blog {
  _id: string;
  title: string;
  category: string;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetchApi("/admin/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      } else {
        console.error("Failed to load blogs");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this blog post? This cannot be undone.",
      )
    )
      return;
    try {
      setLoading(true);
      const res = await fetchApi(`/admin/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } else {
        alert("Failed to delete blog.");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blogs</h2>
          <p className="text-sm text-slate-500">Manage your blog posts here.</p>
        </div>
        <Button asChild>
          <Link href="/admin/blogs/new">
            <Plus className="mr-2 h-4 w-4" /> Add Blog
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No blogs found. Get started by creating one!
          </div>
        ) : (
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-50">
                  <th className="h-12 px-4 align-middle font-medium text-slate-500">
                    Title
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[150px]">
                    Category
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[100px]">
                    Status
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[150px]">
                    Date
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[100px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-b transition-colors hover:bg-slate-50/50"
                  >
                    <td className="p-4 align-middle font-medium">
                      {blog.title}
                    </td>
                    <td className="p-4 align-middle">{blog.category}</td>
                    <td className="p-4 align-middle">
                      {blog.isPublished ? (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4 align-middle text-slate-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/blogs/${blog._id}`}>
                            <Edit2 className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
