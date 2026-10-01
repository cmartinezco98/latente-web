import type { NextRequest } from 'next/server';
import { sendContactEmail } from '@/lib/gmail';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, reason: 'invalid_body' }, { status: 400 });
  }

  const { name, email, message, phone, service } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !EMAIL_RE.test(email) ||
    typeof message !== 'string' || !message.trim()
  ) {
    return Response.json({ ok: false, reason: 'missing_fields' }, { status: 400 });
  }

  try {
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      phone: typeof phone === 'string' && phone.trim() ? phone.trim() : undefined,
      service: typeof service === 'string' && service.trim() ? service.trim() : undefined,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[api/contact]', err);
    return Response.json({ ok: false, reason: 'server_error' }, { status: 500 });
  }
}
