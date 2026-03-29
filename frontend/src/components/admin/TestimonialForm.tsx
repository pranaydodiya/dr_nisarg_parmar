"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Youtube, Instagram, UploadCloud } from "lucide-react";
import { browserAdminApiUrl } from "@/lib/api-client";

interface TestimonialFormProps {
  initialData?: any;
}

export function TestimonialForm({ initialData }: TestimonialFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [patientName, setPatientName] = useState(
    initialData?.patientName || "",
  );
  const [condition, setCondition] = useState(initialData?.condition || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");
  const [platform, setPlatform] = useState(initialData?.platform || "youtube");
  const [isPublished, setIsPublished] = useState(
    initialData ? initialData.isPublished : true,
  );

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(
    initialData?.thumbnailUrl || "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("patientName", patientName);
      formData.append("condition", condition);
      formData.append("summary", summary);
      formData.append("videoUrl", videoUrl);
      formData.append("platform", platform);
      formData.append("isPublished", isPublished.toString());

      if (platform === "instagram" && file) {
        formData.append("thumbnail", file);
      }
      if (removeImage) formData.append("removeImage", "true");

      const url = initialData
        ? browserAdminApiUrl(`/admin/testimonials/${initialData._id}`)
        : browserAdminApiUrl("/admin/testimonials");
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "same-origin",
        body: formData,
      });

      if (res.ok) {
        router.push("/admin/testimonials");
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Patient Name
          </label>
          <input
            required
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full rounded-md border text-black border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Condition Treated
          </label>
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full rounded-md border text-black border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="e.g. Brain Tumor Removal"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-slate-700">
          Platform Provider
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setPlatform("youtube")}
            className={`flex items-center gap-2 px-6 py-3 border rounded-md transition-all ${
              platform === "youtube"
                ? "border-red-600 bg-red-50 text-red-700 shadow-sm"
                : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Youtube className="w-5 h-5" /> YouTube
          </button>

          <button
            type="button"
            onClick={() => setPlatform("instagram")}
            className={`flex items-center gap-2 px-6 py-3 border rounded-md transition-all ${
              platform === "instagram"
                ? "border-pink-600 bg-pink-50 text-pink-700 shadow-sm"
                : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Instagram className="w-5 h-5" /> Instagram Reel
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Video URL</label>
        <input
          required
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full rounded-md border text-black border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder={
            platform === "youtube"
              ? "e.g. https://www.youtube.com/watch?v=..."
              : "e.g. https://www.instagram.com/reel/..."
          }
        />
        {platform === "youtube" && (
          <p className="text-xs text-muted-foreground mt-1">
            High-quality thumbnail will be automatically fetched from YouTube.
          </p>
        )}
      </div>

      {platform === "instagram" && (
        <div className="space-y-4 p-5 bg-slate-50 border border-slate-200 rounded-lg">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-primary" /> Instagram Custom
            Thumbnail (Required for Reels)
          </label>
          <div className="flex gap-6 items-center">
            {preview && file ? (
              <div className="relative w-40 aspect-video rounded-lg overflow-hidden border border-slate-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : initialData?.platform === "instagram" &&
              initialData?.thumbnailUrl &&
              !removeImage ? (
              <div className="relative w-40 aspect-video rounded-lg overflow-hidden border border-slate-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={initialData.thumbnailUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setRemoveImage(true);
                    setFile(null);
                    setPreview("");
                  }}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow"
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
            ) : null}

            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              <p className="text-xs text-muted-foreground mt-2 inline-block">
                Upload a clear photo to represent the Reel securely on your
                Cloudinary storage.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Short Summary Review (SEO & Context)
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          className="w-full rounded-md border text-black border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
          placeholder="A quick 1-2 sentence description explaining the success of the surgery or treatment to visitors and search engines."
        />
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
          Publish video on public pages immediately
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="w-full md:w-auto">
          {loading
            ? "Saving..."
            : initialData
              ? "Update Testimonial"
              : "Save Testimonial"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/testimonials")}
          className="w-full md:w-auto"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
