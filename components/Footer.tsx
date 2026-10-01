'use client';

import type { Lang, Route } from '@/lib/types';
import { COPY } from '@/lib/data';
import LatenteLogo from './LatenteLogo';

interface FooterProps {
  setRoute: (r: Route) => void;
  lang: Lang;
}

export default function Footer({ setRoute, lang }: FooterProps) {
  const t = COPY[lang].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__top container">
        <div className="site-footer__links">
          <a href="https://instagram.com/latente.studio" target="_blank" rel="noreferrer" className="link-u">
            IG
          </a>
          <a href="https://www.behance.net" target="_blank" rel="noreferrer" className="link-u">
            BÉ
          </a>
          <button
            className="pill"
            onClick={() => { setRoute('contact'); window.scrollTo({ top: 0 }); }}
          >
            {t.contact}
          </button>
        </div>
        <div className="site-footer__copy">
          <span className="t-eyebrow">© {year}</span>
          <LatenteLogo height={20} sub={false} />
        </div>
      </div>
      <div className="site-footer__bottom container">
        <span>{t.legal}</span>
        <span>{t.location}</span>
      </div>
    </footer>
  );
}
