# Tamaños de imágenes — Blog Klap

Guía de dimensiones para exportar fotos **desktop** y **mobile**, basada en el inventario actual del repo, el CSS (`base.css`, `mobile.css`, `desktop.css`) y el HTML (`index.html`, `posts/*.html`).

**Formato recomendado:** WebP (alternativa JPG). **Breakpoint del sitio:** `768px` (mobile ≤767px, desktop ≥768px).

---

## Inventario actual (repo)

| Archivo local | viewBox / ratio | Estado | Uso previsto |
|---------------|-----------------|--------|--------------|
| `assets/images/brand/klap-logo.svg` | 120 × 34 (~3.5:1) | Placeholder | Header + footer |
| `assets/images/posts/diversificar-metodos-de-pago.svg` | 1200 × 675 (16:9) | Placeholder | Post 1 |
| `assets/images/posts/pagos-tarjeta.svg` | 1200 × 675 (16:9) | Placeholder | Post 2 |
| `assets/images/posts/medios-de-pago-chile.svg` | 1200 × 675 (16:9) | Placeholder | Post 3 |

**En producción hoy** el HTML apunta a imágenes **WebP de klap.cl** (`*-desk.webp`): la misma URL para tarjetas, hero desktop, imagen destacada mobile y Open Graph. Los placeholders SVG solo se usan si cambias las rutas a `assets/images/`.

---

## Resumen rápido — qué exportar

| Rol | Desktop (≥768px) | Mobile (≤767px) | Ratio | Peso máx. |
|-----|------------------|-----------------|-------|-----------|
| **Logo** | 220 × 68 px (PNG) o SVG | *(misma)* | ~3.5:1 | 25 KB |
| **Tarjeta** (home + relacionados) | **1200 × 675** | **800 × 450** | 16:9 | 150 / 80 KB |
| **Hero artículo** (fondo) | **1920 × 640** | *(no se muestra)* | ~3:1 | 200 KB |
| **Destacada artículo** | *(oculta)* | **800 × 450** | 16:9 | 80 KB |
| **Open Graph / Twitter** | **1200 × 630** | *(misma)* | 1.91:1 | 200 KB |

> **Mobile no usa hero de fondo:** en `mobile.css` `.article-hero__image` está oculto; la foto va en `.article-featured-image` (16:9). En desktop ocurre lo contrario: hero a pantalla completa y `.article-featured-image` oculta.

---

## Cómo se calculan los tamaños (CSS)

| Contexto | Regla CSS | Tamaño en pantalla (aprox.) | Exportar (@2x Retina) |
|----------|-----------|----------------------------|------------------------|
| Contenedor | `--max-width: 1200px`, `--gutter: 24px` | Ancho útil máx. **1152px** | — |
| Logo header | `height: 34px` desk / `26px` mobile | 110×34 / ~84×26 lógicos | **220 × 68** (2×) |
| Logo footer | `height: 30px` desk / `26px` mobile | 90×30 en HTML | **180 × 52** (2×) |
| Tarjeta post | `aspect-ratio: 16/9`, grid `minmax(340px,1fr)` | Mobile: ancho pantalla − 48px gutter → **~720×405** máx. Desk: columna **340–580px** ancho | **1200×675** desk, **800×450** mobile |
| Hero artículo | `min-height: 380px` (440px ≥1024px), `object-fit: cover` | Ancho **100vw**, alto ≥380px | **1920 × 640** |
| Destacada mobile | `aspect-ratio: 16/9`, ancho 100% | **~720×405** (iPhone grande ~390×220 lógico) | **800 × 450** (o **960 × 540** en pantallas 3×) |
| Hover tarjeta desk | `transform: scale(1.04)` | Recorte ~4% extra | Dejar margen en composición |

**Pantallas muy pequeñas:** desde `389px` el gutter baja a `16px` (ancho útil ~358px en 390px).

---

## 1. Logo Klap (`assets/images/brand/`)

| Versión | Exportar (px) | Ratio | Dónde | CSS / HTML |
|---------|---------------|-------|-------|------------|
| **SVG** (ideal) | vectorial, viewBox **120 × 34** | libre | Header, footer | Escala por `height` en CSS |
| **PNG @2x** | **220 × 68** | ~3.24:1 | Si no hay SVG oficial | Header: `height: 34px` (desk), `26px` (mobile) |
| **PNG @4x** (opcional) | **440 × 136** | ~3.24:1 | Máxima nitidez Retina | Mismo logo, archivo más pesado |

