'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const PHOTOS = Array.from({ length: 10 }, (_, i) => `/assets/nosotros/team-${i + 1}.jpg`);

export default function AboutPhotoRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHOTOS.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="about-hero__photo">
      {PHOTOS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="(max-width: 820px) 90vw, 420px"
          className="about-hero__photo-img"
          style={{ objectFit: 'cover', opacity: i === index ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
