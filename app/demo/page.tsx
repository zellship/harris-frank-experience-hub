"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./demo.css";
import { sitePath } from "../site-path";

const SHOWCASE_ENTRY = sitePath("/harris-frank-capability-showcase/#/demo");

export default function DemoPage() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const detachBridgeRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);

  const connectHubBridge = useCallback(() => {
    detachBridgeRef.current?.();

    const frameDocument = frameRef.current?.contentDocument;
    if (!frameDocument) return;

    const handleShowcaseClick = (event: MouseEvent) => {
      const origin = event.target;
      if (!origin || typeof (origin as Element).closest !== "function") return;

      const control = (origin as Element).closest("a, button");
      if (!control) return;

      const label = `${control.getAttribute("title") ?? ""} ${control.textContent ?? ""}`
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      const href = control.tagName === "A" ? control.getAttribute("href") : null;
      const returnsToHub = label.includes("volver al hub") || label === "hub";

      if (!returnsToHub && !(href === "#/" && label.includes("hub"))) return;

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(sitePath("/"));
    };

    frameDocument.addEventListener("click", handleShowcaseClick, true);
    detachBridgeRef.current = () =>
      frameDocument.removeEventListener("click", handleShowcaseClick, true);
  }, []);

  const handleFrameLoad = useCallback(() => {
    setReady(true);
    window.setTimeout(connectHubBridge, 0);
  }, [connectHubBridge]);

  useEffect(() => {
    const loadingFallback = window.setTimeout(() => {
      setReady(true);
      connectHubBridge();
    }, 1400);

    return () => {
      window.clearTimeout(loadingFallback);
      detachBridgeRef.current?.();
    };
  }, [connectHubBridge]);

  return (
    <main className={`demo-integration${ready ? " is-ready" : ""}`}>
      <div className="demo-loading" role="status" aria-live="polite">
        <span className="demo-loading-mark">OS</span>
        <div>
          <strong>Harris &amp; Frank Experience Hub</strong>
          <small>Preparando experiencias seleccionadas</small>
        </div>
      </div>

      <iframe
        ref={frameRef}
        className="demo-frame"
        src={SHOWCASE_ENTRY}
        title="Demo seleccionada de capacidades Harris & Frank"
        allow="fullscreen"
        allowFullScreen
        onLoad={handleFrameLoad}
      />
    </main>
  );
}
