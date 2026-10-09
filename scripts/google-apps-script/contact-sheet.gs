
/**
 * Latente Estudio — formularios de contacto y reservas → Google Sheets
 *
 * Este archivo vive en el repo solo como referencia versionada: el código
 * real se pega y se ejecuta dentro del editor de Apps Script de Google,
 * ligado a la hoja de cálculo de destino. No contiene secretos.
 *
 * Despliegue:
 * 1. Abre (o crea) la hoja de cálculo donde quieres guardar los contactos.
 * 2. Extensiones > Apps Script. Borra el contenido de Code.gs y pega este
 *    archivo completo.
 * 3. Configuración del proyecto (ícono de engranaje) > Propiedades del
 *    secuencia de comandos > agrega CONTACT_SHEET_SECRET con un valor
 *    aleatorio largo (ej. genera uno con `openssl rand -hex 32`).
 * 4. Implementar > Nueva implementación > tipo "Aplicación web".
 *    - Ejecutar como: Yo (tu cuenta)
 *    - Quién tiene acceso: Cualquier usuario
 *    (Next.js llama a esta URL desde el servidor sin sesión de Google, por
 *    eso el acceso debe ser público; la clave compartida es lo que evita
 *    que cualquiera pueda escribir filas.)
 * 5. Copia la URL de la aplicación web (termina en /exec) y la misma clave
 *    del paso 3 en .env.local:
 *      GOOGLE_SHEETS_WEBAPP_URL="https://script.google.com/macros/s/XXX/exec"
 *      GOOGLE_SHEETS_WEBAPP_SECRET="<el mismo valor de CONTACT_SHEET_SECRET>"
 * 6. Si vuelves a editar este script, usa Implementar > Gestionar
 *    implementaciones > lápiz de edición > Nueva versión para que los
 *    cambios se reflejen en la misma URL (una "guardada" sin nueva versión
 *    no actualiza el endpoint ya publicado).
 */

// Cada formulario escribe en su propia pestaña, según `payload.type`:
// 'contact' (formulario general) o 'booking' (reserva desde el calendario).
// Si cambias el nombre de una pestaña en la hoja, cámbialo también aquí.
//
// Las columnas se buscan por el texto del encabezado (fila 1), sin importar
// mayúsculas ni tildes, así que puedes reordenarlas libremente. Si falta una
// columna, el script la agrega al final de la fila de encabezados.

// Columnas comunes a los dos formularios: [encabezado, campo del payload].
const BASE_COLUMNS = [
  ['Fecha', null], // fecha de registro, la pone el script
  ['Nombre', 'name'],
  ['Apellidos', 'lastName'],
  ['Indicativo', 'dialCode'],
  ['Celular', 'phone'],
  ['Correo', 'email'],
  ['Servicio de interés', 'service'],
  ['Mensaje', 'message'],
];

const SHEETS = {
  contact: {
    name: 'Contactos',
    columns: BASE_COLUMNS,
    required: ['name', 'lastName', 'email', 'message'],
  },
  booking: {
    name: 'Citas',
    columns: BASE_COLUMNS.concat([
      ['Fecha cita', 'date'],
      ['Hora cita', 'slot'],
      ['Evento', 'eventLink'],
    ]),
    required: ['name', 'lastName', 'email', 'date', 'slot'],
  },
};

function doPost(e) {
  try {
    const secret = PropertiesService.getScriptProperties().getProperty('CONTACT_SHEET_SECRET');
    const payload = JSON.parse(e.postData.contents);

    if (!secret || payload.secret !== secret) {
      return jsonResponse({ ok: false, reason: 'unauthorized' });
    }

    // Sin `type` se asume 'contact', para seguir aceptando llamadas antiguas.
    const config = SHEETS[payload.type || 'contact'];
    if (!config) {
      return jsonResponse({ ok: false, reason: 'unknown_type' });
    }

    if (config.required.some((k) => !payload[k])) {
      return jsonResponse({ ok: false, reason: 'missing_fields' });
    }

    // Evita que dos envíos simultáneos escriban en la misma fila.
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      appendByHeader(getOrCreateSheet(config), config.columns, payload);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, reason: String(err) });
  }
}

function getOrCreateSheet(config) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(config.columns.map((c) => c[0]));
  }
  return sheet;
}

function normalize(text) {
  return String(text).trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function appendByHeader(sheet, columns, payload) {
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(normalize);

  // Agrega al final los encabezados que falten.
  columns.forEach((c) => {
    if (headers.indexOf(normalize(c[0])) === -1) {
      headers.push(normalize(c[0]));
      sheet.getRange(1, headers.length).setValue(c[0]);
    }
  });

  const values = headers.map(() => '');
  const formats = headers.map(() => '@'); // texto plano: conserva "+57" y ceros iniciales
  columns.forEach((c) => {
    const i = headers.indexOf(normalize(c[0]));
    if (c[1] === null) {
      values[i] = new Date();
      formats[i] = 'yyyy-mm-dd hh:mm';
    } else {
      values[i] = payload[c[1]] || '';
    }
  });

  const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, headers.length);
  range.setNumberFormats([formats]);
  range.setValues([values]);
}

function jsonResponse(obj) {
  // Apps Script Web Apps always reply with HTTP 200 to the caller; the
  // Next.js side reads `ok`/`reason` from the body instead of the status.
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
