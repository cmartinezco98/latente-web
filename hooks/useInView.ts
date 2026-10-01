'use client';

import { useEffect, useRef, useState } from 'react';

export function useInView(opts: IntersectionObserverInit = { threshold: 0.15 }) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, [seen, opts]);

  return [ref, seen] as const;
}
