# Tamaños de imágenes — Blog Klap

Guía de dimensiones para enviar fotos **desktop** y **mobile**. Formato recomendado: **WebP** (alternativa JPG).

---

## Resumen rápido

| Imagen | Desktop | Mobile | Peso máx. |
|--------|---------|--------|-----------|
| Logo Klap | 440 × 136 px | *(misma)* | 25 KB |
| Post — tarjeta home | 1200 × 675 px | 800 × 450 px | 150 / 80 KB |
| Post — hero artículo | 1920 × 640 px | 800 × 600 px | 200 / 100 KB |
| Open Graph (redes) | 1200 × 630 px | *(misma)* | 200 KB |

---

## 1. Logo Klap

| Versión | Tamaño (px) | Ratio | Uso |
|---------|-------------|-------|-----|
| **Única** | **440 × 136** | libre | Header + footer (PNG con fondo transparente o SVG) |

> En pantalla se muestra a ~110 × 34 px. Exporta a **2×** para pantallas Retina.

**Nombre sugerido:** `klap-logo.png` o `klap-logo.svg`

---

## 2. Imágenes de posts (3 artículos actuales)

Necesitas **2 versiones por post**: desktop y mobile.

### Post 1 — Diversificar métodos de pago

| Versión | Tamaño (px) | Ratio | Nombre sugerido |
|---------|-------------|-------|-----------------|
| Desktop | **1200 × 675** | 16:9 | `diversificar-metodos-de-pago-desk.webp` |
| Mobile | **800 × 450** | 16:9 | `diversificar-metodos-de-pago-mobile.webp` |
| Hero desktop | **1920 × 640** | ~3:1 | `diversificar-metodos-de-pago-hero-desk.webp` |
| Hero mobile | **800 × 600** | 4:3 | `diversificar-metodos-de-pago-hero-mobile.webp` |
| Open Graph | **1200 × 630** | 1.91:1 | `diversificar-metodos-de-pago-og.webp` |

### Post 2 — Pagos con tarjeta crédito/débito

| Versión | Tamaño (px) | Ratio | Nombre sugerido |
|---------|-------------|-------|-----------------|
| Desktop | **1200 × 675** | 16:9 | `pagos-tarjeta-desk.webp` |
| Mobile | **800 × 450** | 16:9 | `pagos-tarjeta-mobile.webp` |
| Hero desktop | **1920 × 640** | ~3:1 | `pagos-tarjeta-hero-desk.webp` |
| Hero mobile | **800 × 600** | 4:3 | `pagos-tarjeta-hero-mobile.webp` |
| Open Graph | **1200 × 630** | 1.91:1 | `pagos-tarjeta-og.webp` |

### Post 3 — Medios de pago en Chile (guía)

| Versión | Tamaño (px) | Ratio | Nombre sugerido |
|---------|-------------|-------|-----------------|
| Desktop | **1200 × 675** | 16:9 | `medios-de-pago-chile-desk.webp` |
| Mobile | **800 × 450** | 16:9 | `medios-de-pago-chile-mobile.webp` |
| Hero desktop | **1920 × 640** | ~3:1 | `medios-de-pago-chile-hero-desk.webp` |
| Hero mobile | **800 × 600** | 4:3 | `medios-de-pago-chile-hero-mobile.webp` |
| Open Graph | **1200 × 630** | 1.91:1 | `medios-de-pago-chile-og.webp` |

---

## 3. Dónde se usa cada tamaño

```
HOME (index.html)
└── post-card imagen  →  desk 1200×675  /  mobile 800×450

ARTÍCULO (posts/*.html)
├── article-hero fondo  →  hero-desk 1920×640  /  hero-mobile 800×600
├── post-card related     →  desk 1200×675  /  mobile 800×450
└── og:image / Twitter    →  og 1200×630

HEADER + FOOTER
└── logo  →  440×136 PNG
```

---

## 4. Cómo enviarme las fotos

### Opción A — Links (lo más rápido para presentar)

Sube a klap.cl, Cloudinary o donde tengas acceso y pásame:

```
Post: diversificar-metodos-de-pago
- Desktop card: [URL]
- Mobile card:  [URL]
- Hero desktop: [URL]
- Hero mobile:  [URL]
- OG:           [URL]
```

### Opción B — Archivos locales

Guarda en `assets/images/posts/` con los nombres de la tabla y avísame.

---

## 5. HTML responsive (cuando tengas mobile)

Cuando tengas ambas versiones, el HTML usa `<picture>`:

```html
<picture>
  <source media="(max-width: 767px)" srcset="URL-IMAGEN-MOBILE.webp">
  <img src="URL-IMAGEN-DESKTOP.webp" alt="Descripción" width="1200" height="675" loading="lazy">
</picture>
```

---

## 6. Reglas al exportar

| Regla | Detalle |
|-------|---------|
| Formato | WebP preferido, JPG aceptable |
| Compresión | [Squoosh.app](https://squoosh.app) o TinyPNG |
| Peso desktop card | máx. **150 KB** |
| Peso mobile card | máx. **80 KB** |
| Peso hero desktop | máx. **200 KB** |
| Peso hero mobile | máx. **100 KB** |
| Safe zone mobile | Deja margen en bordes — en hero el texto va encima |
| Texto en imagen | Evitar texto pequeño en mobile (se lee mal) |

---

## 7. Checklist total de archivos a preparar

| # | Archivo | Desktop | Mobile |
|---|---------|---------|--------|
| 1 | Logo | 440×136 | — |
| 2 | Diversificar — card | 1200×675 | 800×450 |
| 3 | Diversificar — hero | 1920×640 | 800×600 |
| 4 | Diversificar — OG | 1200×630 | — |
| 5 | Pagos tarjeta — card | 1200×675 | 800×450 |
| 6 | Pagos tarjeta — hero | 1920×640 | 800×600 |
| 7 | Pagos tarjeta — OG | 1200×630 | — |
| 8 | Medios pago — card | 1200×675 | 800×450 |
| 9 | Medios pago — hero | 1920×640 | 800×600 |
| 10 | Medios pago — OG | 1200×630 | — |

**Total mínimo para presentación:** 3 imágenes desktop (las que ya tienes en klap.cl).  
**Total ideal:** 19 archivos (logo + 6 por post × 3 posts, compartiendo OG si quieres).

---

## 8. Mientras tanto (ahora)

El sitio usa las imágenes **desktop de klap.cl** en todos los tamaños. Se ven bien en mobile gracias al CSS (`object-fit: cover`, grids a 1 columna, tablas con scroll). Cuando tengas versiones mobile, las integramos con `<picture>`.
