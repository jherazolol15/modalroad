/**
 * Modal Road · Recepción de resultados
 * Pega este código en tu hoja de cálculo: Extensiones → Apps Script.
 * Cada vez que un estudiante termina el reto, se agrega una fila en la pestaña "Resultados"
 * y (opcional) te llega un correo con su nota.
 */
const HOJA = 'Resultados';
const ENVIAR_CORREO = true; // Cambia a false si no quieres un correo por cada estudiante.

const ENCABEZADOS = ['Fecha y hora', 'Estudiante', 'Curso', 'Aciertos', 'Preguntas',
                     'Nota (0-5)', 'Desempeño', 'Preguntas falladas', 'ID'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d.name || typeof d.grade !== 'number' || d.grade < 0 || d.grade > 5) return respuesta(false);

    const hoja = obtenerHoja();
    const filas = Math.max(hoja.getLastRow() - 1, 1);
    const ids = hoja.getRange(2, 9, filas, 1).getValues().flat().map(String);
    if (ids.indexOf(String(d.id)) !== -1) return respuesta(true); // ya estaba registrado

    hoja.appendRow([new Date(), String(d.name).slice(0, 80), String(d.group).slice(0, 20),
                    d.correct, d.n, d.grade, d.level, String(d.missed || '').slice(0, 2000), String(d.id)]);

    if (ENVIAR_CORREO) {
      MailApp.sendEmail(
        Session.getEffectiveUser().getEmail(),
        'Modal Road · ' + d.name + ' (' + d.group + '): ' + d.grade.toFixed(1),
        'Estudiante: ' + d.name + '\nCurso: ' + d.group +
        '\nAciertos: ' + d.correct + ' de ' + d.n +
        '\nNota: ' + d.grade.toFixed(1) + ' / 5.0 (' + d.level + ')' +
        '\n\nPreguntas falladas:\n' + (d.missed || 'Ninguna') +
        '\n\nHoja de resultados: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
      );
    }
    return respuesta(true);
  } finally {
    lock.releaseLock();
  }
}

function obtenerHoja() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let h = ss.getSheetByName(HOJA) || ss.insertSheet(HOJA);
  if (h.getLastRow() === 0) {
    h.appendRow(ENCABEZADOS);
    h.setFrozenRows(1);
    h.getRange(1, 1, 1, ENCABEZADOS.length).setFontWeight('bold');
    h.getRange('F:F').setNumberFormat('0.0');
  }
  return h;
}

function respuesta(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok }))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Ejecuta esta función una vez para dar permisos y ver una fila de prueba. Luego borra esa fila. */
function probar() {
  doPost({ postData: { contents: JSON.stringify({
    id: 'prueba-' + Date.now(), name: 'Estudiante de prueba', group: '8-1',
    correct: 12, n: 15, grade: 4.0, level: 'Alto', missed: '3. You ___ see a doctor. → respondió: mustn\'t'
  }) } });
}
