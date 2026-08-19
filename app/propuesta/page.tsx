"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./propuesta.css";

type Principle = {
  id: string;
  number: string;
  title: string;
  statement: string;
  implication: string;
  accent: string;
};

const principles: Principle[] = [
  {
    id: "context",
    number: "01",
    title: "Contexto antes que transacción",
    statement:
      "Cliente, cuenta, evento y necesidad permanecen conectados más allá de una venta aislada.",
    implication: "Continuidad comercial y de servicio",
    accent: "violet",
  },
  {
    id: "commitment",
    number: "02",
    title: "Compromisos antes que documentos",
    statement:
      "Órdenes, partidas y actividades se organizan alrededor de aquello que se prometió cumplir.",
    implication: "Responsabilidad y trazabilidad",
    accent: "blue",
  },
  {
    id: "availability",
    number: "03",
    title: "Disponibilidad antes que existencia",
    statement:
      "Inventario útil, ATP y capacidad permiten prometer desde condiciones verificables.",
    implication: "Mayor certeza en la promesa",
    accent: "cyan",
  },
  {
    id: "triage",
    number: "04",
    title: "Excepciones antes que sorpresas",
    statement:
      "Triage, riesgo y recuperabilidad permiten actuar antes de que el compromiso se rompa.",
    implication: "Intervención anticipada",
    accent: "gold",
  },
  {
    id: "evidence",
    number: "05",
    title: "Evidencia antes que interpretación",
    statement:
      "Estados, movimientos, responsables y autorizaciones dejan una historia operativa verificable.",
    implication: "Control con fundamento",
    accent: "orange",
  },
  {
    id: "capabilities",
    number: "06",
    title: "Capacidades antes que aplicaciones",
    statement:
      "La lógica común se reutiliza entre tienda, MTM, inventario, producción y control.",
    implication: "Una plataforma que evoluciona",
    accent: "rose",
  },
];

const discoveries = [
  {
    title: "Cuenta, orden y partida no son lo mismo",
    description:
      "Una cuenta preserva el contexto; cada partida conserva su propia ejecución, promesa, riesgo y evidencia.",
    signal: "Modelo operativo",
  },
  {
    title: "Prioridad, urgencia y riesgo son señales distintas",
    description:
      "El Triage combina tiempo, impacto, capacidad y recuperabilidad para sugerir la siguiente mejor acción.",
    signal: "Decisión operativa",
  },
  {
    title: "Existencia no equivale a disponibilidad prometible",
    description:
      "La disponibilidad útil conecta ATP, red, reservas y capacidad antes de comprometer una fecha.",
    signal: "Promesa confiable",
  },
  {
    title: "El riesgo acompaña al flujo; no lo sustituye",
    description:
      "Una partida puede seguir en producción y, al mismo tiempo, requerir recuperación sin deformar su estado real.",
    signal: "Control transversal",
  },
];

