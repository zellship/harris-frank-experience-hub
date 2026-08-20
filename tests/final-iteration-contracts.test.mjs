import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => readFile(path.join(root, file), "utf8");

test("Presentation implements the authoritative executive sequence", async () => {
  const page = await read("app/presentacion/scrollytelling/page.tsx");
  for (const copy of [
    "Operación",
    "Modelo",
    "Capacidad",
    "La visión puede experimentarse",
    "no sólo explicarse.",
    "Cada wave convierte una hipótesis",
    "Consolidar una capacidad",
    "Cambiar de plataforma no debería significar",
    "La siguiente decisión debe apoyarse",
    "Veamos cómo se materializa.",
    "Ahora definamos cómo convertirlo en capacidad operativa.",
  ])
    assert(page.includes(copy), `Falta copy de Presentación: ${copy}`);
});

test("Demo exposes the exact cover and six-moment executive run", async () => {
  const assetDirectory = path.join(
    root,
    "public/harris-frank-capability-showcase/assets",
  );
  const assets = (await readdir(assetDirectory)).filter((file) =>
    file.endsWith(".js"),
  );
  const bundle = (
    await Promise.all(
      assets.map((file) => readFile(path.join(assetDirectory, file), "utf8")),
    )
  ).join("\n");
  for (const copy of [
    "La operación, en acción.",
    "Demostración interactiva · Datos simulados",
    "Iniciar recorrido ejecutivo",
    "Explorar la suite",
    "Volver al Experience Hub",
    "Catálogo y ventas",
    "Operaciones y recepción",
    "Colecciones y conciliación",
    "Centro de Control",
    "Pulso Ejecutivo",
  ])
    assert(bundle.includes(copy), `Falta copy de Demo: ${copy}`);
  for (const forbidden of ["B4F WIP", "B4G WIP", "B4J WIP"])
    assert(!bundle.includes(forbidden), `WIP publicado: ${forbidden}`);
});

test("Proposal preserves year one and governs waves and post-year continuity", async () => {
  const page = await read("app/propuesta/page.tsx");
  for (const copy of [
    "$949,000",
    "Un alcance inicial definido. Una evolución gobernada.",
    "Wave Definition &amp; Activation Plan",
    "Autorizar siguiente wave",
    "Program / Engagement Lead",
    "Engineering transversal",
    "Después del primer año",
    "$12,500",
    "Hasta 8 horas mensuales no acumulables",
    "El derecho de uso indefinido de las versiones pagadas y",
    "aceptadas no depende de la contratación o renovación",
  ])
    assert(page.includes(copy), `Falta término de Propuesta: ${copy}`);
});

test("Pages owns the canonical routes and deep-link fallbacks", async () => {
  const workflow = await read(".github/workflows/deploy-pages.yml");
  const alias = await read("app/presentacion/page.tsx");
  const packageJson = await read("package.json");
  assert(workflow.includes("cp out/index.html out/404.html"));
  assert(alias.includes("/presentacion/scrollytelling/"));
  assert(packageJson.includes('"sync:demos"'));
  await read(
    "public/zellship-harris-frank-operations-demo/customer-passport/ORD-2026-00418/index.html",
  );
});

test("Official sources contain no ChatGPT Sites links and keep canonical brand assets", async () => {
  const files = [
    "app/page.tsx",
    "app/demo/page.tsx",
    "app/presentacion/scrollytelling/page.tsx",
    "app/propuesta/page.tsx",
    "public/harris-frank-capability-showcase/index.html",
  ];
  const content = (await Promise.all(files.map(read))).join("\n");
  assert(!content.includes("chatgpt.site"));
  assert(content.includes("harris-frank-logo.png"));
  assert(content.includes("zellship-logo.png"));
});
