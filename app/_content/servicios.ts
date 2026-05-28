import type { ServicioSlug } from "./home";

export type ServicioDetallado = {
  slug: ServicioSlug;
  titulo: string;
  promesa: string;
  detalle: readonly string[];
  incluye: readonly string[];
  noIncluye: readonly string[];
  faq: readonly { pregunta: string; respuesta: string }[];
};

const ESTRATEGIA_IA: ServicioDetallado = {
  slug: "estrategia-ia",
  titulo: "Estrategia y consultoría IA",
  promesa:
    "Antes de implementar, sabemos dónde la IA mueve la aguja en tu PYME y dónde no.",
  detalle: [
    "La mayoría de PYMES están pagando IA en sitios donde no resuelve el cuello real. Y dejando sin tocar procesos donde sí lo haría.",
    "Empezamos con un mapeo de tu operativa: qué tareas se repiten, dónde se pierde tiempo, qué decisiones se toman a ojo. Después marcamos dónde una IA bien aplicada (no genérica) cambia el coste o el resultado.",
    "Salimos con un plan accionable: qué herramienta, qué proceso, qué orden, qué métrica. Sin slides genéricos sobre 'transformación digital'.",
  ],
  incluye: [
    "Mapeo de operativa actual (3–5 días)",
    "Identificación de 2–3 cuellos donde la IA aporta valor medible",
    "Plan accionable con prioridad, orden y métricas",
    "Recomendación de stack (no atada a un proveedor concreto)",
  ],
  noIncluye: [
    "Implementación (es otro servicio)",
    "Formación profunda del equipo (puede añadirse aparte)",
  ],
  faq: [
    {
      pregunta: "¿Necesito tener un caso de uso claro antes de empezar?",
      respuesta: "No. Lo encontramos en el mapeo.",
    },
    {
      pregunta: "¿Y si me decís que no hay caso?",
      respuesta:
        "Te lo decimos y no facturamos implementación. El diagnóstico es honesto.",
    },
    {
      pregunta: "¿Cuánto dura el diagnóstico?",
      respuesta: "1–2 semanas según tamaño de operativa.",
    },
  ],
};

const FUNNELS: ServicioDetallado = {
  slug: "funnels",
  titulo: "Funnels de venta",
  promesa:
    "Reordenamos tu recorrido para que cada lead llegue al sitio correcto. Sin sustituir lo que ya tienes.",
  detalle: [
    "No hacemos captación. Asumimos que ya tienes tráfico — referidos, ads externas, LinkedIn, web.",
    "Lo que arreglamos es lo que pasa entre 'me han contactado' y 'es cliente firmado': clasificación, recordatorios, propuestas, seguimiento.",
    "Conectamos las piezas que ya usas (CRM, calendario, WhatsApp, email) para que ningún lead se enfríe por olvido.",
  ],
  incluye: [
    "Auditoría del recorrido actual (lead → cliente)",
    "Mapa de fricción y olvido",
    "Implementación de automatizaciones por etapa",
    "Tableros de seguimiento (Airtable o tu CRM)",
  ],
  noIncluye: [
    "Captación (Meta Ads, marca personal, SEO)",
    "Diseño web nuevo (puede añadirse aparte)",
  ],
  faq: [
    {
      pregunta: "¿Trabajáis con mi CRM?",
      respuesta:
        "Sí si es uno de los habituales (HubSpot, Pipedrive, Notion, Airtable). Si es a medida, lo valoramos.",
    },
    {
      pregunta: "¿Qué pasa con mi web?",
      respuesta: "No la tocamos. Solo lo que va detrás.",
    },
    {
      pregunta: "¿Cuánto sube la conversión?",
      respuesta:
        "Depende del punto de partida. Te lo medimos antes y después.",
    },
  ],
};

