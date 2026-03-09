"use client";

import { useState } from "react";

export function HeroImage() {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center text-primary-foreground/50 text-6xl font-bold">
        NP
      </div>
    );
  }
  return (
    <img
      src="/dr-nisarg-parmar.png"
      alt="Dr. Nisarg Parmar - Neurosurgeon"
      className="h-full w-full object-cover"
      onError={() => setError(true)}
    />
  );
}
