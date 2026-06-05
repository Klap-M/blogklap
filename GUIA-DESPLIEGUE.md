# Guía de despliegue y colaboración — Blog Klap

Checklist para subir el blog a **Vercel**, trabajar en equipo con **Cursor** y escalar el proyecto sin fricción.

---

## Resumen rápido

| Qué | Para qué | Costo |
|-----|----------|-------|
| **GitHub** | Repositorio compartido del código | Gratis |
| **Vercel** | Hosting y despliegue automático | Gratis (plan Hobby) |
| **Cursor** | Editor con IA para modificar el blog | Gratis limitado / Pro ~USD 20/mes |
| **Dominio propio** (opcional) | `blog.tudominio.cl` en vez de `*.vercel.app` | ~USD 10–15/año |
| **Python 3** (opcional) | Servidor local para previsualizar | Gratis |

> Este proyecto es **HTML + CSS + JS estático**. No necesita base de datos, backend ni variables de entorno para funcionar.

---

## Costos detallados

### Gratis (suficiente para empezar)

- **GitHub** — repositorio privado o público, colaboradores ilimitados.
- **Vercel Hobby** — hosting, HTTPS, despliegues automáticos, dominio `*.vercel.app`.
- **Cursor Free** — uso limitado de IA (suficiente para cambios puntuales).
- **Imágenes locales** — en `assets/images/`, incluidas en Vercel sin costo extra.

### De pago (opcional)

| Servicio | Plan | Precio aprox. | Cuándo conviene |
|----------|------|---------------|-----------------|
| Cursor | Pro | ~USD 20/mes por persona | Uso intensivo de IA, varios posts/semana |
| Vercel | Pro | ~USD 20/mes | Tráfico alto, equipo comercial, analytics avanzado |
| Dominio `.cl` | — | ~CLP 8.000–15.000/año | Marca propia (ej. `blog.klap.cl`) |
| Dominio `.com` | — | ~USD 10–15/año | Alternativa internacional |

### Lo que NO necesitas pagar

- Node.js / npm (el sitio no usa build)
- Base de datos
- Servidor VPS
- CDN aparte (Vercel ya incluye CDN global)

---

## Checklist — Tú (quien sube a Vercel)

### 1. Preparar el repositorio Git

```powershell
cd C:\Users\scani\Documents\blogklap
git init
git add .
git commit -m "Initial commit: blog Klap estático"
```

### 2. Crear repo en GitHub

