'use client';

import type { Lang } from '@/lib/types';
import { COPY } from '@/lib/data';
import AboutPhotoRotator from '@/components/AboutPhotoRotator';

interface AboutPageProps {
  lang: Lang;
}

const QA_COLORS = ['var(--lavender)', 'var(--terra)', 'var(--lime)'];

export default function AboutPage({ lang }: AboutPageProps) {
  const t = COPY[lang].about;

  return (
    <div className="route-enter">
      {/* Manifesto hero */}
      <section className="about-hero container">
        <div className="t-eyebrow">{t.eyebrow}</div>
        <div className="about-hero__row">
          <div className="about-hero__photo-wrap">
            <div className="about-hero__photo-bg" aria-hidden="true" />
            <AboutPhotoRotator />
          </div>
          <p className="about-hero__statement">{t.photoCaption}</p>
        </div>
      </section>

      {/* Intro Q&A */}
      <section className="about-intro container">
        <div className="about-values__grid">
          {t.qa.map((item, i) => (
            <article
              key={i}
              className="value"
              style={{ borderColor: QA_COLORS[i % QA_COLORS.length] } as React.CSSProperties}
            >
              <div className="value__num">
                {String(i + 1).padStart(2, '0')} / {String(t.qa.length).padStart(2, '0')}
              </div>
              <h3 className="value__title">{item.q}</h3>
              <div className="value__body">
                {item.a.map((p, pi) => <p key={pi}>{p}</p>)}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
