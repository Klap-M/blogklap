# Estructura del Blog Klap — Documentación completa

Referencia de cómo está construido el blog: arquitectura, diseño, componentes HTML, SEO y convenciones para mantenerlo o crear posts nuevos.

---

## 1. Visión general

Blog estático **HTML + CSS + JS** optimizado para SEO. Sin framework, sin build, sin base de datos.

| Característica | Implementación |
|----------------|----------------|
| Páginas | HTML estático |
| Estilos | Un solo CSS con design system (`css/styles.css`) |
| JS | Mínimo: TOC activo al scroll (`js/main.js`) |
| Imágenes | Links externos a klap.cl (también soporta links de otros servicios o carpeta `assets/`) |
| Tipografía | Inter (Google Fonts) |
| Idioma | `lang="es-CL"` |
| Responsive | CSS Grid + media queries |

---

## 2. Árbol de archivos

```
blogklap/
├── index.html                              # Home: hero + grid de posts
├── css/
│   └── styles.css                          # Design system + todos los componentes
├── js/
│   └── main.js                             # TOC: resalta sección activa al scroll
├── posts/
│   ├── diversificar-metodos-de-pago.html
│   ├── pagos-tarjeta-credito-debito-chile.html
│   └── medios-de-pago-chile-guia-definitiva.html
├── assets/                                 # Opcional (para imágenes locales futuras)
│   ├── IMAGENES.md
│   └── images/
│       ├── brand/
│       └── posts/
├── vercel.json                             # URLs limpias en Vercel
├── .gitignore
├── GUIA-DESPLIEGUE.md                      # Deploy, costos, Git, Vercel, Cursor
└── ESTRUCTURA-BLOG.md                      # Este archivo
```

---

## 3. Tipos de página

### 3.1 Home (`index.html`)

Estructura de arriba a abajo:

```
┌─────────────────────────────────────┐
│  site-header (sticky)               │  Logo + nav (Inicio, Klap.cl)
├─────────────────────────────────────┤
│  hero                               │  Badge + H1 + subtítulo (fondo navy)
├─────────────────────────────────────┤
│  posts-section                      │  Label + título + posts-grid
│    └── post-card × N                │  Tarjeta por artículo
├─────────────────────────────────────┤
│  site-footer                        │  Logo blanco + links + copyright
└─────────────────────────────────────┘
```

**Rutas CSS/JS desde home:** `css/styles.css` (sin `../`)

### 3.2 Artículo (`posts/nombre-del-post.html`)

Estructura de arriba a abajo:

```
┌─────────────────────────────────────┐
│  site-header                        │
├─────────────────────────────────────┤
│  article-hero                       │  Imagen de fondo + breadcrumb + categoría
│                                     │  + H1 + fecha + autor
├─────────────────────────────────────┤
│  article-layout (grid 2 cols)       │
│  ┌──────────┬─────────────────────┐ │
│  │ toc      │ prose               │ │  TOC sticky | Contenido del artículo
│  │ (aside)  │ (articleBody)       │ │
│  └──────────┴─────────────────────┘ │
├─────────────────────────────────────┤
│  related-posts                      │  2 posts relacionados + botón "Ver todos"
├─────────────────────────────────────┤
│  site-footer                        │
└─────────────────────────────────────┘
```

**Rutas CSS/JS desde posts:** `../css/styles.css`, `../js/main.js`, `../index.html`

---

## 4. Identidad visual (Design System)

Definido en `:root` de `css/styles.css`.

### Colores Klap

| Token CSS | Hex | Uso |
|-----------|-----|-----|
| `--color-primary` | `#002b49` | Textos, headers, tablas, footer |
| `--color-primary-dark` | `#001a2e` | Hero gradient, textos sobre verde |
| `--color-primary-light` | `#003d66` | Hover de links |
| `--color-accent` | `#26d07c` | CTAs, categorías, pasos, borde related |
| `--color-accent-dark` | `#1fb368` | Labels, categorías en cards |
| `--color-accent-light` | `#e8faf2` | Fondos callout tip, hover tablas |
| `--color-bg` | `#ffffff` | Fondo principal |
| `--color-bg-alt` | `#f8f9fa` | Fondos alternos, related posts |
| `--color-bg-dark` | `#002b49` | Hero home, footer |

### Tipografía

- **Fuente:** Inter (400, 500, 600, 700, 800)
- **Body:** 1.0625rem (~17px), line-height 1.75
- **Lead:** 1.1875rem con borde izquierdo verde/navy
- **H2 artículo:** 1.625rem, borde inferior
- **H3 artículo:** 1.25rem

