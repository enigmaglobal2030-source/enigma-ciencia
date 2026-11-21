// Genera el sitio estático de Enigma Ciencia a partir de data/articulos.json.
// Uso: node build.js
// Salida: index.html, articulo/*.html, acerca.html, contacto.html, privacidad.html, sitemap.xml, robots.txt

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SITE = "https://www.enigmaciencia.com";
const GOOGLE_VERIFICATION = "60OQwXNBe3P9nVm1IpDHfyjJXsXt2p-ibGQ8s8H_Hz8";
const EMAIL = process.env.CONTACT_EMAIL || "engimaglobal2030@gmail.com";
const FB = "https://www.facebook.com/profile.php?id=61581561126366";
const YT = "https://www.youtube.com/channel/UC3ipBC64xkxwqhT9S4ZBRfA";

const articles = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "articulos.json"), "utf8"));
// Orden de publicación: más reciente primero; a igual fecha, el id más alto.
articles.sort((p, q) => (q.date || "").localeCompare(p.date || "") || q.id - p.id);
const CATEGORIES = [
  "Astronomía y Espacio",
  "Física Cuántica",
  "Medicina y Biotecnología",
  "Robótica y Automatización",
  "Salud",
  "Tecnología",
  "Agricultura y Sostenibilidad",
  "Medioambiente",
  "Neurociencia",
  "Inteligencia Artificial",
  "Espacio y exploración",
  "Economía",
  "Antropología y Paleontología",
];

const MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fmtDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

function articleUrl(a) {
  return `/articulo/${a.slug}`;
}

function placeholder(category) {
  return `https://placehold.co/800x600/f1f5f9/334155?text=${encodeURIComponent(category)}`;
}

