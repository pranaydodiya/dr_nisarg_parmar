import { LocationForm } from "@/components/admin/LocationForm";

export default function NewLocationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add New Location</h2>
        <p className="text-sm text-slate-500">
          Add a new clinic or hospital location.
        </p>
      </div>
      <LocationForm />
    </div>
  );
}