const capabilityFamilies = [
  {
    id: "customer",
    number: "01",
    title: "Customer & Commerce",
    description: "Una relación continua, independientemente del canal.",
    tone: "violet",
    capabilities: [
      {
        id: "passport",
        title: "Client Passport + Mi Passport",
        short: "Continuidad interna y externa del cliente",
        insight:
          "La relación no termina cuando se registra la venta; pedidos, citas, medidas, documentos y compromisos deben conservar contexto.",
        manifestation:
          "Una vista interna para el equipo y una experiencia externa separada para el cliente, conectadas por la misma identidad y sus compromisos.",
        value:
          "Servicio consistente, menor dependencia de personas y visibilidad del avance para el cliente.",
        tags: ["Cliente", "Pedidos", "Citas", "Continuidad"],
      },
      {
        id: "omnichannel",
        title: "Continuidad omnicanal",
        short: "Tienda, ecommerce y atención bajo un contexto común",
        insight:
          "El canal de origen no debería fragmentar la relación ni obligar a reconstruir el contexto en cada interacción.",
        manifestation:
          "Cuenta, cliente, orden y seguimiento permanecen conectados cuando una interacción comienza en Shopify, WhatsApp o boutique.",
        value:
          "Menos fricción entre canales y una experiencia coherente para clientes y asesores.",
        tags: ["Shopify", "Boutique", "Handoff", "Cuenta"],
      },
      {
        id: "transactional-messaging",
        title: "Notificaciones transaccionales",
        short: "WhatsApp como extensión de los eventos del sistema",
        insight:
          "La comunicación relevante debe originarse en un cambio operativo verificable, no depender de seguimientos manuales aislados.",
        manifestation:
          "Mensajes de confirmación, avance, cita, incidencia o entrega disparados por eventos y vinculados al compromiso correspondiente.",
        value:
          "Comunicación oportuna, menor carga manual y trazabilidad sobre lo informado.",
        tags: ["WhatsApp", "Eventos", "Confirmación", "Seguimiento"],
      },
    ],
  },
  {
    id: "product",
    number: "02",
    title: "Product & Brand",
    description: "Producto, configuración y colección como conocimiento vivo.",
    tone: "blue",
    capabilities: [
      {
        id: "mtm-bom",
        title: "BOM relacional para MTM",
        short: "Configuración, materiales y ejecución conectados",
        insight:
          "Una prenda MTM no es solamente un SKU: combina medidas, opciones, materiales, componentes y operaciones que cambian según el flujo.",
        manifestation:
          "Una BOM relacional vincula configuración, insumos, dependencias y rutas de trabajo sin convertir cada variante en un producto aislado.",
        value:
          "Mayor control sobre factibilidad, costeo, producción y trazabilidad de cada configuración.",
        tags: ["MTM", "BOM", "Materiales", "Rutas"],
      },
      {
        id: "collection-lifecycle",
        title: "Collection Studio",
        short: "La colección como sistema de compromisos",
        insight:
          "Modelos, muestras, materiales, margen, contenido y lanzamiento forman una misma ruta crítica.",
        manifestation:
          "Un expediente vivo conecta brief, productos, hitos, incidencias, documentos y responsables hasta el lanzamiento.",
        value:
          "Visibilidad anticipada sobre integridad, rentabilidad y cumplimiento de la colección.",
        tags: ["Colección", "Ruta crítica", "Margen", "Expediente"],
      },
      {
        id: "operational-profiles",
        title: "Perfiles operativos 360°",
        short: "La información relevante reunida alrededor de cada entidad",
        insight:
          "Productos, colecciones, clientes y proveedores necesitan una identidad enriquecida por relaciones, historial y contexto.",
        manifestation:
          "Perfiles que integran atributos, vínculos, desempeño, documentos, actividad y señales sin duplicar información entre módulos.",
        value:
          "Decisiones con contexto y una fuente común de conocimiento operativo.",
        tags: ["Entity Engine", "Relaciones", "Historial", "Contexto"],
      },
    ],
  },
  {
    id: "supply",
    number: "03",
    title: "Supply & Service Operations",
    description: "Inventario, terceros y ejecución coordinados como red.",
    tone: "cyan",
    capabilities: [
      {
        id: "network-inventory",
        title: "Inventario integrado en red",
        short: "Disponibilidad útil y cross-docking coordinado",
        insight:
          "La existencia distribuida sólo crea valor cuando puede convertirse en una promesa y una ruta de suministro realizable.",
        manifestation:
          "Boutiques, almacenes, reservas, transferencias y cross-docking se leen como una red conectada a la misma orden.",
        value:
          "Mejor aprovechamiento del inventario y menor pérdida de ventas por fragmentación.",
        tags: ["ATP", "Cross-docking", "Transferencia", "Red"],
      },
      {
        id: "tokenized-collaboration",
        title: "Colaboración mediante URLs tokenizadas",
        short: "Confirmaciones de terceros sin desplegar otra aplicación",
        insight:
          "Proveedores y terceros necesitan confirmar, aportar evidencia o responder sin convertirse necesariamente en usuarios completos.",
        manifestation:
          "Enlaces únicos y acotados permiten confirmar disponibilidad, fechas, incidencias o documentos dentro de un contexto específico.",
        value:
          "Menor fricción de adopción y respuestas externas vinculadas directamente al proceso.",
        tags: ["Terceros", "Token", "Confirmación", "Evidencia"],
      },
      {
        id: "rfid-traceability",
        title: "Identidad y trazabilidad RFID",
        short: "Cada movimiento conserva producto, lugar y propósito",
        insight:
          "La trazabilidad requiere distinguir identidad, disponibilidad, reserva y movimiento; una lectura física aislada no es suficiente.",
        manifestation:
          "RFID se conecta con entidades, ubicaciones, partidas, eventos y evidencia para interpretar qué ocurrió y por qué.",
        value:
          "Mayor certeza operativa, conciliación y visibilidad sobre el recorrido de cada pieza.",
        tags: ["RFID", "Movimientos", "Identidad", "Evidencia"],
      },
    ],
  },
  {
    id: "enterprise",
    number: "04",
    title: "Enterprise Control",
    description: "El sistema adapta la atención, no sólo la interfaz.",
    tone: "gold",
    capabilities: [
      {
        id: "contextual-experiences",
        title: "Experiencias adaptadas por contexto",
        short: "La información correcta para el momento y la responsabilidad",
        insight:
          "Una misma pantalla no sirve igual para un asesor, una especialista MTM, compras, almacén o dirección.",
        manifestation:
          "Workspaces, acciones y señales cambian según entidad, rol, establecimiento, tarea y compromiso en contexto.",
        value:
          "Menor saturación, decisiones más rápidas y adopción más natural para cada equipo.",
        tags: ["Context Engine", "Rol", "Workspace", "Siguiente acción"],
      },
      {
        id: "kanban-commitments",
        title: "Órdenes y compromisos en Kanban",
        short: "Estado visible con riesgo como condición transversal",
        insight:
          "El flujo debe mostrar dónde está el trabajo sin confundir el estado con urgencia, riesgo o incumplimiento.",
        manifestation:
          "Tableros por estado, responsables y compromiso permiten operar colas, incidencias y recuperación con trazabilidad.",
        value:
          "Control diario, balance de cargas y atención anticipada de excepciones.",
        tags: ["Kanban", "Órdenes", "Riesgo", "Responsables"],
      },
      {
        id: "integration-capability",
        title: "Conectividad como capacidad",
        short: "Eventos y contratos para integrar sin rehacer el modelo",
        insight:
          "Conectar ecommerce, mensajería, pagos, fiscal o infraestructura no debería fragmentar la semántica del negocio.",
        manifestation:
          "Integration Hub y contratos de eventos traducen sistemas externos hacia entidades y compromisos comunes.",
        value:
          "Incorporaciones más ágiles y menor dependencia de integraciones punto a punto.",
        tags: ["Integration Hub", "Eventos", "APIs", "Contratos"],
      },
    ],
  },
];

const allStrategicCapabilities = capabilityFamilies.flatMap((family) =>
  family.capabilities.map((capability) => ({
    ...capability,
    family: family.title,
    tone: family.tone,
  })),
);

const evidence = [
  ["Matriz de capacidades", "Necesidades → capacidades → experiencias"],
  ["Mapa operativo RFID", "Identidad, movimientos y trazabilidad"],
  ["Glosario autoritativo", "ATP, ETA, cuenta, partida y compromiso"],
  ["Mapa de cobertura", "Foundation Release, evolución y visión"],
  ["Blueprint de engines", "Lógica transversal y reutilización"],
  ["Registro de fuentes", "Sesiones, políticas y archivos revisados"],
];

const foundationMilestones = [
  ["Inicio", "Activación", "Contrato, responsables, accesos y calendario"],
  ["Semana 2", "Scope Baseline", "Alcance, reglas, criterios y backlog"],
  ["Semana 4", "Operational Core Alpha", "Demo integrada y evidencia"],
  ["Semana 6", "Pilot Candidate", "Versión, datos, pruebas y plan de piloto"],
  ["Semana 8", "Foundation Release", "Piloto, capacitación y aceptación"],
];

