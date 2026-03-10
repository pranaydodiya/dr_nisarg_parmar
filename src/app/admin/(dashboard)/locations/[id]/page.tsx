"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LocationForm } from "@/components/admin/LocationForm";

export default function EditLocationPage() {
  const params = useParams();
  const id = params.id as string;

  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch(`/api/admin/locations/${id}`);
        if (res.ok) {
          const data = await res.json();
          setLocation(data);
        } else {
          setError("Location not found.");
        }
      } catch (e) {
        console.error(e);
        setError("Failed to load location.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLocation();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500">Loading location...</div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit Location</h2>
        <p className="text-sm text-slate-500">
          Update &quot;{location?.name}&quot; details and map configuration.
        </p>
      </div>
      <LocationForm initialData={location} />
    </div>
  );
}