const CONTROL_AUTOMATIZACION: ServicioDetallado = {
  slug: "control-automatizacion",
  titulo: "Control y automatización",
  promesa:
    "Centralizamos tu información y automatizamos lo que repites cada semana.",
  detalle: [
    "Si tu equipo dedica horas a copiar datos entre herramientas, pasar partes, mover citas o avisar manualmente, eso se automatiza.",
    "Construimos un núcleo en Airtable (o el que uses) con la información viva del negocio. Conectamos n8n para mover datos entre sistemas. WhatsApp IA para gestión básica con clientes: atención de primera línea, recordatorios, confirmaciones.",
    "El objetivo es eliminar tareas manuales que no aportan criterio. No quitar trabajo a tu gente — quitar trabajo que no debería existir.",
  ],
  incluye: [
    "Base de datos central (Airtable o equivalente)",
    "Automatizaciones entre tus herramientas (n8n)",
    "Bot WhatsApp IA con tu voz y reglas",
    "Documentación operativa para tu equipo",
  ],
  noIncluye: [
    "Implementación de CRM nuevo desde cero (caso aparte)",
    "Hardware o servidores propios",
  ],
  faq: [
    {
      pregunta: "¿Funciona con mis sistemas actuales?",
      respuesta:
        "Lo valoramos en el diagnóstico. La mayoría de PYMES usan herramientas estándar y conectan bien.",
    },
    {
      pregunta: "¿Quién mantiene esto cuando termináis?",
      respuesta:
        "Hay acompañamiento por defecto. Tu equipo puede operarlo solo con la documentación.",
    },
    {
      pregunta: "¿Y si no quiero WhatsApp IA?",
      respuesta:
        "No es obligatorio. Hay clientes que solo quieren Airtable + n8n.",
    },
  ],
};

const CIBERSEGURIDAD: ServicioDetallado = {
  slug: "ciberseguridad",
  titulo: "Ciberseguridad (conservadora)",
  promesa:
    "Implementación segura, hábitos básicos del equipo, RGPD cubierto. Sin pentest ni auditoría de banca.",
  detalle: [
    "Tu PYME no necesita un SOC militar. Necesita que las cuentas estén bien configuradas, que el equipo no abra archivos raros, y que cumplas RGPD básico.",
    "Hacemos lo que cualquier empresa de 5–50 personas debería tener resuelto antes de crecer: gestión de accesos, copias de seguridad sensatas, formación rápida del equipo, revisión de proveedores con acceso a datos.",
    "Si más adelante necesitas algo más estricto (sector regulado, certificación), te derivamos a un especialista. Aquí no fingimos lo que no somos.",
  ],
  incluye: [
    "Revisión de gestión de cuentas y permisos",
    "Política de copias de seguridad",
    "Sesión de hábitos básicos para tu equipo (1–2 h)",
    "Checklist de cumplimiento RGPD básico",
    "Revisión de proveedores con acceso a datos",
  ],
  noIncluye: [
    "Pentest o auditoría completa",
    "Certificación ISO o ENS",
    "Sectores con regulación específica (sanidad, financiero) sin valoración previa",
  ],
  faq: [
    {
      pregunta: "¿Esto sustituye a un auditor de seguridad?",
      respuesta:
        "No. Es la base previa que casi ninguna PYME tiene cubierta.",
    },
    {
      pregunta: "¿David está certificado?",
      respuesta:
        "David está en formación continua con el Mastermind Juan Pe. El alcance aquí es conservador por diseño, no por improvisación.",
    },
    {
      pregunta: "¿Y si pasa algo igual?",
      respuesta:
        "Tener este nivel cubierto reduce mucho el riesgo. No lo elimina. Lo decimos sin promesas raras.",
    },
  ],
};

export const SERVICIOS: Record<ServicioSlug, ServicioDetallado> = {
  "estrategia-ia": ESTRATEGIA_IA,
  funnels: FUNNELS,
  "control-automatizacion": CONTROL_AUTOMATIZACION,
  ciberseguridad: CIBERSEGURIDAD,
} as const;

export const SERVICIOS_ORDER: readonly ServicioSlug[] = [
  "estrategia-ia",
  "funnels",
  "control-automatizacion",
  "ciberseguridad",
] as const;
