"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { sitePath } from "../site-path";

type Slide = {
  id: string;
  title: string;
  src: string;
};

type PresentationManifest = {
  title: string;
  versionLabel: string;
  status: "draft" | "final";
  slides: Slide[];
};

export default function PresentationPage() {
  const playerRef = useRef<HTMLElement>(null);
  const controlsTimerRef = useRef<number | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const [manifest, setManifest] = useState<PresentationManifest | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [current, setCurrent] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fallbackFullscreen, setFallbackFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const presentationMode = isFullscreen || fallbackFullscreen;

  useEffect(() => {
    let active = true;
    fetch(sitePath("/presentation/manifest.json"))
      .then((response) => {
        if (!response.ok) throw new Error("Presentation manifest unavailable");
        return response.json() as Promise<PresentationManifest>;
      })
      .then((data) => {
        if (active) setManifest(data);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const slideCount = manifest?.slides.length ?? 0;

  const goTo = useCallback(
    (index: number) => {
      if (!slideCount) return;
      setCurrent(Math.max(0, Math.min(slideCount - 1, index)));
    },
    [slideCount],
  );

  const previous = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  const wakeControls = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimerRef.current) {
      window.clearTimeout(controlsTimerRef.current);
    }
    if (presentationMode && !indexOpen) {
      controlsTimerRef.current = window.setTimeout(
        () => setControlsVisible(false),
        2300,
      );
    }
  }, [indexOpen, presentationMode]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (fallbackFullscreen) {
        setFallbackFullscreen(false);
      } else {
        await playerRef.current?.requestFullscreen();
        if (!document.fullscreenElement) setFallbackFullscreen(true);
      }
    } catch {
      setFallbackFullscreen((active) => !active);
    }
  }, [fallbackFullscreen]);

  useEffect(() => {
    const handleFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
      setControlsVisible(true);
    };
    document.addEventListener("fullscreenchange", handleFullscreen);
    return () => document.removeEventListener("fullscreenchange", handleFullscreen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && indexOpen) {
        setIndexOpen(false);
        return;
      }
      if (event.key === "Escape" && fallbackFullscreen) {
        setFallbackFullscreen(false);
        return;
      }
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        previous();
      } else if (event.key === " " && !indexOpen) {
        event.preventDefault();
        next();
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(slideCount - 1);
      } else if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        void toggleFullscreen();
      } else if (event.key.toLowerCase() === "g") {
        event.preventDefault();
        setIndexOpen((open) => !open);
      }
      wakeControls();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fallbackFullscreen, goTo, indexOpen, next, previous, slideCount, toggleFullscreen, wakeControls]);

  useEffect(() => {
    if (!manifest) return;
    const adjacent = [manifest.slides[current - 1], manifest.slides[current + 1]];
    for (const slide of adjacent) {
      if (!slide) continue;
      const image = new Image();
      image.src = slide.src;
    }
  }, [current, manifest]);

  useEffect(
    () => () => {
      if (controlsTimerRef.current) {
        window.clearTimeout(controlsTimerRef.current);
      }
    },
    [],
  );

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 54 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) next();
    else previous();
  }

  if (loadError) {
    return (
      <main className="presentation-status">
        <p>No fue posible cargar la presentación provisional.</p>
        {/* Native links preserve compatibility with the Sites Worker runtime. */}
        <a href={sitePath("/")}>Volver al Hub</a>
      </main>
    );
  }

  if (!manifest) {
    return (
      <main className="presentation-status">
        <span className="presentation-loader" aria-hidden="true" />
        <p>Preparando presentación…</p>
      </main>
    );
  }

  const slide = manifest.slides[current];

  return (
    <main
      ref={playerRef}
      className={`presentation-player ${presentationMode ? "is-fullscreen" : ""} ${controlsVisible ? "controls-visible" : ""}`}
      onPointerMove={wakeControls}
      onPointerDown={wakeControls}
    >
      <header className="player-header">
        {/* Native links preserve compatibility with the Sites Worker runtime. */}
        <a className="player-back" href={sitePath("/")} aria-label="Volver al Experience Hub">
          <span aria-hidden="true">←</span>
          Hub
        </a>
        <div className="player-title">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sitePath("/brand/harris-frank-logo.png")} alt="Harris & Frank" />
          <span>Presentación ejecutiva</span>
        </div>
        <div className="player-header-actions">
          <span className={`version-chip ${manifest.status}`}>{manifest.versionLabel}</span>
          <a className="scrolly-preview-link" href={sitePath("/presentacion/scrollytelling/")}>
            Abrir narrativa consolidada
          </a>
          <button type="button" onClick={() => void toggleFullscreen()}>
            Pantalla completa
          </button>
        </div>
      </header>

      <section className="slide-workspace" aria-label={manifest.title}>
        <div
          className="slide-stage"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={slide.src}
            className="active-slide"
            src={sitePath(slide.src)}
            alt={`Diapositiva ${current + 1}: ${slide.title}`}
            draggable={false}
          />
        </div>
      </section>

      <nav className="player-controls" aria-label="Controles de presentación">
        <button
          className="control-direction"
          type="button"
          onClick={previous}
          disabled={current === 0}
          aria-label="Diapositiva anterior"
        >
          <span aria-hidden="true">←</span>
          Anterior
        </button>

        <button
          className="slide-position"
          type="button"
          onClick={() => setIndexOpen(true)}
          aria-label="Abrir índice de diapositivas"
        >
          <span>{String(current + 1).padStart(2, "0")}</span>
          <i aria-hidden="true" />
          <span>{String(slideCount).padStart(2, "0")}</span>
        </button>

        <button
          className="control-direction next"
          type="button"
          onClick={next}
          disabled={current === slideCount - 1}
          aria-label="Siguiente diapositiva"
        >
          Siguiente
          <span aria-hidden="true">→</span>
        </button>
      </nav>

      <button
        className="index-trigger"
        type="button"
        onClick={() => setIndexOpen(true)}
        aria-label="Ver todas las diapositivas"
      >
        Índice
      </button>

      <div className={`slide-index ${indexOpen ? "is-open" : ""}`} aria-hidden={!indexOpen}>
        <button
          className="index-backdrop"
          type="button"
          onClick={() => setIndexOpen(false)}
          aria-label="Cerrar índice"
          tabIndex={indexOpen ? 0 : -1}
        />
        <section className="index-panel" aria-label="Índice de diapositivas">
          <div className="index-heading">
            <div>
              <span>Recorrido</span>
              <h2>Presentación ejecutiva</h2>
            </div>
            <button type="button" onClick={() => setIndexOpen(false)}>
              Cerrar ×
            </button>
          </div>
          <div className="thumbnail-grid">
            {manifest.slides.map((item, index) => (
              <button
                key={item.id}
                className={index === current ? "is-current" : ""}
                type="button"
                onClick={() => {
                  goTo(index);
                  setIndexOpen(false);
                }}
                tabIndex={indexOpen ? 0 : -1}
              >
                <span className="thumbnail-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt="" loading="lazy" />
                </span>
                <span className="thumbnail-label">
                  <small>{item.id}</small>
                  <strong>{item.title}</strong>
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
