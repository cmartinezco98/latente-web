'use client';

import { useState } from 'react';
import type { Lang, Route } from '@/lib/types';
import { COPY } from '@/lib/data';
import FaceMascot from '@/components/FaceMascot';
import GlossaryTerm from '@/components/GlossaryTerm';
import ServicesCarousel from '@/components/ServicesCarousel';
import LatenteLogo from '@/components/LatenteLogo';

interface ServicesPageProps {
  lang: Lang;
  setRoute: (r: Route) => void;
}

const CARD_COLORS = [
  { bg: 'var(--lavender)',      fg: '#FFFFFF' },   // morado
  { bg: 'var(--lime)',          fg: 'var(--ink)' }, // verde
  { bg: 'var(--lavender-soft)', fg: 'var(--ink)' }, // lila
];

export default function ServicesPage({ lang, setRoute }: ServicesPageProps) {
  const t = COPY[lang].services;
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="route-enter">
      <section className="services container">
        <div className="services__head">
          <h1 className="t-h1" style={{ fontSize: 'clamp(34px, 4vw, 60px)', fontWeight: 700 }}>{t.headLine}</h1>
          <div className="services__head-face">
            <FaceMascot size={56} color="var(--lime)" />
          </div>
        </div>

        <div className="services__grid">
          {t.items.map((s, i) => {
            const { bg, fg } = CARD_COLORS[i % CARD_COLORS.length];
            const isOpen = openIds.has(s.id);
            return (
              <article key={s.id} className={`svc-card${isOpen ? ' is-open' : ''}`}>
                <button
                  className="svc-card__head"
                  style={{ background: bg, color: fg }}
                  onClick={() => toggle(s.id)}
                  aria-expanded={isOpen}
                >
                  <span className="svc-card__num">{s.n}</span>
                  <h3 className="svc-card__title">{s.t}</h3>
                  <span className="svc-card__toggle" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <div className="svc-card__panel">
                  <div className="svc-card__panel-inner">
                    <div className="svc-card__body">
                      <p className="svc-card__desc">
                        {s.intro
                          ? s.intro.map((seg, gi) =>
                              typeof seg === 'string'
                                ? <span key={gi}>{seg}</span>
                                : <GlossaryTerm key={gi} term={seg.term} definition={s.glossary?.[seg.term] ?? ''} tipBg={bg} tipFg={fg} />
                            )
                          : s.d}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <ServicesCarousel />

        <div className="services__cta">
          <p className="services__cta-line">
            {lang === 'es' ? (
              <>
                Si tienes una idea,
                <span className="services__cta-line2">
                  HAGÁMOSLA
                  <span className="services__cta-logo">
                    <LatenteLogo height={40} sub={false} color="var(--lavender)" />
                  </span>
                </span>
              </>
            ) : t.cta}
          </p>
          <button
            className="services__cta-btn"
            onClick={() => { setRoute('contact'); window.scrollTo({ top: 0 }); }}
          >
            {t.ctaButton} →
          </button>
        </div>
      </section>
    </div>
  );
}
