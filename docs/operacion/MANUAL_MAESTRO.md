# MANUAL MAESTRO DE OPERACIÓN — ENIGMA CIENCIA

**Estado:** borrador sujeto a revisión y aprobación del responsable del proyecto.  
**Repositorio:** `enigmaglobal2030-source/enigma-ciencia`  
**Rama de referencia de producción:** `main`  
**Última actualización:** 21 de noviembre de 2026.

Este documento es la referencia operativa del proyecto. Debe consultarse antes de investigar, redactar, modificar archivos, preparar publicaciones o ejecutar tareas técnicas. La memoria de una IA o una conversación anterior nunca sustituye la comprobación del estado real del repositorio.

## 1. Principios obligatorios

1. Verdad antes que complacencia; precisión antes que rapidez.
2. No inventar datos, fuentes, estudios, declaraciones, resultados, fechas, enlaces ni estados técnicos.
3. Separar hechos comprobados, evidencia disponible, hipótesis, interpretaciones y aspectos desconocidos.
4. En ciencia y medicina, identificar el nivel real de evidencia: in vitro, animales, preclínica, fase clínica, revisión por pares, aprobación regulatoria o uso asistencial.
5. No presentar un resultado preliminar como tratamiento demostrado ni un prototipo como producto comercial disponible.
6. Si no hay evidencia suficiente, decirlo expresamente y detener la afirmación.
7. No afirmar que una acción se ejecutó o verificó sin evidencia observable.

## 2. Flujo editorial y científico

### 2.1 Recepción y selección
- Recibir el tema, noticia o propuesta.
- Evaluar relevancia, novedad, impacto potencial y solidez documental.
- Priorizar avances con consecuencias científicas, médicas, tecnológicas o sociales relevantes.
- Descartar o reformular afirmaciones sensacionalistas, engañosas o sin respaldo suficiente.

### 2.2 Investigación
- Buscar primero fuentes primarias: artículo científico, registro de ensayo, organismo regulador, universidad, centro de investigación, empresa responsable o documentación técnica original.
- Contrastar con fuentes independientes y medios fiables cuando corresponda.
- Comprobar fecha del anuncio, fecha del estudio y estado actual del desarrollo; no confundirlas.
- Verificar cifras, unidades, población, tamaño de muestra, comparadores, desenlaces y limitaciones.
- Registrar enlaces directos y atribuir cada afirmación relevante.
- Si una fuente no puede abrirse o verificarse, no presentarla como consultada.

### 2.3 Redacción
- Escribir en español claro, preciso y accesible para una audiencia adulta amplia.
- Evitar tecnicismos innecesarios; explicar los imprescindibles.
- Mantener tono informativo, sobrio y comprensible.
- Estructura editorial habitual: título en mayúsculas; contexto o entrada breve; explicación del avance; sección **¿Qué se ha logrado?**; sección **RIGOR CIENTÍFICO:** con estado, límites y preguntas abiertas; cierre y fuentes.
- Medicina y salud: mínimo 2.000 caracteres. No hay máximo fijo si la complejidad lo exige.
- Otros temas científicos y tecnológicos: entre 1.200 y 1.800 caracteres.
- No completar la extensión con relleno: cada párrafo debe aportar información verificable, contexto o explicación.
- Los titulares deben despertar expectativa sin presentar promesas como resultados demostrados. Las limitaciones de estudios en laboratorio o animales se explican en el cuerpo y en **RIGOR CIENTÍFICO:**. Cuando existan ensayos en seres humanos, indicar la fase clínica en el titular cuando sea relevante, sin confundirla con aprobación o disponibilidad.
- No ocultar información esencial ni atribuir capacidades que no estén respaldadas por pruebas.

## 3. Imágenes y miniaturas

### Regla técnica confirmada para la portada
- La portada busca las miniaturas en la ruta **`img/`**.
- No asumir que **`public/img/`** es la ruta correcta para las imágenes de portada.
- Antes de entregar una publicación, comprobar la ruta exacta que consume el código de la portada y que el archivo exista en esa ubicación.
- Verificar la carga de la miniatura tanto en la portada como en la página individual del artículo.
- Si la miniatura no carga, revisar primero ruta, nombre, extensión, mayúsculas/minúsculas y referencia utilizada.
- Si el fallo es solo de ubicación, corregir únicamente la ubicación o referencia necesaria. No modificar contenido editorial, datos ni código ajeno al problema.
- No declarar la imagen verificada solo porque el archivo exista en GitHub; comprobar que se sirve correctamente en el sitio.

### Criterios visuales
- Estilo documental, científico y fotorrealista; evitar imágenes engañosas.
- La imagen debe representar fielmente el tema. Si es ilustrativa o conceptual, indicarlo en el pie o texto alternativo.
- Mantener legibilidad y coherencia visual de marca.
- No alterar el logotipo oficial ni inventar sellos, cifras o textos dentro de la imagen.
- Comprobar dimensiones, peso, formato, nombre y ruta antes de publicar.

