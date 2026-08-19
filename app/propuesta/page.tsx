"use client";

import { useState } from "react";
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

const evidence = [
  ["Matriz de capacidades", "Necesidades → capacidades → experiencias"],
  ["Mapa operativo RFID", "Identidad, movimientos y trazabilidad"],
  ["Glosario autoritativo", "ATP, ETA, cuenta, partida y compromiso"],
  ["Mapa de cobertura", "Fase 1, roadmap y visión"],
  ["Blueprint de engines", "Lógica transversal y reutilización"],
  ["Registro de fuentes", "Sesiones, políticas y archivos revisados"],
];

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

  return (
    <main className="proposal-shell">
      <header className="proposal-header">
        <Link href="/" className="proposal-back">← <span>Experience Hub</span></Link>
        <div className="proposal-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/harris-frank-logo.png" alt="Harris & Frank" />
          <span>Blueprint operativo</span>
        </div>
        <nav aria-label="Navegación de la propuesta">
          <a href="#principles">Principios</a>
          <a href="#model">Modelo</a>
          <a href="#evidence">Evidencia</a>
        </nav>
      </header>

      <section className="proposal-hero">
        <div className="blueprint-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="proposal-hero-copy">
          <div className="draft-label"><i /> Exploración visual · contenido sujeto a auditoría</div>
          <p className="proposal-eyebrow">Operational Intelligence Blueprint</p>
          <h1>
            La ventaja no está en digitalizar la operación.
            <span>Está en hacerla ejecutable.</span>
          </h1>
          <p className="proposal-lead">
            Convertimos el entendimiento específico de Harris &amp; Frank en un
            modelo conectado de capacidades, decisiones y evidencia.
          </p>
          <a className="explore-link" href="#principles">Explorar el modelo <span>↓</span></a>
        </div>

        <div className="proposal-metrics" aria-label="Evidencia del proceso">
          <div><strong>9</strong><span>sesiones de entendimiento</span></div>
          <div><strong>107</strong><span>requerimientos identificados</span></div>
          <div><strong>4</strong><span>familias ejecutivas</span></div>
          <div><strong>1</strong><span>modelo operativo conectado</span></div>
        </div>
      </section>

      <section className="principles-section" id="principles">
        <div className="section-intro">
          <p>El fundamento</p>
          <h2>Seis decisiones que cambian cómo se diseña el sistema</h2>
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

      <section className="discoveries-section">
        <div className="section-intro is-light">
          <p>Hallazgos convertidos en diseño</p>
          <h2>La operación extraordinaria exige definiciones extraordinariamente claras</h2>
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

      <section className="proposal-close">
        <p>De hallazgos aislados a una capacidad institucional</p>
        <h2>La Fase 1 no comienza desde cero.<br />Comienza desde un entendimiento estructurado.</h2>
        <div>
          <Link href="/demo">Ver el sistema en acción <span>→</span></Link>
          <Link href="/" className="secondary">Volver al Hub</Link>
        </div>
      </section>
    </main>
  );
}
