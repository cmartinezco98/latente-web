'use client';

import { useEffect, useState } from 'react';
import type { Lang, Route } from '@/lib/types';
import { COPY } from '@/lib/data';
import FaceMascot from './FaceMascot';
import LatenteLogo from './LatenteLogo';

interface HeaderProps {
  route: Route;
  setRoute: (r: Route) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function Header({ route, setRoute, lang, setLang }: HeaderProps) {
  const t = COPY[lang];
  const [scrolled, setScrolled] = useState(false);
  const [floatOpen, setFloatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setFloatOpen(false);
  }, [route]);

  const navItems: { id: Route; label: string }[] = [
    { id: 'work',     label: t.nav.work },
    { id: 'services', label: t.nav.services },
    { id: 'about',    label: t.nav.about },
    { id: 'contact',  label: t.nav.contact },
  ];

  const navigate = (id: Route) => {
    setRoute(id);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <>
      <header className={`site-header${scrolled ? ' is-hidden' : ''}`}>
        <div className="site-header__inner container">
          <button
            className="site-header__logo"
            aria-label="Latente — inicio"
            onClick={() => { setRoute('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <LatenteLogo height={26} sub={false} />
          </button>

          <nav className="site-header__nav" aria-label="Navegación principal">
            {navItems.map((it) => (
              <button
                key={it.id}
                className={`nav-link${route === it.id ? ' nav-link--active' : ''}`}
                onClick={() => navigate(it.id)}
              >
                <span className="nav-link__label">{it.label}</span>
              </button>
            ))}
          </nav>

          <div className="site-header__lang">
            <button
              className={`lang-btn${lang === 'es' ? ' lang-btn--on' : ''}`}
              onClick={() => setLang('es')}
              aria-pressed={lang === 'es'}
            >
              ES
            </button>
            <span className="lang-btn__sep">/</span>
            <button
              className={`lang-btn${lang === 'en' ? ' lang-btn--on' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Floating mascot menu */}
      <div className={`float-nav${scrolled ? ' is-on' : ''}${floatOpen ? ' is-open' : ''}`}>
        <button
          className="float-nav__bubble"
          onClick={() => setFloatOpen((o) => !o)}
          aria-label={floatOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={floatOpen}
        >
          <FaceMascot size={42} color="var(--ink)" />
        </button>

        <nav className="float-nav__panel" aria-hidden={!floatOpen}>
          {navItems.map((it) => (
            <button
              key={it.id}
              className={`float-nav__link${route === it.id ? ' is-active' : ''}`}
              onClick={() => { navigate(it.id); setFloatOpen(false); }}
            >
              {it.label}
            </button>
          ))}
          <span className="float-nav__lang">
            <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>ES</button>
            <span>/</span>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </span>
        </nav>
      </div>
    </>
  );
}
