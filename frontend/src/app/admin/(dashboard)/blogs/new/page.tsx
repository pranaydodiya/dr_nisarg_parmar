import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create Blog Post</h2>
        <p className="text-sm text-slate-500">Add a new post to your blog.</p>
      </div>
      <BlogForm />
    </div>
  );
}