const maturityStates = [
  ["01", "Demostrado", "Puede observarse en una demo integrada."],
  ["02", "Aceptado", "Cumple los criterios funcionales acordados."],
  ["03", "Adoptado", "Los usuarios lo emplean en la operación definida."],
  ["04", "Estabilizado", "Opera con continuidad y sin incidencias materiales."],
];

const qbrDimensions = [
  "Resultados",
  "Entrega",
  "Aceptación",
  "Calidad",
  "Adopción",
  "Valor operativo",
  "Gobierno",
  "Capitalización",
];

const foundationIncludes = [
  "Base Zellship, ambientes, roles y accesos iniciales",
  "Modelo de datos, reglas, backlog y criterios de aceptación",
  "Cliente y cuenta, venta o reserva y flujo MTM delimitado",
  "Pagos, saldos, documentación e inventario relacionado",
  "Cumplimiento, entrega, cierre, evidencia y trazabilidad",
  "Piloto acompañado en una sucursal por definir",
];

const foundationExcludes = [
  "El roadmap completo o los 107 requerimientos",
  "Implementación total en las ocho sucursales",
  "Todos los módulos mostrados en la demo",
  "Collection Studio, Supplier Network o Mi Passport completos",
  "Integraciones mayores y migración histórica completa",
  "Paridad total con LS Retail, automatización o inteligencia avanzada",
];

type ProposalTrack = "blueprint" | "project";

const proposalTracks = {
  blueprint: {
    shortLabel: "Blueprint consultivo",
    eyebrow: "Resultado consultivo · activo ya construido",
    title: "El entendimiento operativo convertido en un activo arquitectónico.",
    lead:
      "Hallazgos, definiciones, modelos y evidencia que explican cómo debe organizarse la operación antes de decidir qué construir.",
    definition:
      "Documenta lo que ya se entendió y definió. Orienta decisiones futuras, pero no equivale por sí mismo al alcance contratado.",
    chapters: [
      ["proposal-top", "Portada"],
      ["principles", "Principios"],
      ["discoveries", "Hallazgos"],
      ["architecture", "Arquitectura"],
      ["model", "Modelo ejecutable"],
      ["evidence", "Evidencia"],
    ],
  },
  project: {
    shortLabel: "Propuesta de proyecto",
    eyebrow: "Ejecución futura · sujeta a contrato",
    title: "Una trayectoria inicial y una capacidad anual para evolucionar.",
    lead:
      "Foundation Release, gobierno, inversión y términos para convertir prioridades acordadas en versiones utilizables del Business OS.",
    definition:
      "Describe lo que se propone contratar: alcance inicial, forma de trabajo, inversión, condiciones y responsabilidades.",
    chapters: [
      ["proposal-top", "Portada"],
      ["programa", "Programa"],
      ["foundation", "Foundation"],
      ["gobierno", "Gobierno"],
      ["terminos", "Términos"],
      ["decision", "Decisión"],
    ],
  },
} as const;

function AccountModel() {
  return (
    <div className="account-model" aria-label="Modelo visual de cuenta y partidas">
      <div className="model-client">
        <span>Cliente</span>
        <strong>Carlos Martínez</strong>
        <small>Relación y contexto persistentes</small>
      </div>
      <div className="model-connector" aria-hidden="true" />
      <div className="model-account">
        <div className="account-heading">
          <span>Cuenta operativa</span>
          <strong>CTA-2026-001248</strong>
          <i>Contexto común</i>
        </div>
        <div className="line-items">
          <div className="line-item is-rtw">
            <span>Partida 01 · RTW</span>
            <strong>Camisa de algodón egipcio</strong>
            <small>Disponibilidad · reserva · entrega</small>
            <em>A tiempo</em>
          </div>
          <div className="line-item is-mtm">
            <span>Partida 02 · MTM</span>
            <strong>Traje de dos piezas</strong>
            <small>Medidas · producción · fitting</small>
            <em>Requiere atención</em>
          </div>
          <div className="line-item is-service">
            <span>Partida 03 · Servicio</span>
            <strong>Ajuste de sastrería</strong>
            <small>Asignación · prueba · liberación</small>
            <em>Programado</em>
          </div>
        </div>
      </div>
    </div>
  );
}

function TriageModel() {
  const factors = [
    ["Urgencia", "88%"],
    ["Impacto", "72%"],
    ["Riesgo", "64%"],
    ["Recuperabilidad", "46%"],
  ];
  return (
    <div className="triage-model" aria-label="Modelo visual de Triage operativo">
      <div className="triage-score">
        <span>Triage operativo</span>
        <strong>Atender ahora</strong>
        <small>Compromiso afectado · fitting 16 ago</small>
        <div className="triage-bars">
          {factors.map(([label, value]) => (
            <div key={label} className="triage-factor">
              <span>{label}</span>
              <i>
                <b style={{ width: value }} />
              </i>
              <em>{value}</em>
            </div>
          ))}
        </div>
      </div>
      <div className="triage-decision">
        <span>Siguiente mejor acción</span>
        <strong>Confirmar material alternativo</strong>
        <p>
          El ETA de producción amenaza el fitting. Existe una alternativa en
          red que conserva la fecha comprometida.
        </p>
        <div className="decision-meta">
          <small>Responsable · Compras</small>
          <small>Ventana · 3 h 20 min</small>
        </div>
        <button type="button">Revisar ruta de recuperación <span>→</span></button>
      </div>
    </div>
  );
}

function PromiseModel() {
  const steps = [
    ["01", "Existencia", "Dónde está"],
    ["02", "Disponibilidad útil", "Qué puede usarse"],
    ["03", "ATP", "Qué puede prometerse"],
    ["04", "Compromiso", "Qué se acordó"],
    ["05", "ETA", "Cuándo se cumplirá"],
  ];
  return (
    <div className="promise-model" aria-label="Cadena visual de la promesa">
      <div className="promise-line" aria-hidden="true" />
      {steps.map(([number, title, detail], index) => (
        <div className={`promise-step step-${index + 1}`} key={number}>
          <span>{number}</span>
          <i />
          <strong>{title}</strong>
          <small>{detail}</small>
        </div>
      ))}
      <div className="promise-result">
        <span>Promesa protegida</span>
        <strong>16 ago · 16:30</strong>
        <small>Actualizada con eventos reales</small>
      </div>
    </div>
  );
}

