import { AlertCircle } from "lucide-react";

export function MedicalDisclaimer() {
  return (
    <section id="disclaimer" className="py-10 md:py-14 border-t border-border" aria-labelledby="disclaimer-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex gap-3 max-w-3xl mx-auto p-4 rounded-2xl bg-muted/50">
          <AlertCircle className="h-6 w-6 text-foreground/60 shrink-0 mt-0.5" aria-hidden />
          <div>
            <h2 id="disclaimer-heading" className="text-sm font-semibold text-foreground mb-1">
              Medical Disclaimer
            </h2>
            <p className="text-xs sm:text-sm text-foreground/60">
              The information provided on this website is for educational purposes only and should not be considered as medical advice. Always consult a qualified healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
