"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { browserAdminApiUrl } from "@/lib/api-client";

interface LocationFormProps {
  initialData?: any;
}

/**
 * Attempts to extract latitude and longitude from a Google Maps embed code.
 */
function extractCoordsFromEmbed(
  embedCode: string,
): { lat: string; lng: string } | null {
  // Try extracting from !2d (lng) and !3d (lat) parameters
  const lngMatch = embedCode.match(/!2d(-?\d+\.\d+)/);
  const latMatch = embedCode.match(/!3d(-?\d+\.\d+)/);
  if (latMatch && lngMatch) {
    return { lat: latMatch[1], lng: lngMatch[1] };
  }

  // Try extracting from q= parameter
  const qMatch = embedCode.match(/q=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (qMatch) {
    return { lat: qMatch[1], lng: qMatch[2] };
  }

  // Try extracting from @lat,lng pattern
  const atMatch = embedCode.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (atMatch) {
    return { lat: atMatch[1], lng: atMatch[2] };
  }

  return null;
}

function getGoogleMapsEmbedSrc(embedCode: string): string | null {
  const iframeMatch =
    embedCode.match(/<iframe[^>]*\ssrc="([^"]+)"[^>]*>/i) ||
    embedCode.match(/<iframe[^>]*\ssrc='([^']+)'[^>]*>/i);
  const src = iframeMatch?.[1];
  if (!src) return null;

  try {
    const url = new URL(src);
    const isGoogleMapsHost =
      url.hostname === "google.com" ||
      url.hostname === "www.google.com" ||
      url.hostname.endsWith(".google.com");
    if (!isGoogleMapsHost || !url.pathname.startsWith("/maps")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function LocationForm({ initialData }: LocationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState(initialData?.name || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [gmapEmbedCode, setGmapEmbedCode] = useState(
    initialData?.gmapEmbedCode || "",
  );
  const [gmapLink, setGmapLink] = useState(initialData?.gmapLink || "");
  const [latitude, setLatitude] = useState(
    initialData?.latitude?.toString() || "",
  );
  const [longitude, setLongitude] = useState(
    initialData?.longitude?.toString() || "",
  );
  const [isPrimary, setIsPrimary] = useState(initialData?.isPrimary || false);
  const [isAvailableAt, setIsAvailableAt] = useState(
    initialData?.isAvailableAt || false,
  );
  const [operatingHours, setOperatingHours] = useState(
    initialData?.operatingHours || "",
  );
  const [isActive, setIsActive] = useState(initialData?.isActive !== false);

  // Auto-extract coordinates from embed code
  const handleEmbedCodeChange = useCallback((code: string) => {
    setGmapEmbedCode(code);
    if (code) {
      const coords = extractCoordsFromEmbed(code);
      if (coords) {
        setLatitude(coords.lat);
        setLongitude(coords.lng);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name,
        address,
        city,
        phone,
        email,
        gmapEmbedCode,
        gmapLink,
        latitude,
        longitude,
        isPrimary,
        isAvailableAt,
        operatingHours,
        isActive,
      };

      const url = initialData
        ? browserAdminApiUrl(`/admin/locations/${initialData._id}`)
        : browserAdminApiUrl("/admin/locations");
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/locations");
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

  const inputClass =
    "w-full rounded-md border text-black border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900";
  const mapPreviewSrc = getGoogleMapsEmbedSrc(gmapEmbedCode);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-4xl bg-white p-8 rounded-xl shadow-sm border border-slate-200"
    >
      {/* Basic Info */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Location Name <span className="text-red-500">*</span>
        </label>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="e.g. Main Clinic, Hospital OPD"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
            className={inputClass + " resize-none"}
            placeholder="Full address..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={inputClass}
            placeholder="e.g. Surat, Ahmedabad"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="+91 99741 11089"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="clinic@drnisargparmar.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Operating Hours
        </label>
        <input
          type="text"
          value={operatingHours}
          onChange={(e) => setOperatingHours(e.target.value)}
          className={inputClass}
          placeholder="e.g. Mon-Sat: 9:00 AM - 7:00 PM"
        />
      </div>

      {/* Google Maps Section */}
      <div className="border-t border-slate-200 pt-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-800">
          📍 Google Maps Configuration
        </h3>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Google Maps Embed Code (HTML)
          </label>
          <p className="text-xs text-slate-500">
            Go to Google Maps → Search your location → Click &quot;Share&quot; →
            &quot;Embed a map&quot; → Copy the HTML code and paste it here.
          </p>
          <textarea
            value={gmapEmbedCode}
            onChange={(e) => handleEmbedCodeChange(e.target.value)}
            rows={4}
            className={inputClass + " font-mono text-xs"}
            placeholder='<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
          />
        </div>

        {/* Live Map Preview */}
        {mapPreviewSrc && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              🗺️ Map Preview
            </label>
            <div
              className="w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-50"
              style={{ minHeight: "300px" }}
            >
              <iframe
                src={mapPreviewSrc}
                title="Google Maps preview"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Google Maps Link (for &quot;Get Directions&quot;)
          </label>
          <p className="text-xs text-slate-500">
            The direct Google Maps URL. Users will click this to get directions.
          </p>
          <input
            type="url"
            value={gmapLink}
            onChange={(e) => setGmapLink(e.target.value)}
            className={inputClass}
            placeholder="https://maps.google.com/?q=..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Latitude
            </label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className={inputClass}
              placeholder="e.g. 21.1702"
            />
            {latitude && longitude && (
              <p className="text-xs text-green-600">
                ✅ Coordinates set: {latitude}, {longitude}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Longitude
            </label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className={inputClass}
              placeholder="e.g. 72.8311"
            />
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="border-t border-slate-200 pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">Settings</h3>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          <label
            htmlFor="isActive"
            className="text-sm font-medium text-slate-700"
          >
            Active (visible on public site)
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isPrimary"
            checked={isPrimary}
            onChange={(e) => setIsPrimary(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          <label
            htmlFor="isPrimary"
            className="text-sm font-medium text-slate-700"
          >
            Primary location (highlighted on contact page)
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isAvailableAt"
            checked={isAvailableAt}
            onChange={(e) => setIsAvailableAt(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          <label
            htmlFor="isAvailableAt"
            className="text-sm font-medium text-slate-700"
          >
            Show under &quot;Also Available At&quot; (secondary listing only)
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4 border-t border-slate-200">
        <Button type="submit" disabled={loading} className="w-full md:w-auto">
          {loading
            ? "Saving..."
            : initialData
              ? "Update Location"
              : "Create Location"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/locations")}
          className="w-full md:w-auto"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
