# PROJECT_RULES — lazo-web (pivote Divisual, rama `pivote-divisual`)

> Contrato que toda sesión de IA (Claude Code / Cursor) lee **antes de tocar el repo**.
> Fuente de verdad de la fase de ejecución del **pivote Divisual** (2026-05-27).
> Si algo aquí choca con un prompt suelto, prevalece este archivo.
> Si algo aquí choca con la memoria `project_lazo_pivote_divisual.md`, prevalece la memoria.

---

## 0. Contexto del pivote (no negociable)

- 2026-05-27, Lazo deja de ser agencia vertical (talleres / restauración / inmobiliaria)
  y se reposiciona como **horizontal SMB modelo Divisual**: IA + automatización +
  marketing digital + ciberseguridad conservadora. Cliente objetivo: PYMES españolas
  5–50 empleados, facturación 200k–2M.
- Fuera del menú: marca personal, Meta Ads. Lazo asume que el cliente trae tráfico
  propio. La marca personal de David (LinkedIn) es motor interno, no servicio.
- **Diagnóstico de Fuga descartado.** Discovery gratuita → propuesta directa.
- La marca **Lazo se mantiene**; identidad visual y web entera se rehacen al tono
  Divisual (cálido, profesional). **Mundo 3D fuera.**

---

## 1. Principio rector

**Reutilizar lo que ya existe en v3-lab, no reconstruir.** Stack base, fuentes,
motion (Lenis + GSAP), tokens de color cálidos, A11y, SEO de carpetas, `/legal`
y los componentes UI agnósticos (`Container`, `Stack`, `Eyebrow`, `Titular`) y
de layout (`Acto`, `Wordmark`, `Footer`) **se conservan**.

Optimizar por **claridad comercial + sofisticación invisible**, NO por complejidad.

---

## 2. Stack confirmado (no se reabre)

- **Framework:** Next 14 App Router + TypeScript estricto.
- **Estilos:** Tailwind 3 + tokens CSS vars. Cero CSS-in-JS runtime.
- **Motion:** Lenis (scroll) + GSAP (reveals). `prefers-reduced-motion` corta TODO.
- **3D:** **FUERA.** R3F / `three` / `HebrasField` / `HeroCanvas` / `world/` se
  purgan en B3–B5. No reintroducir ninguna dependencia 3D.
- **Hosting:** Vercel (SSG), dominio `lazo.agency`.
- **Fonts:** Fraunces (display) + Inter (sans) vía `next/font`.
- **Analytics:** Vercel Web Analytics (sin cookies) + eventos manuales en
  `_lib/analytics.ts` (cuáles concretos se cierran en C6).
- **Formularios:** ninguno en home. CTA único = Cal.com (URL definitiva pendiente
  de C2).
- **Audio:** fuera.

### Lista negra explícita
R3F · three · @types/three · HebrasField · WorldCanvas · WorldPrototype ·
HeroCanvas · HeroBackdrop · CMS · GA4 con cookies · agente conversacional
en vivo · backend/DB en home · libs de estado (Redux/Zustand) · libs de
componentes pesadas (MUI/Chakra) · CSS-in-JS runtime · dependencias >~40 kb
que sirvan a un solo bloque · abstracciones "por si acaso".

---

## 3. Posicionamiento canónico (cerrado en Fase 2)

> **Más clientes. Menos caos. Menos horas.**
> Implementamos IA, automatización y marketing digital en PYMES. Sistemas que
> funcionan en tu operativa real, no en presentaciones bonitas.

CTA único: **"Agenda una llamada"** → Cal.com 30 min (URL pendiente C2).

Menú servicios (4, cerrado 2026-05-27):

1. Estrategia y consultoría IA
2. Funnels de venta (integra tráfico ya existente del cliente)
3. Control y automatización (Airtable + WhatsApp IA + n8n)
4. Ciberseguridad (conservadora, expandible)

Copy completo de los 4 servicios y los 7 bloques A1–A7 vive en
`app/_content/`. La home se ensambla con esos 7 bloques en B5.

---

## 4. Tokens

### Color — **TBD-B3** (validar paleta v3-lab contra branding Divisual)
La paleta heredada (`--crema`, `--crema-light`, `--sage`, `--terracota`,
`--carbon`) **se conserva como punto de partida** hasta que B3 cierre el
sistema de diseño Divisual definitivo. No introducir colores nuevos sin
pasar por B3.

### Tipografía
Escala fluida `clamp()`. Display = Fraunces. Texto = Inter. Cerrado.

### Motion
- `--ease-calm: cubic-bezier(.2, .8, .2, 1)`
- `--dur-fast: 220ms`
- `--dur-slow: 720ms`

Cerrado. Reduced-motion respetado a nivel CSS y JS.

### Espaciado
Escala modular 4/8. Ritmo generoso "una idea por pantalla". Cerrado.

**Regla:** ningún `#hex` ni `px` suelto en componentes nuevos. Tokens o nada.

---

## 5. Sistema de componentes — **TBD-B4** (revisión del set)

El set §4 heredado del v3-lab necesita revisión bloque por bloque:

