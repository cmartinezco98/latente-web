'use client';

import Image from 'next/image';

const IMAGES = [
  { src: '/assets/servicios/carrusel/1.webp',  w: 1322, h: 620 },
  { src: '/assets/servicios/carrusel/2.webp',  w: 659,  h: 960 },
  { src: '/assets/servicios/carrusel/3.webp',  w: 653,  h: 816 },
  { src: '/assets/servicios/carrusel/4.webp',  w: 604,  h: 416 },
  { src: '/assets/servicios/carrusel/5.webp',  w: 653,  h: 816 },
  { src: '/assets/servicios/carrusel/6.webp',  w: 1440, h: 602 },
  { src: '/assets/servicios/carrusel/7.webp',  w: 650,  h: 520 },
  { src: '/assets/servicios/carrusel/8.webp',  w: 1325, h: 1193 },
  { src: '/assets/servicios/carrusel/9.webp',  w: 1327, h: 1024 },
  { src: '/assets/servicios/carrusel/10.webp', w: 628,  h: 790 },
  { src: '/assets/servicios/carrusel/11.webp', w: 640,  h: 960 },
  { src: '/assets/servicios/carrusel/12.webp', w: 630,  h: 851 },
  { src: '/assets/servicios/carrusel/13.webp', w: 424,  h: 530 },
  { src: '/assets/servicios/carrusel/14.webp', w: 217,  h: 326 },
  { src: '/assets/servicios/carrusel/15.webp', w: 1312, h: 877 },
  { src: '/assets/servicios/carrusel/16.webp', w: 629,  h: 660 },
  { src: '/assets/servicios/carrusel/17.webp', w: 651,  h: 851 },
  { src: '/assets/servicios/carrusel/18.webp', w: 1323, h: 960 },
];

export default function ServicesCarousel() {
  const reel = [...IMAGES, ...IMAGES];

  return (
    <div className="services__carousel" aria-hidden="true">
      <div className="services__carousel-track">
        {reel.map((img, i) => (
          <div key={i} className="services__carousel-item">
            <Image src={img.src} alt="" width={img.w} height={img.h} />
          </div>
        ))}
      </div>
    </div>
  );
}
