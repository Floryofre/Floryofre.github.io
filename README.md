# Floryofre.github.io — Vitrina de Repositorios

Portfolio minimalista que muestra automáticamente todos tus repositorios públicos de GitHub. Sin frameworks, sin build, solo HTML/CSS/JS vanilla.

**Live:** https://floryofre.github.io/

### ✨ Qué hace

- Se conecta a `api.github.com/users/Floryofre/repos` y lista todo solo
- Muestra perfil, bio, descripción, lenguaje con color, estrellas, forks, topics y fecha de actualización
- Buscador por nombre/descripción/topic
- Filtro por lenguaje (dinámico)
- Ordenar por recientes / estrellas / A-Z
- Ocultar forks y archivados con checkbox
- Detecta `Floryofre.github.io` y lo marca como WEB PRINCIPAL
- Responsive, dark mode con acentos lila/rosa

### ⚙️ Configuración (2 minutos)

Todo se configura en `script.js` arriba del todo:

```js
const GITHUB_USER = "Floryofre"; // tu usuario exacto de GitHub

const EXCLUDED_REPOS = [
  // "mi-repo-feo",
  // "apuntes-viejos"
]; // repos que NO querés mostrar en la web (siguen públicos en GitHub)

const SHOW_FORKS = false; // true si querés mostrar forks
const SHOW_ARCHIVED = false;
```

#### ¿Cómo ocultar un repo?

**Opción 1 - Recomendada:** Agregarlo a `EXCLUDED_REPOS`. Sigue público pero no aparece en la vitrina.

**Opción 2:** Poner el repo en privado en GitHub > Settings > Danger Zone > Change visibility. La API pública no trae privados, así que desaparece automático.

**Opción 3:** Archivar el repo. Con `SHOW_ARCHIVED = false` no se muestra.

### 🚀 Cómo subirlo a GitHub Pages

1. Cloná o abrí tu repo `Floryofre.github.io`
2. Subí `index.html`, `style.css`, `script.js` (y este README)
3. Commit: `Nueva vitrina de repos automática`
4. Push a `main`
5. En Settings > Pages, asegurate que esté en `Deploy from branch: main / root`
6. En 1-2 min queda live en `https://TU_USUARIO.github.io/`

No necesita `npm install` ni build.

### 📝 Tips para que quede más lindo

En GitHub, en cada repo:

- **Add description:** poné una descripción corta (aparece en la card)
- **Add topics:** ej: `power-bi`, `python`, `data-analytics` (se ven como tags)
- **Website:** si tiene demo/deploy, poné el link en la cajita Website del repo (aparece botón Demo)

### Límite API

GitHub permite 60 requests/hora sin autenticación por IP. Para un portfolio personal sobra. Si superás el límite, espera una hora o agregá un token (versión futura).

---
Hecho con GitHub API — se actualiza sola.
© Florencia Yofre
