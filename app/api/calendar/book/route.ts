import type { NextRequest } from 'next/server';
import { createBookingEvent, SlotTakenError } from '@/lib/googleCalendar';
import { sendBookingConfirmationEmail } from '@/lib/gmail';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, reason: 'invalid_body' }, { status: 400 });
  }

  const { name, email, date, slot, phone, note } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !EMAIL_RE.test(email) ||
    typeof date !== 'string' || !DATE_RE.test(date) ||
    typeof slot !== 'string' || !slot
  ) {
    return Response.json({ ok: false, reason: 'missing_fields' }, { status: 400 });
  }

  try {
    const { eventId, htmlLink, addToCalendarUrl, meetLink } = await createBookingEvent({
      name: name.trim(),
      email: email.trim(),
      date,
      slot,
      phone: typeof phone === 'string' && phone.trim() ? phone.trim() : undefined,
      note: typeof note === 'string' && note.trim() ? note.trim() : undefined,
    });

    try {
      await sendBookingConfirmationEmail({ name: name.trim(), email: email.trim(), date, slot, addToCalendarUrl, meetLink });
    } catch (err) {
      // The calendar event is already created; a failed confirmation email
      // shouldn't turn a successful booking into an error response.
      console.error('[api/calendar/book] confirmation email failed', err);
    }

    return Response.json({ ok: true, eventId, htmlLink });
  } catch (err) {
    if (err instanceof SlotTakenError) {
      return Response.json({ ok: false, reason: 'slot_taken' }, { status: 409 });
    }
    console.error('[api/calendar/book]', err);
    return Response.json({ ok: false, reason: 'server_error' }, { status: 500 });
  }
}
