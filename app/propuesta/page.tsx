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

const cellFunctions = [
  {
    title: "Program Lead / PM",
    items: ["Gobierno del programa", "Relación ejecutiva", "Riesgos y dependencias", "QBR y decisiones"],
  },
  {
    title: "Arquitectura de solución",
    items: ["Coherencia funcional y técnica", "Arquitectura del Business OS", "Datos e integraciones", "Continuidad entre capacidades"],
  },
  {
    title: "Lead de procesos y operaciones",
    items: ["Estandarización de procesos", "Definición de reglas de negocio", "Adopción operativa", "Medición de resultados"],
  },
  {
    title: "Coordinación de entrega",
    items: ["Backlog y sprints", "Dependencias", "Evidencias y validación", "Liberaciones"],
  },
];

const referenceStack = [
  ["Ejecución", "Google Cloud · Cloud Run para servicios contenerizados"],
  ["Datos y evidencia", "Cloud SQL for MySQL · Cloud Storage"],
  ["Control y observabilidad", "IAM · Secret Manager · HTTPS · balanceo · Cloud Armor · logging · monitoreo · alertamiento"],
];

const securityLayers = [
  ["01", "Control", "Cuenta cloud, facturación y administradores bajo control de Harris & Frank."],
  ["02", "Identidad", "Accesos por función, mínimo privilegio y revocación trazable."],
  ["03", "Perímetro", "HTTPS, políticas de tráfico y protección de aplicaciones."],
  ["04", "Aplicación y datos", "Ambientes separados, secretos protegidos y permisos por contexto."],
  ["05", "Continuidad", "Respaldos, monitoreo, recuperación y reversión controlada."],
];

