"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import "./scrollytelling.css";

const chapters = [
  { id: "extraordinario", number: "01", label: "La oportunidad" },
  { id: "servicio", number: "02", label: "El modelo" },
  { id: "vision", number: "03", label: "Prueba de visión" },
  { id: "adopcion", number: "04", label: "Activar Fase 1" },
];

const serviceStages = [
  {
    number: "01",
    title: "Entender",
    detail: "Prioridades y contexto",
    output: "Una lectura compartida de la operación y de aquello que debe protegerse.",
  },
  {
    number: "02",
    title: "Estandarizar",
    detail: "Procesos y reglas",
    output: "Un modelo operativo explícito que reduce dependencia e interpretación.",
  },
  {
    number: "03",
    title: "Diseñar",
    detail: "Modelo y experiencia",
    output: "Capacidades, decisiones y experiencias conectadas al trabajo real.",
  },
  {
    number: "04",
    title: "Desarrollar",
    detail: "Configuración y sistema",
    output: "La capacidad se materializa en software verificable y reutilizable.",
  },
  {
    number: "05",
    title: "Implementar",
    detail: "Adopción y transición",
    output: "Usuarios, datos y operación avanzan mediante una transición controlada.",
  },
  {
    number: "06",
    title: "Asistir",
    detail: "Soporte e hypercare",
    output: "El equipo acompaña la operación hasta estabilizar el nuevo modelo.",
  },
  {
    number: "07",
    title: "Mejorar",
    detail: "Evidencia y siguiente wave",
    output: "La evidencia define qué evolucionar, ampliar, corregir o detener.",
  },
];

const capabilities = [
  {
    id: "contexto",
    marker: "CC",
    title: "Un mismo contexto de cliente",
    statement:
      "Sales Terminal, Client Passport y MTM Studio continúan la relación sin reconstruirla en cada interacción.",
    signal: "Contexto · continuidad comercial",
  },
  {
    id: "promesa",
    marker: "OP",
    title: "Una promesa que puede seguirse",
    statement:
      "Órdenes, partidas, responsables y fechas conservan su estado, riesgo y evidencia sin confundirse entre sí.",
    signal: "Compromiso · trazabilidad",
  },
  {
    id: "red",
    marker: "OM",
    title: "Una red que puede responder",
    statement:
      "Inventario útil, ATP, transferencias y cross-docking convierten existencias distribuidas en opciones ejecutables.",
    signal: "Disponibilidad · coordinación",
  },
];

const gates = [
  "Congelar alcance",
  "Preparar datos",
  "Coexistir",
  "Probar",
  "Aceptar con evidencia",
  "Estabilizar",
  "Ampliar o detener",
];

