# Modal Road · OVA de verbos modales (Inglés 8.º)

Objeto Virtual de Aprendizaje para enseñar los verbos modales en inglés (nivel A2) a estudiantes de grado octavo, usando la metáfora de las señales de tránsito: cada modal "indica" una función.

**Autor:** Juan Pablo Herazo Sibaja
**Institución:** I.E. Liceo Guillermo Valencia
**Licencia:** CC BY-NC 4.0

## Contenido

| Sección | Qué hace |
|---|---|
| Inicio | Presenta la metáfora y la ruta de aprendizaje |
| Aprender | Tarjetas de 8 modales (can, could, must, have to, mustn't, don't have to, should, may/might) con función, significado, ejemplos y audio |
| Regla de oro | Estructura afirmativa, negativa e interrogativa + errores frecuentes |
| Jugar | Reto de 10 preguntas: completar oraciones, identificar la función y corregir errores |
| Resultados | Historial guardado en el navegador y descarga del informe en PDF |
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
{t:"gap", q:"You ___ smoke in the hospital.", o:["mustn't","should","can","might"], a:0, why:"Prohibición: mustn't."}
```

Tipos: `gap` (completar), `func` (identificar función, usa `ctx` para la instrucción), `fix` (oración correcta).
