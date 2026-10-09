import { google, gmail_v1 } from 'googleapis';

// Server-only module. Never import this from a client component.
// Requires GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET,
// GOOGLE_OAUTH_REFRESH_TOKEN and GMAIL_SENDER in the environment (see .env.local).

let oAuth2Client: InstanceType<typeof google.auth.OAuth2> | null = null;

function getAuth() {
  if (oAuth2Client) return oAuth2Client;

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Gmail credentials are not configured (GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET / GOOGLE_OAUTH_REFRESH_TOKEN).'
    );
  }

  oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  return oAuth2Client;
}

function getSender(): string {
  const sender = process.env.GMAIL_SENDER;
  if (!sender) {
    throw new Error('Gmail sender is not configured (GMAIL_SENDER).');
  }
  return sender;
}

function getGmailClient(): gmail_v1.Gmail {
  return google.gmail({ version: 'v1', auth: getAuth() });
}

function getMailingList(): string[] {
  const raw = process.env.GMAIL_LIST;
  if (!raw) return [];
  return raw.split(',').map((address) => address.trim()).filter(Boolean);
}

function encodeSubject(subject: string): string {
  return `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
}

function toBase64Url(input: string): string {
  return Buffer.from(input, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function sendRaw(headers: string[], bodyLines: string[]): Promise<void> {
  const raw = [
    ...headers,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    bodyLines.join('\n'),
  ].join('\r\n');

  const gmail = getGmailClient();
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: toBase64Url(raw) },
  });
}

export interface BookingEmailPayload {
  name: string;
  email: string;
  date: string; // YYYY-MM-DD
  slot: string; // HH:MM, Colombia time
  addToCalendarUrl: string;
  meetLink?: string;
}

/**
 * Sends the booking confirmation straight to the guest. Calendar can't do
 * this itself: a service account without Domain-Wide Delegation of Authority
 * (only available on Google Workspace, not personal Gmail) is forbidden from
 * inviting attendees on an event, so `createBookingEvent` never sets
 * `attendees`/`sendUpdates` and the guest never lands on the event on their
 * own calendar automatically — addToCalendarUrl (a Google Calendar "render"
 * link) lets them add it themselves with one click.
 */
export async function sendBookingConfirmationEmail(payload: BookingEmailPayload): Promise<void> {
  const { name, email, date, slot, addToCalendarUrl, meetLink } = payload;
  const sender = getSender();
  const mailingList = getMailingList();

  const bodyLines = [
    `Hola ${name},`,
    '',
    `Tu llamada con Latente Estudio quedó confirmada para el ${date} a las ${slot} (hora Colombia).`,
    '',
    meetLink ? `Unirse por Google Meet: ${meetLink}` : null,
    `Agregar a tu calendario: ${addToCalendarUrl}`,
  ].filter((line): line is string => line !== null);

  await sendRaw(
    [
      `From: Latente Estudio <${sender}>`,
      `To: ${name} <${email}>`,
      ...(mailingList.length ? [`Bcc: ${mailingList.join(', ')}`] : []),
      `Subject: ${encodeSubject('Cita confirmada · Latente Estudio')}`,
    ],
    bodyLines
  );
}