export default function ProposalBlueprintPage() {
  const [activeModel, setActiveModel] = useState<"account" | "triage" | "promise">("account");
  const [activeCapabilityId, setActiveCapabilityId] = useState("passport");
  const [activeTrack, setActiveTrack] = useState<ProposalTrack>("blueprint");
  const [activeChapter, setActiveChapter] = useState("proposal-top");
  const [controlsVisible, setControlsVisible] = useState(true);
  const [indexOpen, setIndexOpen] = useState(false);
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeCapability =
    allStrategicCapabilities.find(
      (capability) => capability.id === activeCapabilityId,
    ) ?? allStrategicCapabilities[0];
  const track = proposalTracks[activeTrack];
  const chapters = track.chapters;
  const activeChapterIndex = Math.max(
    0,
    chapters.findIndex(([id]) => id === activeChapter),
  );

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      setControlsVisible(false);
      setIndexOpen(false);
    }, 2800);
  }, []);

  const goToChapter = useCallback(
    (id: string, behavior: ScrollBehavior = "smooth") => {
      setActiveChapter(id);
      const hash = id === "proposal-top" ? activeTrack : `${activeTrack}-${id}`;
      window.history.replaceState(null, "", `#${hash}`);
      document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
      setIndexOpen(false);
      revealControls();
    },
    [activeTrack, revealControls],
  );

  const chooseTrack = useCallback(
    (nextTrack: ProposalTrack) => {
      setActiveTrack(nextTrack);
      setActiveChapter("proposal-top");
      window.history.replaceState(null, "", `#${nextTrack}`);
      requestAnimationFrame(() => {
        document
          .getElementById("proposal-top")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      setIndexOpen(false);
      revealControls();
    },
    [revealControls],
  );

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const requestedTrack: ProposalTrack = hash.startsWith("project")
      ? "project"
      : "blueprint";
    const requestedId = hash.replace(`${requestedTrack}-`, "");
    const validId = proposalTracks[requestedTrack].chapters.some(
      ([id]) => id === requestedId,
    )
      ? requestedId
      : "proposal-top";
    requestAnimationFrame(() => {
      setActiveTrack(requestedTrack);
      setActiveChapter(validId);
      window.setTimeout(() => {
        setActiveChapter(validId);
        document.getElementById(validId)?.scrollIntoView({ block: "start" });
      }, 80);
    });
    hideControlsTimer.current = setTimeout(() => {
      setControlsVisible(false);
      setIndexOpen(false);
    }, 2800);
    return () => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    };
  }, []);

  useEffect(() => {
    const updateActiveChapter = () => {
      const viewportFocus = window.innerHeight * 0.42;
      let closestId = chapters[0][0];
      let closestDistance = Number.POSITIVE_INFINITY;
      chapters.forEach(([id]) => {
        const element = document.getElementById(id);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportFocus);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = id;
        }
      });
      setActiveChapter(closestId);
    };
    updateActiveChapter();
    window.addEventListener("scroll", updateActiveChapter, { passive: true });
    window.addEventListener("resize", updateActiveChapter);
    return () => {
      window.removeEventListener("scroll", updateActiveChapter);
      window.removeEventListener("resize", updateActiveChapter);
    };
  }, [chapters]);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.closest(
          "input, textarea, select, summary, [contenteditable='true'], .model-tabs, .capability-stack, .term-details-grid",
        )
      ) {
        return;
      }
      revealControls();
      if (["ArrowRight", "ArrowDown", "PageDown"].includes(event.key)) {
        event.preventDefault();
        const next = Math.min(activeChapterIndex + 1, chapters.length - 1);
        goToChapter(chapters[next][0]);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        const previous = Math.max(activeChapterIndex - 1, 0);
        goToChapter(chapters[previous][0]);
      } else if (event.key === "Home") {
        event.preventDefault();
        goToChapter(chapters[0][0]);
      } else if (event.key === "End") {
        event.preventDefault();
        goToChapter(chapters[chapters.length - 1][0]);
      } else if (event.key.toLowerCase() === "i") {
        setIndexOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", handleKeyboard);
    window.addEventListener("pointermove", revealControls, { passive: true });
    window.addEventListener("pointerdown", revealControls, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKeyboard);
      window.removeEventListener("pointermove", revealControls);
      window.removeEventListener("pointerdown", revealControls);
    };
  }, [activeChapterIndex, chapters, goToChapter, revealControls]);

  return (
    <main className="proposal-shell">
      <header className="proposal-header">
        <Link href="/" className="proposal-back">← <span>Experience Hub</span></Link>
        <div className="proposal-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/harris-frank-logo.png" alt="Harris & Frank" />
          <span>Propuesta ejecutiva</span>
        </div>
        <nav aria-label="Navegación de la propuesta">
          <button
            type="button"
            className={activeTrack === "blueprint" ? "is-active" : ""}
            onClick={() => chooseTrack("blueprint")}
          >
            Blueprint consultivo
          </button>
          <button
            type="button"
            className={activeTrack === "project" ? "is-active" : ""}
            onClick={() => chooseTrack("project")}
          >
            Propuesta de proyecto
          </button>
        </nav>
      </header>

      <section className={`proposal-hero track-${activeTrack}`} id="proposal-top">
        <div className="blueprint-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="proposal-hero-copy">
          <div className="proposal-track-selector" aria-label="Seleccionar documento">
            <button
              type="button"
              className={activeTrack === "blueprint" ? "is-active" : ""}
              onClick={() => chooseTrack("blueprint")}
            >
              <i>01</i>
              <span>Blueprint consultivo<small>Lo ya entendido y definido</small></span>
            </button>
            <button
              type="button"
              className={activeTrack === "project" ? "is-active" : ""}
              onClick={() => chooseTrack("project")}
            >
              <i>02</i>
              <span>Propuesta de proyecto<small>Lo que se propone ejecutar</small></span>
            </button>
          </div>
          <div className="draft-label"><i /> {track.eyebrow}</div>
          <p className="proposal-eyebrow">Harris &amp; Frank · Business OS</p>
          <h1>{track.title}</h1>
          <p className="proposal-lead">{track.lead}</p>
          <div className="track-definition">
            <strong>Frontera del documento</strong>
            <span>{track.definition}</span>
          </div>
          <button
            className="explore-link"
            type="button"
            onClick={() => goToChapter(chapters[1][0])}
          >
            {activeTrack === "blueprint" ? "Explorar el resultado consultivo" : "Explorar la propuesta de ejecución"}
            <span>↓</span>
          </button>
        </div>

        <div className="proposal-metrics" aria-label="Estructura del programa">
          {activeTrack === "project" ? (
            <>
              <div><strong>12</strong><span>meses de compromiso inicial</span></div>
              <div><strong>8</strong><span>semanas de Foundation Release</span></div>
              <div><strong>20</strong><span>sprints de evolución estimados</span></div>
              <div><strong>1</strong><span>sucursal piloto por definir</span></div>
            </>
          ) : (
            <>
              <div><strong>6</strong><span>principios de diseño operativo</span></div>
              <div><strong>4</strong><span>hallazgos convertidos en decisiones</span></div>
              <div><strong>12</strong><span>capacidades estratégicas conectadas</span></div>
              <div><strong>6</strong><span>artefactos de evidencia y soporte</span></div>
            </>
          )}
        </div>
      </section>

      {activeTrack === "project" && (
        <div className="proposal-track-content track-content-project">

      <section className="commercial-section" id="programa">
        <div className="section-intro is-light commercial-heading">
          <p>La decisión comercial</p>
          <h2>Una capacidad continua de evolución con alcance gobernado.</h2>
          <span>
            La visión anual orienta el programa. Cada alcance concreto se decide
            dentro de la capacidad contratada, con criterios y evidencia.
          </span>
        </div>

        <div className="program-architecture">
          <article className="program-card is-foundation">
            <header><span>Meses 01–02</span><i>8 semanas</i></header>
            <small>Foundation Release</small>
            <h3>Un núcleo operativo completo llevado a piloto.</h3>
            <p>Primera implementación controlada, utilizable y verificable.</p>
            <footer>Una sucursal · alcance definido · aceptación con evidencia</footer>
          </article>
          <div className="program-bridge" aria-hidden="true"><i /><span>aceptación</span><i /></div>
          <article className="program-card is-evolution">
            <header><span>Meses 03–12</span><i>10 ciclos</i></header>
            <small>Managed Innovation Capacity</small>
            <h3>Prioridades convertidas en incrementos cada quince días.</h3>
            <p>Un frente principal de evolución, gobernado trimestralmente.</p>
            <footer>2 sprints/mes · reporte mensual · QBR trimestral</footer>
          </article>
        </div>

        <div className="commercial-grid">
          <article className="investment-summary">
            <header><span>Inversión del primer año</span><small>MXN + IVA</small></header>
            <div className="investment-foundation">
              <span>Foundation Release</span><strong>$299,000</strong>
              <small>Reconocimiento del Blueprint</small><em>−$55,900</em>
              <span>Saldo Foundation</span><strong>$243,100</strong>
            </div>
            <div className="investment-evolution">
              <span>Programa de evolución</span>
              <strong>10 × $65,000</strong>
            </div>
            <div className="investment-grand-total">
              <span>Valor total del primer año</span><strong>$949,000</strong>
              <small>Nueva inversión pendiente</small><em>$893,100</em>
            </div>
          </article>

          <article className="payment-summary">
            <header><span>Forma de pago</span><small>Secuencia de activación</small></header>
            <ol>
              <li><span>01</span><div><strong>$150,000 + IVA</strong><small>A la firma y activación</small></div></li>
              <li><span>02</span><div><strong>$93,100 + IVA</strong><small>Contra aceptación del Foundation Release</small></div></li>
              <li><span>03</span><div><strong>10 × $65,000 + IVA</strong><small>Mensualidades anticipadas posteriores a la aceptación</small></div></li>
            </ol>
            <footer>Todos los importes se expresan en pesos mexicanos.</footer>
          </article>
        </div>
      </section>

      <section className="foundation-section" id="foundation">
        <div className="section-intro">
          <p>Foundation Release</p>
          <h2>Una trayectoria operativa completa que llega a piloto.</h2>
          <span>
            El arranque protege una promesa de principio a fin y deja la base
            para evolucionar con menor riesgo.
          </span>
        </div>

        <div className="foundation-path" aria-label="Trayectoria operativa inicial">
          {["Cliente y cuenta", "Operación comercial", "Pago y saldo", "Cumplimiento", "Entrega y cierre"].map((step, index) => (
            <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>{index < 4 && <i>→</i>}</div>
          ))}
        </div>

        <div className="foundation-scope-grid">
          <article>
            <header><span>Incluye de manera acotada</span><i>01</i></header>
            <ul>{foundationIncludes.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="is-excluded">
            <header><span>Permanece en roadmap</span><i>02</i></header>
            <ul>{foundationExcludes.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>

        <div className="milestone-track">
          {foundationMilestones.map(([period, title, evidenceItem], index) => (
            <article key={title}>
              <span>{period}</span><i>{String(index + 1).padStart(2, "0")}</i>
              <h3>{title}</h3><p>{evidenceItem}</p>
            </article>
          ))}
        </div>
        <p className="foundation-dependency">
          La duración estimada de ocho semanas depende de la entrega oportuna de
          información, accesos, decisiones y usuarios por Harris &amp; Frank.
        </p>
      </section>

      <section className="governance-section" id="gobierno">
        <div className="section-intro is-light">
          <p>Capacidad gobernada</p>
          <h2>Flexibilidad en prioridades.<br />Certeza en capacidad y decisiones.</h2>
          <span>
            Un frente principal de evolución, dos Sprint Commitments por mes y
            un checkpoint ejecutivo trimestral para sostener el valor.
          </span>
        </div>

        <div className="capacity-layout">
          <article className="capacity-allocation">
            <div className="allocation-ring" aria-label="Distribución recomendada de capacidad">
              <div><strong>70</strong><span>%</span><small>resultados prioritarios</small></div>
            </div>
            <div className="allocation-legend">
              <span><i className="priority" /><strong>70%</strong> Resultados acordados</span>
              <span><i className="adoption" /><strong>20%</strong> Validación y adopción</span>
              <span><i className="stability" /><strong>10%</strong> Estabilización y contingencias</span>
            </div>
            <footer>La reserva no utilizada puede reasignarse dentro del periodo; no se acumula.</footer>
          </article>

          <article className="monthly-cadence">
            <header><span>Cada ciclo mensual</span><i>1 frente principal</i></header>
            <div className="sprint-row">
              <div><span>Semana 01–02</span><strong>Sprint Commitment 01</strong><small>Diseñar · construir · demostrar</small></div>
              <i>→</i>
              <div><span>Semana 03–04</span><strong>Sprint Commitment 02</strong><small>Validar · liberar · evidenciar</small></div>
            </div>
            <ul>
              <li>Demo y Evidence Log por sprint</li>
              <li>Actualización de riesgos, decisiones y dependencias</li>
              <li>Reporte mensual de transformación</li>
              <li>Una prioridad nueva sustituye; no amplía silenciosamente</li>
            </ul>
          </article>
        </div>

        <div className="maturity-grid">
          {maturityStates.map(([number, title, detail]) => (
            <article key={title}><span>{number}</span><i /><strong>{title}</strong><p>{detail}</p></article>
          ))}
        </div>

        <article className="qbr-card">
          <div>
            <span>Quarterly Business Review</span>
            <h3>El QBR verifica evidencia y habilita la siguiente decisión.</h3>
            <p>
              Evalúa cumplimiento, adopción y valor; reprioriza el backlog y
              congela el siguiente Plan Trimestral de Resultados.
            </p>
          </div>
          <div className="qbr-scorecard">
            {qbrDimensions.map((dimension, index) => <span key={dimension}><i>{String(index + 1).padStart(2, "0")}</i>{dimension}</span>)}
          </div>
          <footer>
            No se prometen mejoras porcentuales sin línea base ni resultados de
            negocio dependientes de adopción, datos o decisiones del cliente.
          </footer>
        </article>

        <div className="acceptance-strip">
          <div><span>Validación</span><strong>5 días hábiles</strong><small>Aceptar, rechazar contra criterio o solicitar aclaración.</small></div>
          <div><span>Defecto</span><strong>No consume capacidad adicional</strong><small>Cuando incumple un criterio previamente aprobado.</small></div>
          <div><span>Cambio</span><strong>Regresa al backlog</strong><small>Cuando modifica reglas, alcance, datos o expectativas.</small></div>
        </div>
      </section>

      <section className="terms-section" id="terminos">
        <div className="section-intro">
          <p>Vigencia y continuidad</p>
          <h2>Un compromiso anual con una salida clara.</h2>
          <span>
            El contrato protege la capacidad reservada, los activos pagados y la
            continuidad ordenada de Harris &amp; Frank.
          </span>
        </div>

        <div className="term-banner">
          <div><span>Vigencia inicial</span><strong>12 meses</strong><small>2 meses de Foundation + 10 ciclos mensuales</small></div>
          <i aria-hidden="true">→</i>
          <div><span>Renovación</span><strong>Anual</strong><small>Referencia año 2: $65,000 mensuales, sujeta a ajuste</small></div>
        </div>

        <article className="cancellation-card">
          <header>
            <div><span>Cláusula comercial propuesta</span><h3>Terminación anticipada por conveniencia</h3></div>
            <i>Sujeta a revisión contractual</i>
          </header>
          <div className="cancellation-grid">
            <section>
              <span>Durante el Foundation Release</span>
              <strong>La activación reserva capacidad y no es reembolsable.</strong>
              <p>
                Si Harris &amp; Frank termina por conveniencia, cubre además el
                trabajo ejecutado, entregado o comprometido, hasta el saldo
                pendiente del Foundation Release.
              </p>
            </section>
            <section>
              <span>Después de su aceptación</span>
              <strong>30 días naturales de aviso por escrito.</strong>
              <p>
                La compensación por capacidad reservada será el menor entre tres
                mensualidades —$195,000 + IVA— o las mensualidades pendientes para
                completar los doce meses. Sustituye las mensualidades futuras no
                devengadas; no se cobra además de ellas.
              </p>
            </section>
            <section>
              <span>Incumplimiento material</span>
              <strong>15 días hábiles para subsanar.</strong>
              <p>
                La compensación anticipada no aplica cuando la terminación deriva
                de un incumplimiento material de la otra parte que permanezca sin
                corregir después de la notificación y el periodo de cura.
              </p>
            </section>
          </div>
          <footer>
            Al terminar se pagan importes devengados, aceptados y compromisos no
            cancelables; cesan soporte, evolución y nuevas liberaciones. Harris
            &amp; Frank conserva el uso perpetuo de versiones pagadas y aceptadas,
            junto con una entrega ordenada de sus datos, documentación y accesos.
          </footer>
        </article>

        <div className="continuity-grid">
          <article><span>Harris &amp; Frank controla</span><p>Datos, infraestructura a su nombre, credenciales, respaldos, documentación, configuraciones y activos operativos entregados.</p></article>
          <article><span>Uso perpetuo</span><p>Las versiones pagadas y aceptadas pueden seguir utilizándose aunque el programa no se renueve.</p></article>
          <article><span>Zellship conserva</span><p>El núcleo, componentes reutilizables, frameworks, engines, herramientas preexistentes y know-how general.</p></article>
        </div>
        <div className="term-details-grid">
          <details>
            <summary><span>Responsabilidades de Harris &amp; Frank</span><i>+</i></summary>
            <ul>
              <li>Designar sponsor, responsable operativo y usuarios clave.</li>
              <li>Facilitar datos, catálogos, procesos, accesos e infraestructura requerida.</li>
              <li>Validar criterios y demos, participar en pruebas, capacitación y adopción.</li>
              <li>Comunicar prioridades y resolver dependencias dentro de los tiempos acordados.</li>
            </ul>
            <p>Los retrasos por información, accesos, usuarios o decisiones pueden modificar calendario y secuencia; no generan capacidad acumulada.</p>
          </details>
          <details>
            <summary><span>Exclusiones generales</span><i>+</i></summary>
            <ul>
              <li>Desarrollo ilimitado, equipo dedicado de tiempo completo o módulos garantizados.</li>
              <li>Integraciones y migraciones mayores no evaluadas, nube, licencias y terceros.</li>
              <li>Hardware, viáticos adicionales, soporte 24/7 o SLAs críticos no contratados.</li>
              <li>Cumplimiento fiscal, legal o regulatorio no especificado y código fuente del núcleo.</li>
            </ul>
            <p>El programa considera hasta ocho sucursales de la misma unidad de negocio; no implica implementarlas todas dentro del Foundation Release.</p>
          </details>
          <details>
            <summary><span>Renovación y continuidad del año 2</span><i>+</i></summary>
            <ul>
              <li>Referencia: doce mensualidades de $65,000 + IVA.</li>
              <li>Ajuste de banda según volumen, complejidad y capacidad requerida.</li>
              <li>Actualización por inflación, costos o cambio material de capacidad.</li>
              <li>Los derechos adicionales de continuidad técnica o escrow requieren acuerdo separado.</li>
            </ul>
          </details>
        </div>
        <p className="legal-note">
          Este apartado expresa el acuerdo comercial propuesto y debe trasladarse
          al contrato definitivo con revisión legal. No sustituye el clausulado contractual.
        </p>
      </section>

      <section className="proposal-close" id="decision">
        <p>Decisión solicitada</p>
        <h2>Activar el Foundation Release y gobernar la evolución durante doce meses.</h2>
        <div>
          <Link href="/demo">Ver el sistema en acción <span>→</span></Link>
          <button type="button" className="secondary" onClick={() => chooseTrack("blueprint")}>Revisar Blueprint consultivo</button>
          <Link href="/presentacion/scrollytelling" className="secondary">Ver presentación</Link>
        </div>
        <small>Propuesta comercial vigente sujeta al contrato definitivo.</small>
      </section>
        </div>
      )}

      {activeTrack === "blueprint" && (
        <div className="proposal-track-content track-content-blueprint">

      <section className="principles-section" id="principles">
        <div className="section-intro">
          <p>Por qué podemos hacerlo</p>
          <h2>Seis decisiones que orientan el diseño del sistema</h2>
          <span>
            Principios derivados del entendimiento operativo; no una lista de
            funciones de software.
          </span>
        </div>
        <div className="principles-grid">
          {principles.map((principle) => (
            <article className={`principle-card accent-${principle.accent}`} key={principle.id}>
              <span className="principle-number">{principle.number}</span>
              <div className="principle-icon" aria-hidden="true"><i /></div>
              <h3>{principle.title}</h3>
              <p>{principle.statement}</p>
              <footer><span>{principle.implication}</span><i>↗</i></footer>
            </article>
          ))}
        </div>
      </section>

      <section className="discoveries-section" id="discoveries">
        <div className="section-intro is-light">
          <p>Hallazgos convertidos en diseño</p>
          <h2>Definiciones operativas que orientan decisiones de diseño</h2>
        </div>
        <div className="discoveries-list">
          {discoveries.map((discovery, index) => (
            <article key={discovery.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><small>{discovery.signal}</small><h3>{discovery.title}</h3></div>
              <p>{discovery.description}</p>
              <i aria-hidden="true">→</i>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-section" id="architecture">
        <div className="architecture-heading">
          <div className="section-intro">
            <p>Una estrategia conectada</p>
            <h2>Una arquitectura de capacidades conectadas.</h2>
            <span>
              Doce decisiones estratégicas organizadas alrededor de cuatro
              familias. Selecciona una capacidad para explorar su fundamento.
            </span>
          </div>
          <div className="architecture-key">
            <i />
            <span>Blueprint estratégico derivado del entendimiento operativo</span>
          </div>
        </div>

        <div className="capability-architecture">
          {capabilityFamilies.map((family) => (
            <div className={`capability-family family-${family.tone}`} key={family.id}>
              <header>
                <span>{family.number}</span>
                <div><strong>{family.title}</strong><small>{family.description}</small></div>
              </header>
              <div className="capability-stack">
                {family.capabilities.map((capability) => (
                  <button
                    type="button"
                    key={capability.id}
                    className={activeCapabilityId === capability.id ? "is-active" : ""}
                    onClick={() => setActiveCapabilityId(capability.id)}
                    aria-pressed={activeCapabilityId === capability.id}
                  >
                    <i aria-hidden="true" />
                    <span><strong>{capability.title}</strong><small>{capability.short}</small></span>
                    <em>↗</em>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <article className={`capability-detail detail-${activeCapability.tone}`} aria-live="polite">
          <div className="capability-detail-title">
            <span>{activeCapability.family}</span>
            <h3>{activeCapability.title}</h3>
            <p>{activeCapability.short}</p>
            <div className="capability-tags">
              {activeCapability.tags.map((tag) => <small key={tag}>{tag}</small>)}
            </div>
          </div>
          <div className="capability-detail-grid">
            <div><span>Lo que entendimos</span><p>{activeCapability.insight}</p></div>
            <div><span>Cómo se manifiesta</span><p>{activeCapability.manifestation}</p></div>
            <div><span>Valor operativo</span><p>{activeCapability.value}</p></div>
          </div>
          <footer>
            <span>La demo materializa una parte de esta arquitectura; la visión completa no equivale a alcance automático.</span>
            <i>Blueprint operativo</i>
          </footer>
        </article>

        <article className="semantic-foundation">
          <div className="semantic-foundation-copy">
            <span>Activo arquitectónico transversal</span>
            <h3>Taxonomía, ontología y semántica compartida</h3>
            <p>
              Definir con precisión conceptos, entidades, relaciones, estados y
              eventos reduce ambigüedad entre personas, procesos, datos e
              integraciones.
            </p>
          </div>
          <div className="semantic-foundation-grid">
            <div>
              <i>01</i>
              <strong>Taxonomía</strong>
              <p>Ordena el vocabulario y las clasificaciones del negocio.</p>
            </div>
            <div>
              <i>02</i>
              <strong>Ontología</strong>
              <p>Define qué existe y cómo se relaciona dentro de la operación.</p>
            </div>
            <div>
              <i>03</i>
              <strong>Semántica</strong>
              <p>Conserva significados comunes en reglas, datos y eventos.</p>
            </div>
          </div>
          <footer>
            Esta base facilita incorporar IA con menor dependencia de un proveedor
            o modelo específico; no implica una capacidad de IA incluida
            automáticamente en Foundation.
          </footer>
        </article>
      </section>

      <section className="model-section" id="model">
        <div className="model-heading">
          <div className="section-intro is-light">
            <p>Modelo operativo ejecutable</p>
            <h2>De la definición a la decisión</h2>
            <span>
              Tres vistas para entender cómo el modelo conecta contexto,
              prioridades y promesas.
            </span>
          </div>
          <div className="model-tabs" role="tablist" aria-label="Vistas del modelo">
            <button className={activeModel === "account" ? "is-active" : ""} onClick={() => setActiveModel("account")} role="tab" aria-selected={activeModel === "account"}>Cuenta y partidas</button>
            <button className={activeModel === "triage" ? "is-active" : ""} onClick={() => setActiveModel("triage")} role="tab" aria-selected={activeModel === "triage"}>Triage operativo</button>
            <button className={activeModel === "promise" ? "is-active" : ""} onClick={() => setActiveModel("promise")} role="tab" aria-selected={activeModel === "promise"}>Cadena de promesa</button>
          </div>
        </div>
        <div className="model-stage" role="tabpanel">
          {activeModel === "account" && <AccountModel />}
          {activeModel === "triage" && <TriageModel />}
          {activeModel === "promise" && <PromiseModel />}
        </div>
        <div className="model-caption">
          <span>Lectura ejecutiva</span>
          <p>
            El software es la manifestación visible. El activo es el modelo que
            organiza entidades, compromisos, reglas y decisiones.
          </p>
        </div>
      </section>

      <section className="evidence-section" id="evidence">
        <div className="section-intro">
          <p>La profundidad detrás de la propuesta</p>
          <h2>Evidencia que permite verificar el trabajo</h2>
          <span>
            Una biblioteca curada para profundizar sin convertir la experiencia
            ejecutiva en un repositorio documental.
          </span>
        </div>
        <div className="evidence-grid">
          {evidence.map(([title, detail], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{title}</h3><p>{detail}</p></div>
              <i>↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="proposal-close blueprint-close">
        <p>Siguiente lectura</p>
        <h2>Del activo consultivo a una trayectoria de ejecución delimitada.</h2>
        <div>
          <button type="button" onClick={() => chooseTrack("project")}>Revisar propuesta de proyecto <span>→</span></button>
          <Link href="/" className="secondary">Volver al Hub</Link>
        </div>
        <small>El Blueprint orienta la propuesta; no amplía automáticamente el alcance de ejecución.</small>
      </section>
        </div>
      )}

      <aside
        className={`proposal-rail ${controlsVisible ? "is-visible" : "is-hidden"}`}
        aria-label={`Capítulos de ${track.shortLabel}`}
        aria-hidden={!controlsVisible}
      >
        {chapters.map(([id, label], index) => (
          <button
            key={id}
            type="button"
            className={activeChapter === id ? "is-active" : ""}
            onClick={() => goToChapter(id)}
            tabIndex={controlsVisible ? 0 : -1}
            aria-label={`Ir a ${label}`}
          >
            <i>{String(index + 1).padStart(2, "0")}</i>
            <span>{label}</span>
          </button>
        ))}
      </aside>

      <div
        className={`proposal-controller ${controlsVisible ? "is-visible" : "is-hidden"}`}
        aria-hidden={!controlsVisible}
      >
        <button
          type="button"
          onClick={() => goToChapter(chapters[Math.max(activeChapterIndex - 1, 0)][0])}
          disabled={activeChapterIndex === 0}
          tabIndex={controlsVisible ? 0 : -1}
          aria-label="Capítulo anterior"
        >
          ←
        </button>
        <button
          type="button"
          className="proposal-controller-index"
          onClick={() => setIndexOpen((current) => !current)}
          tabIndex={controlsVisible ? 0 : -1}
          aria-expanded={indexOpen}
        >
          <span>{track.shortLabel}</span>
          <strong>{chapters[activeChapterIndex][1]}</strong>
          <i>{activeChapterIndex + 1} / {chapters.length}</i>
        </button>
        <button
          type="button"
          onClick={() => goToChapter(chapters[Math.min(activeChapterIndex + 1, chapters.length - 1)][0])}
          disabled={activeChapterIndex === chapters.length - 1}
          tabIndex={controlsVisible ? 0 : -1}
          aria-label="Capítulo siguiente"
        >
          →
        </button>
      </div>

      {indexOpen && controlsVisible && (
        <div className="proposal-index" role="dialog" aria-label="Índice de la propuesta">
          <header>
            <span>{track.shortLabel}</span>
            <button type="button" onClick={() => setIndexOpen(false)} aria-label="Cerrar índice">×</button>
          </header>
          <div>
            {chapters.map(([id, label], index) => (
              <button
                type="button"
                key={id}
                className={activeChapter === id ? "is-active" : ""}
                onClick={() => goToChapter(id)}
              >
                <i>{String(index + 1).padStart(2, "0")}</i>
                <span>{label}</span>
                <em>→</em>
              </button>
            ))}
          </div>
          <footer>← → · avanzar &nbsp; I · índice &nbsp; Home / End · inicio / cierre</footer>
        </div>
      )}
    </main>
  );
}
