'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/lib/types';
import { COPY } from '@/lib/data';
import FaceStrip from '@/components/FaceStrip';

interface ContactPageProps {
  lang: Lang;
}

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';
type SlotsStatus = 'idle' | 'loading' | 'error';
type BookingStatus = 'idle' | 'sending' | 'sent' | 'error' | 'slot_taken';

export default function ContactPage({ lang }: ContactPageProps) {
  const t = COPY[lang].contact;
  const services = COPY[lang].services.items;

  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const today = new Date();
  const year  = today.getFullYear();
  const month = today.getMonth();
  const first = new Date(year, month, 1);
  const last  = new Date(year, month + 1, 0);
  const startDay = (first.getDay() + 6) % 7; // Mon=0
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= last.getDate(); d++) cells.push(d);

  // Real availability, fetched from Google Calendar via /api/calendar/availability.
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsStatus, setSlotsStatus] = useState<SlotsStatus>('idle');

  // Mini booking form — separate from the general contact form above,
  // only what's needed to create the calendar event and invite the guest.
  const [booking, setBooking] = useState({ name: '', email: '', phone: '', note: '' });
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>('idle');

  const dateStrFor = (day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const fetchAvailability = async (day: number) => {
    setSlotsStatus('loading');
    try {
      const res = await fetch(`/api/calendar/availability?date=${dateStrFor(day)}`);
      if (!res.ok) throw new Error('bad_response');
      const data = await res.json();
      setSlots(Array.isArray(data.slots) ? data.slots : []);
      setSlotsStatus('idle');
    } catch {
      setSlots([]);
      setSlotsStatus('error');
    }
  };

  useEffect(() => {
    if (selectedDay === null) return;
    setSelectedSlot(null);
    setBookingStatus('idle');
    fetchAvailability(selectedDay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay, year, month]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          phone: form.phone || undefined,
          service: form.service || undefined,
        }),
      });

      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error('contact_failed');

      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const setBookingField = (k: keyof typeof booking) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setBooking({ ...booking, [k]: e.target.value });

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDay === null || !selectedSlot) return;

    setBookingStatus('sending');
    try {
      const res = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:  booking.name,
          email: booking.email,
          phone: booking.phone || undefined,
          note:  booking.note || undefined,
          date:  dateStrFor(selectedDay),
          slot:  selectedSlot,
        }),
      });

      if (res.status === 409) {
        setBookingStatus('slot_taken');
        setSelectedSlot(null);
        fetchAvailability(selectedDay);
        return;
      }

      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error('booking_failed');

      setBookingStatus('sent');
    } catch {
      setBookingStatus('error');
    }
  };

  return (
    <div className="route-enter">
      <section className="contact container">
        <div className="contact__head">
          <span className="contact__pill-cta">
            {t.titleA} {t.titleB}
          </span>
        </div>

        <div className="contact__row">
          <div>
            <h1 className="contact__phrase">
              <span style={{ display: 'block' }}>{t.phraseA}</span>
              <span style={{ display: 'block', fontStyle: 'italic' }}>{t.phraseB}</span>
              <span style={{ display: 'block' }} className="accent">{t.phraseC}</span>
            </h1>
            <p className="contact__sub">{t.sub}</p>
          </div>

          <form className="contact__form" onSubmit={submit} noValidate>
            {/* Name */}
            <div className={`field${form.name ? ' has-value' : ''}`}>
              <input id="f-name" type="text" placeholder=" " required value={form.name} onChange={set('name')} />
              <label htmlFor="f-name">{t.form.name}</label>
            </div>
            {/* Email */}
            <div className={`field${form.email ? ' has-value' : ''}`}>
              <input id="f-email" type="email" placeholder=" " required value={form.email} onChange={set('email')} />
              <label htmlFor="f-email">{t.form.email}</label>
            </div>
            {/* Phone */}
            <div className={`field${form.phone ? ' has-value' : ''}`}>
              <input id="f-phone" type="tel" placeholder=" " value={form.phone} onChange={set('phone')} />
              <label htmlFor="f-phone">{t.form.phone}</label>
            </div>
            {/* Service */}
            <div className={`field${form.service ? ' has-value' : ''}`}>
              <select id="f-service" value={form.service} onChange={set('service')}>
                <option value=""></option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.t}</option>
                ))}
              </select>
              <label htmlFor="f-service">{t.form.service}</label>
            </div>
            {/* Message */}
            <div className={`field${form.message ? ' has-value' : ''}`}>
              <textarea id="f-msg" placeholder=" " rows={3} value={form.message} onChange={set('message')} />
              <label htmlFor="f-msg">{t.form.message}</label>
            </div>
            <button type="submit" className="contact__send" disabled={status === 'sending'}>
              {(status === 'idle' || status === 'error') && `${t.form.send} →`}
              {status === 'sending' && t.form.sending}
              {status === 'sent'    && `✓ ${t.form.sent}`}
            </button>
            {status === 'error' && (
              <p className="t-muted" style={{ fontSize: 12, marginTop: 8 }} role="alert">{t.form.error}</p>
            )}
          </form>
        </div>
      </section>

      <FaceStrip />

      {/* Direct contact */}
      <section className="contact__direct container">
        <div className="contact__direct-row">
          <div>
            <div className="t-eyebrow">{t.directLine}</div>
            <a
              href={`mailto:${t.directEmail}`}
              className="contact__email link-u"
              style={{ display: 'block', marginTop: 12 }}
            >
              {t.directEmail}
            </a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="t-eyebrow">@latente.studio</div>
            <a
              href="https://instagram.com/latente.studio"
              target="_blank"
              rel="noreferrer"
              className="contact__email link-u"
              style={{ display: 'block', marginTop: 12, fontSize: 'clamp(28px, 4vw, 64px)' }}
            >
              instagram ↗
            </a>
          </div>
        </div>
      </section>

      {/* Calendly stub */}
      <section className="contact__calendly container">
        <div className="t-eyebrow" style={{ marginBottom: 32 }}>{t.calendlyLine}</div>
        <div className="calendly-stub">
          <div className="calendly-stub__head">
            <div className="t-eyebrow">{t.calendar.title}</div>
            <div className="t-h3" style={{ marginTop: 8 }}>
              {t.monthNames[month]} {year}
            </div>
            <p className="t-muted" style={{ fontSize: 13, marginTop: 8 }}>{t.calendar.sub}</p>
          </div>
          <div>
            <div className="cal-grid">
              {t.dayHeads.map((d, i) => (
                <div key={i} className="cal-day-head">{d}</div>
              ))}
              {cells.map((d, i) => {
                if (d === null) return <div key={i} />;
                const date = new Date(year, month, d);
                const dow  = date.getDay();
                const off  = dow === 0 || dow === 6 || d < today.getDate();
                const isToday = d === today.getDate();
                return (
                  <div
                    key={i}
                    className={`cal-day${off ? ' is-off' : ''}${selectedDay === d ? ' is-on' : ''}${isToday ? ' is-today' : ''}`}
                    onClick={() => !off && setSelectedDay(d)}
                  >
                    {d}
                  </div>
                );
              })}
            </div>
            {selectedDay && (
              <div className="cal-slots">
                {slotsStatus === 'loading' && (
                  <p className="t-muted" style={{ fontSize: 13 }}>{t.calendar.loadingSlots}</p>
                )}
                {slotsStatus === 'error' && (
                  <p className="t-muted" style={{ fontSize: 13 }}>{t.calendar.errorSlots}</p>
                )}
                {slotsStatus === 'idle' && slots.length === 0 && (
                  <p className="t-muted" style={{ fontSize: 13 }}>{t.calendar.noSlots}</p>
                )}
                {slotsStatus === 'idle' && slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`slot${selectedSlot === s ? ' is-on' : ''}`}
                    onClick={() => setSelectedSlot(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {selectedDay && selectedSlot && (
              <form className="cal-booking" onSubmit={submitBooking}>
                <p className="cal-booking__summary">
                  {t.calendlyCta} · {t.monthNames[month]} {selectedDay}, {selectedSlot}
                </p>

                <div className={`field${booking.name ? ' has-value' : ''}`}>
                  <input
                    id="bk-name" type="text" placeholder=" " required
                    value={booking.name} onChange={setBookingField('name')}
                  />
                  <label htmlFor="bk-name">{t.calendar.form.name}</label>
                </div>
                <div className={`field${booking.email ? ' has-value' : ''}`}>
                  <input
                    id="bk-email" type="email" placeholder=" " required
                    value={booking.email} onChange={setBookingField('email')}
                  />
                  <label htmlFor="bk-email">{t.calendar.form.email}</label>
                </div>
                <div className={`field${booking.phone ? ' has-value' : ''}`}>
                  <input
                    id="bk-phone" type="tel" placeholder=" "
                    value={booking.phone} onChange={setBookingField('phone')}
                  />
                  <label htmlFor="bk-phone">{t.calendar.form.phone}</label>
                </div>
                <div className={`field${booking.note ? ' has-value' : ''}`}>
                  <textarea
                    id="bk-note" placeholder=" " rows={2}
                    value={booking.note} onChange={setBookingField('note')}
                  />
                  <label htmlFor="bk-note">{t.calendar.form.note}</label>
                </div>

                <p className="t-muted" style={{ fontSize: 12 }}>{t.calendar.form.requiredHint}</p>

                {bookingStatus === 'slot_taken' && (
                  <p className="cal-booking__notice" role="alert">{t.calendar.slotTaken}</p>
                )}
                {bookingStatus === 'error' && (
                  <p className="cal-booking__notice" role="alert">{t.calendar.form.error}</p>
                )}

                <button
                  type="submit"
                  className="pill pill--solid"
                  style={{ marginTop: 8 }}
                  disabled={bookingStatus === 'sending' || bookingStatus === 'sent'}
                  aria-live="polite"
                >
                  {bookingStatus === 'sending' && t.calendar.form.sending}
                  {bookingStatus === 'sent'    && `✓ ${t.calendar.form.sent}`}
                  {(bookingStatus === 'idle' || bookingStatus === 'error' || bookingStatus === 'slot_taken') && t.calendar.form.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