## 4. Flujo técnico de publicación

1. Consultar el estado real de `main`, las ramas y los archivos relacionados antes de empezar.
2. Crear una rama de trabajo independiente basada en el `main` actualizado.
3. Modificar únicamente los archivos necesarios para la tarea.
4. Revisar el diff completo: nombres, cantidad de archivos, rutas, contenido y posibles cambios colaterales.
5. No aceptar cambios masivos o inesperados. Si aparecen, detenerse e investigar.
6. Abrir un Pull Request (PR) con descripción clara de lo que cambia y lo que no cambia.
7. Revisar el preview de Vercel y comprobar los elementos afectados.
8. Informar al responsable del proyecto de los resultados, límites y verificaciones realizadas.
9. **No fusionar el PR, modificar `main` ni desplegar a producción sin autorización explícita del responsable.**
10. Después de una fusión autorizada, comprobar el estado del despliegue de producción y la URL individual y la portada afectadas.

### Regla de mínimo cambio
Resolver el problema concreto con el menor cambio posible. No aprovechar una corrección puntual para refactorizar, actualizar dependencias, cambiar estilos o modificar contenido no relacionado.

### Seguridad de producción
- `main` es la rama de producción.
- Un preview de Vercel no equivale a producción.
- Un PR abierto no equivale a publicación.
- Un merge exitoso no demuestra por sí solo que la página final cargue correctamente.
- No compartir secretos, tokens, claves API ni datos privados en archivos, commits o PR.


## 5. GOBIERNO EDITORIAL, PERMISOS Y COORDINACIÓN MULTIAGENTE

### 5.1 Independencia de agentes

El proyecto no limita la publicación editorial a un único agente. ChatGPT, Manus, Claude u otro agente pueden preparar o publicar contenido editorial cuando Will Molina haya dado autorización explícita para el artículo o tarea correspondiente.

Los permisos se conceden por tarea, no por identidad permanente del agente. Que un agente tenga autorización para una acción no significa que tenga autorización automática para las demás.

### 5.2 Separación entre publicación editorial y modificación técnica

Se deben distinguir dos categorías:

**A. PUBLICACIÓN EDITORIAL**

Un agente puede trabajar sobre los archivos y elementos relacionados con el artículo, sus fuentes y su miniatura, siempre dentro del alcance autorizado. La publicación editorial puede incluir:

- Añadir o actualizar una entrada en `data/articulos.json`.
- Añadir o actualizar la miniatura correspondiente en `img/`.
- Generar o actualizar el HTML del artículo utilizando el generador existente.
- Regenerar la portada utilizando el generador existente.
- Regenerar `sitemap.xml` y `robots.txt` cuando el proceso normal del proyecto lo requiera.
- Actualizar el título, bajada, categoría, fecha, fuentes, estado editorial, slug, imagen y texto del artículo autorizado.
- Preparar un commit, push, Pull Request o despliegue únicamente cuando Will haya autorizado expresamente esas acciones.

La autorización editorial no permite modificar la lógica del sitio, las plantillas, el diseño, las dependencias ni la configuración técnica.

**B. MODIFICACIÓN TÉCNICA DEL SITIO**

Se considera modificación técnica cualquier cambio en:

- `build.js`
- `package.json`
- `package-lock.json`
- `vercel.json`
- `styles.css`
- `tailwind.css`
- `sw.js`
- Plantillas HTML o funciones de generación.
- JavaScript de filtros, buscador o navegación.
- Rutas, configuración de Vercel o configuración de build.
- Estructura de carpetas.
- Sistema de imágenes.
- Configuración de AdSense.
- Políticas institucionales, salvo autorización específica.
- Dependencias o herramientas del proyecto.
- Cualquier archivo cuya modificación pueda afectar artículos distintos del autorizado.

Ningún agente puede realizar una modificación técnica basándose únicamente en una autorización editorial. Para modificar código, diseño, configuración o infraestructura se necesita autorización técnica explícita de Will Molina.

### 5.3 Permisos por tarea

Will puede autorizar de forma independiente:

- Investigación.
- Auditoría científica.
- Redacción.
- Preparación de una ficha.
- Creación de una miniatura.
- Publicación editorial.
- Commit.
- Push.
- Merge.
- Despliegue en producción.
- Modificación del código.

Ejemplos de interpretación:

- “Prepara el artículo” no autoriza a publicarlo.
- “Publica este artículo” autoriza el contenido editorial de ese artículo, pero no modificar el código.
- “Haz commit de este artículo” autoriza el commit de los archivos editoriales relacionados.
- “Haz push y deploy de este artículo” autoriza esas acciones para los cambios editoriales indicados, pero no modificar la plantilla o el generador.
- “Corrige el sistema de miniaturas” constituye autorización técnica limitada a ese problema.
- “Revisa la web” no autoriza cambios.
- “Optimiza el código” requiere autorización técnica específica y no autoriza publicar artículos nuevos.

