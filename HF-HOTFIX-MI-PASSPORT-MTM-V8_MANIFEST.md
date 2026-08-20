# HOTFIX — Mi Passport × MTM Guided Configuration

## Autoridad recuperada

- Proyecto Sites: `Zellship · Harris & Frank Operations OS`
- Sites project_id: `appgprj_6a653893a8f48191bf827acfc1d66b11`
- Versión: `v8`
- Commit fuente: `20f66ba5b556a0176374255d430c98c8693d8b9d`
- Archive content hash: `sha256:305cf4db609c646e1cf24896bcc4d354b8a232902d5b0bfd1e3f9b01f511c6fe`
- Base del Hub: `f57454928e6c3410949ff60dea5e7c2fe5f05e53`

La recuperación conserva literalmente los tres commits del flujo publicado en Sites v8:

1. `9f023a3` — reutilización del configurador MTM para borradores del cliente.
2. `cb6e08e` — navegación explícita del configurador.
3. `20f66ba` — acciones MTM y ficha compartible simulada.

En el checkout aislado de fuente se aplicaron como `ab9f214`, `1b59d19` y `8f925c8`; los dos últimos conservan patch-id exacto y el primero sólo se reconcilió con el contexto posterior de sesión controlada, sin reinterpretar el flujo.

## Alcance integrado

La sustitución afecta únicamente el build estático de la demo embebida en el Hub. Restaura en Mi Passport externo:

- `Mi estilo` → `Diseñar nueva prenda`.
- selección de prenda, tela, forro, botones, fit y acabados;
- referencia por perfil verificado, medidas conocidas o estimación desde tallas estándar;
- guardado como solicitud `BORRADOR`;
- programación simulada de revisión en boutique;
- ficha demostrativa con compartir simulado por correo y WhatsApp.

No sustituye MTM Studio interno, no modifica el Hub, Presentación, Propuesta, Showcase ni otras rutas publicadas.

## Archivos fuente de Sites v8 recuperados

- `scripts/verify-r2b1-uar-fix.mjs`
- `scripts/verify-r2b1.mjs`
- `src/hf/CustomerPassportR2B.tsx`
- `src/hf/MTMStudio.tsx`
- `src/hf/customer-passport-r2b-model.ts`
- `src/hf/customer-passport-r2b.css`
- `src/hf/mtm-model.ts`
- `src/hf/operations-v2.css`

El Hub incorpora exclusivamente el resultado compilado de esos cambios bajo `public/zellship-harris-frank-operations-demo/`.

## Hashes del build integrado

- JavaScript: `947863193a842c242d91d1473df3474ccb6d39133b04500a1013e3f84e37e26f`
- CSS: `1fcf22909728ac11a136641af01a450cd6086b3fbd7bc2fcc2411652462bf02c`
- Entrada HTML: `1a007cd06a2210f04821e78239fb6c0f93701851d05498df1816eeef60daee1d`

## Validación

- `test:r2b1`: PASS.
- `test:r2b1-uar-fix`: PASS.
- `test:mtm-redesign`: PASS.
- `lint:v2`: PASS.
- `build:pages`: PASS.
- `build:pages:hub-package`: PASS.
- QA browser: flujo completo desde `Mi estilo` hasta `Guardar solicitud borrador`, programación de revisión y ficha compartible simulada: PASS.
- Acceso directo de Mi Passport: PASS.
- MTM Studio interno: contrato estático preservado.
- Solicitudes externas: ninguna.

El smoke histórico `smoke:r2b1` conserva una expectativa anterior para el CTA interno `Abrir Mi Passport`; en la taxonomía posterior esa entrada cambió. No se debilitó ese smoke. La aceptación de este hotfix se cubre mediante acceso directo a la experiencia externa y QA completo del configurador restaurado.

## Ruta pública objetivo

`/harris-frank-experience-hub/zellship-harris-frank-operations-demo/customer-passport/ORD-2026-00418/?token=demo-carlos-00418`
