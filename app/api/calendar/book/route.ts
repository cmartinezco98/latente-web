import type { NextRequest } from 'next/server';
import { createBookingEvent, SlotTakenError } from '@/lib/googleCalendar';
import { sendBookingConfirmationEmail } from '@/lib/gmail';
import { appendBookingRow } from '@/lib/googleSheets';
import { parsePerson, optionalString, fullName, fullPhone } from '@/lib/formFields';

export const runtime = 'nodejs';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, reason: 'invalid_body' }, { status: 400 });
  }

  const fields = (body ?? {}) as Record<string, unknown>;
  const person = parsePerson(fields);
  const { date, slot } = fields;

  if (
    !person ||
    typeof date !== 'string' || !DATE_RE.test(date) ||
    typeof slot !== 'string' || !slot
  ) {
    return Response.json({ ok: false, reason: 'missing_fields' }, { status: 400 });
  }

  const note = optionalString(fields.note);

  try {
    const { eventId, htmlLink, addToCalendarUrl, meetLink } = await createBookingEvent({
      name: fullName(person),
      email: person.email,
      date,
      slot,
      phone: fullPhone(person),
      note,
    });

    // The calendar event is already created; a failed confirmation email or
    // Sheet row shouldn't turn a successful booking into an error response.
    const [emailResult, sheetResult] = await Promise.allSettled([
      sendBookingConfirmationEmail({ name: person.name, email: person.email, date, slot, addToCalendarUrl, meetLink }),
      appendBookingRow({ ...person, date, slot, message: note, eventLink: htmlLink }),
    ]);

    if (emailResult.status === 'rejected') console.error('[api/calendar/book] confirmation email failed', emailResult.reason);
    if (sheetResult.status === 'rejected') console.error('[api/calendar/book] sheet row failed', sheetResult.reason);

    return Response.json({ ok: true, eventId, htmlLink });
  } catch (err) {
    if (err instanceof SlotTakenError) {
      return Response.json({ ok: false, reason: 'slot_taken' }, { status: 409 });
    }
    console.error('[api/calendar/book]', err);
    return Response.json({ ok: false, reason: 'server_error' }, { status: 500 });
  }
}
