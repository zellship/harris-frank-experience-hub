"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  angle: number;
  radius: number;
  limit: number;
  speed: number;
  size: number;
  alpha: number;
  color: string;
};

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame = 0;
    let previousTime = 0;

    const palette = [
      "107, 91, 255",
      "137, 102, 244",
      "88, 196, 226",
      "202, 181, 255",
      "201, 168, 76",
    ];

    function createParticles() {
      const compact = width < 760;
      const count = compact ? 150 : Math.min(520, Math.round(width * 0.36));
      const shortest = Math.min(width, height);
      const innerRadius = compact ? 26 : 42;
      const outerRadius = shortest * (compact ? 0.54 : 0.72);

      particles = Array.from({ length: count }, (_, index) => {
        const normalized = Math.sqrt((index + Math.random()) / count);
        const direction = Math.random() > 0.22 ? 1 : -1;
        return {
          angle: Math.random() * Math.PI * 2,
          radius: innerRadius + normalized * (outerRadius - innerRadius),
          limit: outerRadius * (0.86 + Math.random() * 0.18),
          speed: direction * (0.018 + Math.random() * 0.055),
          size: compact ? 0.45 + Math.random() * 0.75 : 0.5 + Math.random(),
          alpha: 0.1 + Math.random() * 0.32,
          color: palette[Math.floor(Math.random() * palette.length)],
        };
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createParticles();
    }

    function draw(time = 0) {
      const delta = previousTime ? Math.min(32, time - previousTime) : 16;
      previousTime = time;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      const centerX = width * 0.5;
      const centerY = height * (width < 760 ? 0.36 : 0.41);
      const ellipse = width < 760 ? 0.82 : 1.28;
      const rotation = reducedMotion ? 0 : time * 0.000008;

      for (const particle of particles) {
        if (!reducedMotion) {
          particle.radius += particle.speed * delta;
          if (particle.radius > particle.limit) particle.radius = 34;
          if (particle.radius < 30) particle.radius = particle.limit;
        }

        const angle = particle.angle + rotation;
        const x = centerX + Math.cos(angle) * particle.radius * ellipse;
        const y = centerY + Math.sin(angle) * particle.radius * 0.62;
        const edgeFade = Math.max(0, 1 - particle.radius / particle.limit);
        const centerFade = Math.min(1, Math.max(0, (particle.radius - 28) / 90));
        const alpha = particle.alpha * (0.34 + edgeFade * 0.66) * centerFade;

        context.beginPath();
        context.fillStyle = `rgba(${particle.color}, ${alpha})`;
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      context.globalCompositeOperation = "source-over";
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}

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

  function openPortal(title: string) {
    setActivePortal(title);
    if (title === "Presentación") {
      window.location.assign("/presentacion");
    }
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
      <ParticleField />
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
            onClick={() => openPortal(portal.title)}
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
