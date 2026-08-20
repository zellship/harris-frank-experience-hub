import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceRoot = path.resolve(
  process.env.HF_DEMO_SOURCE_ROOT ?? "/private/tmp/hf-hub-final-demo-source-001",
);

const showcaseSource = path.join(sourceRoot, "dist-showcase-client");
const demoSource = path.join(sourceRoot, "dist-pages-client");
const showcaseTarget = path.join(root, "public/harris-frank-capability-showcase");
const demoTarget = path.join(root, "public/zellship-harris-frank-operations-demo");

for (const required of [showcaseSource, demoSource]) {
  await access(required);
}

await Promise.all([
  rm(showcaseTarget, { recursive: true, force: true }),
  rm(demoTarget, { recursive: true, force: true }),
]);
await Promise.all([
  cp(showcaseSource, showcaseTarget, { recursive: true }),
  cp(demoSource, demoTarget, { recursive: true }),
]);

const demoIndexPath = path.join(demoTarget, "index.html");
const demoIndex = await readFile(demoIndexPath, "utf8");
const relativeDemoIndex = demoIndex.replaceAll(
  "/zellship-harris-frank-operations-demo/",
  "./",
);
await writeFile(demoIndexPath, relativeDemoIndex);

const passportFallback = path.join(
  demoTarget,
  "customer-passport/ORD-2026-00418",
);
await mkdir(passportFallback, { recursive: true });
await writeFile(
  path.join(passportFallback, "index.html"),
  relativeDemoIndex.replace("<head>", '<head>\n    <base href="../../" />'),
);

console.log(
  `Integrated source builds from ${sourceRoot}; Mi Passport deep-link fallback generated.`,
);
