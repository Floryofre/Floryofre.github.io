// ================= CONFIGURACION FACIL =================
const GITHUB_USER = "Floryofre"; // <--- cambia por tu usuario exacto
const EXCLUDED_REPOS = [
  // "nombre-del-repo-a-ocultar",
  // "otro-repo",
  // Ejemplo: "mi-proyecto-viejo"
];
const SHOW_FORKS = false; // true si querés mostrar forks
const SHOW_ARCHIVED = false;
const SHOW_PRIVATE_NOTE = false; // los privados no aparecen sin token, pero si usas token podrian
// ============================================================

const LANG_COLORS = {
  JavaScript:"#F7DF1E", TypeScript:"#3178C6", Python:"#3776AB", Jupyter:"#DA5B0B",
  HTML:"#E34F26", CSS:"#1572B6", "C++":"#00599C", Java:"#B07219", Shell:"#89E051",
  Dockerfile:"#384D54", "C#":"#178600", Go:"#00ADD8", Rust:"#DEA584"
};

const $grid = document.getElementById('grid');
const $profile = document.getElementById('profile');
const $search = document.getElementById('search');
const $langFilter = document.getElementById('langFilter');
const $sortBy = document.getElementById('sortBy');
const $hideForks = document.getElementById('hideForks');
const $hideArchived = document.getElementById('hideArchived');
const $counter = document.getElementById('counter');
const $empty = document.getElementById('empty');

let allRepos = [];

async function fetchJSON(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function load(){
  try{
    $hideForks.checked = !SHOW_FORKS;
    $hideArchived.checked = !SHOW_ARCHIVED;

    // Perfil
    const user = await fetchJSON(`https://api.github.com/users/${GITHUB_USER}`);
    renderProfile(user);

    // Repos - traemos hasta 100
    const repos = await fetchJSON(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=all`);
    allRepos = repos;

    // Llenar filtro de lenguajes
    const langs = [...new Set(repos.map(r=>r.language).filter(Boolean))].sort();
    langs.forEach(l=>{
      const o=document.createElement('option'); o.value=l; o.textContent=l; $langFilter.appendChild(o);
    });

    applyFilters();
  }catch(e){
    console.error(e);
    $profile.innerHTML = `<p style="color:#F2A65A;font-family:monospace">Error cargando ${GITHUB_USER}: ${e.message}. Verificá que el usuario exista y que no excediste el límite de la API (60 req/h sin login).</p>`;
  }
}

function renderProfile(u){
  $profile.innerHTML = `
    <img src="${u.avatar_url}" alt="${u.login}">
    <div>
      <h1>${u.name || u.login} <span style="color:var(--muted-2);font-weight:400;font-size:18px">@${u.login}</span></h1>
      <p>${u.bio ? u.bio : 'Colección de repositorios públicos.'}</p>
      <div style="margin-top:8px">
        <span class="badge"><b>${u.public_repos}</b> repos</span>
        <span class="badge"><b>${u.followers}</b> followers</span>
        <span class="badge"><b>${u.following}</b> following</span>
        ${u.location ? `<span class="badge">📍 ${u.location}</span>` : ''}
        ${u.blog ? `<a class="badge" href="${u.blog}" target="_blank" rel="noopener">🔗 Website</a>` : ''}
      </div>
    </div>
  `;
}

function applyFilters(){
  const q = $search.value.toLowerCase().trim();
  const lang = $langFilter.value;
  const sort = $sortBy.value;
  const hideForks = $hideForks.checked;
  const hideArchived = $hideArchived.checked;

  let filtered = allRepos.filter(r=>{
    if(EXCLUDED_REPOS.includes(r.name)) return false;
    if(hideForks && r.fork) return false;
    if(hideArchived && r.archived) return false;
    if(lang && r.language !== lang) return false;
    if(q && !(r.name.toLowerCase().includes(q) || (r.description||'').toLowerCase().includes(q) || (r.topics||[]).join(' ').toLowerCase().includes(q))) return false;
    return true;
  });

  filtered.sort((a,b)=>{
    if(sort==='stars') return b.stargazers_count - a.stargazers_count;
    if(sort==='name') return a.name.localeCompare(b.name);
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  renderGrid(filtered);
}

function renderGrid(repos){
  $grid.innerHTML = '';
  $counter.textContent = `${repos.length} repos visibles`;

  if(repos.length===0){ $empty.classList.remove('hidden'); return; }
  $empty.classList.add('hidden');

  repos.forEach(r=>{
    const isPages = r.name.toLowerCase() === `${GITHUB_USER.toLowerCase()}.github.io`;
    const color = LANG_COLORS[r.language] || '#A78BFA';
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `
      <div class="card-top">
        <h3><a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a> ${isPages ? '<span class="tag">WEB PRINCIPAL</span>' : ''} ${r.fork ? '<span class="tag" style="background:rgba(100,100,100,0.2)">FORK</span>' : ''} ${r.archived ? '<span class="tag" style="background:rgba(242,166,90,0.15);color:var(--amber)">ARCHIVADO</span>' : ''}</h3>
      </div>
      <p>${r.description ? r.description : '<span style="color:var(--muted-2)">Sin descripción — agregala en GitHub para que se vea más lindo.</span>'}</p>
      <div class="meta">
        ${r.language ? `<span class="lang"><span class="dot" style="background:${color}"></span>${r.language}</span>` : ''}
        <span class="stat">★ ${r.stargazers_count}</span>
        <span class="stat">⑂ ${r.forks_count}</span>
        <span class="stat" title="${new Date(r.updated_at).toLocaleString()}">↻ ${timeAgo(r.updated_at)}</span>
        ${(r.topics||[]).slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="actions">
        <a class="btn primary" href="${r.html_url}" target="_blank">Código</a>
        ${r.homepage ? `<a class="btn" href="${r.homepage}" target="_blank">Demo</a>` : ''}
      </div>
    `;
    $grid.appendChild(card);
  });
}

function timeAgo(dateStr){
  const diff = Date.now() - new Date(dateStr).getTime();
  const d = Math.floor(diff/86400000);
  if(d===0) return 'hoy';
  if(d===1) return 'ayer';
  if(d<30) return `hace ${d}d`;
  const m = Math.floor(d/30);
  if(m<12) return `hace ${m}m`;
  return `hace ${Math.floor(m/12)}a`;
}

$search.addEventListener('input', applyFilters);
$langFilter.addEventListener('change', applyFilters);
$sortBy.addEventListener('change', applyFilters);
$hideForks.addEventListener('change', applyFilters);
$hideArchived.addEventListener('change', applyFilters);

document.getElementById('year').textContent = new Date().getFullYear();

load();