function head({ title, description, canonical, image, type = "website", jsonld = null }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${esc(canonical)}">
  <meta name="google-site-verification" content="${GOOGLE_VERIFICATION}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="${type}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:image" content="${esc(image)}">
  <link rel="preload" as="image" href="${esc(image)}" fetchpriority="high">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(image)}">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Crect x='2' y='4' width='6' height='22' rx='3' fill='%23f07150'/%3E%3Crect x='12' y='4' width='6' height='22' rx='3' fill='%2338bdf8'/%3E%3Crect x='22' y='4' width='6' height='22' rx='3' fill='%233b82f6'/%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
  <script>(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.setAttribute("data-theme","dark")}}catch(e){}})();</script>
  <link rel="stylesheet" href="/styles.css">
  <style>
    html[data-theme="dark"] body { background-color: #0b1f3a; color: #e6f0fb; }
    html[data-theme="dark"] header { background-color: rgba(11,31,58,.95) !important; border-color: #1f3a60 !important; }
    html[data-theme="dark"] .bg-white { background-color: #12294a !important; }
    html[data-theme="dark"] [class*="bg-white/"] { background-color: rgba(18,41,74,.9) !important; }
    html[data-theme="dark"] .bg-slate-50 { background-color: #0f2544 !important; }
    html[data-theme="dark"] .bg-slate-100, html[data-theme="dark"] .bg-slate-200 { background-color: #1f3a60 !important; }
    html[data-theme="dark"] .bg-slate-900 { background-color: #061426 !important; }
    html[data-theme="dark"] .text-slate-900 { color: #e6f0fb !important; }
    html[data-theme="dark"] .text-slate-700, html[data-theme="dark"] .text-slate-800 { color: #c3d3e8 !important; }
    html[data-theme="dark"] .text-slate-600, html[data-theme="dark"] .text-slate-500 { color: #9fb4cf !important; }
    html[data-theme="dark"] .text-slate-400 { color: #7f93ad !important; }
    html[data-theme="dark"] .border-slate-200, html[data-theme="dark"] .border-slate-300 { border-color: #1f3a60 !important; }
    html[data-theme="dark"] .article-body p { color: #c3d3e8; }
    html[data-theme="dark"] .article-body h2, html[data-theme="dark"] .article-body h3, html[data-theme="dark"] .article-body strong { color: #e6f0fb; }
    .theme-toggle { border: 1px solid #94a3b8; border-radius: 999px; padding: 4px 10px; font-size: 12px; font-weight: 700; color: #0f172a; background: transparent; cursor: pointer; white-space: nowrap; }
    html[data-theme="dark"] .theme-toggle { color: #e6f0fb; border-color: #3b5a85; }
    html[data-theme="dark"] [class*="text-[#0b1f3a]"], html[data-theme="dark"] [class*="text-[#0f172a]"], html[data-theme="dark"] [class*="text-[#1e1b18]"] { color: #e6f0fb !important; }
    html[data-theme="dark"] [class*="bg-slate-200/"] { background-color: rgba(31,58,96,.75) !important; }
    html[data-theme="dark"] .hover\:bg-slate-200:hover { background-color: #2a4a75 !important; }
    body { font-family: 'Inter', sans-serif; background-color: #f1f5f9; color: #0b1f3a; }
    .editorial-serif { font-family: 'Lora', serif; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .article-body p { margin-bottom: 1.5rem; line-height: 1.85; font-size: 1.125rem; color: #334155; }
    .article-body h2, .article-body h3 { font-family: 'Lora', serif; font-weight: 700; color: #0f172a; margin-top: 2.5rem; margin-bottom: 1rem; }
    .article-body h2 { font-size: 1.75rem; }
    .article-body h3 { font-size: 1.5rem; }
    .article-body strong { color: #0f172a; }
    .article-body a { color: #0284c7; text-decoration: underline; }
    img { max-width: 100%; height: auto; display: block; }
    .article-card { content-visibility: auto; contain-intrinsic-size: 420px; }
    img[src*="/thumb/"], img[src*="placehold.co"], img[src*="upload.wikimedia.org"] { max-height: 280px; width: 100%; object-fit: cover; }
    @media (min-width: 768px) { img[src*="/thumb/"], img[src*="placehold.co"], img[src*="upload.wikimedia.org"] { max-height: 420px; } }
  </style>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6763372649272480" crossorigin="anonymous"></script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-VCJDRN3D3Y"></script>
  <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-VCJDRN3D3Y');</script>
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="theme-color" content="#0284c7">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180.png">
  <script>if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");</script>
  <script>document.addEventListener("DOMContentLoaded",function(){var b=document.getElementById("theme-toggle");if(!b)return;function isDark(){return document.documentElement.getAttribute("data-theme")==="dark"}function sync(){var d=isDark();b.textContent=d?"Modo claro":"Modo oscuro";b.setAttribute("aria-label",d?"Cambiar a modo claro":"Cambiar a modo oscuro")}sync();b.addEventListener("click",function(){var d=isDark();if(d){document.documentElement.removeAttribute("data-theme")}else{document.documentElement.setAttribute("data-theme","dark")}try{localStorage.setItem("theme",d?"light":"dark")}catch(e){}sync()})});</script>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>`;
}

function header() {
  return `
<header class="sticky top-0 z-50 bg-[#f1f5f9]/95 backdrop-blur border-b border-slate-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-0 sm:h-20 flex flex-wrap items-center justify-between gap-y-2">
    <a href="/" class="flex items-center space-x-3" aria-label="Enigma Ciencia, inicio">
      <div class="flex items-center space-x-1 h-6">
        <div class="w-1.5 h-full bg-[#f07150] rounded-full -skew-x-12"></div>
        <div class="w-1.5 h-full bg-[#38bdf8] rounded-full -skew-x-12"></div>
        <div class="w-1.5 h-full bg-[#3b82f6] rounded-full -skew-x-12"></div>
      </div>
      <span class="text-sm sm:text-xl font-black tracking-tight text-slate-900 font-mono uppercase">Enigma Ciencia</span>
    </a>
    <nav class="flex flex-wrap gap-y-2 w-full sm:w-auto items-center justify-between sm:justify-end gap-x-4 sm:gap-x-6 text-xs sm:text-sm font-semibold text-slate-700">
      <a href="/#articulos" class="hover:text-[#0284c7]">Artículos</a>
      <a href="/acerca" class="hover:text-[#0284c7]">Acerca</a>
      <a href="/criterios-editoriales" class="hover:text-[#0284c7]">Criterios editoriales</a>
      <a href="/contacto" class="hover:text-[#0284c7]">Contacto</a>
      <a href="${FB}" target="_blank" rel="noopener noreferrer" class="text-[#1877F2] hover:underline">Facebook</a>
      <a href="${YT}" target="_blank" rel="noopener noreferrer" class="text-[#FF0000] hover:underline">YouTube</a>
      <button type="button" id="theme-toggle" class="theme-toggle" aria-label="Cambiar a modo oscuro">Modo oscuro</button>
    </nav>
  </div>
</header>`;
}

function footer() {
  return `
<footer class="bg-slate-900 text-slate-300 mt-20 py-12 px-4 sm:px-8 border-t border-slate-800">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
    <div>
      <span class="text-base font-bold text-white uppercase tracking-wider font-mono">Enigma Ciencia</span>
      <p class="text-xs text-slate-400 mt-1">Edición oficial EnigmaGlobal.</p>
      <p class="text-xs text-sky-400 mt-1 font-mono">${EMAIL}</p>
    </div>
    <div class="text-center text-sm text-slate-400">
      <p>© 2026 Enigma Ciencia. Todos los derechos reservados.</p>
      <p class="text-xs text-[#0284c7] mt-1">Divulgación científica rigurosa y accesible.</p>
    </div>
    <nav class="flex justify-center md:justify-end space-x-6 text-sm text-slate-400">
      <a href="/acerca" class="hover:text-white">Acerca</a>
      <a href="/criterios-editoriales" class="hover:text-white">Criterios editoriales</a>
      <a href="/contacto" class="hover:text-white">Contacto</a>
      <a href="/privacidad" class="hover:text-white">Privacidad</a>
      <a href="/terminos-de-uso" class="hover:text-white">Términos de uso</a>
      <a href="/publicidad" class="hover:text-white">Publicidad</a>
    </nav>
  </div>
</footer>`;
}

function mediaHtml(a, large = false, priority = false) {
  const h = large ? "h-80" : "h-56";
  if (a.isMontage && a.montage) {
    return `<div class="relative w-full ${h} flex overflow-hidden bg-slate-900">
      <div class="w-1/2 h-full relative overflow-hidden border-r-2 border-white/90">
        <img src="${esc(a.montage.left)}" alt="${esc(a.montage.labelLeft)}" class="w-full h-full object-cover" width="800" height="600" loading="${large || priority ? "eager" : "lazy"}" fetchpriority="${large || priority ? "high" : "auto"}" decoding="async">
        <div class="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">${esc(a.montage.labelLeft)}</div>
      </div>
      <div class="w-1/2 h-full relative overflow-hidden">
        <img src="${esc(a.montage.right)}" alt="${esc(a.montage.labelRight)}" class="w-full h-full object-cover" width="800" height="600" loading="${large || priority ? "eager" : "lazy"}" fetchpriority="${large || priority ? "high" : "auto"}" decoding="async">
        <div class="absolute bottom-2 right-2 bg-[#0284c7]/95 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">${esc(a.montage.labelRight)}</div>
      </div>
    </div>`;
  }
  return `<img src="${esc(a.image)}" alt="${esc(a.title)}" class="w-full ${h} object-cover" width="800" height="600" loading="${large || priority ? "eager" : "lazy"}" fetchpriority="${large || priority ? "high" : "auto"}" decoding="async" onerror="this.src='${placeholder(a.category)}'">`;
}

function card(a, index = 0) {
  const text = `${a.title} ${a.summary} ${a.category}`.toLowerCase();
  return `
  <article class="article-card bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#0284c7]/50 transition-all group flex flex-col justify-between shadow-sm" data-cat="${esc(a.category)}" data-text="${esc(text)}">
    <a href="${articleUrl(a)}" class="block">
      <div class="relative overflow-hidden h-56 bg-slate-100">
        ${mediaHtml(a, false, index < 3)}
        <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0284c7] text-white shadow-md ring-1 ring-white/30 z-10">${esc(a.category)}</span>
      </div>
      <div class="p-6 sm:p-8 space-y-3">
        <time datetime="${a.date}" class="text-xs font-mono text-slate-400">${fmtDate(a.date)}</time>
        <h3 class="editorial-serif text-xl font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug">${esc(a.title)}</h3>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">${esc(a.summary)}</p>
      </div>
      <div class="px-6 sm:px-8 pb-6 sm:pb-8 text-sm font-semibold text-[#0284c7]">Leer artículo →</div>
    </a>
  </article>`;
}

function indexPage() {
  const latest = articles[0].date;
  const counts = { Todas: articles.length };
  CATEGORIES.forEach((c) => (counts[c] = articles.filter((a) => a.category === c).length));
  const pills = ["Todas", ...CATEGORIES]
    .map(
      (c, i) => `<button type="button" data-filter="${esc(c)}" class="filter-btn px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
        i === 0 ? "bg-slate-900 text-white" : "bg-slate-200/70 hover:bg-slate-200 text-slate-700"
      }">${esc(c)} <span class="font-mono text-[10px] ${i === 0 ? "text-sky-400" : "text-slate-500"}">${String(counts[c] || 0).padStart(2, "0")}</span></button>`
    )
    .join("");

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "Enigma Ciencia",
    legalName: "EnigmaGlobal",
    url: SITE,
    email: EMAIL,
    sameAs: [FB, YT],
  };

  return `${head({
    title: "Enigma Ciencia | La ciencia en contexto",
    description: "Te mantenemos informado de los avances científicos que están cambiando el mundo con rigor y claridad.",
    canonical: `${SITE}/`,
    image: articles[0].image,
    jsonld,
  })}
<body class="min-h-screen flex flex-col">
${header()}
<div class="border-b border-slate-200 bg-white/60">
  <div class="max-w-7xl mx-auto px-4 sm:px-8 h-11 flex items-center gap-4">
    <span class="flex items-center gap-2 text-[11px] font-bold tracking-widest text-[#0284c7] whitespace-nowrap"><span class="w-2 h-2 rounded-full bg-[#f07150]"></span>EN DIRECTO</span>
    <div class="flex items-center gap-6 overflow-x-auto no-scrollbar font-mono text-[11px] uppercase text-slate-700 whitespace-nowrap">${articles.slice(0, 5).map((a) => `<span>${esc(a.title)}</span>`).join('<span class="text-[#0284c7]">•</span>')}</div>
  </div>
</div>
<main class="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full space-y-12">
  <div class="max-w-2xl mx-auto w-full">
      <label for="search-input" class="sr-only">Buscar artículos</label>
      <input type="search" id="search-input" placeholder="Buscar historias..." class="w-full px-4 py-3.5 bg-transparent border-b-2 border-slate-300 focus:border-[#0284c7] text-slate-900 placeholder-slate-400 focus:outline-none text-base">
  </div>

  <section class="space-y-6">
    <p class="font-mono text-xs tracking-widest text-[#0284c7] uppercase">Curiosidad con método · Edición oficial EnigmaGlobal</p>
    <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <h1 class="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.95] text-[#0b1f3a]">La ciencia,<br><span class="italic font-normal editorial-serif tracking-normal" style="background:linear-gradient(90deg,#0284c7,#3b82f6);-webkit-background-clip:text;background-clip:text;color:transparent">en contexto.</span></h1>
      <div class="max-w-md space-y-3 lg:pb-3">
        <p class="text-slate-600 text-lg leading-relaxed">Te mantenemos informado de los avances científicos que están cambiando el mundo, con rigor y claridad.</p>
        <p class="text-xs text-slate-500">Última publicación: ${fmtDate(latest)}</p>
      </div>
    </div>
  </section>

  <!-- AdSense: colocar aquí el bloque superior cuando la cuenta esté aprobada -->
  <div class="ad-slot" data-ad="top"></div>

  <section id="articulos" class="space-y-6 pt-4 border-t border-slate-200">
    <div class="text-xs font-bold uppercase tracking-widest text-slate-500">Explorar</div>
    <div id="category-filters" class="flex flex-wrap items-center gap-3 pb-2 pt-1">${pills}</div>
    <p id="articles-count" class="text-xs font-mono text-slate-500">Mostrando ${articles.length} artículos</p>
    <div id="articles-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${articles.map((a, i) => card(a, i)).join("")}
    </div>
    <p id="no-results" class="hidden text-center text-slate-500 py-12">No se encontraron artículos con ese criterio.</p>
  </section>

  <!-- AdSense: colocar aquí el bloque intermedio cuando la cuenta esté aprobada -->
  <div class="ad-slot" data-ad="middle"></div>
</main>
${footer()}
<script>
(function () {
  var buttons = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.article-card');
  var input = document.getElementById('search-input');
  var countEl = document.getElementById('articles-count');
  var noResults = document.getElementById('no-results');
  var state = { cat: 'Todas', q: '' };

  function apply() {
    var visible = 0;
    cards.forEach(function (c) {
      var okCat = state.cat === 'Todas' || c.getAttribute('data-cat') === state.cat;
      var okQ = !state.q || c.getAttribute('data-text').indexOf(state.q) !== -1;
      var show = okCat && okQ;
      c.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    countEl.textContent = 'Mostrando ' + visible + ' artículo' + (visible === 1 ? '' : 's');
    noResults.classList.toggle('hidden', visible !== 0);
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      state.cat = b.getAttribute('data-filter');
      buttons.forEach(function (x) {
        var on = x === b;
        x.classList.toggle('bg-slate-900', on);
        x.classList.toggle('text-white', on);
        x.classList.toggle('bg-slate-200/70', !on);
        x.classList.toggle('text-slate-700', !on);
      });
      apply();
    });
  });


  input.addEventListener('input', function () {
    state.q = input.value.trim().toLowerCase();
    apply();
  });
})();
</script>
</body>
</html>
`;
}

function relatedHtml(a) {
  const related = articles.filter((x) => x.id !== a.id && x.category === a.category).slice(0, 3);
  if (related.length === 0) return "";
  return `
  <section class="max-w-3xl mx-auto mt-16 space-y-6">
    <h2 class="editorial-serif text-2xl font-bold text-slate-900">Más sobre ${esc(a.category)}</h2>
    <ul class="space-y-4">
      ${related
        .map(
          (r) => `<li><a href="${articleUrl(r)}" class="block p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#0284c7]/50">
        <span class="text-xs font-mono text-slate-400">${fmtDate(r.date)}</span>
        <span class="block editorial-serif text-lg font-bold text-slate-900 mt-1">${esc(r.title)}</span>
      </a></li>`
        )
        .join("")}
    </ul>
  </section>`;
}

function shareHtml(a, url) {
  const t = encodeURIComponent(a.title);
  const u = encodeURIComponent(url);
  const btn = "inline-flex items-center px-3 py-1.5 rounded-full border border-slate-300 bg-white text-slate-700 hover:border-[#0284c7] hover:text-[#0284c7] text-xs font-semibold";
  return `
    <div class="mt-8 flex flex-wrap items-center gap-2">
      <span class="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">Compartir</span>
      <a href="https://wa.me/?text=${t}%20${u}" target="_blank" rel="noopener noreferrer" class="${btn}">WhatsApp</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener noreferrer" class="${btn}">Facebook</a>
      <a href="https://twitter.com/intent/tweet?text=${t}&url=${u}" target="_blank" rel="noopener noreferrer" class="${btn}">X</a>
      <a href="mailto:?subject=${t}&body=${u}" class="${btn}">Correo</a>
      <button type="button" data-copy="${esc(url)}" class="copy-link ${btn}">Copiar enlace</button>
      <button type="button" data-native="${esc(url)}" data-title="${esc(a.title)}" class="native-share hidden ${btn}">Compartir</button>
    </div>
    <script>
      document.querySelectorAll('.copy-link').forEach(function (b) {
        b.addEventListener('click', function () {
          var url = b.getAttribute('data-copy');
          var done = function () { b.textContent = 'Enlace copiado'; };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(done, function () {});
          }
        });
      });
      var nb = document.querySelector('.native-share');
      if (nb && navigator.share) {
        nb.classList.remove('hidden');
        nb.addEventListener('click', function () {
          navigator.share({ title: nb.getAttribute('data-title'), url: nb.getAttribute('data-native') }).catch(function () {});
        });
      }
    </script>`;
}

function readingMinutes(a) {
  const words = String(a.content || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function articlePage(a) {
  const url = `${SITE}${articleUrl(a)}`;
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description: a.summary,
    image: [a.isMontage && a.montage ? a.montage.left : a.image],
    datePublished: a.date,
    dateModified: a.date,
    author: { "@type": "Organization", name: "Enigma Ciencia" },
    publisher: { "@type": "Organization", name: "Enigma Ciencia", email: EMAIL },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return `${head({
    title: `${a.title} | Enigma Ciencia`,
    description: a.summary,
    canonical: url,
    image: a.isMontage && a.montage ? a.montage.left : a.image,
    type: "article",
    jsonld,
  })}
<body class="min-h-screen flex flex-col">
${header()}
<main class="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14 w-full">
  <nav class="text-xs text-slate-500 mb-6"><a href="/" class="hover:text-[#0284c7]">Inicio</a> / <span>${esc(a.category)}</span></nav>
  <article>
    <header class="space-y-3 mb-6">
      <span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-100 text-[#0284c7]">${esc(a.category)}</span>
      <h1 class="editorial-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">${esc(a.title)}</h1>
      <p class="flex items-center gap-2 text-sm font-semibold text-green-600"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" d="M12 7v5l3 2"></path></svg>${readingMinutes(a)} ${readingMinutes(a) === 1 ? "minuto" : "minutos"} de lectura</p>
      <p class="text-sm text-slate-500">${esc(a.summary)}</p>
      <time datetime="${a.date}" class="block text-xs font-mono text-slate-500">${fmtDate(a.date)} · Enigma Ciencia</time>
    </header>
    <div class="mb-6"><button type="button" id="escuchar" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 bg-white text-slate-700 hover:border-[#0284c7] hover:text-[#0284c7] text-sm font-semibold">Escuchar artículo</button></div>
    <figure class="mb-8"><div class="rounded-2xl overflow-hidden shadow-sm">${mediaHtml(a, true)}</div>${a.imageCaption ? `<figcaption class="text-slate-500 mt-2" style="font-size:9px;line-height:1.3">${esc(a.imageCaption)}</figcaption>` : ""}</figure>
    <div class="article-body">${a.content}</div>
    <div class="mt-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
      <h2 class="text-xs uppercase tracking-wider font-bold text-[#0284c7]">Fuentes</h2>
      <p class="text-sm text-slate-600" style="overflow-wrap:anywhere">${esc(a.sources)}</p>
    </div>
    ${shareHtml(a, url)}
    <script>(function(){var b=document.getElementById("escuchar");if(!b||!("speechSynthesis" in window)){if(b)b.remove();return;}function texto(){var c=document.querySelector(".article-body");var h=document.querySelector("article h1");return (h?h.innerText+". ":"")+(c?c.innerText:"");}function parar(){speechSynthesis.cancel();b.textContent="Escuchar artículo";}b.addEventListener("click",function(){if(speechSynthesis.speaking){parar();return;}try{var u=new SpeechSynthesisUtterance(texto());u.lang="es-MX";var voces=speechSynthesis.getVoices()||[];var v=voces.find(function(x){return x.lang&&x.lang.indexOf("es")===0;});if(v)u.voice=v;u.rate=1;u.onend=parar;u.onerror=parar;b.textContent="Detener lectura";speechSynthesis.speak(u);}catch(e){parar();}});})();</script>
  </article>
  ${relatedHtml(a)}
  <p class="mt-12"><a href="/" class="text-sm font-semibold text-[#0284c7] hover:underline">← Volver a todos los artículos</a></p>
</main>
${footer()}
</body>
</html>
`;
}

function simplePage({ slug, title, description, body }) {
  return `${head({ title: `${title} | Enigma Ciencia`, description, canonical: `${SITE}/${slug}`, image: articles[0].image })}
<body class="min-h-screen flex flex-col">
${header()}
<main class="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14 w-full article-body">
  <h1 class="editorial-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-6">${esc(title)}</h1>
  ${body}
</main>
${footer()}
</body>
</html>
`;
}

const pages = {
  acerca: simplePage({
    slug: "acerca",
    title: "Acerca de Enigma Ciencia",
    description: "Quiénes somos y cómo trabajamos en Enigma Ciencia.",
    body: `<p>Enigma Ciencia es una edición de divulgación científica de EnigmaGlobal. Nuestro objetivo es explicar descubrimientos, investigaciones, avances médicos y desarrollos tecnológicos con claridad, contexto y rigor.</p>
<p>Publicamos información sobre ciencia, medicina, biotecnología, astronomía, inteligencia artificial, robótica, medioambiente y otras áreas relacionadas con el conocimiento científico y tecnológico.</p>
<h2>Nuestra misión</h2>
<p>Procuramos que cada artículo ayude a responder tres preguntas: qué ocurrió, qué evidencia existe y qué significa realmente, incluidos sus límites.</p>
<p>Distinguimos entre resultados de laboratorio, estudios en animales, ensayos clínicos, resultados preliminares, artículos revisados por pares, comunicados institucionales, decisiones regulatorias y aplicaciones disponibles.</p>
<p>Cada artículo incluye sus fuentes al final. Cuando una información procede de una empresa, universidad, organismo público o comunicado institucional, procuramos indicarlo claramente. También señalamos cuando un dato es preliminar, procede de una fuente interesada o todavía requiere confirmación independiente.</p>
<h2>Responsabilidad editorial</h2>
<p>El contenido publicado es responsabilidad editorial de Enigma Ciencia, edición oficial de EnigmaGlobal. Priorizamos la precisión sobre el impacto del titular y procuramos que los títulos sean atractivos y comprensibles sin exagerar los resultados.</p>
<p>Las herramientas digitales y de inteligencia artificial pueden utilizarse como apoyo para la investigación, organización, redacción, revisión o creación de materiales visuales. El contenido final debe revisarse antes de su publicación y las afirmaciones relevantes deben contrastarse con fuentes adecuadas.</p>
<h2>Información médica</h2>
<p>Los artículos relacionados con enfermedades, tratamientos, ensayos clínicos y productos sanitarios tienen carácter informativo y divulgativo. No constituyen diagnóstico, consejo médico ni recomendación de tratamiento. Las decisiones relacionadas con la salud deben consultarse con un profesional sanitario cualificado.</p>
<h2>Correcciones y contacto</h2>
<p>Si detectas un error factual, una cifra incorrecta, un enlace roto o una interpretación que deba revisarse, puedes escribirnos a <a href="mailto:${EMAIL}">${EMAIL}</a>. Las correcciones se revisan comparándolas con fuentes primarias, publicaciones científicas, registros clínicos o documentos institucionales disponibles.</p>
<p>Para conocer con más detalle nuestro proceso de selección, verificación, correcciones, uso de inteligencia artificial y transparencia, consulta nuestros <a href="/criterios-editoriales">Criterios editoriales</a>.</p>`,
  }),
  criteriosEditoriales: simplePage({
    slug: "criterios-editoriales",
    title: "Criterios editoriales",
    description: "Cómo seleccionamos, verificamos y corregimos los contenidos de Enigma Ciencia.",
    body: `<p>Enigma Ciencia prepara contenidos de divulgación científica a partir de fuentes identificables y procura explicar cada tema dentro de su contexto real.</p>
<h2>Selección de temas</h2>
<p>Seleccionamos temas relacionados con avances científicos, investigaciones, medicina, biotecnología, astronomía, inteligencia artificial, robótica, medioambiente y tecnología.</p>
<p>La relevancia de un tema no depende únicamente de que sea tendencia. También consideramos la calidad de la evidencia, el interés público, la importancia de sus posibles consecuencias y la posibilidad de explicarlo de forma responsable.</p>
<h2>Fuentes y verificación</h2>
<p>Según el tema, podemos consultar artículos científicos revisados por pares, registros de ensayos clínicos, documentos de organismos reguladores, universidades, instituciones científicas, informes internacionales, comunicados de empresas, presentaciones corporativas, evaluaciones externas y bases de datos especializadas.</p>
<p>Las fuentes principales aparecen al final de cada artículo. No consideramos equivalentes un artículo científico, un comunicado empresarial, una publicación en redes sociales, una presentación corporativa o una evaluación comercial. Cada fuente se presenta según su naturaleza y sus limitaciones.</p>
<p>Antes de publicar procuramos comprobar nombres, fechas, cifras, tamaños de muestra, fases de investigación, estados regulatorios, enlaces, resultados principales y limitaciones del estudio. Cuando una cifra procede de una empresa o de un evaluador externo, se atribuye expresamente a esa fuente.</p>
<p>Cuando una información no puede confirmarse de forma independiente, se presenta como preliminar, estimación, afirmación de una fuente o dato pendiente de verificación.</p>
<h2>Ensayos clínicos y noticias médicas</h2>
<p>En los temas médicos distinguimos entre investigación preclínica, estudios en animales, ensayos de fase 1, fase 2 y fase 3, resultados preliminares, aprobación regulatoria, disponibilidad comercial y uso clínico establecido.</p>
<p>Una aprobación regulatoria no significa que un tratamiento sea adecuado para todas las personas. Del mismo modo, un resultado positivo en un ensayo no equivale necesariamente a una cura ni garantiza beneficios a largo plazo.</p>
<h2>Titulares y contexto</h2>
<p>Los titulares deben ser claros, atractivos y comprensibles, pero no deben afirmar más de lo que permiten los datos. Cuando sea necesario, el desarrollo del artículo aclara si un resultado es relativo, preliminar, experimental, limitado a una población concreta o todavía no confirmado por una autoridad independiente.</p>
<h2>Correcciones y actualizaciones</h2>
<p>Si detectamos un error factual después de publicar un artículo, procuramos corregirlo con base en fuentes verificables. Las correcciones importantes pueden acompañarse de una nota explicativa. Cuando una actualización cambia sustancialmente el contenido, procuramos indicar la fecha de actualización.</p>
<p>No cambiamos artificialmente la fecha de publicación de un artículo antiguo para hacerlo parecer nuevo. Para comunicar una posible corrección, escribe a <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
<h2>Uso de inteligencia artificial</h2>
<p>Enigma Ciencia puede utilizar herramientas de inteligencia artificial como apoyo para investigar, organizar información, preparar borradores, revisar textos o crear imágenes ilustrativas.</p>
<p>La inteligencia artificial no sustituye la verificación editorial. Los nombres, cifras, fechas, fuentes, afirmaciones médicas y estados regulatorios deben revisarse antes de publicar. No publicamos afirmaciones generadas automáticamente sin revisión humana y sin contrastarlas con fuentes adecuadas.</p>
<p>Cuando una imagen haya sido generada o modificada mediante inteligencia artificial, procuramos indicarlo en el pie de imagen cuando sea relevante para que el lector entienda su naturaleza. Las imágenes ilustrativas no deben interpretarse como fotografías reales de pacientes, investigadores, laboratorios, productos o acontecimientos concretos.</p>
<h2>Transparencia y conflictos de interés</h2>
<p>La mención de una empresa, institución, tratamiento, medicamento o tecnología no implica respaldo comercial ni recomendación. Cuando una fuente tiene un interés directo en el resultado comunicado —por ejemplo, una empresa que informa sobre su propio ensayo clínico— procuramos indicarlo expresamente.</p>
<p>Enigma Ciencia busca diferenciar el contenido editorial de la publicidad, los materiales promocionales y las comunicaciones comerciales.</p>
<h2>Enlaces e imágenes</h2>
<p>Enlazamos a revistas científicas, universidades, organismos públicos, registros de ensayos clínicos, instituciones internacionales, empresas, bases de datos y medios especializados para que los lectores puedan consultar la información original. No controlamos el contenido ni las políticas de privacidad de los sitios externos.</p>
<p>Las imágenes pueden proceder de archivos propios, fuentes con licencia, repositorios autorizados, instituciones científicas o ilustraciones creadas con herramientas digitales o de inteligencia artificial. Procuramos conservar las atribuciones correspondientes y evitar que una ilustración se interprete como una fotografía documental.</p>
<h2>Responsabilidad</h2>
<p>El contenido de Enigma Ciencia tiene finalidad informativa y divulgativa. Los lectores deben consultar las fuentes originales y, en los temas médicos, recurrir a profesionales cualificados para recibir orientación individual.</p>`,
  }),
  contacto: simplePage({
    slug: "contacto",
    title: "Contacto",
    description: "Escríbenos a Enigma Ciencia.",
    body: `<p>Para correcciones, colaboraciones o consultas, escribe a <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`,
  }),
  privacidad: simplePage({
    slug: "privacidad",
    title: "Política de privacidad",
    description: "Cómo Enigma Ciencia trata los datos de sus lectores.",
    body: `<p>Esta política explica de forma general cómo Enigma Ciencia trata la información técnica y de navegación de las personas que visitan el sitio. Enigma Ciencia es una edición de divulgación científica de EnigmaGlobal.</p>
<h2>Datos que se recopilan</h2>
<p>Enigma Ciencia no exige crear una cuenta ni solicita datos personales para leer los artículos. El sitio puede recibir información técnica básica asociada a la navegación, como páginas visitadas, fecha y hora aproximada de acceso, tipo de dispositivo, navegador, sistema operativo, país o región aproximada, fuente de procedencia y datos técnicos necesarios para entregar las páginas.</p>
<p>No utilizamos el sitio para solicitar datos médicos, información financiera ni información sensible de los lectores.</p>
<h2>Cookies y tecnologías similares</h2>
<p>El sitio puede utilizar cookies técnicas y tecnologías similares necesarias para su funcionamiento. También puede utilizar servicios de terceros relacionados con medición de audiencia, seguridad, funcionamiento técnico y publicidad.</p>
<p>Las cookies pueden almacenarse en el dispositivo del visitante según la configuración del navegador y las preferencias de privacidad aplicables.</p>
<h2>Google Analytics</h2>
<p>Enigma Ciencia puede utilizar Google Analytics 4 para comprender cómo se utiliza el sitio y mejorar la experiencia de lectura. Esta herramienta puede registrar información técnica o agregada, según la configuración del servicio y la normativa aplicable, como páginas visitadas, duración aproximada de la visita, dispositivo, navegador, país o región aproximada, fuente de procedencia e interacciones generales con el sitio.</p>
<p>Enigma Ciencia no utiliza Google Analytics para identificar personalmente a los lectores. La información puede ser procesada por Google conforme a sus propias políticas y condiciones.</p>
<h2>Google AdSense y publicidad</h2>
<p>Enigma Ciencia puede mostrar anuncios proporcionados por Google AdSense y otros proveedores publicitarios autorizados. Google y sus partners pueden utilizar cookies, identificadores u otras tecnologías para mostrar anuncios basados en la visita actual, visitas anteriores o intereses inferidos, de acuerdo con la configuración del usuario y la normativa aplicable.</p>
<p>Los usuarios pueden gestionar sus preferencias de publicidad en la <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Configuración de anuncios de Google</a> y consultar opciones adicionales para controlar la publicidad personalizada en <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">About Ads</a>.</p>
<p>Cuando corresponda por la ubicación del usuario o por la normativa aplicable, Enigma Ciencia podrá mostrar mensajes de consentimiento o preferencias de privacidad mediante las herramientas proporcionadas por Google.</p>
<h2>Enlaces externos</h2>
<p>Los artículos pueden incluir enlaces a revistas científicas, universidades, organismos públicos, empresas, registros de ensayos clínicos y otros sitios externos. Enigma Ciencia no controla las políticas de privacidad, cookies, seguridad o tratamiento de datos de esos sitios.</p>
<h2>Comunicación por correo electrónico</h2>
<p>Si una persona escribe al correo oficial de Enigma Ciencia, la dirección y el contenido del mensaje podrán utilizarse únicamente para responder a la consulta, revisar una posible corrección, atender una colaboración o gestionar una comunicación editorial. No vendemos ni cedemos las direcciones recibidas por correo electrónico para fines publicitarios.</p>
<h2>Seguridad y cambios</h2>
<p>Enigma Ciencia procura aplicar medidas razonables para proteger la información recibida. Sin embargo, ningún sistema de transmisión o almacenamiento por Internet puede garantizar seguridad absoluta.</p>
<p>Esta política puede actualizarse cuando cambien las herramientas utilizadas, la normativa aplicable o la estructura del sitio. La versión vigente estará disponible en esta página.</p>
<h2>Contacto sobre privacidad</h2>
<p>Para preguntas relacionadas con esta política o con el tratamiento de información, escribe a <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`,
  }),
  terminosUso: simplePage({
    slug: "terminos-de-uso",
    title: "Términos de uso",
    description: "Condiciones generales de uso de los contenidos de Enigma Ciencia.",
    body: `<p>El acceso y uso de Enigma Ciencia implica la aceptación de estas condiciones generales.</p>
<h2>Finalidad informativa</h2>
<p>El contenido del sitio se ofrece con finalidad informativa y divulgativa. No constituye asesoramiento médico, jurídico, financiero, técnico ni profesional personalizado.</p>
<p>Los artículos médicos, farmacológicos y biotecnológicos no sustituyen la consulta con un profesional sanitario. Las decisiones relacionadas con la salud deben tomarse con orientación cualificada.</p>
<h2>Fuentes y enlaces externos</h2>
<p>Los artículos pueden enlazar a fuentes externas cuyo contenido no está bajo el control de Enigma Ciencia. La información científica puede cambiar cuando aparecen nuevos estudios, resultados o decisiones regulatorias.</p>
<h2>Uso de los contenidos</h2>
<p>Los lectores pueden consultar, compartir y enlazar los contenidos del sitio siempre que no los presenten de forma engañosa, no eliminen las atribuciones y no hagan pasar el contenido de Enigma Ciencia como propio.</p>
<p>La reproducción íntegra de artículos requiere autorización previa. Las citas breves con atribución y enlace a la página original están permitidas dentro de los límites aplicables.</p>
<h2>Actualizaciones</h2>
<p>Enigma Ciencia puede actualizar, corregir, reorganizar o retirar contenidos cuando sea necesario para mantener su precisión, seguridad o coherencia editorial.</p>
<p>Para comunicar un error o solicitar una aclaración, escribe a <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`,
  }),
  publicidad: simplePage({
    slug: "publicidad",
    title: "Política de publicidad",
    description: "Cómo se separan la publicidad y el contenido editorial en Enigma Ciencia.",
    body: `<p>Enigma Ciencia puede mostrar anuncios proporcionados por Google AdSense y, eventualmente, por otros proveedores publicitarios autorizados. La publicidad ayuda a financiar el mantenimiento, la investigación y la producción editorial del sitio.</p>
<h2>Separación editorial</h2>
<p>La publicidad se mantiene separada del contenido editorial. La aparición de un anuncio, empresa, marca, producto o servicio no significa que Enigma Ciencia lo recomiende o lo respalde.</p>
<p>La mención de una empresa, universidad, medicamento, producto o tecnología en un artículo no implica por sí misma una relación comercial.</p>
<h2>Independencia y transparencia</h2>
<p>Enigma Ciencia no acepta pagos para alterar las conclusiones científicas de un artículo ni para presentar publicidad como si fuera contenido editorial. Procuramos diferenciar las comunicaciones comerciales, los materiales promocionales y la información periodística o divulgativa.</p>
<h2>Interacciones publicitarias</h2>
<p>Los usuarios no deben hacer clic en los anuncios propios del sitio ni solicitar a otras personas que lo hagan. El tráfico y las interacciones publicitarias deben ser auténticos.</p>
<p>Para consultas relacionadas con publicidad o transparencia editorial, escribe a <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`,
  }),
};

function sitemap() {
  const today = articles[0].date;
  const urls = [
    { loc: `${SITE}/`, lastmod: today, priority: "1.0" },
    ...articles.map((a) => ({ loc: `${SITE}${articleUrl(a)}`, lastmod: a.date, priority: "0.8" })),
    { loc: `${SITE}/acerca`, lastmod: today, priority: "0.3" },
    { loc: `${SITE}/criterios-editoriales`, lastmod: today, priority: "0.3" },
    { loc: `${SITE}/contacto`, lastmod: today, priority: "0.3" },
    { loc: `${SITE}/privacidad`, lastmod: today, priority: "0.2" },
    { loc: `${SITE}/terminos-de-uso`, lastmod: today, priority: "0.2" },
    { loc: `${SITE}/publicidad`, lastmod: today, priority: "0.2" },
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>
`;
}

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

// Limpieza de salidas anteriores de artículos
const artDir = path.join(ROOT, "articulo");
fs.rmSync(artDir, { recursive: true, force: true });

write("index.html", indexPage());
articles.forEach((a) => write(`articulo/${a.slug}.html`, articlePage(a)));
write("acerca.html", pages.acerca);
write("criterios-editoriales.html", pages.criteriosEditoriales);
write("contacto.html", pages.contacto);
write("privacidad.html", pages.privacidad);
write("terminos-de-uso.html", pages.terminosUso);
write("publicidad.html", pages.publicidad);
write("sitemap.xml", sitemap());
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`OK: index + ${articles.length} artículos + 6 páginas + sitemap + robots`);
