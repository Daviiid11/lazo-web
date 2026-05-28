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

## 5. Sistema de componentes (post-B3, decisiones B4)

| Categoría | Componente | Estado | Notas |
|-----------|-----------|--------|-------|
| Global | `Wordmark` | ✅ se conserva | revisar tamaño en B5 |
| | `Footer` | ✅ se conserva | textos legales pendientes E4 |
| Layout | `Acto` → **rename `Section` en B5** | ✅ se conserva | API igual (`tone`, `width`, `id`, `className`); refactor mecánico |
| | `Container` / `Stack` | ✅ se conservan | |
| UI | `Eyebrow` | ✅ se conserva | numeración A1–A7 en B5 |
| | `Titular` | ✅ se conserva | aceptar nuevos tokens `--fs-h1/h2/h3` |
| Motion | `SmoothScroll` (Lenis) | ✅ | |
| | `Reveal` (GSAP) | ✅ | |
| Conversión | `CTAPrimary` | ✅ se conserva | texto pasa a "Agenda una llamada" en B5 |
| | `CTASecondary` | ✅ se conserva | |
| | `StickyCTAMobile` | ✅ se conserva | |

Borrados ya en B3 (commit `a71c848`): `HeroBackdrop`, `HeroCanvas`, `world/WorldCanvas`, `world/WorldPrototype`, `CounterAnim`, `CosteCounter`, `CredibilityProof`, `ProgressBar`, `app/lab/`.

Componentes nuevos pendientes de crear en B5 (no antes):
- `ServicioCard` (ui) — tarjeta para A2 con link a `/servicios/<slug>`.
- `PrincipiosList` (ui) — lista numerada para A3 manifiesto.
- `ParaQuienGrid` (ui) — dos columnas "es para ti / no es para ti" para A4.
- `FasesTrabajo` (ui) — 4 fases numeradas para A5.
- `FaqAccordion` (ui) — acordeón nativo `<details>` para A7 (sin JS).

**Regla maestra:** ningún bloque introduce un componente fuera de este set sin justificación documentada.

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

## 7. Estructura de carpetas (objetivo post-B4)

```
app/
  page.tsx                              # ensambla la home con A1–A7 (B5)
  layout.tsx                            # shell: fonts, wordmark, footer, analytics
  legal/page.tsx                        # se conserva; textos a actualizar en E4
  servicios/
    estrategia-ia/page.tsx              # B5 (página dedicada por servicio)
    funnels/page.tsx                    # B5
    control-automatizacion/page.tsx     # B5
    ciberseguridad/page.tsx             # B5
  _content/
    home.ts                             # esquema A1–A7 (creado B4, copy en B5)
    servicios.ts                        # esquema 4 servicios (B5)
    site.ts                             # CTA único + constantes
  _components/
    ui/                                 # Eyebrow, Titular, Container, Stack + B5 nuevos
    layout/                             # Section (rename de Acto en B5), Wordmark, Footer
    conversion/                         # CTAPrimary, CTASecondary, StickyCTAMobile
  Reveal.tsx, SmoothScroll.tsx          # raíz de _components/, sin subcarpeta motion/
  _lib/
    tokens.ts                           # referencia de tokens en TS (cerrado B3)
    analytics.ts                        # wrapper de eventos (eventos finales en C6)
```

> Sin `/sobre` ni `/contacto`: "sobre" = bloque A6 de home, "contacto" = CTA Cal.com.

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
  - **B1** Auditoría reuso v3-lab — ✅ 2026-05-28.
  - **B2** Decisión técnica de partida (rama `pivote-divisual`) — ✅ commit `dd517db`.
  - **B3** Tokens Divisual + purga 3D y Diagnóstico de Fuga — ✅ commit `a71c848`.
  - **B4** Wireframe + arquitectura páginas — ✅ este commit.
  - **B5** Ensamblaje home con A1–A7 + páginas de servicio.
  - **B6** Hardening + deploy `lazo.agency`.

Cuellos de botella cruzados: **C7** (pricing) bloquea C5; **E2+E3** (contrato/DPA)
bloquean firma cliente; **E4** cruza con B5/B6 (textos legales en la web);
**D4** depende de B6 (Featured LinkedIn apunta a web nueva).

---

## 12. Mapa de páginas + wireframe home (B4, cerrado 2026-05-28)

### 12.1 Mapa de páginas

| Ruta | Propósito | Construye |
|------|-----------|-----------|
| `/` | Home larga con A1–A7 | B5 |
| `/servicios/estrategia-ia` | Detalle servicio 1 + casos + FAQ | B5 |
| `/servicios/funnels` | Detalle servicio 2 | B5 |
| `/servicios/control-automatizacion` | Detalle servicio 3 | B5 |
| `/servicios/ciberseguridad` | Detalle servicio 4 (copy conservador) | B5 |
| `/legal` | Aviso legal + privacidad + cookies | E4 (texto), ya existe ruta |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | SEO técnico | B6 (actualizar) |

Sin `/sobre` ni `/contacto`.

### 12.2 Wireframe textual de la home

| # | Bloque | Tone | Contiene |
|---|--------|------|----------|
| A1 | Hero | `crema` | Eyebrow opcional + Titular (Fraunces, `--fs-h1`) + cuerpo + `CTAPrimary` "Agenda una llamada" + `CTASecondary` opcional |
| A2 | Servicios | `crema-light` | Titular corto + grid de 4 `ServicioCard` (tarjetas breves con link a `/servicios/<slug>`) |
| A3 | Manifiesto | **`sage`** | Eyebrow "En qué creemos" + Titular en crema + lista de 4 principios + CTA secundario opcional |
| A4 | Para quién es Lazo | `crema` | Titular + dos columnas (es para ti / no es para ti) + ancla "200k-2M / 5-50" |
| A5 | Cómo trabajamos | `crema-light` | Titular + 4 fases numeradas (diagnóstico → plan → implementación → acompañamiento) |
| A6 | Sobre Lazo | **`sage`** | Eyebrow + Titular en crema + narrativa industria → IA → Lazo (mención Mastermind Juan Pe) |
| A7 | FAQ | `crema` | Titular + acordeón nativo `<details>` con 5 preguntas (precio, plazo, datos/RGPD, Ads/redes, "si no funciona") + cierre CTA primario opcional |

Patrón rítmico: claro → claro → **OSCURO** → claro → claro → **OSCURO** → claro.

Footer (no es bloque): wordmark + links legales + email contacto + tagline corto.

### 12.3 Esquema `_content/home.ts`

Creado en B4 con tipos exportados (`Hero`, `Servicios`, `Manifiesto`, `ParaQuien`, `ComoTrabajamos`, `SobreLazo`, `Faq`, `HomeBlock`). El array `HOME_BLOCKS` queda **vacío hasta B5**, que rellena el copy real validado en sesión 2026-05-28 (ver memoria `project_lazo_pivote_divisual`).

### 12.4 Decisiones de componentes nuevos (a crear en B5)

`ServicioCard`, `PrincipiosList`, `ParaQuienGrid`, `FasesTrabajo`, `FaqAccordion`. Cada uno consume el subtipo correspondiente de `home.ts`. Server components por defecto; `FaqAccordion` aprovecha `<details>` nativo y no necesita JS.
