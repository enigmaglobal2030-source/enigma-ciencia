# Enigma Ciencia

Sitio estático. Los artículos viven en `data/articulos.json`; las páginas se generan con `build.js`.

## Publicar un artículo nuevo

1. Agrega un objeto al inicio de `data/articulos.json` (copia uno existente como plantilla).
2. Ejecuta `node build.js`.
3. Haz `git add -A && git commit -m "Nuevo artículo" && git push`. Vercel publica solo.

No edites a mano `index.html` ni `articulo/*.html`: se sobrescriben al ejecutar `build.js`.
