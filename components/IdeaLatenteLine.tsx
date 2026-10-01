'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface IdeaLatenteLineProps {
  text: string;
  folder: string;
  count?: number;
  hoverColor?: string;
}

export default function IdeaLatenteLine({ text, folder, count = 6, hoverColor }: IdeaLatenteLineProps) {
  const [hovering, setHovering] = useState(false);
  const [index, setIndex] = useState(0);
  const previewRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hovering) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 650);
    return () => clearInterval(id);
  }, [hovering, count]);

  const moveTo = (e: React.MouseEvent) => {
    const el = previewRef.current;
    if (el) el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -55%)`;
  };

  return (
    <p
      className={`home-closing__line${hovering ? ' is-hover' : ''}`}
      style={hoverColor ? ({ '--hover-color': hoverColor } as React.CSSProperties) : undefined}
      onMouseEnter={(e) => { setIndex(0); setHovering(true); moveTo(e); }}
      onMouseMove={moveTo}
      onMouseLeave={() => setHovering(false)}
    >
      {text}
      <span
        ref={previewRef}
        className="home-closing__preview"
        style={{ opacity: hovering ? 1 : 0 }}
        aria-hidden="true"
      >
        {Array.from({ length: count }).map((_, i) => (
          <Image
            key={i}
            src={`${folder}/${i + 1}.png`}
            alt=""
            fill
            sizes="280px"
            className="home-closing__preview-img"
            style={{ opacity: index === i ? 1 : 0 }}
          />
        ))}
      </span>
    </p>
  );
}
