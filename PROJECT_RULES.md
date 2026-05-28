# PROJECT_RULES — lazo-web (v3-lab → P0)

> Contrato que toda sesión de IA (Claude Code / Cursor) lee **antes de tocar el repo**.
> Fuente de verdad de la fase de ejecución. Si algo aquí choca con un prompt suelto, prevalece este archivo.
> Base: `~/.claude/plans/lazo-web-fase3-ejecucion.md` (Fase 3 trocear).

---

## 1. Principio rector

**Reutilizar lo que ya existe, no reconstruir.** El 80% del andamiaje (Next 14, Tailwind, Lenis, GSAP, `HebrasField` congelado en `HeroCanvas/world`, `Reveal`, `SmoothScroll`, `/legal`, `robots/sitemap`, fonts) **ya está construido y pasa Lighthouse 88**. P0 trocea solo el delta.

Optimizar por **sofisticación invisible + ejecución world-class**, NO por complejidad.

---

## 2. Stack confirmado (no se reabre)

- **Framework:** Next 14 App Router + TypeScript estricto.
- **Estilos:** Tailwind 3 + tokens CSS vars. Cero CSS-in-JS runtime.
- **Motion:** Lenis (scroll) + GSAP (reveals). `prefers-reduced-motion` corta TODO.
- **3D:** R3F `HebrasField` (= `HeroCanvas` + `world/`) **congelado**. No tocar.
- **Hosting:** Vercel (SSG).
- **Fonts:** Fraunces + Inter vía `next/font`.
- **Analytics:** Vercel Web Analytics (sin cookies) + eventos manuales (`scroll_depth`, `cta_click`, `demo_play`).
- **Formularios:** ninguno en P0. CTA = Cal.com.
- **Audio:** P0 sin audio. P1: `.mp3` estático, on-tap, nunca autoplay.

### Lista negra explícita
CMS · GA4 con cookies · agente conversacional en vivo · backend/DB en v1 · libs de estado (Redux/Zustand) · libs de componentes pesadas (MUI/Chakra) · CSS-in-JS runtime · dependencias >~40 kb que sirvan a un solo acto · abstracciones "por si acaso".

---

## 3. Tokens (cerrados)

### Color
- `--crema #F4ECE0`
- `--crema-light #FAF6EE`
- `--sage #3F5648`
- `--terracota #C97B5A`
- `--carbon #1F1F1F`

### Tipografía
Escala fluida `clamp()`. Display = Fraunces. Texto = Inter.

### Motion
- `--ease-calm: cubic-bezier(.2, .8, .2, 1)`
- `--dur-fast: 220ms`
- `--dur-slow: 720ms`

### Espaciado
Escala modular 4/8. Ritmo generoso "una idea por pantalla".

**Regla:** ningún `#hex` ni `px` suelto en componentes. Tokens o nada.

---

## 4. Sistema de componentes (set cerrado)

| Categoría | Componente | Cliente? | Notas |
|-----------|-----------|----------|-------|
| Global | `Wordmark` | no | único, fijo arriba-izq |
| | `SkipLink` | no | ya existe |
| | `Footer` | no | legal + contacto + wordmark |
| Layout | `Acto` | no | TODO acto es un `Acto`. Sin excepciones. |
| | `Container` / `Stack` | no | espaciado por token |
| | `ProgressBar` | sí | 6 pasos; no clicable en P0 |
| UI | `Eyebrow` | no | numerado 01–06 |
| | `Titular` | no | una idea, Fraunces |
| Motion | `SmoothScroll` | sí | existe (Lenis) |
| | `Reveal` | sí | existe (GSAP) |
| | `HebrasField` | sí | **CONGELADO** + fallback WebGL |
| | `CounterAnim` | sí | solo dentro de `CosteCounter` |
| Conversión | `CTAPrimary` | sí | **1 solo primario en toda la web** |
| | `CTASecondary` | sí | nunca compite con el primario |
| | `StickyCTAMobile` | sí | solo móvil; destino = primario |
| | `CredibilityProof` | no | P0 (no-demo); reemplazado por `DemoFachada` en P1 |
| Demo | `DemoFachada` | sí | **P1**; muda-primero, audio on-tap |
| Especial | `CosteCounter` | sí | variantes `€` / `cualitativo` (H1) |

