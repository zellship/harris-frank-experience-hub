"use client";

import { useEffect, useRef, useState } from "react";

const portals = [
  { number: "01", title: "Presentación", detail: "La visión ejecutiva" },
  { number: "02", title: "Demo", detail: "El sistema en acción" },
  {
    number: "03",
    title: "Propuesta",
    detail: "El modelo que lo hace posible",
  },
];

export default function Home() {
  const shellRef = useRef<HTMLElement>(null);
  const [activePortal, setActivePortal] = useState<string | null>(null);

  useEffect(() => {
    if (!activePortal) return;
    const timeout = window.setTimeout(() => setActivePortal(null), 1050);
    return () => window.clearTimeout(timeout);
  }, [activePortal]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const shell = shellRef.current;
    if (!shell) return;
    const rect = shell.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    shell.style.setProperty("--pointer-x", x.toFixed(3));
    shell.style.setProperty("--pointer-y", y.toFixed(3));
  }

  return (
    <main
      ref={shellRef}
      className="hub-shell"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        shellRef.current?.style.setProperty("--pointer-x", "0");
        shellRef.current?.style.setProperty("--pointer-y", "0");
      }}
    >
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="fine-grid" aria-hidden="true" />

      <header className="hub-header">
        {/* Static brand assets stay unoptimized for Worker compatibility. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="zellship-logo"
          src="/brand/zellship-logo.png"
          alt="Zellship"
        />
        <div
          className="header-center"
          aria-label="Harris and Frank Experience Hub"
        >
          <span className="header-line" />
          <span>Experience Hub</span>
          <span className="header-line" />
        </div>
        <span className="edition">Executive experience · 2026</span>
      </header>

      <section className="hero" aria-labelledby="hub-title">
        <div className="os-stage" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="orbit orbit-three" />
          <span className="os-halo" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/os-mark.png" alt="" />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hf-logo"
          src="/brand/harris-frank-logo.png"
          alt="Harris & Frank"
        />

        <p className="eyebrow">Harris &amp; Frank × Zellship</p>
        <h1 id="hub-title">
          Evolución
          <span>operativa</span>
        </h1>
        <p className="hero-copy">
          Una operación extraordinaria merece un sistema diseñado para
          evolucionar con ella.
        </p>
      </section>

      <nav className="portal-grid" aria-label="Accesos principales">
        {portals.map((portal, index) => (
          <button
            key={portal.number}
            className="portal"
            type="button"
            style={
              {
                "--portal-delay": `${680 + index * 90}ms`,
              } as React.CSSProperties
            }
            onClick={() => setActivePortal(portal.title)}
            aria-label={`Abrir ${portal.title}`}
          >
            <span className="portal-number">{portal.number}</span>
            <span className="portal-copy">
              <strong>{portal.title}</strong>
              <small>{portal.detail}</small>
            </span>
            <span className="portal-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </nav>

      <footer className="hub-footer">
        <span>Designed to Evolve</span>
        <span className="footer-rule" />
        <span>Business OS</span>
      </footer>

      <div
        className={`route-wash ${activePortal ? "is-active" : ""}`}
        aria-hidden={!activePortal}
      >
        <span>Abriendo</span>
        <strong>{activePortal}</strong>
      </div>
    </main>
  );
}
