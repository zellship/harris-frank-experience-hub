/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import "./scrollytelling.css";

const chapters = [
  ["extraordinario", "La oportunidad"], ["entendimiento", "Lo que entendimos"],
  ["categoria", "Una categoría distinta"], ["capacidad", "Capacidad ejecutable"],
  ["servicio", "El servicio"], ["equipo", "Equipo extendido"],
  ["vision", "Prueba de visión"], ["valor", "Valor temprano"],
  ["adopcion", "Adopción gobernada"], ["continuidad", "Control y continuidad"],
  ["inversion", "Inversión"], ["decision", "Activar el programa"],
].map(([id, label], index) => ({ id, label, number: String(index + 1).padStart(2, "0") }));

const domains = [
  { marker: "P&B", title: "Product & Brand", line: "Colecciones, producto, BOM relacional y conocimiento comercial conectados." },
  { marker: "C&C", title: "Customer & Commerce", line: "Contexto, cuenta, partidas, MTM y continuidad de la promesa al cliente." },
  { marker: "S&S", title: "Supply & Service Operations", line: "ATP, inventario en red, cross-docking, producción, sastrería y rutas." },
  { marker: "EC", title: "Enterprise Control", line: "Prioridades, triage, responsabilidades, evidencia y decisiones ejecutivas." },
];

const approaches = [
  { title: "SaaS / ERP", label: "Adoptar una estructura existente", line: "Acelera capacidades estándar; el ajuste fino depende de la flexibilidad de la plataforma." },
  { title: "Proyecto de software", label: "Construir una solución puntual", line: "Puede resolver un alcance concreto; continuidad, adopción y evolución requieren gobierno adicional." },
  { title: "Business OS", label: "Instalar capacidad de evolución", line: "Conecta modelo operativo, sistema, implementación, soporte y mejora en un mismo servicio." },
];

const serviceStages = [
  { number: "01", title: "Entender", detail: "Prioridades y contexto", output: "Una lectura compartida de la operación y de aquello que debe protegerse." },
  { number: "02", title: "Estandarizar", detail: "Procesos y reglas", output: "Un modelo operativo explícito que reduce dependencia e interpretación." },
  { number: "03", title: "Diseñar", detail: "Modelo y experiencia", output: "Capacidades, decisiones y experiencias conectadas al trabajo real." },
  { number: "04", title: "Desarrollar", detail: "Configuración y sistema", output: "La capacidad se materializa en software verificable y reutilizable." },
  { number: "05", title: "Implementar", detail: "Adopción y transición", output: "Usuarios, datos y operación avanzan mediante una transición controlada." },
  { number: "06", title: "Asistir", detail: "Soporte e hypercare", output: "El equipo acompaña la operación hasta estabilizar el nuevo modelo." },
  { number: "07", title: "Mejorar", detail: "Evidencia y siguiente wave", output: "La evidencia define qué evolucionar, ampliar, corregir o detener." },
];

const capabilities = [
  { marker: "CC", title: "Un mismo contexto de cliente", statement: "Sales Terminal, Client Passport, Mi Passport y MTM Studio continúan la relación sin reconstruirla en cada interacción.", signal: "Contexto · continuidad comercial" },
  { marker: "OP", title: "Una promesa que puede seguirse", statement: "Órdenes, partidas, responsables, ETA y evidencia conservan su estado sin confundirse entre sí.", signal: "Compromiso · trazabilidad" },
  { marker: "OM", title: "Una red que puede responder", statement: "Inventario útil, ATP, transferencias y cross-docking convierten existencias distribuidas en opciones ejecutables.", signal: "Disponibilidad · coordinación" },
  { marker: "PA", title: "Pantallas que responden al contexto", statement: "Cada rol recibe señales, acciones y prioridades pertinentes, desde boutique y móvil hasta control ejecutivo.", signal: "Rol · momento · siguiente acción" },
];

