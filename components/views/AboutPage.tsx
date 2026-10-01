'use client';

import type { Lang } from '@/lib/types';
import { COPY } from '@/lib/data';
import AboutPhotoRotator from '@/components/AboutPhotoRotator';
import Ticker from '@/components/Ticker';

interface AboutPageProps {
  lang: Lang;
}

const QA_COLORS = [
  { bg: 'var(--lavender)', fg: '#FFFFFF' },
  { bg: 'var(--terra)',    fg: '#FFFFFF' },
  { bg: 'var(--lime)',     fg: 'var(--ink)' },
];

export default function AboutPage({ lang }: AboutPageProps) {
  const t = COPY[lang].about;

  return (
    <div className="route-enter">
      {/* Manifesto hero */}
      <section className="about-hero container">
        <div className="about-hero__row">
          <div className="about-hero__photo-wrap">
            <div className="about-hero__photo-bg" aria-hidden="true" />
            <AboutPhotoRotator />
          </div>
          <p className="about-hero__statement">
            {t.photoCaption.split('\n').map((line, i) => (
              <span key={i} className={i > 0 ? 'about-hero__statement-big' : undefined}>{line}</span>
            ))}
          </p>
        </div>
      </section>

      {/* Intro Q&A */}
      <div className="about-dark">
      <Ticker items={COPY[lang].home.tickerItems} dark />
      <section className="about-intro container">
        <div className="about-values__grid">
          {t.qa.map((item, i) => {
            const { bg, fg } = QA_COLORS[i % QA_COLORS.length];
            return (
              <article
                key={i}
                className="value"
                style={{ background: bg, color: fg, borderColor: bg }}
              >
                <div className="value__num">
                  {String(i + 1).padStart(2, '0')} / {String(t.qa.length).padStart(2, '0')}
                </div>
                <h3 className="value__title">{item.q}</h3>
                <div className="value__body">
                  {item.a.map((p, pi) => <p key={pi}>{p}</p>)}
                </div>
              </article>
            );
          })}
        </div>
      </section>
      </div>
    </div>
  );
}
