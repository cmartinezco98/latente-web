'use client';

import { useRef } from 'react';

interface GlossaryTermProps {
  term: string;
  definition: string;
  tipBg?: string;
  tipFg?: string;
}

export default function GlossaryTerm({ term, definition, tipBg, tipFg }: GlossaryTermProps) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);

  const place = () => {
    const anchor = anchorRef.current;
    const tip = tipRef.current;
    if (!anchor || !tip) return;
    const r = anchor.getBoundingClientRect();
    const margin = 16;

    const halfWidth = tip.offsetWidth / 2;
    const centerX = Math.min(
      Math.max(r.left + r.width / 2, halfWidth + margin),
      window.innerWidth - halfWidth - margin
    );

    const tipHeight = tip.offsetHeight;
    const spaceBelow = window.innerHeight - r.bottom;
    const placeAbove = spaceBelow < tipHeight + margin && r.top > tipHeight + margin;

    tip.style.left = `${centerX}px`;
    tip.style.top = placeAbove ? `${r.top - 10 - tipHeight}px` : `${r.bottom + 10}px`;
    tip.classList.toggle('is-above', placeAbove);
  };

  return (
    <span
      ref={anchorRef}
      className="svc-term"
      tabIndex={0}
      onMouseEnter={place}
      onFocus={place}
    >
      {term}
      <span
        ref={tipRef}
        className="svc-term__tip"
        role="tooltip"
        style={{ '--tip-bg': tipBg, '--tip-fg': tipFg } as React.CSSProperties}
      >
        {definition}
      </span>
    </span>
  );
}
