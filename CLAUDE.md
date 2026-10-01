# Arquitectura

SPA disfrazada de app Next.js App Router: una única ruta real (`app/page.tsx`, client component `'use client'`) que enruta a mano vía `location.hash` (`#work`, `#work/<id>`, `#services`, `#about`, `#contact`) + `useState`, sin `next/navigation`. Vistas en `components/views/*.tsx` (`HomePage`, `PortfolioPage`, `ProjectDetailPage`, `ServicesPage`, `AboutPage`, `ContactPage`), montadas condicionalmente según `route`. Header/Footer persistentes fuera del switch.

- Copy bilingüe (es/en) y datos de proyectos centralizados en `lib/data.ts` (`COPY`, `PROJECTS`); tipos en `lib/types.ts` (`Lang`, `Route`, `Project`, `ProjectDetail`, `ServiceItem`, `QAItem`).
- Idioma persiste en `localStorage` (`lat-lang`); sin backend ni base de datos todavía.
- Hooks propios: `useInView` (IntersectionObserver para reveals), `useHeroScroll` (parallax del hero).
- Sin componentes UI reutilizables (Button/Card genéricos); cada vista escribe sus propias clases CSS.

# Tecnología

- Next.js 16.2.7 (canary — breaking changes vs. training data, ver AGENTS.md), React 19.2, TypeScript strict (`tsconfig.json`), `moduleResolution: bundler`, alias `@/*`.
- Sin librería de estilos: CSS plano en `app/globals.css` (custom properties + clases BEM-ish), sin Tailwind ni CSS-in-JS. `app/page.module.css` existe pero el grueso del estilo vive en `globals.css`.
- Assets de imagen/video optimizados por script, no en build: `optimizar-imagenes.js` (`sharp`) y `optimizar-videos.js` (`fluent-ffmpeg`), ver sección de assets en AGENTS.md.
- Sin testing framework configurado.

# Design system

Tokens en `app/globals.css` `:root`:

- Color: `--ink` (#050504), `--paper` (#FFFFFF), `--lavender` (#7972FA), `--terra` (#DE5738), `--lime` (#EDFB8C), más semánticos `--bg/--fg/--muted/--line/--surface-2/--accent`. Soporte dark vía `[data-theme="dark"]` (invierte bg/fg/muted/line/surface-2).
- Tipografía: `--font-sans` Poppins (peso 200–800), `--font-serif` Fraunces — cargadas por `@import` de Google Fonts en `globals.css`. Escala fluida con `clamp()`: `--fs-display` hasta 200px, `--fs-h1/h2/h3`, `--fs-body` 16px.
- Spacing en escala de 4px: `--space-1` (4px) a `--space-10` (128px).
- Radios (`--r-pill`, `--r-md`, `--r-lg`), easings (`--ease-out`, `--ease-in-out`) y duraciones (`--dur-fast/mid/slow`) nombrados — reusar siempre, no hardcodear valores nuevos.
- Utilidades tipográficas (`.t-display`, `.t-h1`, `.t-eyebrow`, `.t-muted`...) y componentes CSS por sección (`.pill`, `.chip`, `.work-card`, `.svc-card`...), todas definidas directo en `globals.css` — no hay CSS Modules por componente salvo `page.module.css`.
- Animaciones vía `@keyframes` globales (`slide-left`, `face-pulse`, `drop-in`, `page-in`) + clase `.reveal`/`.reveal.is-in` para scroll-reveals con `useInView`. Respeta `prefers-reduced-motion`.

# API serverless (Route Handlers)

Convención estándar para conectar con una API desde este proyecto — confirmada contra `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md` (Next 16 App Router):

- Endpoint en `app/api/<nombre>/route.ts`, exporta `GET`/`POST`/etc. Nunca `route.ts` en el mismo segmento que `page.tsx`.
- Tipar request con `NextRequest` de `next/server` si se necesita `nextUrl`/`cookies`; si no, alcanza con `Request` nativo.
- Body: `await request.json()` (o `.formData()`), validar antes de usar.
- Respuesta: `Response.json({...}, { status })`.
- Secretos server-side en `process.env.X` (nunca prefijo `NEXT_PUBLIC_` para eso), leídos solo dentro del handler.
- `export const runtime = 'nodejs'` explícito para dejar clara la intención serverless.
- Dinámico por defecto (no cacheado) salvo `export const dynamic = 'force-static'`.
- Cliente llama con `fetch('/api/<nombre>', { method: 'POST', body: JSON.stringify(data) })` — ruta relativa, sin URL absoluta ni SDK aparte.
- Caso pendiente en el repo: `components/views/ContactPage.tsx:37` ya maneja estado `sending`/`sent` pero no llama a ningún endpoint — al implementar el envío real, crear `app/api/contact/route.ts` siguiendo este patrón.