### Espaciado y layout

| Token | Valor | Uso |
|-------|-------|-----|
| `--max-width` | 1200px | Contenedor general |
| `--content-width` | 760px | Ancho ideal de lectura |
| `--header-height` | 72px | Header sticky + offset TOC scroll |

### Logo

```
https://www.klap.cl/image/layout_set_logo?img_id=293212&t=1779856204840
```

- Header: clase `site-logo__img`, height 34px
- Footer: clase `site-footer__logo`, height 30px, filtro blanco (`filter: brightness(0) invert(1)`)

---

## 5. Componentes reutilizables

Todos los estilos están en `css/styles.css`. Usar las clases exactas al crear contenido nuevo.

### 5.1 Layout global

| Clase | Descripción |
|-------|-------------|
| `.container` | Contenedor centrado max 1200px |
| `.container--narrow` | Contenedor estrecho 760px (opcional) |
| `.site-header` | Header sticky con blur |
| `.site-footer` | Footer navy con logo blanco |

### 5.2 Home

| Clase | Descripción |
|-------|-------------|
| `.hero` | Banner principal gradient navy |
| `.hero__badge` | Pill verde semitransparente |
| `.hero__title` | H1 grande responsive |
| `.posts-grid` | Grid auto-fill min 340px |
| `.post-card` | Tarjeta de artículo con hover lift |
| `.post-card__image` | Ratio 16:9 |
| `.post-card__category` | Label verde uppercase |
| `.post-card__title` | Título del post |
| `.post-card__excerpt` | Resumen 2-3 líneas |
| `.post-card__meta` | Fecha + autor |
| `.post-card__read-more` | Link "Leer artículo →" |

### 5.3 Artículo — Hero

| Clase | Descripción |
|-------|-------------|
| `.article-hero` | Contenedor con imagen de fondo oscurecida |
| `.article-hero__image` | Imagen full-width opacity 35% |
| `.article-hero__overlay` | Contenido encima (breadcrumb, título) |
| `.breadcrumb` | Inicio / Blog / Título corto |
| `.article-hero__category` | Pill verde (`Medios de pago`, etc.) |
| `.article-hero__title` | H1 del artículo |
| `.article-hero__meta` | Fecha + autor |

### 5.4 Artículo — Contenido (`.prose`)

Contenedor principal del texto. Todo el contenido editorial va dentro de `<div class="prose" itemprop="articleBody">`.

| Elemento | Clase / tag | Cuándo usarlo |
|----------|-------------|---------------|
| Intro destacada | `<p class="lead">` | Primer párrafo, gancho del artículo |
| Sección | `<section id="slug">` | Cada bloque del TOC necesita `id` único |
| Título sección | `<h2>` | Secciones principales |
| Subtítulo | `<h3>`, `<h4>` | Subsecciones |
| Lista con checks | `<ul class="checklist">` | Beneficios, métodos, puntos clave |
| Lista normal | `<ul>`, `<ol>` | Listas dentro de párrafos o pasos |
| Tabla | `.table-wrapper` > `<table>` | Comparativas, datos estructurados |
| Tarjetas numeradas | `.reason-cards` > `.reason-card` | Listas de razones (1, 2, 3…) |
| Timeline pasos | `.steps` > `.step` | Procesos secuenciales (ej. pago con tarjeta) |
| Grid actores | `.actors-grid` > `.actor-card` | Roles/participantes de un proceso |
| Grid métodos pago | `.payment-grid` > `.payment-item` | Tipos de medios de pago con ícono |
| Callout info | `.callout.callout--info` | Información neutral |
| Callout tip | `.callout.callout--tip` | Consejo Klap / tip destacado |
| Callout warning | `.callout.callout--warning` | Advertencias (disponible en CSS) |
| Tags SEO | `.tags` > `.tag` | Palabras clave al final del artículo |

### 5.5 Tabla de contenidos (TOC)

```html
<aside class="toc" aria-label="Tabla de contenidos">
  <p class="toc__title">Contenido</p>
  <ol>
    <li><a href="#introduccion">Introducción</a></li>
    <li><a href="#seccion-2">Título sección</a></li>
  </ol>
</aside>
```

- En desktop: sticky a la izquierda
- En mobile: aparece arriba del contenido
- Los `href` deben coincidir con los `id` de cada `<section>`
- JS resalta el link activo con clase `.is-active` al hacer scroll

