"use client";
import { fetchApi } from "@/lib/api-client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function ContactSettingsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form State
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyPhoneTel, setEmergencyPhoneTel] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [primaryPhoneTel, setPrimaryPhoneTel] = useState("");
  const [email, setEmail] = useState("");
  const [emergencyMessage, setEmergencyMessage] = useState("");
  const [emergencyTitle, setEmergencyTitle] = useState("");
  const [showEmergencyStrip, setShowEmergencyStrip] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetchApi("/admin/contact-settings");
      if (res.ok) {
        const data = await res.json();
        setEmergencyPhone(data.emergencyPhone || "");
        setEmergencyPhoneTel(data.emergencyPhoneTel || "");
        setPrimaryPhone(data.primaryPhone || "");
        setPrimaryPhoneTel(data.primaryPhoneTel || "");
        setEmail(data.email || "");
        setEmergencyMessage(data.emergencyMessage || "");
        setEmergencyTitle(data.emergencyTitle || "");
        setShowEmergencyStrip(data.showEmergencyStrip !== false);
        setWhatsappNumber(data.whatsappNumber || "");
        setWhatsappMessage(data.whatsappMessage || "");
        setShowWhatsapp(data.showWhatsapp === true);
      }
    } catch (e) {
      console.error("Error loading settings:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const payload = {
        emergencyPhone,
        emergencyPhoneTel,
        primaryPhone,
        primaryPhoneTel,
        email,
        emergencyMessage,
        emergencyTitle,
        showEmergencyStrip,
        whatsappNumber,
        whatsappMessage,
        showWhatsapp,
      };

      const res = await fetchApi("/admin/contact-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500">Loading settings...</div>
    );
  }

  const inputClass =
    "w-full rounded-md border text-black border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-4xl bg-white p-8 rounded-xl shadow-sm border border-slate-200"
    >
      {saved && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
          ✅ Settings saved successfully!
        </div>
      )}

      {/* Emergency Strip */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">
          🚨 Emergency Banner
        </h3>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showEmergencyStrip"
            checked={showEmergencyStrip}
            onChange={(e) => setShowEmergencyStrip(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          <label
            htmlFor="showEmergencyStrip"
            className="text-sm font-medium text-slate-700"
          >
            Show emergency banner on contact page
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Emergency Banner Title
          </label>
          <input
            type="text"
            value={emergencyTitle}
            onChange={(e) => setEmergencyTitle(e.target.value)}
            className={inputClass}
            placeholder="24/7 Emergency Neurosurgery"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Emergency Message
          </label>
          <textarea
            value={emergencyMessage}
            onChange={(e) => setEmergencyMessage(e.target.value)}
            rows={2}
            className={inputClass + " resize-none"}
            placeholder="Head injuries, spinal trauma, stroke — immediate care available."
          />
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="border-t border-slate-200 pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">
          📞 Phone Numbers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Emergency Phone (Display)
            </label>
            <input
              type="text"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className={inputClass}
              placeholder="+91 99741 11089"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Emergency Phone (Tel Link)
            </label>
            <input
              type="text"
              value={emergencyPhoneTel}
              onChange={(e) => setEmergencyPhoneTel(e.target.value)}
              className={inputClass}
              placeholder="+919974111089"
            />
            <p className="text-xs text-slate-500">
              No spaces. Used for click-to-call links.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Primary Phone (Display)
            </label>
            <input
              type="text"
              value={primaryPhone}
              onChange={(e) => setPrimaryPhone(e.target.value)}
              className={inputClass}
              placeholder="+91 99741 11089"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Primary Phone (Tel Link)
            </label>
            <input
              type="text"
              value={primaryPhoneTel}
              onChange={(e) => setPrimaryPhoneTel(e.target.value)}
              className={inputClass}
              placeholder="+919974111089"
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="border-t border-slate-200 pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">✉️ Email</h3>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Contact Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="contact@drnisargparmar.com"
          />
        </div>
      </div>

      {/* WhatsApp */}
      <div className="border-t border-slate-200 pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">
          💬 WhatsApp Integration
        </h3>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showWhatsapp"
            checked={showWhatsapp}
            onChange={(e) => setShowWhatsapp(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          <label
            htmlFor="showWhatsapp"
            className="text-sm font-medium text-slate-700"
          >
            Enable WhatsApp button on contact page
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              WhatsApp Number
            </label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className={inputClass}
              placeholder="919974111089"
            />
            <p className="text-xs text-slate-500">
              Country code + number, no + or spaces (e.g., 919974111089)
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Default Message
            </label>
            <input
              type="text"
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              className={inputClass}
              placeholder="Hello Dr. Nisarg, I would like to book an appointment."
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      {showEmergencyStrip && (
        <div className="border-t border-slate-200 pt-6 space-y-2">
          <h3 className="text-lg font-semibold text-slate-800">
            👁️ Emergency Banner Preview
          </h3>
          <div className="p-5 rounded-xl bg-red-50 border border-red-200">
            <p className="font-semibold text-slate-900">
              {emergencyTitle || "24/7 Emergency Neurosurgery"}
            </p>
            <p className="text-sm text-slate-600 mt-1">
              {emergencyMessage ||
                "Head injuries, spinal trauma, stroke — immediate care available."}
            </p>
            <span className="inline-flex items-center gap-2 mt-3 text-red-600 font-medium">
              📞 {emergencyPhone || "+91 99741 11089"}
            </span>
          </div>
        </div>
      )}

      {/* Save */}
      <div className="flex gap-4 pt-4 border-t border-slate-200">
        <Button type="submit" disabled={saving} className="w-full md:w-auto">
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}
