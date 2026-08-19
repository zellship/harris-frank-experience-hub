"use client";

import { useEffect, useMemo, useState } from "react";
import "./demo.css";

type ExperienceId = "sales-terminal" | "collection-studio" | "route-active";

type Experience = {
  id: ExperienceId;
  number: string;
  title: string;
  moment: string;
  family: string;
  origin: string;
  authority: string;
  disposition: string;
  mode: "snapshot" | "prototype";
  image?: string;
};

const experiences: Experience[] = [
  {
    id: "sales-terminal",
    number: "01",
    title: "Sales Terminal",
    moment: "Ventas",
    family: "Customer & Commerce",
    origin: "Demo propietaria",
    authority: "Demo congelada 9f6402e",
    disposition: "Reutilización directa · snapshot para validar integración",
    mode: "snapshot",
    image: "/demo/sales-terminal.webp",
  },
  {
    id: "collection-studio",
    number: "02",
    title: "Collection Studio",
    moment: "Resumen de colección",
    family: "Product & Brand",
    origin: "Showcase aprobado",
    authority: "B4E · checkpoint 71d8f9a",
    disposition: "Ruta nativa preservada · snapshot para validar integración",
    mode: "snapshot",
    image: "/demo/collection-studio.webp",
  },
  {
    id: "route-active",
    number: "03",
    title: "Rutas y logística",
    moment: "Ruta activa",
    family: "Supply & Service Operations",
    origin: "Visual Cut 002",
    authority: "Referencia visual; sin checkpoint funcional aprobado",
    disposition: "Slice nuevo de visión · prototipo interactivo para aprobación",
    mode: "prototype",
  },
];

function idFromHash(): ExperienceId | null {
  if (typeof window === "undefined") return null;
  const value = window.location.hash.replace(/^#\/?/, "");
  return experiences.some((experience) => experience.id === value)
    ? (value as ExperienceId)
    : null;
}

function CatalogPreview({ experience }: { experience: Experience }) {
  if (experience.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={experience.image} alt="" />
    );
  }

  return (
    <div className="route-card-preview" aria-hidden="true">
      <div className="route-preview-map">
        <i className="route-preview-line one" />
        <i className="route-preview-line two" />
        <span className="route-preview-node start" />
        <span className="route-preview-node middle" />
        <span className="route-preview-node end" />
      </div>
      <div className="route-preview-phone">
        <small>Ruta activa</small>
        <strong>TR-04588</strong>
        <span />
        <span />
        <em>Llegué al destino</em>
      </div>
    </div>
  );
}