const gates = ["Congelar alcance", "Preparar datos", "Coexistir", "Probar", "Aceptar con evidencia", "Estabilizar", "Ampliar o detener"];
const teamRoles = [
  ["01", "Dirección", "Prioridad, inversión, decisiones y criterio de valor."],
  ["02", "Producto & Operación", "Reglas, procesos, experiencia y aceptación funcional."],
  ["03", "Tecnología aplicada", "Arquitectura, construcción, datos, seguridad y calidad."],
  ["04", "Adopción & Evolución", "Implementación, soporte, evidencia y siguiente ciclo."],
];

export default function ScrollytellingPresentation() {
  const shellRef = useRef<HTMLElement>(null);
  const controlsTimerRef = useRef<number | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [domain, setDomain] = useState(1);
  const [approach, setApproach] = useState(2);
  const [serviceStage, setServiceStage] = useState(3);
  const [capability, setCapability] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const goToChapter = useCallback((index: number) => {
    const next = Math.max(0, Math.min(chapters.length - 1, index));
    setActiveChapter(next);
    window.history.replaceState(null, "", `#${chapters[next].id}`);
    document.getElementById(chapters[next].id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    setIndexOpen(false);
  }, []);

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimerRef.current) window.clearTimeout(controlsTimerRef.current);
    if (indexOpen) return;
    controlsTimerRef.current = window.setTimeout(() => {
      const focusedControl = document.querySelector(".story-controller:focus-within, .chapter-rail:focus-within");
      if (!focusedControl) setControlsVisible(false);
    }, 2400);
  }, [indexOpen]);

  useEffect(() => {
    let frame = 0;
    const syncRequestedChapter = () => {
      const requestedId = window.location.hash.replace(/^#/, "");
      const requestedIndex = chapters.findIndex(({ id }) => id === requestedId);
      if (requestedIndex < 0) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        document.getElementById(requestedId)?.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
        setActiveChapter(requestedIndex);
      });
    };
    syncRequestedChapter();
    window.addEventListener("hashchange", syncRequestedChapter);
    return () => {
      window.removeEventListener("hashchange", syncRequestedChapter);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sections = chapters.map(({ id }) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;
    const syncVisibleChapter = () => {
      frame = 0;
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      const index = sections.reduce((closest, section, sectionIndex) => {
        const sectionCenter = section.offsetTop + section.offsetHeight / 2;
        const closestSection = sections[closest];
        const closestCenter = closestSection.offsetTop + closestSection.offsetHeight / 2;
        return Math.abs(sectionCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter) ? sectionIndex : closest;
      }, 0);
      setActiveChapter(index);
      if (window.location.hash !== `#${chapters[index].id}`) window.history.replaceState(null, "", `#${chapters[index].id}`);
    };
    const requestSync = () => {
      if (!frame) frame = window.requestAnimationFrame(syncVisibleChapter);
    };
    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    return () => {
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!indexOpen) {
      controlsTimerRef.current = window.setTimeout(() => {
        const focusedControl = document.querySelector(".story-controller:focus-within, .chapter-rail:focus-within");
        if (!focusedControl) setControlsVisible(false);
      }, 2400);
    }
    window.addEventListener("pointermove", revealControls, { passive: true });
    window.addEventListener("pointerdown", revealControls, { passive: true });
    window.addEventListener("keydown", revealControls);
    return () => {
      window.removeEventListener("pointermove", revealControls);
      window.removeEventListener("pointerdown", revealControls);
      window.removeEventListener("keydown", revealControls);
      if (controlsTimerRef.current) window.clearTimeout(controlsTimerRef.current);
    };
  }, [indexOpen, revealControls]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const center = window.innerHeight / 2;
      document.querySelectorAll<HTMLElement>(".story-chapter").forEach((item) => {
        const rect = item.getBoundingClientRect();
        item.style.setProperty("--parallax", Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - center) / window.innerHeight)).toFixed(3));
      });
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateParallax); };
    updateParallax(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); window.cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && indexOpen) return setIndexOpen(false);
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(event.key)) { event.preventDefault(); goToChapter(activeChapter + 1); }
      else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); goToChapter(activeChapter - 1); }
      else if (event.key.toLowerCase() === "g") { event.preventDefault(); setIndexOpen((open) => !open); }
      else if (event.key.toLowerCase() === "f") { event.preventDefault(); void toggleFullscreen(); }
    };
    window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeChapter, goToChapter, indexOpen]);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange); return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  async function toggleFullscreen() { if (document.fullscreenElement) await document.exitFullscreen(); else await shellRef.current?.requestFullscreen(); }

  return (
    <main ref={shellRef} className={`story-shell ${controlsVisible ? "controls-visible" : "controls-hidden"}`}>
      <header className="story-header">
        <Link href="/presentacion" className="story-back"><span aria-hidden="true">←</span> Presentación actual</Link>
        <div className="story-brand"><img src="/brand/harris-frank-logo.png" alt="Harris & Frank" /><span>Presentación narrativa</span></div>
        <div className="story-header-actions"><button type="button" onClick={() => void toggleFullscreen()}>{isFullscreen ? "Salir" : "Pantalla completa"}</button></div>
      </header>

      <nav className="chapter-rail" aria-label="Capítulos de la presentación" aria-hidden={!controlsVisible}>
        {chapters.map((chapter, index) => <button key={chapter.id} className={index === activeChapter ? "is-active" : ""} type="button" onClick={() => goToChapter(index)} aria-label={`Ir a ${chapter.label}`} aria-current={index === activeChapter ? "step" : undefined} tabIndex={controlsVisible ? 0 : -1}><i /><span>{chapter.number}</span><strong>{chapter.label}</strong></button>)}
      </nav>

      <section id="extraordinario" className="story-chapter chapter-hero">
        <div className="story-grid" /><div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <div className="story-content hero-story-copy"><span className="story-kicker">Harris &amp; Frank × Zellship</span><h1>Extraordinario<em>por diseño.</em></h1><p>La ventaja de Harris &amp; Frank no está sólo en lo que vende. Está en cómo diseña, produce, relaciona y cumple.</p><div className="thesis-line"><span>Operación extraordinaria</span><i>→</i><span>Modelo operativo</span><i>→</i><strong>Capacidad ejecutable</strong></div></div>
        <div className="hero-screens" aria-label="Superficies conectadas del sistema">
          <figure className="screen-card screen-sales"><img src="/demo/sales-terminal.webp" alt="Sales Terminal" /><figcaption>Customer &amp; Commerce</figcaption></figure>
          <figure className="screen-card screen-collection"><img src="/demo/collection-studio.webp" alt="Collection Studio" /><figcaption>Product &amp; Brand</figcaption></figure>
          <div className="screen-core"><img src="/brand/os-mark.png" alt="Business OS" /><span>Una misma capacidad operativa</span></div>
        </div>
        <button type="button" className="scroll-cue" onClick={() => goToChapter(1)}>Descubrir el modelo <span>↓</span></button>
      </section>

      <section id="entendimiento" className="story-chapter chapter-evidence light-chapter">
        <div className="story-content evidence-heading"><span className="story-kicker">El punto de partida</span><h2>No partimos de una idea de software.<em>Partimos de su operación.</em></h2><p>Nueve conversaciones funcionales y decenas de fuentes permitieron convertir conocimiento disperso en una lectura común del negocio.</p></div>
        <div className="evidence-numbers"><article><strong>9</strong><span>sesiones funcionales</span></article><article><strong>54</strong><span>fuentes revisadas</span></article><article><strong>107</strong><span>requerimientos organizados</span></article><article><strong>4</strong><span>dominios de valor</span></article><article><strong>1</strong><span>fundación compartida</span></article></div>
        <div className="domain-explorer"><div className="domain-tabs" role="tablist" aria-label="Dominios operativos">{domains.map((item, index) => <button key={item.marker} type="button" role="tab" aria-selected={index === domain} className={index === domain ? "is-active" : ""} onClick={() => setDomain(index)}><span>{item.marker}</span><strong>{item.title}</strong></button>)}</div><article className="domain-detail" aria-live="polite"><small>Dominio {String(domain + 1).padStart(2, "0")}</small><h3>{domains[domain].title}</h3><p>{domains[domain].line}</p><footer>Una operación · distintos contextos · una misma lógica de valor</footer></article></div>
      </section>

      <section id="categoria" className="story-chapter chapter-category">
        <div className="category-aura" /><div className="story-content category-copy"><span className="story-kicker">La decisión estratégica</span><h2>La decisión no es<em>“estándar o a medida”.</em></h2><p>Es qué modelo protege lo extraordinario, reduce el riesgo de cambio y conserva capacidad de evolución.</p></div>
        <div className="approach-explorer"><div className="approach-tabs" role="tablist" aria-label="Modelos de inversión">{approaches.map((item, index) => <button key={item.title} type="button" role="tab" aria-selected={index === approach} className={index === approach ? "is-active" : ""} onClick={() => setApproach(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><small>{item.label}</small></button>)}</div><article className="approach-detail"><small>Una lente para decidir</small><h3>{approaches[approach].title}</h3><p>{approaches[approach].line}</p><div><span>Modelo operativo</span><span>Sistema</span><span>Adopción</span><span>Evolución</span></div></article></div>
      </section>

      <section id="capacidad" className="story-chapter chapter-capacity light-chapter">
        <div className="capacity-asset"><img src="/brand/hf-os-suite-exploded.webp" alt="Capas del Business OS" /></div>
        <div className="story-content capacity-copy"><span className="story-kicker">El activo operativo</span><h2>Lo valioso no termina<em>en una pantalla.</em></h2><p>La interfaz es la parte visible. Debajo se instala una forma compartida de decidir, ejecutar, medir y mejorar.</p><div className="asset-stack"><article><span>01</span><div><strong>Modelo operativo</strong><small>Procesos, reglas, roles y criterios explícitos.</small></div></article><article><span>02</span><div><strong>Capacidad en sistema</strong><small>Datos, engines y experiencias conectadas.</small></div></article><article><span>03</span><div><strong>Implementación utilizable</strong><small>Usuarios, transición, soporte y evidencia.</small></div></article><article><span>04</span><div><strong>Continuidad evolutiva</strong><small>Aprendizaje, iteración y siguientes waves.</small></div></article></div><Link className="inline-link" href="/propuesta#architecture">Explorar el blueprint operativo <span>↗</span></Link></div>
      </section>

      <section id="servicio" className="story-chapter chapter-service light-chapter">
        <div className="chapter-orb service-orb" /><div className="story-content service-copy"><span className="story-kicker">El modelo de la oferta</span><h2>El servicio cubre el ciclo completo;<em>el software es sólo una parte.</em></h2><p>Cada etapa entrega una salida verificable y prepara la siguiente decisión.</p></div>
        <div className="service-explorer"><div className="service-stage-list" role="tablist" aria-label="Etapas del servicio">{serviceStages.map((stage, index) => <button key={stage.title} type="button" role="tab" aria-selected={index === serviceStage} className={index === serviceStage ? "is-active" : ""} onClick={() => setServiceStage(index)}><span>{stage.number}</span><strong>{stage.title}</strong><small>{stage.detail}</small></button>)}</div><article className="service-stage-detail"><span>Salida verificable · {serviceStages[serviceStage].number}</span><h3>{serviceStages[serviceStage].title}</h3><p>{serviceStages[serviceStage].output}</p><footer><i />El valor empieza antes del desarrollo y continúa después.</footer></article></div>
      </section>

      <section id="equipo" className="story-chapter chapter-team">
        <div className="story-content team-copy"><span className="story-kicker">Capacidad extendida</span><h2>No un proveedor que entrega y se retira.<em>Un equipo que permanece.</em></h2><p>La continuidad reúne criterio de negocio, operación, tecnología y adopción dentro de un mismo sistema de trabajo.</p></div>
        <div className="team-grid">{teamRoles.map(([code, title, line]) => <article key={code}><span>{code}</span><strong>{title}</strong><p>{line}</p></article>)}</div>
        <div className="cadence-line"><span><i />Quincenal<strong>compromiso, demo y evidencia</strong></span><span><i />Mensual<strong>transformación y prioridades</strong></span><span><i />Trimestral<strong>QBR y plan de resultados</strong></span><span><i />Anual<strong>continuidad y renovación</strong></span></div>
      </section>

      <section id="vision" className="story-chapter chapter-vision">
        <div className="vision-rings"><i /><i /><i /></div>
        <div className="story-content vision-heading"><span className="story-kicker">Showcase ejecutivo</span><h2>La visión puede recorrerse,<em>no sólo explicarse.</em></h2><p>Las experiencias hacen tangible una operación conectada sin convertir la visión completa en alcance automático.</p><div className="mini-screen-stack"><figure><img src="/demo/collection-studio.webp" alt="" /></figure><figure><img src="/demo/sales-terminal.webp" alt="" /></figure></div></div>
        <div className="vision-explorer"><div className="capability-tabs" role="tablist">{capabilities.map((item, index) => <button key={item.marker} type="button" role="tab" aria-selected={index === capability} className={index === capability ? "is-active" : ""} onClick={() => setCapability(index)}><span>{item.marker}</span><strong>{item.title}</strong></button>)}</div><article className="capability-detail"><span className="capability-marker">{capabilities[capability].marker}</span><small>{capabilities[capability].signal}</small><h3>{capabilities[capability].title}</h3><p>{capabilities[capability].statement}</p><Link href="/demo">Entrar a la Demo <span>↗</span></Link></article></div>
      </section>

      <section id="valor" className="story-chapter chapter-value light-chapter">
        <div className="story-content value-copy"><span className="story-kicker">Valor desde las primeras ocho semanas</span><h2>No hay que esperar al cierre<em>para recibir valor utilizable.</em></h2><p>El Foundation Release deja una base que puede verse, probarse, aceptarse y evolucionar.</p></div>
        <div className="value-path"><article><span>01</span><strong>Decisión congelada</strong><p>Alcance, datos, responsables, criterios y límites explícitos.</p><small>Menos ambigüedad</small></article><article><span>02</span><strong>Capacidad utilizable</strong><p>Una experiencia funcional en contexto real, acompañada y medible.</p><small>Valor visible</small></article><article><span>03</span><strong>Evidencia para ampliar</strong><p>Resultados, aprendizaje y una siguiente decisión informada.</p><small>Riesgo controlado</small></article></div>
        <div className="value-ribbon"><span>Definición</span><i /><span>Configuración</span><i /><span>Uso</span><i /><span>Evidencia</span><i /><strong>Siguiente wave</strong></div>
      </section>

      <section id="adopcion" className="story-chapter chapter-gates">
        <div className="gate-layers">{Array.from({ length: 7 }, (_, index) => <i key={index} style={{ "--layer": index } as CSSProperties} />)}</div>
        <div className="story-content gate-copy"><span className="story-kicker">Adopción gobernada</span><h2>No proponemos un “big bang”.<em>Cada gate reduce riesgo antes de ampliar.</em></h2><p>El primer ciclo comienza con alcance, datos, responsables y criterios explícitos. La evidencia permite evolucionar, detener o corregir.</p><div className="gate-flow">{gates.map((gate, index) => <span key={gate}><i>{String(index + 1).padStart(2, "0")}</i>{gate}</span>)}</div></div>
      </section>

      <section id="continuidad" className="story-chapter chapter-control light-chapter">
        <div className="story-content control-copy"><span className="story-kicker">Control y continuidad</span><h2>El programa debe crear<em>un activo, no una dependencia.</em></h2><p>Cada aceptación deja reglas, datos, evidencia y una versión utilizable bajo condiciones explícitas.</p></div>
        <div className="control-grid"><article className="control-keeps"><small>Lo que permanece</small><h3>Capacidad aceptada</h3><ul><li>Modelo operativo y decisiones documentadas</li><li>Datos, estructuras y evidencia exportable</li><li>Versiones aceptadas y derecho de uso acordado</li><li>Respaldos, responsables y playbooks de continuidad</li></ul></article><article className="control-agrees"><small>Lo que se acuerda</small><h3>Límites explícitos</h3><ul><li>Nuevas capacidades y siguientes waves</li><li>Integraciones, infraestructura y servicios de terceros</li><li>Niveles de soporte y ventanas de atención</li><li>Derechos adicionales sobre código sólo si se pactan</li></ul></article></div>
        <Link className="inline-link dark-link" href="/propuesta">Ver metodología, respaldo y mitigación de riesgo <span>↗</span></Link>
      </section>

      <section id="inversion" className="story-chapter chapter-investment">
        <div className="story-content investment-copy"><span className="story-kicker">Programa anual de evolución operativa</span><h2>La inversión compra<em>capacidad continua de evolución.</em></h2><p>Doce meses: un Foundation Release de ocho semanas y diez ciclos mensuales de innovación, tecnología y mejora continua.</p><div className="investment-includes"><span>Modelo operativo</span><span>Equipo extendido</span><span>Implementación</span><span>QBR</span><span>Mejora continua</span></div></div>
        <article className="investment-card"><small>Términos comerciales vigentes · MXN + IVA</small><div><span>Foundation Release</span><strong>$299,000</strong><i>Reconocimiento Blueprint −$55,900 · saldo $243,100</i></div><div className="credit"><span>Programa de evolución</span><strong>10 × $65,000</strong><i>Mensualidades anticipadas después de aceptar Foundation</i></div><div className="investment-total"><span>Valor total del primer año</span><strong>$949,000</strong><i>Nueva inversión pendiente · $893,100</i></div><footer>$150,000 a la firma · $93,100 contra aceptación · compromiso inicial de 12 meses.</footer></article>
      </section>

      <section id="decision" className="story-chapter chapter-close">
        <div className="close-asset"><img src="/brand/hf-os-suite-exploded.webp" alt="" /></div>
        <div className="story-content close-copy"><span className="story-kicker">La decisión</span><h2>Proteger lo extraordinario.<em>Hacerlo ejecutable. Evolucionarlo juntos.</em></h2><p>El Foundation Release activa un primer núcleo controlado; el programa anual lo convierte en una capacidad que aprende y evoluciona con evidencia.</p><div className="decision-steps"><span><i>01</i>Aprobar el programa anual</span><span><i>02</i>Congelar alcance y contrato</span><span><i>03</i>Activar Foundation Release</span></div><div className="close-actions"><Link className="primary" href="/demo">Recorrer la Demo <span>↗</span></Link><Link href="/propuesta">Explorar la propuesta</Link><Link href="/">Volver al Hub</Link></div><small className="prototype-note">Términos comerciales vigentes sujetos al contrato definitivo.</small></div>
      </section>

      <nav className="story-controller" aria-label="Control de capítulos" aria-hidden={!controlsVisible}><button type="button" onClick={() => goToChapter(activeChapter - 1)} disabled={activeChapter === 0} tabIndex={controlsVisible ? 0 : -1}>← <span>Anterior</span></button><button type="button" className="story-position" onClick={() => setIndexOpen(true)} tabIndex={controlsVisible ? 0 : -1} aria-label={`Abrir índice. Capítulo ${activeChapter + 1} de ${chapters.length}`}><span>{chapters[activeChapter].number}</span><i><b style={{ width: `${((activeChapter + 1) / chapters.length) * 100}%` } as CSSProperties} /></i><span>{String(chapters.length).padStart(2, "0")}</span></button><button type="button" onClick={() => goToChapter(activeChapter + 1)} disabled={activeChapter === chapters.length - 1} tabIndex={controlsVisible ? 0 : -1}><span>Siguiente</span> →</button></nav>

      <div className={`story-index ${indexOpen ? "is-open" : ""}`} aria-hidden={!indexOpen}><button className="story-index-backdrop" type="button" onClick={() => setIndexOpen(false)} aria-label="Cerrar índice" tabIndex={indexOpen ? 0 : -1} /><section className="story-index-panel"><header><div><span>Recorrido ejecutivo</span><h2>Presentación narrativa</h2></div><button type="button" onClick={() => setIndexOpen(false)}>Cerrar ×</button></header><div>{chapters.map((chapter, index) => <button key={chapter.id} type="button" className={index === activeChapter ? "is-current" : ""} onClick={() => goToChapter(index)} tabIndex={indexOpen ? 0 : -1}><span>{chapter.number}</span><strong>{chapter.label}</strong><i>→</i></button>)}</div></section></div>
    </main>
  );
}
