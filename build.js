// Genera el sitio estático de Enigma Ciencia a partir de data/articulos.json.
// Uso: node build.js
// Salida: index.html, articulo/*.html, acerca.html, contacto.html, privacidad.html, sitemap.xml, robots.txt

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SITE = "https://www.enigmaciencia.com";
const GOOGLE_VERIFICATION = "60OQwXNBe3P9nVm1IpDHfyjJXsXt2p-ibGQ8s8H_Hz8";
const EMAIL = process.env.CONTACT_EMAIL || "";
if (!EMAIL) { console.error("Falta la variable CONTACT_EMAIL (correo de contacto del sitio)."); process.exit(1); }
const FB = "https://www.facebook.com/profile.php?id=61581561126366";
const YT = "https://www.youtube.com/channel/UC3ipBC64xkxwqhT9S4ZBRfA";

const articles = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "articulos.json"), "utf8"));
const CATEGORIES = [
  "Astronomía y Espacio",
  "Física Cuántica",
  "Medicina y Biotecnología",
  "Robótica y Automatización",
  "Salud",
  "Tecnología",
  "Agricultura y Sostenibilidad",
  "Medioambiente",
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
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(image)}">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Crect x='2' y='4' width='6' height='22' rx='3' fill='%23e05638'/%3E%3Crect x='12' y='4' width='6' height='22' rx='3' fill='%230ea5e9'/%3E%3Crect x='22' y='4' width='6' height='22' rx='3' fill='%232563eb'/%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #f7f6f2; color: #1e1b18; }
    .editorial-serif { font-family: 'Lora', serif; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .article-body p { margin-bottom: 1.5rem; line-height: 1.85; font-size: 1.125rem; color: #334155; }
    .article-body h3 { font-family: 'Lora', serif; font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-top: 2.5rem; margin-bottom: 1rem; }
    .article-body strong { color: #0f172a; }
    img { max-width: 100%; height: auto; display: block; }
    img[src*="/thumb/"], img[src*="placehold.co"], img[src*="upload.wikimedia.org"] { max-height: 280px; width: 100%; object-fit: cover; }
    @media (min-width: 768px) { img[src*="/thumb/"], img[src*="placehold.co"], img[src*="upload.wikimedia.org"] { max-height: 420px; } }
  </style>
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="theme-color" content="#e05638">
  <link rel="apple-touch-icon" href="/icons/icon-192.png">
  <script>if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");</script>
  ${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>`;
}

function header() {
  return `
<header class="sticky top-0 z-50 bg-[#f7f6f2]/95 backdrop-blur border-b border-slate-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-0 sm:h-20 flex flex-wrap items-center justify-between gap-y-2">
    <a href="/" class="flex items-center space-x-3" aria-label="Enigma Ciencia, inicio">
      <div class="flex items-center space-x-1 h-6">
        <div class="w-1.5 h-full bg-[#e05638] rounded-full -skew-x-12"></div>
        <div class="w-1.5 h-full bg-[#0ea5e9] rounded-full -skew-x-12"></div>
        <div class="w-1.5 h-full bg-[#2563eb] rounded-full -skew-x-12"></div>
      </div>
      <span class="text-sm sm:text-xl font-black tracking-tight text-slate-900 font-mono uppercase">Enigma Ciencia</span>
    </a>
    <nav class="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-x-4 sm:gap-x-6 text-xs sm:text-sm font-semibold text-slate-700">
      <a href="/#articulos" class="hover:text-[#e05638]">Artículos</a>
      <a href="/acerca" class="hover:text-[#e05638]">Acerca</a>
      <a href="/contacto" class="hover:text-[#e05638]">Contacto</a>
      <a href="${FB}" target="_blank" rel="noopener noreferrer" class="text-[#1877F2] hover:underline">Facebook</a>
      <a href="${YT}" target="_blank" rel="noopener noreferrer" class="text-[#FF0000] hover:underline">YouTube</a>
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
      <p class="text-xs text-orange-400 mt-1 font-mono">${EMAIL}</p>
    </div>
    <div class="text-center text-sm text-slate-400">
      <p>© 2026 Enigma Ciencia. Todos los derechos reservados.</p>
      <p class="text-xs text-[#e05638] mt-1">Divulgación científica rigurosa y accesible.</p>
    </div>
    <nav class="flex justify-center md:justify-end space-x-6 text-sm text-slate-400">
      <a href="/acerca" class="hover:text-white">Acerca</a>
      <a href="/contacto" class="hover:text-white">Contacto</a>
      <a href="/privacidad" class="hover:text-white">Privacidad</a>
    </nav>
  </div>
</footer>`;
}

function mediaHtml(a, large = false) {
  const h = large ? "h-80" : "h-56";
  if (a.isMontage && a.montage) {
    return `<div class="relative w-full ${h} flex overflow-hidden bg-slate-900">
      <div class="w-1/2 h-full relative overflow-hidden border-r-2 border-white/90">
        <img src="${esc(a.montage.left)}" alt="${esc(a.montage.labelLeft)}" class="w-full h-full object-cover" loading="${large ? "eager" : "lazy"}">
        <div class="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">${esc(a.montage.labelLeft)}</div>
      </div>
      <div class="w-1/2 h-full relative overflow-hidden">
        <img src="${esc(a.montage.right)}" alt="${esc(a.montage.labelRight)}" class="w-full h-full object-cover" loading="${large ? "eager" : "lazy"}">
        <div class="absolute bottom-2 right-2 bg-[#e05638]/95 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">${esc(a.montage.labelRight)}</div>
      </div>
    </div>`;
  }
  return `<img src="${esc(a.image)}" alt="${esc(a.title)}" class="w-full ${h} object-cover" loading="${large ? "eager" : "lazy"}" onerror="this.src='${placeholder(a.category)}'">`;
}

function card(a) {
  const text = `${a.title} ${a.summary} ${a.category}`.toLowerCase();
  return `
  <article class="article-card bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#e05638]/50 transition-all group flex flex-col justify-between shadow-sm" data-cat="${esc(a.category)}" data-text="${esc(text)}">
    <a href="${articleUrl(a)}" class="block">
      <div class="relative overflow-hidden h-56 bg-slate-100">
        ${mediaHtml(a)}
        <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-[#e05638] shadow-sm z-10">${esc(a.category)}</span>
      </div>
      <div class="p-6 sm:p-8 space-y-3">
        <time datetime="${a.date}" class="text-xs font-mono text-slate-400">${fmtDate(a.date)}</time>
        <h3 class="editorial-serif text-xl font-bold text-slate-900 group-hover:text-[#e05638] transition-colors leading-snug">${esc(a.title)}</h3>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">${esc(a.summary)}</p>
      </div>
      <div class="px-6 sm:px-8 pb-6 sm:pb-8 text-sm font-semibold text-[#e05638]">Leer artículo →</div>
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
      }">${esc(c)} <span class="font-mono text-[10px] ${i === 0 ? "text-orange-400" : "text-slate-500"}">${String(counts[c] || 0).padStart(2, "0")}</span></button>`
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
    <span class="flex items-center gap-2 text-[11px] font-bold tracking-widest text-[#e05638] whitespace-nowrap"><span class="w-2 h-2 rounded-full bg-[#e05638]"></span>EN DIRECTO</span>
    <div class="flex items-center gap-6 overflow-x-auto no-scrollbar font-mono text-[11px] uppercase text-slate-700 whitespace-nowrap">${articles.slice(0, 5).map((a) => `<span>${esc(a.title)}</span>`).join('<span class="text-[#e05638]">•</span>')}</div>
  </div>
</div>
<main class="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full space-y-12">
  <section class="space-y-6">
    <p class="font-mono text-xs tracking-widest text-[#e05638] uppercase">Curiosidad con método · Edición oficial EnigmaGlobal</p>
    <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <h1 class="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.95] text-[#0b1f3a]">La ciencia,<br><span class="italic font-normal text-[#e05638] editorial-serif tracking-normal">en contexto.</span></h1>
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
    <div class="relative flex items-center gap-2"><button type="button" id="cat-prev" aria-label="Desplazar categorías a la izquierda" class="flex-shrink-0 w-10 h-10 rounded-xl bg-white hover:bg-[#e05638] hover:text-white text-slate-700 border border-slate-300 flex items-center justify-center shadow-sm transition-all active:scale-95"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg></button><div id="category-filters" class="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 flex-1">${pills}</div><button type="button" id="cat-next" aria-label="Desplazar categorías a la derecha" class="flex-shrink-0 w-10 h-10 rounded-xl bg-white hover:bg-[#e05638] hover:text-white text-slate-700 border border-slate-300 flex items-center justify-center shadow-sm transition-all active:scale-95"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></button></div>
    <div class="relative max-w-2xl">
      <label for="search-input" class="sr-only">Buscar artículos</label>
      <input type="search" id="search-input" placeholder="Buscar historias..." class="w-full px-4 py-3.5 bg-transparent border-b-2 border-slate-300 focus:border-[#e05638] text-slate-900 placeholder-slate-400 focus:outline-none text-base">
    </div>
    <p id="articles-count" class="text-xs font-mono text-slate-500">Mostrando ${articles.length} artículos</p>
    <div id="articles-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${articles.map(card).join("")}
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

  var strip = document.getElementById('category-filters');
  document.getElementById('cat-prev').addEventListener('click', function () { strip.scrollBy({ left: -260, behavior: 'smooth' }); });
  document.getElementById('cat-next').addEventListener('click', function () { strip.scrollBy({ left: 260, behavior: 'smooth' }); });

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
          (r) => `<li><a href="${articleUrl(r)}" class="block p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#e05638]/50">
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
  const btn = "inline-flex items-center px-3 py-1.5 rounded-full border border-slate-300 bg-white text-slate-700 hover:border-[#e05638] hover:text-[#e05638] text-xs font-semibold";
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
  <nav class="text-xs text-slate-500 mb-6"><a href="/" class="hover:text-[#e05638]">Inicio</a> / <span>${esc(a.category)}</span></nav>
  <article>
    <header class="space-y-3 mb-6">
      <span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-100 text-[#e05638]">${esc(a.category)}</span>
      <h1 class="editorial-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">${esc(a.title)}</h1>
      <p class="flex items-center gap-2 text-sm font-semibold text-green-600"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" d="M12 7v5l3 2"></path></svg>${readingMinutes(a)} ${readingMinutes(a) === 1 ? "minuto" : "minutos"} de lectura</p>
      <p class="text-sm text-slate-500">${esc(a.summary)}</p>
      <time datetime="${a.date}" class="block text-xs font-mono text-slate-500">${fmtDate(a.date)} · Enigma Ciencia</time>
    </header>
    <figure class="mb-8"><div class="rounded-2xl overflow-hidden shadow-sm">${mediaHtml(a, true)}</div>${a.imageCaption ? `<figcaption class="text-xs text-slate-500 mt-2">${esc(a.imageCaption)}</figcaption>` : ""}</figure>
    <div class="article-body">${a.content}</div>
    <div class="mt-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
      <h2 class="text-xs uppercase tracking-wider font-bold text-[#e05638]">Fuentes</h2>
      <p class="text-sm text-slate-600">${esc(a.sources)}</p>
    </div>
    ${shareHtml(a, url)}
  </article>
  ${relatedHtml(a)}
  <p class="mt-12"><a href="/" class="text-sm font-semibold text-[#e05638] hover:underline">← Volver a todos los artículos</a></p>
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
    body: `<p>Enigma Ciencia es una edición de divulgación de EnigmaGlobal. Publicamos noticias científicas explicadas con contexto, indicando siempre en qué punto de la investigación se encuentra cada hallazgo: laboratorio, animales, ensayos clínicos o aplicación real.</p>
<p>Cada artículo enumera sus fuentes al final. Si detectas un error, escríbenos a <a href="mailto:${EMAIL}">${EMAIL}</a> y lo corregiremos.</p>`,
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
    body: `<p>Esta página describe, de forma general, el tratamiento de datos en Enigma Ciencia. <strong>Borrador: revisar con un profesional antes de publicar.</strong></p>
<p>Este sitio no solicita registro ni datos personales para leer los artículos. Puede utilizar cookies técnicas y cookies de terceros, como las de Google, para mostrar anuncios de Google AdSense y medir el tráfico. Google utiliza cookies para personalizar los anuncios según las visitas previas de cada usuario. Puedes gestionar esas preferencias en la configuración de anuncios de Google.</p>
<p>Para cualquier consulta sobre privacidad, escribe a <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`,
  }),
};

function sitemap() {
  const today = articles[0].date;
  const urls = [
    { loc: `${SITE}/`, lastmod: today, priority: "1.0" },
    ...articles.map((a) => ({ loc: `${SITE}${articleUrl(a)}`, lastmod: a.date, priority: "0.8" })),
    { loc: `${SITE}/acerca`, lastmod: today, priority: "0.3" },
    { loc: `${SITE}/contacto`, lastmod: today, priority: "0.3" },
    { loc: `${SITE}/privacidad`, lastmod: today, priority: "0.2" },
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
write("contacto.html", pages.contacto);
write("privacidad.html", pages.privacidad);
write("sitemap.xml", sitemap());
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`OK: index + ${articles.length} artículos + 3 páginas + sitemap + robots`);