| Categoría | Componente | Estado pivote | Notas |
|-----------|-----------|---------------|-------|
| Global | `Wordmark` | ✅ se conserva | revisar tamaño para B3 |
| | `Footer` | ✅ se conserva | textos legales pendientes E4 |
| Layout | `Acto` | ✅ se conserva | renombrar semántico TBD-B4 (¿`Section`?) |
| | `Container` / `Stack` | ✅ se conservan | |
| | `ProgressBar` | ❌ a borrar B5 | atado a "6 actos" |
| UI | `Eyebrow` | ✅ se conserva | numeración A1–A7 en B5 |
| | `Titular` | ✅ se conserva | |
| Motion | `SmoothScroll` (Lenis) | ✅ | |
| | `Reveal` (GSAP) | ✅ | |
| | `HebrasField` / `HeroCanvas` / `world/` | ❌ a borrar B3 | Mundo 3D fuera |
| | `HeroBackdrop` | ❌ a borrar B3 | dependía de HebrasField |
| | `CounterAnim` | ❌ a borrar B3 | servía a CosteCounter |
| Conversión | `CTAPrimary` | ✅ se conserva | texto pasa a "Agenda una llamada" |
| | `CTASecondary` | ✅ se conserva | |
| | `StickyCTAMobile` | ✅ se conserva | |
| | `CredibilityProof` | ❌ a borrar B3 | pasos del Diagnóstico de Fuga |
| | `CosteCounter` | ❌ a borrar B3 | Diagnóstico de Fuga |
| Demo | `DemoFachada` | ❌ no aplica | no existe en disco; no crear |

**Regla maestra:** ningún bloque introduce un patrón fuera del set actualizado.
Si algo "pide" un componente nuevo, primero se cuestiona si el bloque sobra.

---

## 6. Reglas de código

- **Server components por defecto.** `"use client"` solo en motion/interactivo.
- **Contenido como data tipada** en `app/_content/` (estructura A1–A7 reemplaza
  el viejo `actos.ts` de 6 actos). Nunca hardcodear copy en JSX.
- **Una sola fuente de verdad** para CTA (texto + destino) en
  `app/_content/site.ts`.
- **Tokens, nunca valores mágicos.**
- **Tipos estrictos**: la IA no puede meter un campo inexistente sin que falle
  el build.
- **Sin abstracciones especulativas.** Generalizar al 3er uso real, no antes.

---

## 7. Estructura de carpetas (objetivo post-pivote)

```
app/
  page.tsx                 # ensambla la home con A1–A7 (B5)
  layout.tsx               # shell: fonts, wordmark, footer, analytics
  legal/page.tsx           # se conserva; textos a actualizar en E4
  _content/
    home.ts                # bloques A1–A7 (sustituye al viejo actos.ts)
    site.ts                # CTA único + constantes (URL Cal.com pendiente C2)
  _components/
    ui/                    # Eyebrow, Titular, Container, Stack
    layout/                # Acto, Wordmark, Footer
    conversion/            # CTAPrimary, CTASecondary, StickyCTAMobile
    motion/                # SmoothScroll, Reveal
  _lib/
    tokens.ts              # referencia de tokens en TS
    analytics.ts           # wrapper de eventos (eventos finales en C6)
```

> Legacy a borrar en B3: `_components/HeroBackdrop.tsx`, `HeroCanvas.tsx`,
> `world/`, `motion/CounterAnim.tsx`, `conversion/CosteCounter.tsx`,
> `conversion/CredibilityProof.tsx`, `layout/ProgressBar.tsx`, `app/lab/`.

---

## 8. Gate de aceptación (por cada tarea atómica)

Cada tarea debe dejar la web en verde:

1. `npm run build` → OK, sin errores ni warnings nuevos.
2. `prefers-reduced-motion` → fallback lineal funciona.
3. A11y AA: contraste, `:focus-visible`, landmarks.
4. Móvil real: sin scroll horizontal, tap targets ≥44px.
5. Lighthouse móvil ≥85 (gate duro en B6, blando en intermedias).
6. Desplegable a preview en Vercel.

Si una tarea no cumple el gate, **no se mergea**.

---

## 9. Framework de decisión (en orden)

1. **¿CONSTRUIR?** Solo si (a) sirve a uno de los 7 bloques A1–A7 o a un
   servicio del menú **y** (b) está en el set §5 **y** (c) tiene justificación
   de claridad/conversión.
2. **¿SIMPLIFICAR?** Si requiere patrón nuevo / dep >~40 kb → buscar versión mínima.
3. **¿POSPONER?** Si depende de hipótesis no validada o contenido inexistente → fuera del sprint.
4. **¿ELIMINAR?** Si no cambia lo que el visitante recuerda (lo que Lazo hace
   + a quién + cómo agendar) → fuera.

**Desempate:** claridad comercial > reducción de fricción > autoridad > premium > ego de marca.

**Regla anti-perfeccionismo:** tarea que pasa gate = terminada. Reabrir por
gusto = no, sin un dato que lo justifique.

---

## 10. Anti-patrones (vetados)

- Reintroducir cualquier dependencia o componente 3D.
- Tratar `HebrasField` como "congelado" (estaba en el contrato viejo;
  ahora **se borra**).
- Inventar componentes fuera del set §5.
- Copy hardcodeado en JSX.
- `#hex` o `px` sueltos.
- Mover archivos sin actualizar imports en el mismo diff.
- Diffs grandes que mezclan concerns.
- Refactors no pedidos.
- Cerrar tokens, set de componentes o wireframe sin pasar por B3/B4.

---

## 11. Trazabilidad con método 4 fases

- Bloque B web — pasos atómicos:
  - **B1** Auditoría reuso v3-lab — ✅ completado 2026-05-28.
  - **B2** Decisión técnica de partida (reskin sobre v3-lab, rama
    `pivote-divisual`) — ✅ este commit.
  - **B3** Sistema de diseño Divisual (tokens definitivos + purga 3D y
    Diagnóstico de Fuga) — pendiente.
  - **B4** Wireframe + arquitectura páginas.
  - **B5** Ensamblaje home con A1–A7.
  - **B6** Hardening + deploy `lazo.agency`.

Cuellos de botella cruzados: **C7** (pricing) bloquea C5; **E2+E3** (contrato/DPA)
bloquean firma cliente; **E4** cruza con B5/B6 (textos legales en la web);
**D4** depende de B6 (Featured LinkedIn apunta a web nueva).
