import { ContactSettingsForm } from "@/components/admin/ContactSettingsForm";

export default function ContactSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contact Settings</h2>
        <p className="text-sm text-slate-500">
          Manage phone numbers, emergency banner, email, and WhatsApp
          integration.
        </p>
      </div>
      <ContactSettingsForm />
    </div>
  );
}
