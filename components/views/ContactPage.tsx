'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/lib/types';
import { COPY } from '@/lib/data';
import FaceMascot from '@/components/FaceMascot';

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

  const [monthOffset, setMonthOffset] = useState(0);
  const today = new Date();
  const shown = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year  = shown.getFullYear();
  const month = shown.getMonth();
  const first = new Date(year, month, 1);
  const last  = new Date(year, month + 1, 0);
  const startDay = (first.getDay() + 6) % 7; // Mon=0
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= last.getDate(); d++) cells.push(d);

  // Real availability, fetched from Google Calendar via /api/calendar/availability.
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsStatus, setSlotsStatus] = useState<SlotsStatus>('idle');

  // Mini booking form — separate from the general contact form below,
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

  const changeMonth = (delta: number) => {
    setMonthOffset((o) => Math.min(3, Math.max(0, o + delta)));
    setSelectedDay(null);
    setSelectedSlot(null);
  };

  const goToForm = () =>
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

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
        <div className="contact-hero">
          <div className="contact-hero__card">
            <span className="contact-hero__face" aria-hidden="true">
              <FaceMascot size={360} color="#FFFFFF" />
            </span>
            <h1 className="contact-hero__title">{t.heroTitle}</h1>
            <p className="contact-hero__sub">{t.sub}</p>
            <div className="contact-hero__cta">
              <button type="button" className="contact-hero__btn" onClick={goToForm}>{t.heroCta}</button>
              <button type="button" className="contact-hero__arrow" onClick={goToForm} aria-label={t.heroCta}>↓</button>
            </div>
          </div>

          <div className="contact-hero__cal">
            <div className="contact-hero__cal-head">
              <h2 className="contact-hero__cal-title">{t.titleA} {t.titleB}</h2>
              <div className="cal-nav">
                <button type="button" className="cal-nav__btn" onClick={() => changeMonth(-1)} disabled={monthOffset === 0} aria-label="←">←</button>
                <div className="t-h3">{t.monthNames[month]} {year}</div>
                <button type="button" className="cal-nav__btn" onClick={() => changeMonth(1)} disabled={monthOffset === 3} aria-label="→">→</button>
              </div>
              <p className="t-muted" style={{ fontSize: 13, marginTop: 6 }}>{t.calendar.sub}</p>
            </div>
            <div className="cal-grid">
              {t.dayHeads.map((d, i) => (
                <div key={i} className="cal-day-head">{d}</div>
              ))}
              {cells.map((d, i) => {
                if (d === null) return <div key={i} />;
                const date = new Date(year, month, d);
                const dow  = date.getDay();
                const off  = dow === 0 || dow === 6 || (monthOffset === 0 && d < today.getDate());
                const isToday = monthOffset === 0 && d === today.getDate();
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
                {slotsStatus === 'idle' && slots.map((sl) => (
                  <button
                    key={sl}
                    type="button"
                    className={`slot${selectedSlot === sl ? ' is-on' : ''}`}
                    onClick={() => setSelectedSlot(sl)}
                  >
                    {sl}
                  </button>
                ))}
              </div>
            )}

            {selectedDay && selectedSlot && (
              <form className="cal-booking" onSubmit={submitBooking} style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p className="t-muted" style={{ fontSize: 13 }}>
                  {t.calendlyCta} · {t.monthNames[month]} {selectedDay}, {selectedSlot}
                </p>

                <input className="field" type="text" placeholder={t.calendar.form.name} aria-label={t.calendar.form.name} required value={booking.name} onChange={setBookingField('name')} />
                <input className="field" type="email" placeholder={t.calendar.form.email} aria-label={t.calendar.form.email} required value={booking.email} onChange={setBookingField('email')} />
                <input className="field" type="tel" placeholder={t.calendar.form.phone} aria-label={t.calendar.form.phone} value={booking.phone} onChange={setBookingField('phone')} />
                <textarea className="field" placeholder={t.calendar.form.note} aria-label={t.calendar.form.note} rows={2} value={booking.note} onChange={setBookingField('note')} />

                <p className="t-muted" style={{ fontSize: 12 }}>{t.calendar.form.requiredHint}</p>

                {bookingStatus === 'slot_taken' && (
                  <p className="t-muted" style={{ fontSize: 12 }} role="alert">{t.calendar.slotTaken}</p>
                )}
                {bookingStatus === 'error' && (
                  <p className="t-muted" style={{ fontSize: 12 }} role="alert">{t.calendar.form.error}</p>
                )}

                <button
                  type="submit"
                  className="pill pill--solid"
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

        <div className="contact__row" id="contact-form">
          <h2 className="contact__form-title">{t.heroCta}</h2>
          <form className="contact__form" onSubmit={submit} noValidate>
            <div className="contact__form-pair">
              <input className="field" type="email" placeholder={t.form.email} aria-label={t.form.email} required value={form.email} onChange={set('email')} />
              <input className="field" type="tel" placeholder={t.form.phone} aria-label={t.form.phone} value={form.phone} onChange={set('phone')} />
            </div>
            <input className="field" type="text" placeholder={t.form.name} aria-label={t.form.name} required value={form.name} onChange={set('name')} />
            <select className="field" aria-label={t.form.service} value={form.service} onChange={set('service')}>
              <option value="">{t.form.service}</option>
              {services.map((sv) => (
                <option key={sv.id} value={sv.id}>{sv.t}</option>
              ))}
            </select>
            <textarea className="field" placeholder={t.form.message} aria-label={t.form.message} rows={5} value={form.message} onChange={set('message')} />
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
    </div>
  );
}
