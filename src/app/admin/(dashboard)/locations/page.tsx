"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  MapPin,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Location {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  isPrimary: boolean;
  isAvailableAt: boolean;
  isActive: boolean;
  order: number;
  gmapEmbedCode: string;
  operatingHours: string;
}

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await fetch("/api/admin/locations");
      if (res.ok) {
        const data = await res.json();
        setLocations(data);
      } else {
        console.error("Failed to load locations");
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
        "Are you sure you want to delete this location? This cannot be undone.",
      )
    )
      return;
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/locations/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLocations((prev) => prev.filter((l) => l._id !== id));
      } else {
        alert("Failed to delete location.");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting location.");
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (index: number, direction: "up" | "down") => {
    const newLocations = [...locations];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newLocations.length) return;

    [newLocations[index], newLocations[targetIndex]] = [
      newLocations[targetIndex],
      newLocations[index],
    ];
    setLocations(newLocations);

    // Persist the new order
    try {
      const orderedIds = newLocations.map((l) => l._id);
      await fetch("/api/admin/locations/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Locations</h2>
          <p className="text-sm text-slate-500">
            Manage your clinic and hospital locations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/contact-settings">⚙️ Contact Settings</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/locations/new">
              <Plus className="mr-2 h-4 w-4" /> Add Location
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-white">
        {loading ? (
          <div className="p-8 text-center text-slate-500">
            Loading locations...
          </div>
        ) : locations.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No locations found. Get started by adding one!
          </div>
        ) : (
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-slate-50/50">
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[50px]">
                    Order
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500">
                    Location
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[120px]">
                    City
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[100px]">
                    Type
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[80px]">
                    Map
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[80px]">
                    Status
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[140px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {locations.map((location, index) => (
                  <tr
                    key={location._id}
                    className="border-b transition-colors hover:bg-slate-50/50"
                  >
                    <td className="p-4 align-middle">
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => handleReorder(index, "up")}
                          disabled={index === 0}
                          className="p-0.5 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleReorder(index, "down")}
                          disabled={index === locations.length - 1}
                          className="p-0.5 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div>
                        <p className="font-medium flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          {location.name}
                          {location.isPrimary && (
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                              Primary
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 max-w-sm truncate">
                          {location.address}
                        </p>
                        {location.operatingHours && (
                          <p className="text-xs text-slate-400 mt-0.5">
                            🕐 {location.operatingHours}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-middle text-slate-600">
                      {location.city || "—"}
                    </td>
                    <td className="p-4 align-middle">
                      {location.isAvailableAt ? (
                        <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-600/20">
                          Available At
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-600/20">
                          Full Listing
                        </span>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      {location.gmapEmbedCode ? (
                        <span className="text-green-600 text-xs font-medium">
                          ✅ Set
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">No map</span>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      {location.isActive ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
                          <Eye className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                          <EyeOff className="h-3 w-3" /> Hidden
                        </span>
                      )}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/locations/${location._id}`}>
                            <Edit2 className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(location._id)}
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
