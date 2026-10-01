import { google, calendar_v3 } from 'googleapis';

// Server-only module. Never import this from a client component.
// Requires GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_CALENDAR_ID in
// the environment (see .env.local).

export const TIMEZONE = 'America/Bogota';
// Colombia does not observe daylight saving time, so this offset is constant.
const UTC_OFFSET = '-05:00';

export const CANDIDATE_SLOTS = ['10:00', '11:30', '14:00', '15:30', '17:00'];
export const SLOT_DURATION_MIN = 20;
const BUSINESS_DAYS = [1, 2, 3, 4, 5]; // Mon–Fri (JS getUTCDay: 0=Sun..6=Sat)
const DAY_WINDOW_START = '09:00';
const DAY_WINDOW_END = '18:00';

export class SlotTakenError extends Error {
  constructor() {
    super('slot_taken');
    this.name = 'SlotTakenError';
  }
}

export interface BookingPayload {
  name: string;
  email: string;
  date: string; // YYYY-MM-DD
  slot: string; // HH:MM, must be one of CANDIDATE_SLOTS
  phone?: string;
  note?: string;
}

let jwtClient: InstanceType<typeof google.auth.JWT> | null = null;

function getAuth() {
  if (jwtClient) return jwtClient;

  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !rawKey) {
    throw new Error(
      'Google Calendar credentials are not configured (GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY).'
    );
  }

  jwtClient = new google.auth.JWT({
    email,
    // .env files usually escape real newlines as literal \n.
    key: rawKey.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return jwtClient;
}

function getCalendarId(): string {
  const id = process.env.GOOGLE_CALENDAR_ID;
  if (!id) {
    throw new Error('Google Calendar id is not configured (GOOGLE_CALENDAR_ID).');
  }
  return id;
}

function getCalendarClient(): calendar_v3.Calendar {
  return google.calendar({ version: 'v3', auth: getAuth() });
}

// Fixed personal Meet room (meet.google.com "create a link for later"),
// not a per-event conference: a service account without Domain-Wide
// Delegation of Authority (Workspace-only) can't create Meet conferences via
// the Calendar API on a personal Gmail calendar ("Invalid conference type
// value"). Safe to reuse since bookings never overlap (one busy slot at a
// time on this calendar).
function getMeetLink(): string | undefined {
  return process.env.GOOGLE_MEET_LINK || undefined;
}

function isBusinessDay(dateStr: string): boolean {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return BUSINESS_DAYS.includes(dow);
}

function toBogotaISOString(dateStr: string, time: string): string {
  return `${dateStr}T${time}:00${UTC_OFFSET}`;
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

function toGoogleCalendarUTC(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function isPastSlot(dateStr: string, slot: string): boolean {
  return new Date(toBogotaISOString(dateStr, slot)).getTime() <= Date.now();
}

function slotOverlapsBusy(
  dateStr: string,
  slot: string,
  busy: { start?: string | null; end?: string | null }[]
): boolean {
  const slotStart = new Date(toBogotaISOString(dateStr, slot)).getTime();
  const slotEnd = new Date(toBogotaISOString(dateStr, addMinutes(slot, SLOT_DURATION_MIN))).getTime();

  return busy.some(({ start, end }) => {
    if (!start || !end) return false;
    const busyStart = new Date(start).getTime();
    const busyEnd = new Date(end).getTime();
    return slotStart < busyEnd && slotEnd > busyStart;
  });
}

async function queryBusy(dateStr: string) {
  const calendar = getCalendarClient();
  const calendarId = getCalendarId();

  const timeMin = toBogotaISOString(dateStr, DAY_WINDOW_START);
  const timeMax = toBogotaISOString(dateStr, DAY_WINDOW_END);

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: TIMEZONE,
      items: [{ id: calendarId }],
    },
  });

  const entry = res.data.calendars?.[calendarId];
  if (entry?.errors?.length) {
    throw new Error(`Google Calendar freebusy error for ${calendarId}: ${JSON.stringify(entry.errors)}`);
  }

  return entry?.busy ?? [];
}

/** Returns the candidate slots (HH:MM) still free for a given day. */
export async function getAvailableSlots(dateStr: string): Promise<string[]> {
  if (!isBusinessDay(dateStr)) return [];

  const busy = await queryBusy(dateStr);

  return CANDIDATE_SLOTS.filter(
    (slot) => !isPastSlot(dateStr, slot) && !slotOverlapsBusy(dateStr, slot, busy)
  );
}

/**
 * Creates the calendar event for a booking. Re-checks availability right
 * before inserting to avoid a race between two visitors picking the same
 * slot; throws SlotTakenError if it is no longer free.
 */
export async function createBookingEvent(
  payload: BookingPayload
): Promise<{ eventId: string; htmlLink: string; addToCalendarUrl: string; meetLink?: string }> {
  const { name, email, date, slot, phone, note } = payload;

  if (!CANDIDATE_SLOTS.includes(slot) || !isBusinessDay(date)) {
    throw new SlotTakenError();
  }

  const busy = await queryBusy(date);
  if (isPastSlot(date, slot) || slotOverlapsBusy(date, slot, busy)) {
    throw new SlotTakenError();
  }

  const calendar = getCalendarClient();
  const calendarId = getCalendarId();

  const meetLink = getMeetLink();

  const descriptionLines = [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    phone ? `Teléfono: ${phone}` : null,
    note ? `Nota: ${note}` : null,
    meetLink ? `Meet: ${meetLink}` : null,
  ].filter((line): line is string => Boolean(line));

  const start = toBogotaISOString(date, slot);
  const end = toBogotaISOString(date, addMinutes(slot, SLOT_DURATION_MIN));
  const summary = `Llamada Latente Estudio · ${name}`;
  const description = descriptionLines.join('\n');

  // No `attendees`/`sendUpdates`: a service account without Domain-Wide
  // Delegation of Authority (Workspace-only, not available on personal
  // Gmail) is forbidden from inviting attendees on an event, so the guest
  // never lands on this event automatically. Their confirmation email
  // includes the Meet link plus addToCalendarUrl (a Google Calendar
  // "render" link) so they can add it to their own calendar with one click.
  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary,
      description,
      location: meetLink,
      start: { dateTime: start, timeZone: TIMEZONE },
      end: { dateTime: end, timeZone: TIMEZONE },
    },
  });

  const eventId = res.data.id;
  const htmlLink = res.data.htmlLink;

  if (!eventId || !htmlLink) {
    throw new Error('Google Calendar did not return the created event.');
  }

  const addToCalendarUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(summary)}` +
    `&dates=${toGoogleCalendarUTC(start)}/${toGoogleCalendarUTC(end)}` +
    `&details=${encodeURIComponent(description)}` +
    `&ctz=${encodeURIComponent(TIMEZONE)}` +
    (meetLink ? `&location=${encodeURIComponent(meetLink)}` : '');

  return { eventId, htmlLink, addToCalendarUrl, meetLink };
}