**Nombres sugeridos:** `klap-logo.svg` (actual placeholder) · `klap-logo.png` (oficial desde [klap.cl](https://www.klap.cl/image/layout_set_logo?img_id=293212))

**Atributos HTML actuales:** header `width="110" height="34"` · footer `width="90" height="30"`.

**Notas:** fondo transparente en PNG. En footer el CSS aplica `filter: brightness(0) invert(1)` (logo blanco).

---

## 2. Imágenes por post (3 artículos)

Cada post necesita hasta **5 archivos** (4 si reutilizas la misma imagen para tarjeta mobile y destacada mobile).

### Post 1 — Diversificar métodos de pago

**Slug / carpeta:** `diversificar-metodos-de-pago`  
**URL klap.cl actual:** `diversificar-metodos-de-pago-desk.webp`

| Rol | Desktop | Mobile | Ratio | Nombre local sugerido |
|-----|---------|--------|-------|------------------------|
| Tarjeta (home + relacionados) | **1200 × 675** | **800 × 450** | 16:9 | `diversificar-metodos-de-pago-card-desk.webp` / `…-card-mobile.webp` |
| Hero (solo artículo, ≥768px) | **1920 × 640** | — | ~3:1 | `diversificar-metodos-de-pago-hero-desk.webp` |
| Destacada (solo artículo, ≤767px) | — | **800 × 450** | 16:9 | `diversificar-metodos-de-pago-featured-mobile.webp` *(o = card-mobile)* |
| Open Graph / JSON-LD | **1200 × 630** | — | 1.91:1 | `diversificar-metodos-de-pago-og.webp` |

**Recorte sugerido:** tarjeta `object-position: center 25%` (mobile) / centro (desktop). Hero: zona segura central y parte inferior (gradiente + título encima). **Sin texto pequeño** en mobile.

---

### Post 2 — Pagos con tarjeta crédito/débito

**Slug:** `pagos-tarjeta`  
**URL klap.cl:** `como-funcionan-las-ventas-con+tarjeta-desk.webp`

| Rol | Desktop | Mobile | Ratio | Nombre local sugerido |
|-----|---------|--------|-------|------------------------|
| Tarjeta | **1200 × 675** | **800 × 450** | 16:9 | `pagos-tarjeta-card-desk.webp` / `pagos-tarjeta-card-mobile.webp` |
| Hero | **1920 × 640** | — | ~3:1 | `pagos-tarjeta-hero-desk.webp` |
| Destacada | — | **800 × 450** | 16:9 | `pagos-tarjeta-featured-mobile.webp` |
| OG | **1200 × 630** | — | 1.91:1 | `pagos-tarjeta-og.webp` |

---

### Post 3 — Medios de pago en Chile (guía)

**Slug:** `medios-de-pago-chile`  
**URL klap.cl:** `medios_de_pago_en_chile-desk.webp`

| Rol | Desktop | Mobile | Ratio | Nombre local sugerido |
|-----|---------|--------|-------|------------------------|
| Tarjeta | **1200 × 675** | **800 × 450** | 16:9 | `medios-de-pago-chile-card-desk.webp` / `…-card-mobile.webp` |
| Hero | **1920 × 640** | — | ~3:1 | `medios-de-pago-chile-hero-desk.webp` |
| Destacada | — | **800 × 450** | 16:9 | `medios-de-pago-chile-featured-mobile.webp` |
| OG | **1200 × 630** | — | 1.91:1 | `medios-de-pago-chile-og.webp` |

---

## 3. Mapa de uso en el sitio

```
assets/images/
├── brand/klap-logo.svg|png     →  <header> .site-logo__img
│                                 →  <footer> .site-footer__logo
│
└── posts/{slug}-*.webp

index.html
└── .post-card__image            →  card-desk / card-mobile

posts/{articulo}.html
├── .article-hero__image (≥768)   →  hero-desk (opacity 35%, cover)
├── .article-featured-image (≤767)→  featured-mobile (16:9)
├── .related-posts .post-card     →  card-desk / card-mobile
├── og:image / twitter:image      →  og (1200×630)
└── JSON-LD "image"               →  og o card-desk
```

**Home (`index.html`):** no lleva imagen en el hero (solo gradiente CSS). No requiere asset de hero para la portada.

---

## 4. Tabla maestra — todos los archivos

| # | Post | Rol | Desktop | Mobile | Obligatorio |
|---|------|-----|---------|--------|-------------|
| — | — | Logo | 220×68 o SVG | — | Sí |
| 1 | Diversificar | Tarjeta | 1200×675 | 800×450 | Sí |
| 2 | Diversificar | Hero | 1920×640 | — | Sí (desk) |
| 3 | Diversificar | Destacada | — | 800×450 | Sí (mobile) |
| 4 | Diversificar | OG | 1200×630 | — | Sí |
| 5 | Pagos tarjeta | Tarjeta | 1200×675 | 800×450 | Sí |
| 6 | Pagos tarjeta | Hero | 1920×640 | — | Sí |
| 7 | Pagos tarjeta | Destacada | — | 800×450 | Sí |
| 8 | Pagos tarjeta | OG | 1200×630 | — | Sí |
| 9 | Medios pago | Tarjeta | 1200×675 | 800×450 | Sí |
| 10 | Medios pago | Hero | 1920×640 | — | Sí |
| 11 | Medios pago | Destacada | — | 800×450 | Sí |
| 12 | Medios pago | OG | 1200×630 | — | Sí |

**Totales**

| Escenario | Archivos |
|-----------|----------|
| Mínimo viable (solo desktop klap.cl, como ahora) | 3 WebP + logo |
| Ideal responsive (logo + 4 variantes × 3 posts) | **13 archivos** (si featured mobile = card mobile) |
| Ideal + OG distinto por post + crops distintos | **16 archivos** |
| Con PNG logo @4x extra | +1 |

---

## 5. Variantes opcionales (Retina / pantallas grandes)

| Rol | Tamaño opcional | Cuándo usarlo |
|-----|-----------------|---------------|
| Tarjeta desktop @2x | **1440 × 810** | Monitores 2x y grid de 3 columnas muy ancho |
| Tarjeta mobile @3x | **960 × 540** | iPhone Pro y Android alta densidad |
| Hero desktop @2x | **2560 × 853** | Pantallas 2K+ (archivo pesado; solo si el hero se ve pixelado) |
| OG | **1200 × 630** único | Facebook, LinkedIn, Twitter, WhatsApp |

---

## 6. HTML responsive (`<picture>`)

### Tarjeta (home y relacionados)

```html
<picture>
  <source media="(max-width: 767px)" srcset="assets/images/posts/SLUG-card-mobile.webp" type="image/webp">
  <img
    src="assets/images/posts/SLUG-card-desk.webp"
    alt="Descripción"
    width="1200"
    height="675"
    loading="lazy"
  >
</picture>
```

### Artículo — hero (desktop) + destacada (mobile)

```html
<!-- Hero: solo visible ≥768px -->
<div class="article-hero__image" aria-hidden="true">
  <img src="assets/images/posts/SLUG-hero-desk.webp" alt="" width="1920" height="640">
</div>

<!-- Destacada: solo visible ≤767px -->
<div class="article-featured-image">
  <picture>
    <source media="(max-width: 767px)" srcset="assets/images/posts/SLUG-featured-mobile.webp" type="image/webp">
    <img src="assets/images/posts/SLUG-card-desk.webp" alt="Descripción" width="800" height="450" loading="eager">
  </picture>
</div>
```

> Si `featured-mobile` y `card-mobile` son el mismo archivo, usa una sola ruta en ambos sitios.

### Open Graph (cada post)

```html
<meta property="og:image" content="https://TU-DOMINIO/assets/images/posts/SLUG-og.webp">
<meta name="twitter:image" content="https://TU-DOMINIO/assets/images/posts/SLUG-og.webp">
```

---

## 7. Reglas al exportar

| Regla | Detalle |
|-------|---------|
| Formato | WebP (calidad 80–85) o JPG progresivo |
| Compresión | [Squoosh](https://squoosh.app) · [TinyPNG](https://tinypng.com) |
| Hero desktop | Composición **horizontal**; evitar texto en bordes (gradiente `article-hero::after`) |
| Tarjeta / destacada | Ratio **16:9** estricto; sujeto principal al **centro-alto** (mobile recorta con `object-position`) |
| OG | Texto legible en **centro**; no confiar en recorte automático de redes |
| Banners klap con texto incrustado | En mobile el hero está oculto precisamente por eso; usa foto **sin texto** en `featured-mobile` |
| Peso máximo | Ver tabla resumen (sección inicial) |

---

## 8. Cómo entregar las fotos

### Opción A — URLs (klap.cl o CDN)

```
Post: diversificar-metodos-de-pago
- Card desktop:  [URL]
- Card mobile:   [URL]
- Hero desktop:  [URL]
- Featured mobile: [URL]  (opcional si = card mobile)
- OG:            [URL]
```

### Opción B — Archivos en el repo

Guardar en `assets/images/posts/` con los nombres de la sección 4. Ver también `assets/IMAGENES.md` para URLs de descarga desde klap.cl.

---

## 9. Estado actual vs objetivo

| Aspecto | Ahora | Objetivo |
|---------|-------|----------|
| Assets locales | 4 SVG placeholder | WebP por rol (tabla §4) |
| Producción | 1 WebP desk por post en klap.cl | `<picture>` desk + mobile |
| Hero mobile | Oculto (CSS) | Imagen 16:9 en `.article-featured-image` |
| Hero desktop | Misma URL desk 16:9 estirada a ~3:1 | Archivo **1920×640** dedicado |
| OG | Misma imagen 16:9 desk | **1200×630** dedicado |
| Logo | SVG placeholder 120×34 | SVG oficial o PNG 220×68 |

El sitio **funciona hoy** con una sola imagen desktop gracias a `object-fit: cover` y el layout responsive. Las versiones mobile y los crops correctos mejoran nitidez, peso de descarga y apariencia en artículos y redes.

---

*Última revisión: alineada con CSS v5 (`mobile.css` / `desktop.css`) e inventario en `assets/images/`.*
