# HF-HUB-FINAL-BATCH-001 · P0 Release Manifest v1.0

Fecha de corte: 20 de agosto de 2026

Repositorio: `zellship/harris-frank-experience-hub`

Baseline reconciliado: `5c7852f8f5d0fc64dac5dfb05ebc7af62a4e1d13`

Publicación objetivo: GitHub Pages, subruta `/harris-frank-experience-hub/`

## Autoridad

- `HF-HUB-FINAL-ITERATION-001.md` — SHA-256 `b1573a62261ed2910b2d9b5ca15c2d29b578662d92a6034c06cca01222a76794`.
- `CODEX-START-HERE.md` — SHA-256 `13928167695b4e5c840104b1d4cf7f1664e86f00d34718f3cef9b4c271357b54`.
- Fuente del build integrado de Demo: commit local `cc9bcf2` (`feat(showcase): finalize executive demo journey`).

## Alcance P0 publicado

1. Presentación canónica en `/presentacion/`, con redirección estable al scrollytelling y el copy ejecutivo aprobado.
2. Propuesta con Foundation Release, waves gobernadas, célula multidisciplinaria, inversión de primer año y continuidad posterior.
3. Portada Demo oscura con identidad Harris & Frank × Zellship, tres acciones y declaración de datos simulados.
4. Recorrido ejecutivo de seis momentos y catálogo de 18 capacidades agrupadas por dominio.
5. Mi Passport con fallback de deep link y acceso tokenizado canónico, incluidas recarga directa y salida.
6. Navegación y assets preparados para el subpath de GitHub Pages, con `404.html` generado por el workflow.
7. Social preview, favicon, logos oficiales y build discreto preservados.

## Validaciones completadas

- Build estático de Demo cliente: PASS.
- Build GitHub Pages del Hub: PASS.
- ESLint Hub y Showcase: PASS.
- Contratos estructurales de estabilización y cierre: 8/8 PASS.
- Smoke Demo integrado: PASS en 1920×1080, 1366×768, 768×1024 y 390×844.
- QA del Hub: PASS en 1920×1080, 1366×768 y 390×844.
- Presentación: secuencia y ocho superficies críticas verificadas en 1920×1080.
- Propuesta: bloques críticos verificados en 1920×1080; guardas responsive en 1366×768 y 390×844.
- Mi Passport: acceso canónico tokenizado, recarga directa, cero overflow y cero solicitudes externas inesperadas.
- `git diff --check`: PASS.

Evidencia local de QA: `/tmp/HF-HUB-FINAL-BATCH-001-evidence/` y `/tmp/HF-HUB-FINAL-BATCH-001-demo-evidence/`.

## Reservas no bloqueantes para una iteración posterior

Por la ventana de publicación prioritaria, este checkpoint no declara completada la matriz exhaustiva de todas las historias operativas secundarias del contrato. Permanecen para una ronda separada:

- inspección visual exhaustiva de Cotización, ambos Kanbans y cada estado profundo no incluido en el recorrido ejecutivo;
- auditoría manual completa de shell inicial, señal semántica marcada y launcher en todos los estados limpios;
- activación individual de cada archivo de consulta listado en la matriz extensa.

Estas reservas no modifican fixtures, reglas, rutas ni superficies congeladas; el release P0 publica únicamente el bloque coherente ya construido y validado. No se realizó despliegue a ChatGPT Sites.
