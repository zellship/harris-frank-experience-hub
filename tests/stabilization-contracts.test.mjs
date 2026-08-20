import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("presentation alias resolves to the canonical scrollytelling entry", async () => {
  const source = await readFile("app/presentacion/page.tsx", "utf8");
  assert.match(source, /presentacion\/scrollytelling\//);
  assert.match(source, /window\.location\.replace/);
});

test("Mi Passport has a generated deep-link fallback", async () => {
  const fallback = await readFile(
    "public/zellship-harris-frank-operations-demo/customer-passport/ORD-2026-00418/index.html",
    "utf8",
  );
  assert.match(fallback, /<base href="\.\.\/\.\.\/"/);
  assert.match(fallback, /index-[A-Za-z0-9_-]+\.js/);
});

test("Pages workflow publishes a root fallback without adding another workflow", async () => {
  const workflow = await readFile(".github/workflows/deploy-pages.yml", "utf8");
  assert.match(workflow, /cp out\/index\.html out\/404\.html/);
});
