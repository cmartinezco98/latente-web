import { COPY } from '@/lib/data';

// Shared parsing for the contact and booking forms: both collect the same
// person fields, which map 1:1 to the base columns of the Google Sheet.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DIAL_CODE_RE = /^\+\d{1,4}$/;

export interface PersonFields {
  name: string;
  lastName: string;
  email: string;
  dialCode?: string;
  phone?: string;
  service?: string; // Spanish label, e.g. "Diseño web"
}

const optional = (v: unknown): string | undefined =>
  typeof v === 'string' && v.trim() ? v.trim() : undefined;

/** Returns null when a required field is missing or malformed. */
export function parsePerson(body: Record<string, unknown>): PersonFields | null {
  const { name, lastName, email, dialCode, phone, service } = body;

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof lastName !== 'string' || !lastName.trim() ||
    typeof email !== 'string' || !EMAIL_RE.test(email.trim())
  ) {
    return null;
  }

  const cleanPhone = optional(phone);
  const cleanDial = optional(dialCode);
  const serviceId = optional(service);

  return {
    name: name.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    phone: cleanPhone,
    dialCode: cleanPhone && cleanDial && DIAL_CODE_RE.test(cleanDial) ? cleanDial : undefined,
    service: serviceId
      ? COPY.es.services.items.find((s) => s.id === serviceId)?.t ?? serviceId
      : undefined,
  };
}

export const fullName = (p: PersonFields) => `${p.name} ${p.lastName}`;

export const fullPhone = (p: PersonFields) =>
  p.phone ? [p.dialCode, p.phone].filter(Boolean).join(' ') : undefined;

export { optional as optionalString };