const activationSteps = [
  "Confirmación comercial",
  "Firma y activación",
  "Designación de responsables",
  "Definición de la sucursal piloto",
  "Baseline de alcance y criterios",
  "Inicio del Foundation Release",
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
      "Foundation Release, gobierno, célula, arquitectura, continuidad e inversión para convertir prioridades acordadas en versiones utilizables del Business OS.",
    definition:
      "Describe lo que se propone contratar: alcance inicial, forma de trabajo, inversión, condiciones y responsabilidades.",
    chapters: [
      ["proposal-top", "Portada"],
      ["foundation", "Activación"],
      ["programa", "Evolución"],
      ["gobierno", "Gobierno"],
      ["celula", "Célula"],
      ["arquitectura-control", "Arquitectura"],
      ["continuidad", "Continuidad"],
      ["inversion", "Inversión"],
      ["decision", "Activación"],
      ["anexos", "Anexos"],
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

      <section className="foundation-section" id="foundation">
        <div className="section-intro">
          <p>Qué activamos primero</p>
          <h2>Un Foundation Release acotado que llega a piloto.</h2>
          <span>
            El inicio protege una trayectoria operativa de principio a fin, con
            alcance definido, piloto controlado y aceptación basada en evidencia.
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

      <section className="commercial-section" id="programa">
        <div className="section-intro is-light commercial-heading">
          <p>Cómo evoluciona durante el año</p>
          <h2>Primero una base aceptada; después, diez ciclos de evolución.</h2>
          <span>
            El programa considera doce meses: Foundation Release primero y una
            capacidad mensual posterior para convertir prioridades aprobadas en incrementos utilizables.
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
            <small>Programa de evolución</small>
            <h3>Prioridades convertidas en incrementos cada quince días.</h3>
            <p>Un frente principal de evolución con planeación trimestral de resultados.</p>
            <footer>2 sprints/mes · reporte mensual · QBR trimestral</footer>
          </article>
        </div>

        <div className="program-cadence" aria-label="Cadencia anual propuesta">
          <article><span>01</span><strong>Sprints quincenales</strong><p>Compromisos concretos para diseñar, construir, demostrar y validar.</p></article>
          <article><span>02</span><strong>Plan Trimestral de Resultados</strong><p>Prioridades, capacidad, dependencias y evidencia esperada se congelan por periodo.</p></article>
          <article><span>03</span><strong>QBR</strong><p>Resultados, adopción y riesgos informan la siguiente decisión ejecutiva.</p></article>
        </div>
      </section>

      <section className="governance-section" id="gobierno">
        <div className="section-intro is-light">
          <p>Cómo se gobiernan alcance y resultados</p>
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

      <section className="cell-section" id="celula">
        <div className="section-intro">
          <p>La célula que convierte prioridades en operación</p>
          <h2>Una célula multidisciplinaria que evoluciona con las prioridades.</h2>
          <span>
            Harris &amp; Frank contará con una célula extendida de innovación,
            tecnología y mejora continua. La participación de cada función se
            ajustará de acuerdo con el Plan Trimestral de Resultados, el backlog
            aprobado y la capacidad contratada.
          </span>
        </div>

        <div className="cell-layout">
          <div className="cell-functions">
            {cellFunctions.map((role, index) => (
              <details key={role.title}>
                <summary><i>{String(index + 1).padStart(2, "0")}</i><span>{role.title}</span><b>+</b></summary>
                <ul>{role.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </details>
            ))}
          </div>
          <aside className="cell-operating-note">
            <span>Participación adaptable</span>
            <strong>Funciones disponibles, no puestos dedicados.</strong>
            <p>Los roles representan funciones disponibles dentro de la célula. No implican personal exclusivo, dedicación de tiempo completo ni necesariamente una persona independiente por función.</p>
          </aside>
        </div>

        <div className="cross-functional-band">
          <span>UX/UI</span><span>Frontend</span><span>Backend</span><span>Datos</span>
          <span>Integraciones</span><span>QA</span><span>DevOps</span><span>Seguridad</span>
        </div>

        <div className="client-counterpart">
          <span>Contraparte requerida de Harris &amp; Frank</span>
          <strong>Sponsor ejecutivo · Responsable operativo · Líderes involucrados · Usuarios validadores</strong>
        </div>
      </section>

      <section className="control-architecture-section" id="arquitectura-control">
        <div className="section-intro is-light">
          <p>Arquitectura y seguridad</p>
          <h2>Arquitectura bajo control de Harris &amp; Frank.</h2>
          <span>La implementación se plantea sobre una cuenta cloud contratada y controlada por Harris &amp; Frank, manteniendo bajo su administración la infraestructura, facturación, credenciales principales y respaldos.</span>
        </div>

        <article className="reference-architecture">
          <header><span>Arquitectura de referencia</span><i>Sujeta a dimensionamiento antes de producción</i></header>
          <div>{referenceStack.map(([label, detail], index) => <span key={label}><i>{String(index + 1).padStart(2, "0")} · {label}</i>{detail}</span>)}</div>
        </article>

        <div className="security-layout">
          <div className="security-copy">
            <span>Seguridad por capas</span>
            <h3>Control, identidad, perímetro, datos y continuidad.</h3>
            <p>Los niveles se diseñan como controles complementarios; su configuración final depende del alcance productivo aprobado.</p>
          </div>
          <div className="security-layers">
            {securityLayers.map(([number, title, detail]) => (
              <details key={title}>
                <summary><i>{number}</i><span>{title}</span><b>+</b></summary>
                <p>{detail}</p>
              </details>
            ))}
          </div>
        </div>
        <p className="architecture-disclaimer">La arquitectura final, región, dimensionamiento, niveles de disponibilidad y objetivos de recuperación se congelarán antes de producción. Los consumos de nube y servicios de terceros no se consideran incluidos salvo indicación expresa.</p>
      </section>

      <section className="continuity-section" id="continuidad">
        <div className="section-intro">
          <p>Continuidad y protección de la inversión</p>
          <h2>La capacidad permanece; la tecnología puede evolucionar.</h2>
          <span>La plataforma es el instrumento; el modelo operativo es la partitura; los datos y la trazabilidad son la grabación. Si cambia el instrumento, la música, la partitura y las grabaciones permanecen, aunque su ejecución en una nueva plataforma pueda requerir adaptación.</span>
        </div>

        <div className="asset-continuity-grid">
          <article><span>Modelo operativo</span><strong>La partitura</strong><ul><li>Arquitectura y definiciones de negocio entregadas</li><li>Capacidades, procesos, reglas, contratos y eventos documentados</li><li>Ontología, taxonomía y semántica</li></ul></article>
          <article><span>Datos y evidencia</span><strong>La grabación</strong><ul><li>Datos, historial, evidencia y trazabilidad</li><li>Estructuras y configuraciones entregadas</li><li>Documentación disponible para consulta</li></ul></article>
          <article><span>Control y uso</span><strong>La libertad de ejecución</strong><ul><li>Infraestructura, credenciales y respaldos bajo control de H&amp;F</li><li>Uso perpetuo de las versiones pagadas y aceptadas</li></ul></article>
        </div>

        <div className="resilience-grid">
          <article><span>01 · Protección de datos</span><ul><li>Respaldos automatizados de base de datos</li><li>Recuperación a un punto en el tiempo cuando la configuración contratada lo permita</li><li>Exportaciones lógicas independientes y periódicas</li><li>Respaldo y retención de archivos y evidencias</li></ul></article>
          <article><span>02 · Recuperación verificable</span><ul><li>Pruebas periódicas de restauración</li><li>Separación de ambientes</li><li>Parámetros de frecuencia, retención y recuperación definidos antes de producción</li></ul></article>
          <article><span>03 · Liberación controlada</span><ul><li>Liberaciones versionadas y reversión ante incidencias</li><li>Coexistencia controlada durante el piloto</li><li>Sustituciones mayores sólo después de validar evidencia</li></ul></article>
        </div>

        <article className="decision-freedom">
          <span>Continuidad y libertad de decisión</span>
          <h3>Control visible antes, durante y después de cada liberación.</h3>
          <p>Harris &amp; Frank conserva visibilidad y control sobre sus datos, infraestructura, respaldos, credenciales y versiones pagadas. Si las prioridades cambian o el programa deja de ser conveniente, existe una ruta de transición ordenada, autorizada y trazable.</p>
        </article>

        <div className="continuity-details">
          <details>
            <summary><span>Alcances de continuidad y portabilidad</span><i>+</i></summary>
            <p>El código fuente del núcleo y los componentes reutilizables de Zellship no forman parte de la transferencia estándar. Frameworks, engines reutilizables, servicios futuros y componentes de terceros conservan sus condiciones propias. Operar sobre otra plataforma puede requerir adaptación.</p>
          </details>
          <details>
            <summary><span>¿Qué ocurre si el programa no continúa?</span><i>+</i></summary>
            <ul>
              <li>Exportación de datos en los formatos acordados.</li>
              <li>Entrega de documentación y accesos bajo control del cliente.</li>
              <li>Conservación del derecho de uso sobre versiones pagadas y aceptadas.</li>
              <li>Revocación ordenada de accesos de Zellship.</li>
              <li>Cese de nuevas liberaciones, soporte y evolución.</li>
              <li>Asistencia de transición conforme a las condiciones contratadas.</li>
            </ul>
          </details>
        </div>
        <p className="continuity-note">Los parámetros de respaldo, retención, restauración y recuperación, así como la protección de continuidad, se congelarán y formalizarán contractualmente antes de producción. No constituyen una garantía ilimitada.</p>
      </section>

      <section className="investment-section" id="inversion">
        <div className="section-intro is-light">
          <p>Inversión y forma de pago</p>
          <h2>Primero se activa la base; después comienza la evolución mensual.</h2>
          <span>El Blueprint ya pagado se reconoce dentro del Foundation Release. La primera mensualidad del programa comienza después de su aceptación.</span>
        </div>

        <div className="commercial-grid">
          <article className="investment-summary">
            <header><span>Inversión del primer año</span><small>MXN + IVA</small></header>
            <div className="investment-foundation">
              <span>Foundation Release</span><strong>$299,000</strong>
              <small>Reconocimiento del Blueprint pagado</small><em>−$55,900</em>
              <span>Saldo Foundation Release</span><strong>$243,100</strong>
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
              <li><span>03</span><div><strong>10 × $65,000 + IVA</strong><small>Mensualidades anticipadas; la primera inicia después de la aceptación</small></div></li>
            </ol>
            <footer>Todos los importes se expresan en pesos mexicanos.</footer>
          </article>
        </div>
      </section>

      <section className="proposal-close" id="decision">
        <p>Decisión solicitada</p>
        <h2>Activar el Foundation Release y el programa anual.</h2>
        <ol className="activation-steps">
          {activationSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}
        </ol>
        <small>La activación queda sujeta a confirmación comercial, contrato definitivo y baseline aprobado.</small>
      </section>

      <section className="proposal-annexes" id="anexos">
        <div className="section-intro is-light">
          <p>Evidencia y anexos</p>
          <h2>Material de soporte para consultar, no para interrumpir la decisión.</h2>
          <span>La narrativa principal termina en la activación. Aquí permanecen los artefactos consultivos, responsabilidades y precisiones que respaldan el acuerdo.</span>
        </div>

        <div className="annex-evidence-grid">
          {evidence.map(([title, detail], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{detail}</p></div></article>)}
        </div>

        <div className="annex-details">
          <details>
            <summary><span>Responsabilidades de Harris &amp; Frank</span><i>+</i></summary>
            <ul><li>Designar sponsor, responsable operativo y usuarios clave.</li><li>Facilitar datos, catálogos, procesos, accesos e infraestructura requerida.</li><li>Validar criterios y demos; participar en pruebas, capacitación y adopción.</li><li>Resolver prioridades y dependencias dentro de los tiempos acordados.</li></ul>
          </details>
          <details>
            <summary><span>Exclusiones generales</span><i>+</i></summary>
            <ul><li>Desarrollo ilimitado, equipo dedicado de tiempo completo o módulos garantizados.</li><li>Integraciones y migraciones mayores no evaluadas, nube, licencias y terceros.</li><li>Hardware, viáticos adicionales, soporte 24/7 o niveles de servicio no contratados.</li><li>Cumplimiento fiscal, legal o regulatorio no especificado.</li></ul>
          </details>
          <details>
            <summary><span>Definiciones que se formalizan antes de producción</span><i>+</i></summary>
            <ul><li>Región, dimensionamiento y niveles de disponibilidad.</li><li>Frecuencia y retención de respaldos; objetivos de recuperación.</li><li>Formatos de exportación y condiciones de asistencia de transición.</li><li>Condiciones finales de soporte, continuidad y responsabilidad.</li></ul>
          </details>
        </div>
        <p className="legal-note">La arquitectura, la continuidad y los términos descritos constituyen una propuesta de referencia. El contrato definitivo y sus anexos son la fuente de los compromisos exigibles.</p>
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
