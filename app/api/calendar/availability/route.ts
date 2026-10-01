import type { NextRequest } from 'next/server';
import { getAvailableSlots } from '@/lib/googleCalendar';

export const runtime = 'nodejs';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');

  if (!date || !DATE_RE.test(date)) {
    return Response.json({ error: 'invalid_date' }, { status: 400 });
  }

  try {
    const slots = await getAvailableSlots(date);
    return Response.json({ slots });
  } catch (err) {
    console.error('[api/calendar/availability]', err);
    if (err && typeof err === 'object' && 'response' in err) {
      console.error('[api/calendar/availability]', (err as { response?: { data?: unknown } }).response?.data);
    }
    return Response.json({ error: 'calendar_error' }, { status: 500 });
  }
}
