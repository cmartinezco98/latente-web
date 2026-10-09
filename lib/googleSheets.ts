// Server-only module. Never import this from a client component.
// Requires GOOGLE_SHEETS_WEBAPP_URL and GOOGLE_SHEETS_WEBAPP_SECRET in the
// environment (see .env.local and scripts/google-apps-script/contact-sheet.gs
// for the Apps Script deployment this calls into).

import type { PersonFields } from '@/lib/formFields';

export interface ContactRow extends PersonFields {
  message: string;
}

export interface BookingRow extends PersonFields {
  date: string; // YYYY-MM-DD
  slot: string; // HH:MM, Colombia time
  message?: string;
  eventLink?: string;
}

/**
 * Posts a row to the studio's Google Sheet via an Apps Script Web App.
 * `type` picks the destination tab (Contactos / Citas) on the script side.
 * Apps Script Web Apps always answer with HTTP 200, so success/failure is
 * read from the JSON body (`ok`), not the response status.
 */
async function postRow(type: 'contact' | 'booking', payload: object): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBAPP_SECRET;

  if (!url || !secret) {
    throw new Error(
      'Google Sheets webapp is not configured (GOOGLE_SHEETS_WEBAPP_URL / GOOGLE_SHEETS_WEBAPP_SECRET).'
    );
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, type, secret }),
  });

  if (!res.ok) {
    throw new Error(`sheets_webapp_http_${res.status}`);
  }

  const data = (await res.json().catch(() => null)) as { ok?: boolean; reason?: string } | null;
  if (!data || data.ok !== true) {
    throw new Error(`sheets_webapp_rejected: ${data?.reason ?? 'unknown'}`);
  }
}

export function appendContactRow(payload: ContactRow): Promise<void> {
  return postRow('contact', payload);
}

export function appendBookingRow(payload: BookingRow): Promise<void> {
  return postRow('booking', payload);
}
