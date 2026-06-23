# Anthony Montagioni — Portfolio

Portfolio estático y responsive de Anthony Montagioni, Full Stack Developer especializado en Java, Spring Boot, Angular, automatización con IA y ciberseguridad.

GitHub: [github.com/montaggionii](https://github.com/montaggionii)

No requiere backend, base de datos, servicios de pago ni tarjeta bancaria. Puede publicarse gratis en GitHub Pages, Netlify o Vercel.

> El SEO técnico asume la URL recomendada `https://montaggionii.github.io/`. Si publicas el sitio con otro nombre de repositorio o dominio, actualiza la URL canónica, `sitemap.xml`, `robots.txt`, Open Graph y JSON-LD.

## Tecnologías

- HTML5, CSS3 y JavaScript vanilla.
- Diseño responsive, animaciones con `IntersectionObserver` y accesibilidad por teclado.
- Java, Spring Boot, Angular, APIs REST, MySQL, MongoDB, n8n, OpenAI y prácticas de ciberseguridad como contenido del portfolio.
- GitHub Actions para compilación y despliegue automático en GitHub Pages.

## Caso de estudio principal

FidelyFood es el Trabajo Final de Grado de Anthony Montagioni: una plataforma de fidelización multi-restaurante construida con Angular/Ionic, Java, Spring Boot, MySQL, JWT y API REST. El caso de estudio técnico está disponible en [projects/fidelyfood/](projects/fidelyfood/) y la memoria oficial se publica junto a la página.

## Catálogo y estado de los proyectos

El catálogo público está disponible en [projects/](projects/). Distingue entre proyectos con evidencia pública, proyectos que todavía están en documentación, experiencia profesional cuya evidencia no puede publicarse por confidencialidad y un roadmap técnico marcado explícitamente como no completado. No presenta demos, métricas ni repositorios como disponibles cuando no existe una URL pública verificable.

## Capturas

No se incluyen capturas estáticas para que el repositorio permanezca ligero. La vista definitiva se puede revisar localmente con `npm run dev` o en la URL de GitHub Pages después de publicar.

## Requisitos

- [Node.js 18 o superior](https://nodejs.org/)
- Git (solo para publicar en GitHub Pages)

No hay dependencias externas de npm: `npm install` no descarga paquetes, pero es seguro ejecutarlo si quieres inicializar el proyecto como cualquier otro proyecto Node.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre `http://localhost:4173` en el navegador. Para detener el servidor, pulsa `Ctrl + C`.

## Compilar el sitio

```bash
npm run build
```

El resultado se genera en `dist/`. Es una carpeta estática y autónoma, preparada para subirla directamente a cualquier hosting estático gratuito.

### Foto profesional

La foto profesional se encuentra en `src/assets/images/profile-anthony.png`. La web la incorpora en el Hero y en la sección **Sobre mí**, con avatar de respaldo `AM` únicamente si el archivo no puede cargarse.

La foto actual está en PNG. Para reducir la carga inicial en una futura optimización, conviene conservar una copia optimizada de menos de 500 KB, manteniendo una resolución cuadrada de al menos 800 × 800 px. La imagen se muestra con `object-fit: cover` y no se deforma.

### CV descargable

La imagen original del CV se encuentra en `public/cv/Anthony_Montaggioni_CV.png`. El botón **Descargar CV** fuerza la descarga de este PNG y **Ver CV** lo abre en una nueva pestaña. No se modifica ni se convierte el diseño del CV.

Para revisar exactamente esa versión compilada:

```bash
npm run preview
```

## Publicación recomendada: GitHub Pages

Esta es la recomendación para este proyecto: es HTML, CSS y JavaScript estático, por lo que GitHub Pages permite alojarlo gratis, sin proveedores adicionales y junto al código. El workflow incluido compila y publica automáticamente cada cambio enviado a `main`.

1. Crea un repositorio público en GitHub dentro de [montaggionii](https://github.com/montaggionii) llamado exactamente `montaggionii.github.io`. No inicialices README, licencia ni `.gitignore` en GitHub.
2. Los datos de contacto ya están configurados: LinkedIn, `montaggioni29@gmail.com` y el perfil de GitHub `https://github.com/montaggionii`.
3. Desde esta carpeta, sube el repositorio:

   ```bash
   git init
   git add .
   git commit -m "Portfolio personal"
   git branch -M main
   git remote add origin https://github.com/montaggionii/montaggionii.github.io.git
   git push -u origin main
   ```

4. En GitHub entra en **Settings → Pages**.
5. En **Build and deployment**, selecciona **GitHub Actions** como fuente.
6. Espera a que finalice el workflow **Deploy portfolio to GitHub Pages** en la pestaña **Actions**.

Tu enlace público será:

```
https://montaggionii.github.io/
```

Esta estructura permite que las rutas de imágenes, CV, favicon, manifest, sitemap y robots funcionen desde la raíz del dominio sin prefijos adicionales.

## Alternativa: Netlify Free

1. Ejecuta `npm run build`.
2. Crea una cuenta gratuita en [Netlify](https://www.netlify.com/).
3. Elige **Add new site → Deploy manually** y arrastra la carpeta `dist/`.
4. Netlify generará una URL pública como `https://mi-portfolio.netlify.app`.

También puedes conectar el repositorio de GitHub y configurar:

- Build command: `npm run build`
- Publish directory: `dist`

El archivo `netlify.toml` ya deja esos valores configurados al importar el repositorio.

## Alternativa: Vercel Free

1. Sube el proyecto a GitHub.
2. Crea una cuenta gratuita en [Vercel](https://vercel.com/) e importa el repositorio.
3. Configura el comando de build como `npm run build` y el directorio de salida como `dist`.
4. Pulsa **Deploy**. Recibirás una dirección como `https://mi-portfolio.vercel.app`.

El archivo `vercel.json` incluye la misma configuración de build para que Vercel la detecte automáticamente.

## Formulario de contacto

El formulario funciona sin backend mediante `mailto:`: abre el cliente de correo de la persona visitante con el mensaje rellenado. No recoge ni almacena datos en servicios externos.

Si más adelante prefieres recepción de formularios sin depender del cliente de correo, puedes conectar Formspree Free o Netlify Forms, pero no es necesario para publicar esta versión.

## Estructura

```text
.
├── .github/workflows/deploy-pages.yml  # Despliegue automático gratuito
├── public/cv/                           # CV PNG descargable
├── public/projects/fidelyfood/           # Memoria TFG y diagramas SVG
├── projects/                             # Catálogo y casos de estudio técnicos
├── assets/                               # CSS y JavaScript del caso de estudio
├── dist/                               # Sitio compilado para publicar
├── scripts/build.mjs                   # Build sin dependencias
├── scripts/serve.mjs                   # Servidor local sin dependencias
├── src/assets/images/                   # Foto profesional profile-anthony.png
├── index.html
├── styles.css
├── deployment.css
├── profile.css
├── audit.css
└── script.js
```

## Coste

La configuración no requiere hosting de pago, dominio propio, backend, base de datos, API privada ni tarjeta bancaria. Un dominio personalizado es opcional; la URL pública gratuita de GitHub Pages, Netlify o Vercel es suficiente para compartir el portfolio.