### 5.6 Blogs relacionados

Al final de **cada post**, antes del footer:

```html
<section class="related-posts" aria-labelledby="related-title">
  <div class="container">
    <header class="related-posts__header">
      <p class="related-posts__label">Blog relacionado</p>
      <h2 id="related-title" class="related-posts__title">También te puede interesar</h2>
      <p class="related-posts__subtitle">Sigue aprendiendo sobre medios de pago...</p>
    </header>
    <div class="posts-grid related-posts__grid">
      <!-- 2 post-card (los otros posts, NO el actual) -->
    </div>
    <div class="related-posts__footer">
      <a href="../index.html" class="btn btn--outline">Ver todos los artículos</a>
    </div>
  </div>
</section>
```

**Regla:** mostrar los **2 posts restantes** (si hay 3 en total). Al agregar más posts, elegir los 2 más relacionados por tema.

---

## 6. Snippets HTML — copiar y pegar

### Párrafo lead

```html
<section id="introduccion">
  <p class="lead">Texto de apertura que engancha al lector...</p>
  <p>Párrafo de contexto adicional.</p>
</section>
```

### Checklist

```html
<ul class="checklist">
  <li><strong>Título del punto</strong> — Descripción breve.</li>
  <li><strong>Otro punto</strong> — Descripción breve.</li>
</ul>
```

### Tabla comparativa

```html
<div class="table-wrapper">
  <table>
    <caption class="sr-only">Descripción para lectores de pantalla</caption>
    <thead>
      <tr>
        <th scope="col">Columna 1</th>
        <th scope="col">Columna 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dato</td>
        <td>Valor</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Tarjetas numeradas (razones)

```html
<div class="reason-cards">
  <div class="reason-card">
    <span class="reason-card__number" aria-hidden="true">1</span>
    <div>
      <p class="reason-card__title">Título de la razón</p>
      <p class="reason-card__text">Explicación de la razón.</p>
    </div>
  </div>
</div>
```

### Timeline de pasos

```html
<div class="steps">
  <div class="step">
    <span class="step__marker" aria-hidden="true">1</span>
    <div class="step__content">
      <p class="step__title">Nombre del paso</p>
      <p class="step__text">Qué ocurre en este paso.</p>
    </div>
  </div>
</div>
```

### Grid de actores

```html
<div class="actors-grid">
  <div class="actor-card">
    <div class="actor-card__icon" aria-hidden="true">👤</div>
    <p class="actor-card__name">Nombre del actor</p>
    <p class="actor-card__desc">Qué hace en el proceso.</p>
  </div>
</div>
```

### Grid de métodos de pago

```html
<div class="payment-grid">
  <div class="payment-item">
    <span class="payment-item__icon" aria-hidden="true">💳</span>
    <div>
      <p class="payment-item__title">Tarjetas de débito</p>
      <p class="payment-item__desc">Descripción del método.</p>
    </div>
  </div>
</div>
```

### Callout consejo

```html
<div class="callout callout--tip">
  <p class="callout__title">💡 Consejo Klap</p>
  <p>Texto del consejo con <strong>énfasis</strong> donde corresponda.</p>
</div>
```

### Tags al final

```html
<div class="tags" aria-label="Palabras clave">
  <span class="tag">Palabra Clave 1</span>
  <span class="tag">Palabra Clave 2</span>
</div>
```

### Tarjeta de post (home o related)

```html
<article class="post-card">
  <div class="post-card__image">
    <a href="posts/slug-del-post.html" tabindex="-1" aria-hidden="true">
      <img src="URL_IMAGEN" alt="Descripción" width="800" height="450" loading="lazy">
    </a>
  </div>
  <div class="post-card__body">
    <span class="post-card__category">Medios de pago</span>
    <h3 class="post-card__title">
      <a href="posts/slug-del-post.html">Título del artículo</a>
    </h3>
    <p class="post-card__excerpt">Resumen de 1-2 líneas.</p>
    <div class="post-card__meta">
      <time datetime="2025-10-02">2 oct 2025</time>
      <span>Klap</span>
    </div>
    <a href="posts/slug-del-post.html" class="post-card__read-more">Leer artículo →</a>
  </div>
