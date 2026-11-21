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
- Como referencia para publicaciones breves de ENIGMA CIENCIA, procurar un máximo de 200 palabras cuando el encargo no establezca otra extensión. Respetar siempre la extensión específica solicitada.
- No convertir incertidumbre en certeza ni usar titulares que prometan más que los datos.

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

## 5. Verificación y comunicación del estado

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

## 6. Continuidad entre sesiones y agentes de IA

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

## 7. Registro inicial de decisiones y lecciones

### Publicación del artículo 306 — fibra óptica de núcleo hueco
- Se publicó tras autorización explícita.
- La publicación se trabajó en una rama independiente y mediante PR.
- Se verificó el merge, el despliegue de Vercel, la portada y la URL individual.
- URL: https://enigmaciencia.com/articulo/fibra-optica-nucleo-hueco-china-enlace-1000-km
- La lección de ruta de miniatura queda formalizada en la sección 3: la portada necesitaba el recurso en `img/`, no en `public/img/`. La solución fue ubicar el archivo en la ruta correcta sin modificar otros contenidos.

## 8. Gobierno del manual

- Este manual es un documento vivo y versionado en GitHub.
- Toda modificación futura debe realizarse en una rama y revisarse mediante PR.
- Las nuevas reglas se incorporan cuando el responsable las confirma o cuando una solución ha sido comprobada.
- Si dos instrucciones entran en conflicto, detenerse, señalar el conflicto y solicitar aclaración; no elegir silenciosamente.
- Este manual no concede permiso para publicar, fusionar ni modificar producción. La autorización explícita sigue siendo obligatoria.