**Regla maestra:** ningún acto introduce un patrón fuera de este set. Si algo "pide" un componente nuevo, primero se cuestiona si el acto sobra.

---

## 5. Reglas de código

- **Server components por defecto.** `"use client"` solo en motion/interactivo.
- **Contenido como data tipada** en `app/_content/actos.ts`. Nunca hardcodear copy en JSX.
- **Una sola fuente de verdad** para CTA (texto + destino) en `app/_content/site.ts`.
- **Tokens, nunca valores mágicos.**
- **Tipos estrictos**: la IA no puede meter un campo inexistente sin que falle el build.
- **Sin abstracciones especulativas.** Generalizar al 3er uso real, no antes.

---

## 6. Estructura de carpetas

```
app/
  page.tsx                 # ensambla los 6 actos
  layout.tsx               # shell: fonts, wordmark, progress, footer, analytics
  legal/page.tsx           # existe, intacto
  _content/
    actos.ts               # copy de los 6 actos (data tipada)
    site.ts                # CTA + constantes
  _components/
    ui/                    # Eyebrow, Titular, Container, Stack
    layout/                # Acto, Wordmark, ProgressBar, Footer
    conversion/            # CTAPrimary, CTASecondary, StickyCTAMobile, CredibilityProof
    motion/                # (legacy en _components/ raíz: SmoothScroll, Reveal, HeroCanvas)
    demo/                  # DemoFachada (P1)
  _lib/
    tokens.ts              # referencia de tokens en TS si hace falta
    analytics.ts           # wrapper de eventos
styles/                    # globals (existe) + tokens vars
public/                    # assets, audio demo (P1)
```

> Legacy `_components/HeroBackdrop.tsx`, `HeroCanvas.tsx`, `Reveal.tsx`, `SmoothScroll.tsx`, `world/` permanecen en su sitio. NO mover en T0.

---

## 7. Gate de aceptación (por cada tarea atómica)

Cada tarea debe dejar la web en verde:

1. `npm run build` → OK, sin errores ni warnings nuevos.
2. `prefers-reduced-motion` → fallback lineal funciona.
3. A11y AA: contraste, `:focus-visible`, landmarks.
4. Móvil real: sin scroll horizontal, tap targets ≥44px.
5. Lighthouse móvil ≥85 (gate duro en T6, blando en intermedias).
6. Desplegable a preview `v3-lab`.

Si una tarea no cumple el gate, **no se mergea**.

---

## 8. Plantillas de prompt (3, reutilizables)

### A. Spec de componente
> Contexto: lee `PROJECT_RULES.md`. Construye `<Componente>` con props `{...}`, estados `{...}`, tokens-only, reduced-motion, a11y AA. Criterio de aceptación: `{...}`. Verifica: `npm run build` + Lighthouse.

### B. Ensamblaje de acto
> Monta el acto `NN` usando SOLO componentes del set §4 y el copy de `actos.ts[NN]`. No crees componentes nuevos. Verifica gate.

### C. Gate de verificación
> Ejecuta `npm run build`, reporta errores de tipos, corre Lighthouse móvil, confirma ≥85 y reduced-motion. No cambies diseño.

---

## 9. Framework de decisión (en orden)

1. **¿CONSTRUIR?** Solo si (a) sirve a uno de los 6 actos **y** (b) está en el set §4 **y** (c) tiene justificación de claridad/conversión/percepción.
2. **¿SIMPLIFICAR?** Si requiere patrón nuevo / dep >~40 kb / solo funciona con audio o JS → buscar versión mínima.
3. **¿POSPONER?** Si depende de hipótesis no validada o contenido inexistente → P1/P2.
4. **¿ELIMINAR?** Si no cambia lo que el visitante recuerda (dinero + facilidad) → fuera.

**Desempate:** claridad comercial > reducción de fricción > autoridad > premium > ego de marca.

**Regla anti-perfeccionismo:** tarea que pasa gate = terminada. Reabrir por gusto = no, sin un dato que lo justifique.

---

## 10. Anti-patrones (vetados)

- Inventar componentes fuera del set §4.
- Copy hardcodeado en JSX.
- `#hex` o `px` sueltos.
- Tocar el `HebrasField` congelado.
- Mover archivos sin actualizar imports en el mismo diff.
- Diffs grandes que mezclan concerns.
- Refactors no pedidos.
