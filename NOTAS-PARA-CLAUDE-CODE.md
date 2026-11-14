# Notas de traspaso · Enigma Ciencia

Estado al 14 de noviembre de 2026. Léelo antes de publicar cualquier cambio.

## Cómo compilar y publicar

- Compilar: `npm run build` (genera el CSS con Tailwind local y después ejecuta `node build.js`).
- `build.js` necesita la variable `CONTACT_EMAIL`. No escribas el correo en el código ni en los commits.
- El flujo de GitHub Actions (`.github/workflows/build.yml`) compila al hacer push a `main` si cambian `build.js`, `data/`, `tailwind.*` o `package.json`. Necesita el secreto `CONTACT_EMAIL` en GitHub.
- Commits: identidad genérica (`enigma-ciencia-site`) y los trailers de la sesión.

## Estado de la web

- 21 artículos publicados. La portada usa `styles.css` local; ya no depende de cdn.tailwindcss.com.
- Imágenes verificadas en 205 (superconductividad), 209, 210 (LNP), 211 (EEG, ilustrativa), 213 (BepiColombo).
- Recién publicados: 214 (Roman), 215 (clima 2026), 216 (Alba Mons).

## Pendientes

1. **Ivonescimab:** no publicar hasta la decisión de la FDA. Fecha PDUFA 14 nov 2026; no se encontró decisión.
2. **Artículo 212 (emisiones de CO₂):** imagen provisional. Hay candidato en Commons (central Arnot, aérea), pero la licencia no se verificó en la ficha. Confirmar antes de usarla.
3. **Artículo 213 (BepiColombo):** revisar la fecha "10 de marzo de 2027" de la órbita final de MPO. No aparece en las fuentes consultadas.
4. **Imágenes 214 y 215:** tarjetas provisionales (Roman y clima). Buscar fotos verificadas.
5. **Textos 201 y 203:** revisión pendiente acordada.
6. **Reels:** están en el archivo `escaneo-reels-3-temas.md` (Marte, tumba siberiana con cannabis, robot ASTRA). Falta grabarlos o generarlos.
7. **Pendientes generales:** Search Console (en aprobación), AdSense (sin iniciar), borrador de privacidad (revisar) y confirmar si el repo debe ser privado.

## Reglas editoriales

- Artículo: explicación de fondo, rigor científico y estado de la investigación casi al final, desenlace al cierre.
- Fuentes en texto plano, sin enlaces.
- Títulos con el nombre completo del tema, no la sigla.
- Estado de laboratorio, animales o simulación: solo en el bloque final de rigor, no en el título.
- Hashtags: entre 5 y 7 en Facebook.