export default function ScrollytellingPrototype() {
  const shellRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [serviceStage, setServiceStage] = useState(3);
  const [capability, setCapability] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToChapter = useCallback((index: number) => {
    const next = Math.max(0, Math.min(chapters.length - 1, index));
    document.getElementById(chapters[next].id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    setIndexOpen(false);
  }, []);

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = chapters.findIndex(
          (chapter) => chapter.id === visible.target.id,
        );
        if (index >= 0) {
          setActiveChapter(index);
          window.history.replaceState(null, "", `#${chapters[index].id}`);
        }
      },
      { threshold: [0.38, 0.55, 0.72] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      document.querySelectorAll<HTMLElement>(".story-chapter").forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const progress = Math.max(
          -1,
          Math.min(1, (itemCenter - viewportCenter) / window.innerHeight),
        );
        item.style.setProperty("--parallax", progress.toFixed(3));
      });
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && indexOpen) {
        setIndexOpen(false);
        return;
      }
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight" ||
        event.key === "PageDown"
      ) {
        event.preventDefault();
        goToChapter(activeChapter + 1);
      } else if (
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft" ||
        event.key === "PageUp"
      ) {
        event.preventDefault();
        goToChapter(activeChapter - 1);
      } else if (event.key.toLowerCase() === "g") {
        event.preventDefault();
        setIndexOpen((open) => !open);
      } else if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        void toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeChapter, goToChapter, indexOpen]);

  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  async function toggleFullscreen() {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await shellRef.current?.requestFullscreen();
  }

  const activeCapability = capabilities[capability];

  return (
    <main ref={shellRef} className="story-shell">
      <header className="story-header">
        <a href="/presentacion" className="story-back">
          <span aria-hidden="true">←</span> Presentación actual
        </a>
        <div className="story-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/harris-frank-logo.png" alt="Harris & Frank" />
          <span>Prototipo scrollytelling</span>
        </div>
        <div className="story-header-actions">
          <span className="story-draft">Exploración</span>
          <button type="button" onClick={() => void toggleFullscreen()}>
            {isFullscreen ? "Salir" : "Pantalla completa"}
          </button>
        </div>
      </header>

      <nav className="chapter-rail" aria-label="Capítulos de la presentación">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            className={index === activeChapter ? "is-active" : ""}
            type="button"
            onClick={() => goToChapter(index)}
            aria-label={`Ir a ${chapter.label}`}
            aria-current={index === activeChapter ? "step" : undefined}
          >
            <i aria-hidden="true" />
            <span>{chapter.number}</span>
            <strong>{chapter.label}</strong>
          </button>
        ))}
      </nav>

      <section id="extraordinario" className="story-chapter chapter-hero">
        <div className="story-grid" aria-hidden="true" />
        <div className="hero-glow glow-one" aria-hidden="true" />
        <div className="hero-glow glow-two" aria-hidden="true" />
        <div className="story-content hero-story-copy">
          <span className="story-kicker">Harris &amp; Frank × Zellship</span>
          <h1>
            Extraordinario
            <em>por diseño.</em>
          </h1>
          <p>
            La ventaja de Harris &amp; Frank no está sólo en lo que vende. Está
            en cómo diseña, produce, relaciona y cumple.
          </p>
          <div className="thesis-line">
            <span>Operación extraordinaria</span>
            <i aria-hidden="true">→</i>
            <span>Modelo operativo</span>
            <i aria-hidden="true">→</i>
            <strong>Capacidad ejecutable</strong>
          </div>
        </div>
        <div className="hero-system" aria-hidden="true">
          <div className="system-plane plane-back" />
          <div className="system-plane plane-middle" />
          <div className="system-plane plane-front">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/os-mark.png" alt="" />
          </div>
          <span>Diseñado para evolucionar</span>
        </div>
        <button
          type="button"
          className="scroll-cue"
          onClick={() => goToChapter(1)}
        >
          Descubrir el modelo <span aria-hidden="true">↓</span>
        </button>
      </section>

      <section id="servicio" className="story-chapter chapter-service">
        <div className="chapter-orb service-orb" aria-hidden="true" />
        <div className="story-content service-copy">
          <span className="story-kicker">El modelo de la oferta</span>
          <h2>
            El servicio cubre el ciclo completo;
            <em>el software es sólo una parte.</em>
          </h2>
          <p>
            Cada etapa entrega una salida verificable y prepara la siguiente
            decisión. Selecciona una etapa para explorarla.
          </p>
        </div>

        <div className="service-explorer">
          <div className="service-stage-list" role="tablist" aria-label="Etapas del servicio">
            {serviceStages.map((stage, index) => (
              <button
                key={stage.title}
                type="button"
                role="tab"
                aria-selected={index === serviceStage}
                className={index === serviceStage ? "is-active" : ""}
                onClick={() => setServiceStage(index)}
              >
                <span>{stage.number}</span>
                <strong>{stage.title}</strong>
                <small>{stage.detail}</small>
              </button>
            ))}
          </div>
          <article className="service-stage-detail" aria-live="polite">
            <span>Salida verificable · {serviceStages[serviceStage].number}</span>
            <h3>{serviceStages[serviceStage].title}</h3>
            <p>{serviceStages[serviceStage].output}</p>
            <footer>
              <i aria-hidden="true" />
              El valor empieza antes del desarrollo y continúa después.
            </footer>
          </article>
        </div>
      </section>

      <section id="vision" className="story-chapter chapter-vision">
        <div className="vision-rings" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="story-content vision-heading">
          <span className="story-kicker">Showcase ejecutivo</span>
          <h2>La visión puede recorrerse, no sólo explicarse.</h2>
          <p>
            Tres principios conectan las experiencias demostrables sin convertir
            la visión completa en alcance automático.
          </p>
        </div>

        <div className="vision-explorer">
          <div className="capability-tabs" role="tablist" aria-label="Principios demostrables">
            {capabilities.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === capability}
                className={index === capability ? "is-active" : ""}
                onClick={() => setCapability(index)}
              >
                <span>{item.marker}</span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>
          <article className="capability-detail" aria-live="polite">
            <span className="capability-marker">{activeCapability.marker}</span>
            <small>{activeCapability.signal}</small>
            <h3>{activeCapability.title}</h3>
            <p>{activeCapability.statement}</p>
            <a href="/demo">
              Explorar la Demo <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
      </section>

      <section id="adopcion" className="story-chapter chapter-close">
        <div className="close-layers" aria-hidden="true">
          {Array.from({ length: 7 }, (_, index) => (
            <i
              key={index}
              style={{ "--layer": index } as CSSProperties}
            />
          ))}
        </div>
        <div className="story-content close-copy">
          <span className="story-kicker">Adopción gobernada</span>
          <h2>
            No proponemos un “big bang”.
            <em>Cada gate reduce riesgo antes de ampliar.</em>
          </h2>
          <p>
            El primer ciclo comienza con alcance, datos, responsables y criterios
            explícitos. La evidencia permite evolucionar, detener o corregir.
          </p>
          <div className="gate-flow" aria-label="Secuencia de gates">
            {gates.map((gate, index) => (
              <span key={gate}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                {gate}
              </span>
            ))}
          </div>
          <div className="close-actions">
            <a className="primary" href="/demo">
              Ver capacidades <span aria-hidden="true">↗</span>
            </a>
            <a href="/propuesta">Explorar el respaldo del modelo</a>
          </div>
          <small className="prototype-note">
            Prototipo narrativo · contenido y estructura sujetos a revisión.
          </small>
        </div>
      </section>

      <nav className="story-controller" aria-label="Control de capítulos">
        <button
          type="button"
          onClick={() => goToChapter(activeChapter - 1)}
          disabled={activeChapter === 0}
          aria-label="Capítulo anterior"
        >
          ← <span>Anterior</span>
        </button>
        <button
          type="button"
          className="story-position"
          onClick={() => setIndexOpen(true)}
          aria-label="Abrir índice"
        >
          <span>{chapters[activeChapter].number}</span>
          <i aria-hidden="true">
            <b
              style={
                {
                  width: `${((activeChapter + 1) / chapters.length) * 100}%`,
                } as CSSProperties
              }
            />
          </i>
          <span>{String(chapters.length).padStart(2, "0")}</span>
        </button>
        <button
          type="button"
          onClick={() => goToChapter(activeChapter + 1)}
          disabled={activeChapter === chapters.length - 1}
          aria-label="Siguiente capítulo"
        >
          <span>Siguiente</span> →
        </button>
      </nav>

      <div className={`story-index ${indexOpen ? "is-open" : ""}`} aria-hidden={!indexOpen}>
        <button
          className="story-index-backdrop"
          type="button"
          onClick={() => setIndexOpen(false)}
          aria-label="Cerrar índice"
          tabIndex={indexOpen ? 0 : -1}
        />
        <section className="story-index-panel" aria-label="Índice de capítulos">
          <header>
            <div>
              <span>Recorrido de exploración</span>
              <h2>Presentación narrativa</h2>
            </div>
            <button type="button" onClick={() => setIndexOpen(false)}>
              Cerrar ×
            </button>
          </header>
          <div>
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                type="button"
                className={index === activeChapter ? "is-current" : ""}
                onClick={() => goToChapter(index)}
                tabIndex={indexOpen ? 0 : -1}
              >
                <span>{chapter.number}</span>
                <strong>{chapter.label}</strong>
                <i aria-hidden="true">→</i>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
