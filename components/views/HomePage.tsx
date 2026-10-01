'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Lang, Route, Project } from '@/lib/types';
import { COPY } from '@/lib/data';
import { useHeroScroll } from '@/hooks/useHeroScroll';
import { useInView } from '@/hooks/useInView';
import Ticker from '@/components/Ticker';
import HomeFooter from '@/components/HomeFooter';
import IdeaLatenteLine from '@/components/IdeaLatenteLine';

interface HomePageProps {
  lang: Lang;
  setRoute: (r: Route) => void;
  projects: Project[];
}

export default function HomePage({ lang }: HomePageProps) {
  const t = COPY[lang].home;
  const heroRef = useRef<HTMLElement>(null);
  const progress = useHeroScroll(heroRef);
  const [darkRef, isDark] = useInView({ threshold: 0.2 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = videoSectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      },
      { threshold: 0.4 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  const bgScale = 1 + progress * 0.15;
  const logoOpacity = 1 - Math.min(progress / 0.5, 1);
  const logoY = progress * -80;
  const overlayOpacity = 0.1 + progress * 0.75;
  const heroFade = Math.max(0, Math.min((progress - 0.8) / 0.2, 1));

  return (
    <div className="home route-enter">
      {/* HERO — sticky parallax scroll */}
      <section
        ref={heroRef}
        className="home-hero"
        style={{ '--hero-progress': progress } as React.CSSProperties}
      >
        <div className="home-hero__sticky">
          <div
            className="home-hero__bg"
            style={{ transform: `scale(${bgScale})` }}
          >
            <video
              className="home-hero__video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/assets/home/cabecera-prov.png"
              aria-label="Latente studio"
            >
              <source src="/assets/home/cabecera.mp4" type="video/mp4" />
            </video>
          </div>

          <div
            className="home-hero__overlay"
            style={{ opacity: overlayOpacity }}
          />

          <div
            className="home-hero__logo-wrap"
            style={{
              opacity: Math.max(logoOpacity, 0),
              transform: `translateY(${logoY}px)`,
            }}
          >
            <Image
              src="/assets/logo-horizontal-blanco.svg"
              alt="Latente studio"
              width={720}
              height={162}
              priority
              className="home-hero__logo"
            />
          </div>

          <div
            className="home-hero__fade"
            style={{ opacity: heroFade }}
          />
        </div>
      </section>

      {/* VIDEO — restarts from the beginning every time it scrolls into view */}
      <section ref={videoSectionRef} className="home-video">
        <div className="home-video__inner">
          <video
            ref={videoRef}
            className="home-video__player"
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Latente — intro"
          >
            <source src="/assets/home/home.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* SERVICES TICKER + CLOSING + FOOTER — smooth white → black fade on scroll-in */}
      <section
        ref={darkRef}
        className={`home-dark-zone${isDark ? ' is-dark' : ''}`}
      >
        <Ticker items={t.tickerItems} dark />

        <div className="home-closing">
          <div className="home-closing__lines" aria-hidden="true">
            <IdeaLatenteLine text="Idea Latente" folder="/assets/home/idea-latente-1" />
            <IdeaLatenteLine text="Idea Latente" folder="/assets/home/idea-latente-2" />
            <IdeaLatenteLine text="Idea Latente" folder="/assets/home/idea-latente-3" />
          </div>
          <HomeFooter />
        </div>
      </section>
    </div>
  );
}