function DemoCatalog({ onSelect }: { onSelect: (id: ExperienceId) => void }) {
  return (
    <main className="demo-catalog">
      <header className="demo-catalog-header">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" aria-label="Volver al Experience Hub">
          <span aria-hidden="true">←</span> Hub
        </a>
        <div className="demo-catalog-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/harris-frank-logo.png" alt="Harris & Frank" />
          <span>Capability Demo</span>
        </div>
        <span className="demo-sample-label">Muestra de integración · 3 superficies</span>
      </header>

      <section className="demo-catalog-intro">
        <p>Business OS · Capability Network</p>
        <h1>Capacidades del sistema</h1>
        <span>Selecciona una superficie para revisar el patrón de integración.</span>
      </section>

      <section className="demo-experience-grid" aria-label="Experiencias disponibles">
        {experiences.map((experience) => (
          <button
            key={experience.id}
            type="button"
            className="demo-experience-card"
            onClick={() => onSelect(experience.id)}
            aria-label={`Abrir ${experience.title}: ${experience.moment}`}
          >
            <span className="experience-preview">
              <CatalogPreview experience={experience} />
              <small>{experience.origin}</small>
            </span>
            <span className="experience-card-copy">
              <small>{experience.family}</small>
              <strong>{experience.title}</strong>
              <span>{experience.moment}</span>
            </span>
            <span className="experience-card-arrow" aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </section>

      <footer className="demo-catalog-footer">
        <span>Patrón en validación</span>
        <span />
        <span>Designed to Evolve</span>
      </footer>
    </main>
  );
}

function SnapshotSurface({ experience }: { experience: Experience }) {
  return (
    <div className="snapshot-surface">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={experience.image} alt={`${experience.title} · ${experience.moment}`} />
    </div>
  );
}

function RouteActiveSurface() {
  const [step, setStep] = useState<"route" | "arrived" | "confirmed">("route");

  const action =
    step === "route"
      ? { label: "Llegué al destino", next: "arrived" as const }
      : step === "arrived"
        ? { label: "Confirmar entrega", next: "confirmed" as const }
        : null;

  return (
    <div className="route-operation">
      <header className="route-system-header">
        <div className="route-system-brand">
          <span className="route-os-mark">OS</span>
          <div>
            <strong>HARRIS &amp; FRANK</strong>
            <small>Fulfillment Console</small>
          </div>
        </div>
        <div className="route-session">
          <span>Ruta en curso</span>
          <strong>Miguel Torres</strong>
        </div>
      </header>

      <div className="route-operation-body">
        <section className="route-map" aria-label="Mapa de la ruta activa">
          <div className="map-toolbar">
            <div>
              <small>RUTA ACTIVA</small>
              <strong>TR-04588 · Polanco</strong>
            </div>
            <span>3 de 5 paradas</span>
          </div>
          <div className="map-canvas" aria-hidden="true">
            <span className="map-road road-a" />
            <span className="map-road road-b" />
            <span className="map-road road-c" />
            <span className="map-road road-d" />
            <span className="map-route-line line-a" />
            <span className="map-route-line line-b" />
            <span className="map-route-line line-c" />
            <i className="map-stop completed one">✓</i>
            <i className="map-stop completed two">✓</i>
            <i className="map-stop current three">3</i>
            <i className="map-stop pending four">4</i>
            <i className="map-stop pending five">5</i>
            <div className="map-location-card">
              <small>PARADA ACTUAL</small>
              <strong>Boutique Polanco</strong>
              <span>Av. Presidente Masaryk 412</span>
            </div>
          </div>
          <div className="route-summary-strip">
            <div><small>Inicio</small><strong>13:42</strong></div>
            <div><small>Recorrido</small><strong>18.6 km</strong></div>
            <div><small>Entregadas</small><strong>2</strong></div>
            <div><small>Promesa</small><strong>En tiempo</strong></div>
          </div>
        </section>

        <section className="mobile-operation" aria-label="Operación móvil de la ruta">
          <div className="device-frame">
            <div className="device-status"><span>9:41</span><span>● ● ▰</span></div>
            <header className="mobile-route-header">
              <button type="button" aria-label="Volver">←</button>
              <div><small>FULFILLMENT</small><strong>Ruta activa</strong></div>
              <button type="button" aria-label="Más opciones">•••</button>
            </header>

            <div className="mobile-route-content">
              <div className="mobile-route-progress">
                <div><small>TR-04588</small><strong>3 de 5</strong></div>
                <span><i /></span>
              </div>

              {step === "confirmed" ? (
                <div className="delivery-confirmed">
                  <span>✓</span>
                  <small>ENTREGA REGISTRADA</small>
                  <strong>Promesa cumplida</strong>
                  <p>La evidencia quedó asociada a TR-04588.</p>
                  <button type="button" onClick={() => setStep("route")}>
                    Ver siguiente parada
                  </button>
                </div>
              ) : (
                <>
                  <div className="current-stop-card">
                    <div className="stop-card-heading">
                      <span>{step === "arrived" ? "En ubicación" : "Parada actual"}</span>
                      <small>{step === "arrived" ? "GPS validado" : "8 min"}</small>
                    </div>
                    <strong>Boutique Polanco</strong>
                    <p>Av. Presidente Masaryk 412</p>
                    <div className="commitment-card">
                      <small>COMPROMISO</small>
                      <strong>Entrega a Paula Navarro</strong>
                      <span>Hoy · 15:00–16:00</span>
                    </div>
                  </div>

                  {step === "arrived" && (
                    <div className="evidence-ready">
                      <span>◎</span>
                      <div><strong>Evidencia preparada</strong><small>Ubicación y hora registradas</small></div>
                    </div>
                  )}

                  <div className="mobile-route-actions">
                    <button type="button" className="secondary-action">Abrir navegación</button>
                    {action && (
                      <button
                        type="button"
                        className="primary-action"
                        onClick={() => setStep(action.next)}
                      >
                        {action.label}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ExperienceGuide({
  experience,
  open,
  onClose,
}: {
  experience: Experience;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <aside className={`experience-guide ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="guide-backdrop" type="button" onClick={onClose} tabIndex={open ? 0 : -1} aria-label="Cerrar guía" />
      <section className="guide-panel" aria-label="Guía de la experiencia">
        <header>
          <div><small>GUÍA DE LA EXPERIENCIA</small><strong>{experience.title}</strong></div>
          <button type="button" onClick={onClose}>Cerrar ×</button>
        </header>
        <dl>
          <div><dt>Momento</dt><dd>{experience.moment}</dd></div>
          <div><dt>Origen</dt><dd>{experience.origin}</dd></div>
          <div><dt>Autoridad</dt><dd>{experience.authority}</dd></div>
          <div><dt>Tratamiento</dt><dd>{experience.disposition}</dd></div>
        </dl>
        <div className="guide-boundary">
          <strong>Límite de esta muestra</strong>
          <p>
            Esta revisión valida el controlador y la convivencia visual. Los snapshots no sustituyen el montaje de sus rutas nativas; Ruta activa continúa como visión hasta su aprobación funcional.
          </p>
        </div>
      </section>
    </aside>
  );
}

function ExperienceShell({
  experience,
  onCatalog,
  onNavigate,
}: {
  experience: Experience;
  onCatalog: () => void;
  onNavigate: (id: ExperienceId) => void;
}) {
  const [guideOpen, setGuideOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const index = experiences.findIndex((item) => item.id === experience.id);
  const previous = experiences[index - 1];
  const next = experiences[index + 1];

  return (
    <main className="experience-shell">
      <header className="experience-controller">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className="controller-hub" aria-label="Volver al Experience Hub">
          <span aria-hidden="true">←</span> Hub
        </a>
        <button type="button" className="controller-capabilities" onClick={onCatalog}>
          <span aria-hidden="true">⊞</span> Capacidades
        </button>
        <div className="controller-context">
          <small>{experience.title}</small>
          <strong>{experience.moment}</strong>
        </div>
        <nav className="controller-navigation" aria-label="Navegación entre experiencias">
          <button type="button" disabled={!previous} onClick={() => previous && onNavigate(previous.id)} aria-label="Experiencia anterior">←</button>
          <span>{experience.number} / {String(experiences.length).padStart(2, "0")}</span>
          <button type="button" disabled={!next} onClick={() => next && onNavigate(next.id)} aria-label="Siguiente experiencia">→</button>
        </nav>
        <button type="button" className="controller-reset" onClick={() => setResetKey((value) => value + 1)}>
          ↻ <span>Reiniciar</span>
        </button>
        <button type="button" className="controller-guide" onClick={() => setGuideOpen(true)}>
          Guía
        </button>
      </header>

      <section className={`experience-canvas ${experience.mode}`}>
        {experience.mode === "snapshot" ? (
          <SnapshotSurface key={resetKey} experience={experience} />
        ) : (
          <RouteActiveSurface key={resetKey} />
        )}
      </section>

      <ExperienceGuide experience={experience} open={guideOpen} onClose={() => setGuideOpen(false)} />
    </main>
  );
}

export default function DemoPage() {
  const [activeId, setActiveId] = useState<ExperienceId | null>(null);

  useEffect(() => {
    const handleHash = () => setActiveId(idFromHash());
    window.addEventListener("hashchange", handleHash);
    window.setTimeout(handleHash, 0);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const activeExperience = useMemo(
    () => experiences.find((experience) => experience.id === activeId) ?? null,
    [activeId],
  );

  function selectExperience(id: ExperienceId) {
    window.location.hash = id;
    setActiveId(id);
  }

  function showCatalog() {
    window.history.pushState(null, "", window.location.pathname);
    setActiveId(null);
  }

  if (!activeExperience) return <DemoCatalog onSelect={selectExperience} />;

  return (
    <ExperienceShell
      experience={activeExperience}
      onCatalog={showCatalog}
      onNavigate={selectExperience}
    />
  );
}
