"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { browserAdminApiUrl } from "@/lib/api-client";

interface BlogFormProps {
  initialData?: any;
}

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [isPublished, setIsPublished] = useState(
    initialData?.isPublished || false,
  );
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(
    initialData?.featuredImage || "",
  );
  const [removeImage, setRemoveImage] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setRemoveImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview("");
    setRemoveImage(!initialData?.featuredImage);
    if (initialData?.featuredImage) {
      setRemoveImage(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("tags", tags);
      formData.append("isPublished", isPublished.toString());

      if (file) formData.append("image", file);
      if (removeImage) formData.append("removeImage", "true");

      const url = initialData
        ? browserAdminApiUrl(`/admin/blogs/${initialData._id}`)
        : browserAdminApiUrl("/admin/blogs");
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "same-origin",
        body: formData,
      });

      if (res.ok) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-4xl bg-white p-8 rounded-xl shadow-sm border border-slate-200"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Title</label>
        <input
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border text-black border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="e.g. Understanding Brain Tumor Surgery"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border text-black border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="e.g. Brain & Spine"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded-md border text-black border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="e.g. surgery, neurosurgery, tumor"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full rounded-md border text-black border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
          placeholder="A short summary for the blog card..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Content (HTML Support)
        </label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="w-full rounded-md border text-black border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="<h2>Heading</h2><p>Paragraph content...</p>"
        />
      </div>

      {/* Featured Image */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-slate-700">
          Featured Image (Cloudinary)
        </label>
        {preview ? (
          <div className="relative w-full max-w-sm rounded-lg overflow-hidden border border-slate-200">
            <img src={preview} alt="Preview" className="w-full h-auto" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 shadow flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-black"
            />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 border-t border-slate-200 pt-6">
        <input
          type="checkbox"
          id="isPublished"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
        />
        <label
          htmlFor="isPublished"
          className="text-sm font-medium text-slate-700"
        >
          Publish this post immediately
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="w-full md:w-auto">
          {loading
            ? "Saving..."
            : initialData
              ? "Update Blog Post"
              : "Create Blog Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blogs")}
          className="w-full md:w-auto"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