### 5.4 Coordinación entre múltiples agentes

ChatGPT, Manus, Claude u otro agente autorizado pueden publicar artículos, pero no deben trabajar simultáneamente sobre la misma versión del repositorio sin coordinación.

Antes de publicar, cada agente debe:

1. Consultar el estado remoto de `origin/main` y la rama de trabajo.
2. Actualizar su copia con los cambios remotos, sin descartar trabajo ajeno.
3. Comprobar si otro agente publicó o modificó archivos desde la última revisión.
4. Revisar el diff completo.
5. Confirmar que solo se modifican los archivos editoriales autorizados.
6. Comprobar que no se modifica código protegido.
7. Detenerse si aparecen conflictos, cambios masivos o modificaciones inesperadas.
8. No ejecutar `git reset --hard`, `git clean`, operaciones destructivas de `git restore` ni `git push --force`.
9. Informar a Will si dos publicaciones intentan modificar simultáneamente la portada, el JSON o el sitemap.

### 5.5 Registro y bloqueo de publicación

Cada publicación debe contar con una ficha o registro que indique:

- Agente responsable.
- Artículo autorizado.
- Archivos editoriales autorizados.
- Archivos protegidos que no puede modificar.
- Estado de la publicación.
- Commit o Pull Request.
- Verificaciones realizadas.
- Autorización concreta de Will.

Si un agente detecta una publicación activa de otro agente, debe esperar, actualizarse o solicitar coordinación. No debe sobrescribir cambios remotos.

### 5.6 Regla principal

Cualquier agente puede publicar contenido editorial si Will lo autoriza para esa tarea. Ningún agente puede modificar el código, el diseño, la infraestructura o la lógica del sitio sin autorización técnica explícita.


## 6. Verificación y comunicación del estado

Usar estados precisos y no intercambiables:

- **Propuesto:** aún no se ha ejecutado.
- **En preparación:** hay trabajo en una rama o entorno de prueba.
- **PR abierto:** cambios propuestos, pendientes de revisión.
- **Preview verificado:** se comprobó el despliegue de prueba indicado.
- **Aprobado para producción:** existe autorización explícita.
- **Fusionado:** GitHub confirma que el PR se integró a la rama base.
- **Despliegue exitoso:** Vercel informa estado correcto para el commit correspondiente.
- **Verificado en producción:** se abrió y comprobó la URL final y los elementos relevantes.

Al informar, incluir enlaces, rama, PR, archivos modificados y comprobaciones efectivamente realizadas. Si algo no pudo verificarse, declararlo.

## 7. Continuidad entre sesiones y agentes de IA

Al iniciar una sesión o delegar trabajo:
1. Leer este manual.
2. Consultar el estado actual del repositorio, rama y PR relevantes.
3. Revisar los archivos reales antes de afirmar cómo funciona una parte del sitio.
4. Recuperar el último registro de continuidad disponible, si existe.
5. Confirmar qué está terminado, qué está pendiente y qué requiere autorización.

Al cerrar una sesión de trabajo:
- Registrar lo completado y enlazar commits/PR.
- Registrar errores encontrados y la solución comprobada.
- Registrar decisiones y asuntos pendientes.
- Indicar el siguiente paso concreto.
- No registrar como hecho una hipótesis o una tarea que solo se propuso.

### Formato de ficha de continuidad

```text
FECHA:
OBJETIVO:
ESTADO:
TRABAJO COMPLETADO:
ARCHIVOS MODIFICADOS:
RAMA / COMMIT / PR:
VERIFICACIONES REALIZADAS:
ERRORES Y SOLUCIONES:
PENDIENTES:
SIGUIENTE PASO:
AUTORIZACIÓN PENDIENTE:
```

## 8. Registro inicial de decisiones y lecciones

### Publicación del artículo 306 — fibra óptica de núcleo hueco
- Se publicó tras autorización explícita.
- La publicación se trabajó en una rama independiente y mediante PR.
- Se verificó el merge, el despliegue de Vercel, la portada y la URL individual.
- URL: https://enigmaciencia.com/articulo/fibra-optica-nucleo-hueco-china-enlace-1000-km
- La lección de ruta de miniatura queda formalizada en la sección 3: la portada necesitaba el recurso en `img/`, no en `public/img/`. La solución fue ubicar el archivo en la ruta correcta sin modificar otros contenidos.

## 9. Gobierno del manual

- Este manual es un documento vivo y versionado en GitHub.
- Toda modificación futura debe realizarse en una rama y revisarse mediante PR.
- Las nuevas reglas se incorporan cuando el responsable las confirma o cuando una solución ha sido comprobada.
- Si dos instrucciones entran en conflicto, detenerse, señalar el conflicto y solicitar aclaración; no elegir silenciosamente.
- Este manual no concede permiso para publicar, fusionar ni modificar producción. La autorización explícita sigue siendo obligatoria.
