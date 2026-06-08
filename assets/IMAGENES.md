# Imágenes del blog

Si **no puedes subir fotos a klap.cl**, guarda todo aquí. Vercel las publica automáticamente al hacer deploy (sin costo extra).

## Estructura

```
assets/images/
├── brand/
│   ├── klap-logo.svg          ← Placeholder incluido (reemplazar por PNG oficial)
│   └── klap-logo.png          ← Logo oficial (descargar manualmente)
└── posts/
    ├── diversificar-metodos-de-pago.webp
    ├── pagos-tarjeta.webp
    ├── medios-de-pago-chile.webp
    ├── segundo-local-crecer-negocio.png
    ├── que-es-un-pos.png
    └── elegir-mejor-maquina-pos.png
```

## Cómo obtener las imágenes desde klap.cl

1. Abre cada URL en el **navegador** (no desde script/terminal — Cloudflare bloquea bots).
2. Clic derecho → **Guardar imagen como…**
3. Guarda con el nombre exacto de la tabla.

| Archivo a guardar | URL original (abrir en Chrome) |
|-------------------|-------------------------------|
| `brand/klap-logo.png` | https://www.klap.cl/image/layout_set_logo?img_id=293212&t=1779856204840 |
| `posts/diversificar-metodos-de-pago.webp` | https://www.klap.cl/documents/35879/1203994/diversificar-metodos-de-pago-desk.webp/44ac0611-190c-777d-4565-b5d94a8f7903 |
| `posts/pagos-tarjeta.webp` | https://www.klap.cl/documents/35879/1203970/como-funcionan-las-ventas-con+tarjeta-desk.webp/f42c126a-b8ba-d3c4-cb8e-4e3ac1bd72a4 |
| `posts/medios-de-pago-chile.webp` | https://www.klap.cl/documents/35879/1203946/medios_de_pago_en_chile-desk.webp/11517769-b59d-31d3-53d3-5a63ff9b71fd |

## Imágenes nuevas para posts futuros

1. Exporta en **WebP** (recomendado) o JPG, ancho ~1200px.
2. Nombre en minúsculas con guiones: `mi-nuevo-articulo.webp`
3. Guárdala en `assets/images/posts/`
4. En el HTML del post usa:

```html
<!-- Desde index.html -->
<img src="assets/images/posts/mi-nuevo-articulo.webp" alt="Descripción" width="800" height="450" loading="lazy">

<!-- Desde posts/mi-post.html -->
<img src="../assets/images/posts/mi-nuevo-articulo.webp" alt="Descripción" width="800" height="450" loading="lazy">
```

## Tamaño recomendado

| Tipo | Dimensiones | Peso máx. |
|------|-------------|-----------|
| Hero / card de post | 1200 × 675 px (16:9) | ~150 KB |
| Logo | ~220 × 68 px PNG | ~20 KB |
| Imagen inline en artículo | 800 px ancho | ~100 KB |

Comprime con [Squoosh](https://squoosh.app) o [TinyPNG](https://tinypng.com) antes de subir al repo.

## Meta tags Open Graph (redes sociales)

Después del primer deploy en Vercel, actualiza las URLs absolutas en cada post:

```html
<meta property="og:image" content="https://TU-PROYECTO.vercel.app/assets/images/posts/nombre.webp">
```

Reemplaza `TU-PROYECTO.vercel.app` por tu dominio real.
