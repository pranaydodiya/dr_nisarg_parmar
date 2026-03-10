"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  _id: string;
  patientName: string;
  condition: string;
  platform: string;
  thumbnailUrl: string;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      } else {
        console.error("Failed to load testimonials");
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
        "Are you sure you want to delete this video testimonial? This cannot be undone.",
      )
    )
      return;
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
      } else {
        alert("Failed to delete testimonial.");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Video Testimonials
          </h2>
          <p className="text-sm text-slate-500">
            Manage patient video reviews across platforms.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <Plus className="mr-2 h-4 w-4" /> Add Testimonial
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        {loading ? (
          <div className="p-8 text-center text-slate-500">
            Loading testimonials...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No video testimonials found. Get started by adding a YouTube or
            Instagram link!
          </div>
        ) : (
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-slate-50/50">
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[100px]">
                    Thumbnail
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500">
                    Patient Details
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[150px]">
                    Platform
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[120px]">
                    Status
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[100px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {testimonials.map((test) => (
                  <tr
                    key={test._id}
                    className="border-b transition-colors hover:bg-slate-50/50"
                  >
                    <td className="p-4 align-middle">
                      {test.thumbnailUrl ? (
                        <div className="relative w-20 h-12 rounded-md overflow-hidden bg-slate-100 object-cover">
                          <Image
                            src={test.thumbnailUrl}
                            alt={test.patientName}
                            fill
                            className="object-cover"
                            sizes="80px"
                            unoptimized={test.thumbnailUrl.includes("youtube")} // Don't bounce youtube remote imgs
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-12 rounded-md bg-slate-200 border border-slate-300" />
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="font-medium text-slate-900">
                        {test.patientName}
                      </div>
                      <div className="text-xs text-slate-500">
                        {test.condition}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      {test.platform === "youtube" ? (
                        <div className="flex items-center text-red-600 gap-1.5 font-medium">
                          <Youtube className="w-4 h-4" /> YouTube
                        </div>
                      ) : (
                        <div className="flex items-center text-pink-600 gap-1.5 font-medium">
                          <Instagram className="w-4 h-4" /> Instagram
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      {test.isPublished ? (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          Hidden
                        </span>
                      )}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/testimonials/${test._id}`}>
                            <Edit2 className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(test._id)}
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
