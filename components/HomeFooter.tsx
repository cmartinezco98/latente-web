'use client';

import LatenteLogo from './LatenteLogo';

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/latente.studio',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/latente-studio',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10v7M7 7v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 17v-4a2 2 0 0 1 4 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 10.5V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@latente.studio',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M16.5 5.5c.8 1.4 2 2.3 3.8 2.4V11c-1.4 0-2.7-.4-3.8-1.1v5.1a5.1 5.1 0 1 1-5.1-5.1c.3 0 .7 0 1 .1v2.4a2.7 2.7 0 1 0 1.9 2.6V2h2.2c.1 1.2.7 2.3 1.5 3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="home-footer__social">
        {SOCIAL.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="home-footer__icon"
            aria-label={item.label}
          >
            {item.icon}
          </a>
        ))}
      </div>

      <a href="mailto:ceo.latente@gmail.com" className="home-footer__email link-u">
        ceo.latente@gmail.com
      </a>

      <div className="home-footer__logo">
        <LatenteLogo height={28} sub={false} />
      </div>
    </footer>
  );
}
