"use client";

import { useEffect } from "react";
import { sitePath } from "../site-path";

export default function PresentationAliasPage() {
  const destination = sitePath("/presentacion/scrollytelling/");

  useEffect(() => {
    window.location.replace(destination);
  }, [destination]);

  return (
    <main className="presentation-status" aria-live="polite">
      <p>Abriendo la presentación ejecutiva…</p>
      <a href={destination}>Continuar a la presentación</a>
    </main>
  );
}