</article>
```

---

## 7. Qué componente usar según el contenido

| Tipo de contenido | Componente recomendado | Ejemplo en el blog |
|-------------------|------------------------|-------------------|
| Intro / gancho | `.lead` | Todos los posts |
| Lista de beneficios | `.checklist` | Guía medios de pago |
| Comparar 2+ opciones | `<table>` | Débito vs crédito, presencial vs online |
| N razones numeradas | `.reason-cards` | Diversificar pagos (5 razones) |
| Proceso paso a paso | `.steps` | Pagos con tarjeta (5 pasos) |
| Actores / roles | `.actors-grid` | Protagonistas transacción |
| Catálogo de métodos | `.payment-grid` | Medios de pago presenciales/online |
| Tip o consejo marca | `.callout--tip` | "Consejo Klap" |
| Dato importante | `.callout--info` | Proceso de liquidación |
| Palabras clave SEO | `.tags` | Final de cada post |

---

## 8. SEO — checklist por página

### Home (`index.html`)

- [ ] `<title>` único
- [ ] `<meta name="description">`
- [ ] `<meta name="keywords">`
- [ ] `<link rel="canonical">`
- [ ] Open Graph (`og:type`, `og:title`, `og:description`, `og:url`, `og:locale`)
- [ ] Twitter Card
- [ ] JSON-LD `@type: Blog` con array `blogPost`

### Cada artículo

- [ ] `<title>Título | Blog Klap</title>`
- [ ] Meta description (~150-160 chars)
- [ ] Canonical URL
- [ ] `og:type` = `article`
- [ ] `og:image` + `twitter:image` (URL absoluta de imagen)
- [ ] `article:published_time`
- [ ] JSON-LD `@type: BlogPosting` (headline, description, image, dates, author, publisher)
- [ ] Un solo `<h1>` (en `.article-hero__title`)
- [ ] Jerarquía H2 → H3 sin saltos
- [ ] Imágenes con `alt`, `width`, `height`, `loading="lazy"`
- [ ] `itemscope itemtype="BlogPosting"` en `<article>`
- [ ] `itemprop="articleBody"` en `.prose`

### Accesibilidad incluida

- `role="banner"`, `role="contentinfo"`, `aria-label` en navs
- `aria-labelledby` en secciones
- `.sr-only` en captions de tablas
- `aria-hidden="true"` en decorativos (números de pasos, íconos emoji)
- Breadcrumb con `aria-current="page"`

---

## 9. Imágenes

### Configuración actual (producción)

Las imágenes usan **links directos a klap.cl**:

| Uso | URL |
|-----|-----|
| Logo | `https://www.klap.cl/image/layout_set_logo?img_id=293212&t=1779856204840` |
| Post diversificar | `https://www.klap.cl/documents/35879/1203994/diversificar-metodos-de-pago-desk.webp/44ac0611-190c-777d-4565-b5d94a8f7903` |
| Post tarjeta | `https://www.klap.cl/documents/35879/1203970/como-funcionan-las-ventas-con+tarjeta-desk.webp/f42c126a-b8ba-d3c4-cb8e-4e3ac1bd72a4` |
| Post guía | `https://www.klap.cl/documents/35879/1203946/medios_de_pago_en_chile-desk.webp/11517769-b59d-31d3-53d3-5a63ff9b71fd` |

En `<img src>` de cards/hero se añade `?t=TIMESTAMP` cache-bust opcional.

### Alternativas (sin subir a klap.cl)

| Método | Cómo |
|--------|------|
| **Link externo** | Pegar URL en `src="https://..."` (Cloudinary, ImgBB, etc.) |
| **Carpeta local** | Guardar en `assets/images/posts/` y usar ruta relativa |
| **Link klap existente** | Usar URL aunque no puedas subir nuevas (solo referenciar) |

Ver también: `assets/IMAGENES.md`

### Tamaños recomendados

- Hero/card: **1200 × 675 px** (16:9), WebP, ~150 KB
- Logo: **~220 × 68 px** PNG

---

## 10. Posts existentes — mapa de componentes

### `diversificar-metodos-de-pago.html`

| Sección | Componentes |
|---------|-------------|
| Intro | `.lead` |
| Métodos | `.checklist` + `<table>` comparativa |
| 5 razones | `.reason-cards` |
| Cierre | `.callout--tip` |
| Final | `.tags` + `.related-posts` (2 cards) |

### `pagos-tarjeta-credito-debito-chile.html`

| Sección | Componentes |
|---------|-------------|
| Intro | `.lead` |
| Protagonistas | `.actors-grid` + `<table>` roles |
| Proceso | `.steps` (5 pasos) |
| Liquidación | `.callout--info` |
| Débito vs crédito | `<table>` comparativa |
| Final | `.tags` + `.related-posts` |

