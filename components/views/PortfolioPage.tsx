'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Lang, Project } from '@/lib/types';
import { COPY } from '@/lib/data';

interface PortfolioPageProps {
  lang: Lang;
  projects: Project[];
  onOpenProject: (id: string) => void;
}

const FILTER_KEYS = [
  'all', 'photo', 'branding', 'naming', 'product', 'web', 'social', 'content', 'experience', 'editorial', 'illustration', 'video',
] as const;

const FILTER_COLORS: Record<(typeof FILTER_KEYS)[number], string> = {
  all: 'var(--lavender)',
  photo: 'var(--terra)',
  branding: 'var(--lavender)',
  naming: 'var(--terra)',
  product: 'var(--lavender-soft)',
  web: 'var(--lime)',
  social: 'var(--lavender-soft)',
  content: 'var(--lime)',
  experience: 'var(--terra)',
  editorial: 'var(--lavender)',
  illustration: 'var(--lime)',
  video: 'var(--lavender-soft)',
};

const ROW_TEMPLATES: readonly (readonly string[])[] = [
  ['size-wide', 'size-tall'],
  ['size-sq', 'size-sq', 'size-sq'],
  ['size-half', 'size-half'],
];

function computeAutoSizes(count: number): string[] {
  const sizes: string[] = [];
  let remaining = count;
  let templateIdx = 0;
  while (remaining > 0) {
    const template = ROW_TEMPLATES[templateIdx % ROW_TEMPLATES.length];
    if (template.length <= remaining) {
      sizes.push(...template);
      remaining -= template.length;
      templateIdx++;
    } else if (remaining === 1) {
      sizes.push('size-full');
      remaining = 0;
    } else if (remaining === 2) {
      sizes.push('size-half', 'size-half');
      remaining = 0;
    } else {
      sizes.push('size-sq', 'size-sq', 'size-sq');
      remaining = 0;
    }
  }
  return sizes;
}

function resolveGridSize(item: Project, filterKey: string): string | undefined {
  const g = item.gridSize;
  if (!g) return undefined;
  return typeof g === 'string' ? g : g[filterKey];
}

// Pinned projects (via `gridSize`) keep their forced size for the given filter;
// everything else auto-fills complete rows around them so no card is ever left
// orphaned. A pin only tied to one filter key falls back to auto-sizing in
// every other view, since its intended partner may not be there.
function computeSizes(items: Project[], filterKey: string): string[] {
  const sizes: string[] = new Array(items.length);
  let runStart = 0;
  const flushRun = (start: number, end: number) => {
    const runSizes = computeAutoSizes(end - start);
    runSizes.forEach((size, i) => { sizes[start + i] = size; });
  };
  items.forEach((item, i) => {
    const pinned = resolveGridSize(item, filterKey);
    if (pinned) {
      flushRun(runStart, i);
      sizes[i] = pinned;
      runStart = i + 1;
    }
  });
  flushRun(runStart, items.length);
  return sizes;
}

export default function PortfolioPage({ lang, projects, onOpenProject }: PortfolioPageProps) {
  const t = COPY[lang].portfolio;
  const [filter, setFilter] = useState('all');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.cats.includes(filter));
  const sizes = computeSizes(filtered, filter);

  return (
    <div className="route-enter">
      <div className="work-banner">
        <p className="work-banner__text">Ideas latentes</p>
      </div>

      <section className="work container">
        <div className="work__filters">
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              className={`chip${filter === key ? ' chip--active' : ''}`}
              style={{ '--chip-color': FILTER_COLORS[key] } as React.CSSProperties}
              onClick={() => setFilter(key)}
            >
              {t.filters[key as keyof typeof t.filters]}
            </button>
          ))}
        </div>

        <div className="work__grid">
          {filtered.map((p, i) => (
            <article
              key={p.id}
              className={`work-card ${sizes[i]}${p.detail ? ' has-detail' : ''}`}
              onClick={p.detail ? () => onOpenProject(p.id) : undefined}
              role={p.detail ? 'button' : undefined}
              tabIndex={p.detail ? 0 : undefined}
            >
              <div className={`work-card__media${p.coverFit === 'contain' ? ' work-card__media--contain' : ''}`}>
                <Image
                  src={p.cover}
                  alt={p.title[lang]}
                  fill
                  sizes="(max-width: 820px) 100vw, 80vw"
                  style={{ objectFit: p.coverFit ?? 'cover' }}
                />
                <div className="work-card__scrim" />
                <div className="work-card__tag">
                  <span className="work-card__tag-label">{p.title[lang]}</span>
                  <span className="work-card__tag-arrow" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3.5 10.5l7-7M5 3.5h5.5V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <button
        className={`back-to-top${showTop ? ' is-on' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-hidden={!showTop}
      >
        ↑ {t.backToTop}
      </button>
    </div>
  );
}
