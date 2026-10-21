# Modal Road · OVA de verbos modales (Inglés 8.º)

Objeto Virtual de Aprendizaje para enseñar los verbos modales can, must, have to y should (nivel A2) a estudiantes de grado octavo, usando la metáfora de las señales de tránsito: cada modal "indica" una función.

**Autor:** Juan Pablo Herazo Sibaja
**Institución:** I.E. Liceo Guillermo Valencia
**Licencia:** CC BY-NC 4.0

## Contenido

| Sección | Qué hace |
|---|---|
| Inicio | Presenta la metáfora y la ruta de aprendizaje |
| Aprender | Tarjetas de can, must, have to y should en forma afirmativa, negativa e interrogativa, con traducción y audio |
| Regla de oro | Estructura afirmativa, negativa e interrogativa + errores frecuentes |
| Jugar | Reto de 15 preguntas (7 completar, 4 identificar función, 4 corregir error), algunas con traducción corta |
| Resultados | Nota de 0 a 5 con nivel de desempeño, historial en el navegador e informe PDF |
| Docente | Ficha técnica: objetivo, secuencia didáctica y referentes |

## Arquitectura

- `index.html`: un solo archivo con HTML, CSS y JavaScript (sin servidor ni base de datos).
- Datos de las tarjetas y del banco de preguntas: arreglos `MODALS` y `BANK` dentro del `<script>`.
- Persistencia: `localStorage` del navegador.
- Informe PDF: librería jsPDF 2.5.1 (CDN).
- Audio: Web Speech API del navegador (voz en inglés).

## Publicar en GitHub Pages

1. Crear un repositorio público, por ejemplo `ova-modal-verbs`.
2. Subir `index.html` y `README.md` a la rama `main`.
3. Ir a **Settings → Pages → Build and deployment**, elegir **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guardar.
4. En 1-2 minutos el OVA queda en `https://<tu-usuario>.github.io/ova-modal-verbs/`.

## Cómo agregar preguntas

Añade un objeto al arreglo `BANK`. La opción correcta es la primera (`a:0`); el juego mezcla las opciones automáticamente.

```js
{t:"gap", q:"You ___ smoke in the hospital.", tr:"…en el hospital.", o:["mustn't","should","can","don't have to"], a:0, why:"Prohibición: mustn't."}
```

El campo `tr` (traducción corta) es opcional. La mezcla de cada partida se define en `MIX` y la escala de notas en las funciones `grade` y `level`.

Tipos: `gap` (completar), `func` (identificar función, usa `ctx` para la instrucción), `fix` (oración correcta).
