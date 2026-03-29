"use client";

import { useState } from "react";
import Image from "next/image";

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
    <Image
      src="/dr-nisarg-parmar.png"
      alt="Dr. Nisarg Parmar - Neurosurgeon"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 50vw"
      priority
      onError={() => setError(true)}
    />
  );
}
