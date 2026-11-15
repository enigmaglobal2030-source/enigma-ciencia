# Notas de traspaso · Enigma Ciencia

## Cuentas y conexiones

- **Vercel:** cuenta `willmoli48@gmail.com`, equipo `willmoli48-1187`, proyecto `enigmaciencia` (id `prj_8GmPwMIXErbbiPV7mspnSaG1L6do`). Dominios: `enigmaciencia.com` redirige a `www.enigmaciencia.com`.
- **GitHub:** cuenta `enigmaglobal2030@gmail.com`, repositorio `enigmaglobal2030-source/enigma-ciencia`, rama `main`.
- **Vercel ↔ GitHub:** conectado al repositorio `enigma-ciencia`. Cada push a `main` despliega en producción.
- **Secreto de GitHub Actions:** `CONTACT_EMAIL` en el repositorio. Sin él, el flujo "Compilar sitio" falla.
- **Identidad de commits:** `enigma-ciencia-site <site-bot@users.noreply.github.com>`. Un hook pide firma `noreply@anthropic.com`; se decidió mantener la identidad del sitio.

## Cómo compilar

- `npm run build` (genera `styles.css` y ejecuta `node build.js`).
- `build.js` necesita `CONTACT_EMAIL`; en local: `CONTACT_EMAIL=... npm run build`.

## Notas

- Si el repositorio se borra o se vuelve a crear, hay que reconectar Vercel, la app de Claude en GitHub y el secreto `CONTACT_EMAIL`.