### `medios-de-pago-chile-guia-definitiva.html`

| Sección | Componentes |
|---------|-------------|
| Intro | `.lead` |
| Ecosistema | `<table>` actores |
| Presencial | `.payment-grid` (6 items) |
| Online | `.payment-grid` (3 items) + `<table>` presencial vs online |
| Beneficios | `.checklist` |
| Cierre | `.callout--tip` |
| Final | `.tags` + `.related-posts` |

---

## 11. Cómo crear un post nuevo (paso a paso)

1. **Duplicar** `posts/diversificar-metodos-de-pago.html` → `posts/mi-nuevo-post.html`

2. **Actualizar `<head>`:**
   - title, description, keywords, canonical
   - og:* y twitter:*
   - JSON-LD BlogPosting

3. **Actualizar hero:**
   - Imagen de fondo
   - Breadcrumb (último segmento = título corto)
   - Categoría, H1, fecha

4. **Armar TOC** con links a cada `#id` de sección

5. **Escribir contenido** en `.prose` usando los componentes de la sección 6 según el tipo de información

6. **Agregar tags** al final

7. **Armar related posts** (2 artículos distintos al actual)

8. **Actualizar `index.html`:**
   - Nueva `.post-card` en el grid
   - Nueva entrada en JSON-LD `blogPost`

9. **Actualizar related posts** en los otros artículos (opcional pero recomendado)

10. **Probar local:** `python -m http.server 8080` → http://localhost:8080

### Convención de nombres de archivo

```
posts/[tema-en-minusculas-con-guiones].html

Ejemplos:
  diversificar-metodos-de-pago.html
  pagos-tarjeta-credito-debito-chile.html
  medios-de-pago-chile-guia-definitiva.html
```

### Categorías usadas

- `Medios de pago` (actual en los 3 posts)
- Futuras sugeridas: `Fintech`, `Tecnología`, `Adquirencia` (como en blog klap.cl original)

---

## 12. JavaScript

Archivo: `js/main.js`

**Única función:** resaltar en el TOC la sección visible mientras el usuario hace scroll.

- Busca `.toc` en la página
- Mapea links `#id` → headings correspondientes
- Aplica clase `.is-active` al link del heading más cercano al top del viewport
- Offset de scroll: 120px (compensa header sticky)

No hay dependencias externas. No jQuery. No frameworks.

---

## 13. Convenciones de código

| Regla | Detalle |
|-------|---------|
| Idioma HTML | `lang="es-CL"` |
| Indentación | 2 espacios |
| Rutas relativas | Desde posts siempre `../` para css, js, index |
| Links externos | `target="_blank" rel="noopener"` |
| Fechas en HTML | `<time datetime="2025-10-02">2 octubre 2025</time>` |
| Imágenes decorativas hero | `alt=""` + `aria-hidden="true"` en contenedor |
| Imágenes con contenido | `alt` descriptivo obligatorio |
| Secciones | Siempre `<section id="slug-kebab-case">` |
| Un H1 por página | Solo en hero del artículo o home |

---

## 14. Prompt para Cursor (crear post nuevo)

```
Crea un nuevo post para el blog Klap siguiendo ESTRUCTURA-BLOG.md.

Archivo: posts/[slug].html
Título: [TITULO COMPLETO]
Categoría: [Medios de pago / Fintech / etc.]
Fecha: [YYYY-MM-DD]
Imagen hero (URL): [URL]
Contenido:

[PEGAR TEXTO AQUÍ]

Usa los componentes HTML adecuados según el contenido:
- lead para intro
- checklist para listas de beneficios
- table para comparativas
- reason-cards para razones numeradas
- steps para procesos secuenciales
- payment-grid para métodos de pago
- callout--tip para consejo Klap
- tags al final

Actualiza index.html (post-card + JSON-LD).
Agrega sección related-posts con 2 posts existentes.
Mantén colores y clases CSS existentes sin modificar styles.css.
```

---

## 15. Archivos relacionados

| Archivo | Para qué |
|---------|----------|
| `ESTRUCTURA-BLOG.md` | Este doc — arquitectura y componentes |
| `GUIA-DESPLIEGUE.md` | Deploy Vercel, Git, costos, colaboración |
| `assets/IMAGENES.md` | Guía de imágenes locales (opcional) |
| `css/styles.css` | Todos los estilos — no duplicar CSS inline |
| `vercel.json` | Config de URLs en producción |

---

*Última actualización: mayo 2026 — Blog Klap*