1. Entra a [github.com/new](https://github.com/new)
2. Nombre sugerido: `blogklap`
3. Privado o público (recomendado: **privado** si es interno)
4. No marques “Add README” (ya existe contenido local)

```powershell
git remote add origin https://github.com/TU-USUARIO/blogklap.git
git branch -M main
git push -u origin main
```

### 3. Conectar Vercel

1. Cuenta en [vercel.com](https://vercel.com) (login con GitHub)
2. **Add New → Project**
3. Importa el repo `blogklap`
4. Configuración (dejar por defecto):

   | Campo | Valor |
   |-------|-------|
   | Framework Preset | **Other** |
   | Build Command | *(vacío)* |
   | Output Directory | *(vacío o `.`)* |
   | Install Command | *(vacío)* |

5. **Deploy**

En ~1 minuto tendrás una URL tipo: `https://blogklap-xxxxx.vercel.app`

### 4. Invitar al colaborador

**En GitHub:**
- Repo → **Settings → Collaborators → Add people**
- Invita por email o usuario de GitHub

**En Vercel (opcional):**
- Project → **Settings → Team / Members**
- Plan Hobby: solo el dueño del proyecto despliega; el colaborador trabaja vía GitHub y Vercel redeploya al hacer push a `main`

### 5. Dominio personalizado (opcional)

1. Vercel → Project → **Settings → Domains**
2. Agrega `blog.tudominio.cl`
3. En tu DNS (Nic Chile, Cloudflare, etc.) crea el registro que indique Vercel (CNAME o A)

---

## Checklist — Colaborador (Cursor + Git)

### Cuentas que necesita

- [ ] Cuenta **GitHub** (aceptar invitación al repo)
- [ ] **Cursor** instalado → [cursor.com](https://cursor.com)
- [ ] *(Opcional)* Cuenta Vercel solo si necesita ver logs de deploy

### Setup en su máquina

```powershell
# 1. Clonar el repo
git clone https://github.com/TU-USUARIO/blogklap.git
cd blogklap

# 2. Abrir en Cursor
cursor .
```

### Previsualizar en local

```powershell
python -m http.server 8080
```

Abrir en el navegador: **http://localhost:8080**

> Python no abre el navegador solo. Hay que entrar manualmente a esa URL.
> Para detener el servidor: `Ctrl + C` en la terminal.

### Flujo de trabajo diario

```powershell
git pull                    # Traer cambios del equipo
# ... editar archivos en Cursor ...
git add .
git commit -m "Descripción clara del cambio"
git push
```

Cada push a `main` → Vercel despliega automáticamente en ~30–60 segundos.

---

## Estructura del proyecto

```
blogklap/
├── index.html                          # Página principal (listado de posts)
├── css/
│   └── styles.css                      # Estilos globales y componentes
├── js/
│   └── main.js                         # TOC activo al hacer scroll
├── posts/
│   ├── diversificar-metodos-de-pago.html
│   ├── pagos-tarjeta-credito-debito-chile.html
│   └── medios-de-pago-chile-guia-definitiva.html
├── assets/
│   ├── IMAGENES.md                     # Guía de imágenes locales
│   └── images/
│       ├── brand/klap-logo.svg         # Logo (placeholder)
│       └── posts/                      # Fotos de cada artículo (.webp)
├── vercel.json                         # Config Vercel (URLs limpias)
├── .gitignore
└── GUIA-DESPLIEGUE.md                  # Este archivo
```

### Colores de marca Klap

| Color | Hex | Uso |
|-------|-----|-----|
| Navy | `#002b49` | Textos, header, footer, tablas |
| Verde | `#26d07c` | Acentos, categorías, CTAs |
| Gris claro | `#f8f9fa` | Fondos alternos |

### Logo

Archivo local: `assets/images/brand/klap-logo.svg` (placeholder incluido).

Reemplazar por `klap-logo.png` cuando lo descargues manualmente. Ver **`assets/IMAGENES.md`**.

---

## Imágenes sin klap.cl — alternativas

Si **no puedes subir fotos a klap.cl**, no pasa nada. El blog ya está preparado para usar imágenes **locales en el repositorio**.

### Opción recomendada: carpeta `assets/` + Vercel (gratis)

| Ventaja | Detalle |
|---------|---------|
| Costo | **USD 0** — viaja con el código en GitHub |
| Control | Tú y tu equipo suben/reemplazan archivos directo |
| Velocidad | Vercel sirve las imágenes con CDN global |
| Sin permisos | No necesitas acceso al CMS de klap.cl |

**Flujo:**

1. Guarda la imagen en `assets/images/posts/nombre-articulo.webp`
2. Referencia en HTML: `assets/images/posts/nombre-articulo.webp`
3. `git add` → `git commit` → `git push` → Vercel publica automáticamente

Guía detallada de nombres y tamaños: **`assets/IMAGENES.md`**

**Para obtener las fotos actuales desde klap.cl:** ábrelas en Chrome → clic derecho → *Guardar imagen como…* → pon el nombre indicado en `assets/IMAGENES.md`. (Los scripts automáticos fallan por Cloudflare.)

### Otras alternativas (si el repo pesa mucho)

| Servicio | Costo | Cuándo usarlo |
|----------|-------|---------------|
| **Cloudinary** | Gratis hasta ~25 GB/mes | Muchas imágenes, resize automático |
| **ImgBB / Imgur** | Gratis | Solo pruebas — no recomendado en producción |
| **Google Drive / Dropbox** | Gratis | **No usar** — enlaces inestables, malo para SEO |
| **Vercel Blob** | De pago tras límite | Proyectos con cientos de MB de media |

### Qué NO hacer

- Hotlinking permanente a klap.cl (si pierdes acceso, se rompen todas las fotos)
- Subir imágenes de 5 MB sin comprimir (ralentiza el blog)
- Usar URLs de WhatsApp o Google Drive como `src` de `<img>`

### Después del deploy en Vercel

Busca y reemplaza `blogklap.vercel.app` por tu dominio real en:

- `og:image` y `twitter:image` de cada post
- Campo `"image"` del JSON-LD
- `link rel="canonical"` (si ya no apuntará a klap.cl)

**Find & replace en Cursor:** `Ctrl + Shift + H` → `blogklap.vercel.app` → `tu-proyecto.vercel.app`

---

## Cómo agregar un nuevo post

1. **Duplicar** un HTML existente en `posts/` (ej. `posts/nuevo-articulo.html`)
2. **Actualizar** en ese archivo:
   - `<title>`, meta description, keywords, canonical
   - Open Graph y Twitter Card
   - JSON-LD (`BlogPosting`)
   - Hero: imagen, título, fecha, breadcrumb
   - Contenido en `.prose`
   - Sección **Blog relacionado** (enlazar 2 posts distintos)
   - Tags al final
3. **Agregar tarjeta** en `index.html` (grid de posts)
4. **Agregar entrada** en el JSON-LD de `index.html` (`blogPost` array)
5. **Actualizar** “Blog relacionado” en los otros posts si aplica
6. Commit + push → Vercel despliega solo

### Prompt útil en Cursor

```
Agrega un nuevo post al blog Klap siguiendo la estructura de
posts/diversificar-metodos-de-pago.html. Título: [TITULO].
Contenido: [PEGAR TEXTO]. Imagen local: assets/images/posts/nombre.webp. Fecha: [FECHA].
Actualiza index.html y la sección de blogs relacionados en los otros posts.
```

---

## Archivos clave al editar

| Si quieres cambiar… | Archivo |
|---------------------|---------|
| Estilos globales, colores, componentes | `css/styles.css` |
| Listado de artículos en home | `index.html` |
| Contenido de un artículo | `posts/nombre-del-post.html` |
| Comportamiento TOC | `js/main.js` |
| Configuración Vercel | `vercel.json` |

---

## SEO — qué revisar antes de publicar

- [ ] `<title>` único por página (máx. ~60 caracteres)
- [ ] `<meta name="description">` única (~150–160 caracteres)
- [ ] `link rel="canonical"` apunta a la URL final (Vercel o klap.cl)
- [ ] Imágenes con `alt` descriptivo
- [ ] JSON-LD `BlogPosting` con fecha e imagen
- [ ] Un solo `<h1>` por página
- [ ] Enlaces internos entre posts (related posts)

### Pendiente recomendado (aún no creado)

- [ ] `robots.txt` en la raíz
- [ ] `sitemap.xml` con todas las URLs
- [ ] Reemplazar placeholders SVG por fotos WebP reales en `assets/images/posts/`
- [ ] Actualizar `blogklap.vercel.app` por tu dominio real en meta OG/JSON-LD

---

## Solución de problemas

| Problema | Solución |
|----------|----------|
| `python` no reconocido | Instalar Python desde [python.org](https://www.python.org/downloads/) marcando “Add to PATH” |
| CSS no carga en local | Verificar que abres `http://localhost:8080`, no el archivo directo (`file://`) |
| Vercel muestra 404 en posts | Verificar rutas: `posts/nombre.html` y que exista el archivo en el repo |
| Cambios no aparecen en producción | Confirmar `git push` a `main` y revisar deploy en Vercel Dashboard |
| Imágenes rotas | Verificar que el archivo exista en `assets/images/posts/` y que la ruta en HTML coincida |
| Colaborador no puede push | Confirmar invitación aceptada en GitHub → Collaborators |

---

## Checklist final antes de ir a producción

### Repositorio
- [ ] Código en GitHub
- [ ] Colaborador invitado y con acceso
- [ ] `.gitignore` incluido (no subir `.vercel`, `.env`)

### Vercel
- [ ] Proyecto conectado al repo
- [ ] Deploy exitoso (estado “Ready”)
- [ ] URL de preview probada en móvil y desktop
- [ ] *(Opcional)* Dominio custom configurado

### Contenido
- [ ] Los 3 posts cargan correctamente
- [ ] Logo Klap visible en header y footer
- [ ] Blogs relacionados al final de cada post
- [ ] Links internos funcionan

### Equipo
- [ ] Colaborador clonó el repo
- [ ] Colaborador puede correr servidor local
- [ ] Acordaron rama de trabajo (`main` directo o `develop` + PRs)

---

## Contacto y recursos

- Vercel docs (sitios estáticos): https://vercel.com/docs/concepts/deployments/static-deployments
- Cursor docs: https://docs.cursor.com
- GitHub colaboración: https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository

---

*Última actualización: mayo 2026 — Blog Klap (HTML estático)*
