'use client';

interface TickerProps {
  items: readonly string[];
  accent?: boolean;
  dark?: boolean;
}

export default function Ticker({ items, accent = false, dark = false }: TickerProps) {
  const reel = [...items, ...items, ...items];
  const cls = [
    'ticker',
    accent ? 'ticker--accent' : '',
    dark ? 'ticker--dark' : '',
  ].filter(Boolean).join(' ');
  return (
    <div className={cls} aria-hidden="true">
      <div className="ticker__track">
        {reel.map((item, i) => (
          <span key={i} className="ticker__item">
            <span>{item}</span>
            <span className="ticker__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
