# Portfolio — María Florencia Yofre

Portfolio profesional (v1) construido con HTML5, CSS3 y JavaScript vanilla, sin frameworks. Pensado para publicarse en GitHub Pages y para poder crecer con nuevos proyectos, certificaciones y experiencia.

## Estado del proyecto

Esta es una **versión inicial (v1)**. Prioridades para las próximas iteraciones:

1. Revisar y ajustar el contenido de cada sección.
2. Reemplazar los placeholders marcados en ámbar (capturas de dashboards, links a repositorios, badge de Trailhead, formulario de contacto, LinkedIn).
3. Sumar imágenes reales en `assets/images/`.
4. Mejorar el diseño visual una vez validado el contenido.

## Estructura de archivos

```
/
├── index.html          → estructura y contenido de todas las secciones
├── style.css            → estilos, tokens de color/tipografía, responsive
├── script.js             → menú móvil, resaltado de sección activa, año dinámico
├── assets/
│   ├── images/            → capturas de dashboards, fotos, etc. (vacío por ahora)
│   └── icons/              → íconos propios si se necesitan (vacío por ahora)
└── README.md
```

## Secciones incluidas

- Hero / portada
- Sobre mí (camino, experiencia actual, formación continua, dirección futura)
- Experiencia profesional (línea de tiempo)
- Proyectos destacados
- Proyectos académicos — Data Analytics
- Certificaciones y formación
- Stack tecnológico
- Contacto

## Pendientes marcados en el código

Buscar el texto `pendiente` en `index.html` para ubicar rápidamente todos los placeholders que faltan completar (links de repositorios, capturas, formulario de contacto, LinkedIn).

## Cómo reemplazar el repositorio existente (Floryofre.github.io)

Este proyecto está pensado para reemplazar por completo el contenido actual de `Floryofre.github.io`, no para convivir con él. Pasos recomendados:

1. Clonar el repositorio existente en una carpeta de trabajo:
   ```bash
   git clone https://github.com/Floryofre/Floryofre.github.io.git
   cd Floryofre.github.io
   ```
2. (Opcional pero recomendado) Crear una rama de respaldo del portfolio anterior, por si querés recuperar algo más adelante:
   ```bash
   git checkout -b portfolio-antiguo-backup
   git push origin portfolio-antiguo-backup
   git checkout main
   ```
3. Borrar todo el contenido actual del repositorio (excepto la carpeta `.git`):
   ```bash
   find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
   ```
4. Copiar dentro de esta carpeta todos los archivos de este proyecto (`index.html`, `style.css`, `script.js`, `assets/`, `README.md`).
5. Commitear y publicar el reemplazo:
   ```bash
   git add -A
   git commit -m "Reemplazo completo del portfolio: nueva arquitectura orientada a Data, BI, Operations y Automation"
   git push origin main
   ```
6. Verificar en GitHub, en **Settings → Pages**, que la fuente siga siendo la rama `main` y la carpeta `/ (root)` (si el repo ya publicaba antes, esta configuración normalmente no cambia).
7. El sitio va a quedar publicado en `https://floryofre.github.io/` en unos minutos, con la versión nueva reemplazando por completo la anterior.

## Publicar como repositorio nuevo (alternativa)

Si preferís no tocar `Floryofre.github.io` todavía y probar primero en un repositorio aparte:

```bash
git init
git add .
git commit -m "Primera versión del portfolio"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git
git push -u origin main
```

Luego, en **Settings → Pages**, elegir **Deploy from a branch**, rama `main`, carpeta `/ (root)`. El sitio queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Notas técnicas

- No usa frameworks ni dependencias que requieran build (npm, bundlers). Es HTML/CSS/JS puro, compatible con GitHub Pages sin configuración adicional.
- Las tipografías (Space Grotesk, IBM Plex Sans, IBM Plex Mono) se cargan desde Google Fonts vía CDN.
- El menú móvil, el resaltado de sección activa y el año del footer se manejan con JavaScript vanilla en `script.js`.
- El diseño es responsive, con puntos de quiebre en 768px y 480px.
