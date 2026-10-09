import type { NextRequest } from 'next/server';
import { appendContactRow } from '@/lib/googleSheets';
import { parsePerson, optionalString } from '@/lib/formFields';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, reason: 'invalid_body' }, { status: 400 });
  }

  const fields = (body ?? {}) as Record<string, unknown>;
  const person = parsePerson(fields);
  const message = optionalString(fields.message);

  if (!person || !message) {
    return Response.json({ ok: false, reason: 'missing_fields' }, { status: 400 });
  }

  // The general contact form only logs to the Sheet; bookings go through
  // /api/calendar/book, which also creates the event and emails the guest.
  try {
    await appendContactRow({ ...person, message });
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[api/contact]', err);
    return Response.json({ ok: false, reason: 'server_error' }, { status: 500 });
  }
}
