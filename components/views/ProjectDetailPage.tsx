'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Lang, Project } from '@/lib/types';

interface ProjectDetailPageProps {
  lang: Lang;
  project: Project;
  onBack: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  branding: 'var(--lavender)',
  editorial: 'var(--lavender)',
  illustration: 'var(--lime)',
  content: 'var(--lime)',
  photo: 'var(--terra)',
  naming: 'var(--terra)',
  product: 'var(--lavender-soft)',
  social: 'var(--lavender-soft)',
  video: 'var(--lavender-soft)',
};

function ratioOf(a?: string) {
  if (!a) return 1;
  const [w, h] = a.split('/').map(Number);
  return w / h;
}

function MosaicBlock({ images, aspects }: { images: string[]; aspects?: string[] }) {
  const [tall, c2a, c2b, c3a, c3b] = images;
  const [aTall, aC2a, aC2b, aC3a, aC3b] = aspects ?? [];
  const rTall = ratioOf(aTall);
  const hpwC2 = 1 / ratioOf(aC2a) + 1 / ratioOf(aC2b);
  const hpwC3 = 1 / ratioOf(aC3a) + 1 / ratioOf(aC3b);
  const targetHpw = Math.max(hpwC2, hpwC3);
  const w3 = targetHpw / hpwC3;

  const col2Ref = useRef<HTMLDivElement>(null);
  const [w1, setW1] = useState(targetHpw * rTall);

  useLayoutEffect(() => {
    const el = col2Ref.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width && height) setW1((height / width) * rTall);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [rTall]);

  return (
    <div className="proj__block-mosaic3" style={{ gridTemplateColumns: `${w1}fr 1fr ${w3}fr` }}>
      <div className="proj__mosaic-item" style={aTall ? { aspectRatio: aTall } : undefined}>
        <Image src={tall} alt="" fill sizes="(max-width: 820px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="proj__mosaic-col" ref={col2Ref}>
        <div className="proj__mosaic-item" style={aC2a ? { aspectRatio: aC2a } : undefined}>
          <Image src={c2a} alt="" fill sizes="(max-width: 820px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="proj__mosaic-item" style={aC2b ? { aspectRatio: aC2b } : undefined}>
          <Image src={c2b} alt="" fill sizes="(max-width: 820px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
        </div>
      </div>
      <div className="proj__mosaic-col">
        <div className="proj__mosaic-item" style={aC3a ? { aspectRatio: aC3a } : undefined}>
          <Image src={c3a} alt="" fill sizes="(max-width: 820px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="proj__mosaic-item" style={aC3b ? { aspectRatio: aC3b } : undefined}>
          <Image src={c3b} alt="" fill sizes="(max-width: 820px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}

function isVideo(src: string) {
  return src.toLowerCase().endsWith('.mp4');
}

function QuadStackBlock({ images, aspects }: { images: string[]; aspects?: string[] }) {
  const [tall, a, b, c, d] = images;
  const [aTall, aA, aB, aC, aD] = aspects ?? [];
  const rTall = ratioOf(aTall);
  const hpwRow = Math.max(1 / ratioOf(aA), 1 / ratioOf(aB)) + Math.max(1 / ratioOf(aC), 1 / ratioOf(aD));

  const quadRef = useRef<HTMLDivElement>(null);
  const [w1, setW1] = useState(hpwRow * rTall);

  useLayoutEffect(() => {
    const el = quadRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width && height) setW1((height / width) * rTall);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [rTall]);

  return (
    <div className="proj__block-mosaic3" style={{ gridTemplateColumns: `${w1}fr 1fr` }}>
      <div className="proj__mosaic-item" style={aTall ? { aspectRatio: aTall } : undefined}>
        {isVideo(tall) ? (
          <video className="proj__mosaic-video" src={tall} autoPlay muted loop playsInline />
        ) : (
          <Image src={tall} alt="" fill sizes="(max-width: 820px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
        )}
      </div>
      <div className="proj__mosaic-quad" ref={quadRef}>
        {[a, b, c, d].map((img, gi) => (
          <div key={gi} className="proj__mosaic-item" style={aspects?.[gi + 1] ? { aspectRatio: aspects[gi + 1] } : undefined}>
            <Image src={img} alt="" fill sizes="(max-width: 820px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function DuoStackBlock({ images, aspects }: { images: string[]; aspects?: string[] }) {
  const [tall, sa, sb] = images;
  const [aTall, aSa, aSb] = aspects ?? [];
  const rTall = ratioOf(aTall);
  const hpwStack = 1 / ratioOf(aSa) + 1 / ratioOf(aSb);

  const stackRef = useRef<HTMLDivElement>(null);
  const [w1, setW1] = useState(hpwStack * rTall);

  useLayoutEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width && height) setW1((height / width) * rTall);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [rTall]);

  return (
    <div className="proj__block-mosaic3" style={{ gridTemplateColumns: `${w1}fr 1fr` }}>
      <div className="proj__mosaic-item" style={aTall ? { aspectRatio: aTall } : undefined}>
        <Image src={tall} alt="" fill sizes="(max-width: 820px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="proj__mosaic-col" ref={stackRef}>
        <div className="proj__mosaic-item" style={aSa ? { aspectRatio: aSa } : undefined}>
          <Image src={sa} alt="" fill sizes="(max-width: 820px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="proj__mosaic-item" style={aSb ? { aspectRatio: aSb } : undefined}>
          <Image src={sb} alt="" fill sizes="(max-width: 820px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailPage({ lang, project, onBack }: ProjectDetailPageProps) {
  const detail = project.detail;
  if (!detail) return null;

  return (
    <div className="route-enter proj">
      {!project.hideHero && (
        <div className="proj__hero">
          <Image
            src={project.heroImage ?? project.cover}
            alt={project.title[lang]}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      <section className="proj__intro container">
        <div className="proj__intro-head">
          <button className="proj__back" onClick={onBack}>← {lang === 'es' ? 'Portafolio' : 'Portfolio'}</button>
          <h1 className="proj__title">{project.title[lang]}</h1>
          <div className="proj__tags">
            {project.catsLabel[lang].split(' · ').map((label, i) => {
              const color = CATEGORY_COLORS[project.cats[i]];
              return (
                <span
                  key={label}
                  className="proj__tag"
                  style={color ? ({ '--tag-color': color } as React.CSSProperties) : undefined}
                >
                  {label}
                </span>
              );
            })}
          </div>
        </div>
        <div className="proj__paragraphs">
          {detail.paragraphs[lang].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <div className="proj__blocks container">
        {detail.blocks.map((block, i) => {
          if (block.type === 'full') {
            return (
              <div key={i} className="proj__block-full" style={block.aspect ? { aspectRatio: block.aspect } : undefined}>
                {isVideo(block.images[0]) ? (
                  <video className="proj__mosaic-video" src={block.images[0]} autoPlay muted loop playsInline />
                ) : (
                  <Image src={block.images[0]} alt="" fill sizes="(max-width: 820px) 100vw, 1200px" style={{ objectFit: 'cover' }} />
                )}
              </div>
            );
          }
          if (block.type === 'carousel') {
            const loop = [...block.images, ...block.images];
            return (
              <div key={i} className="proj__carousel" style={block.bg ? { backgroundImage: `url(${block.bg})` } : undefined}>
                <div className="proj__carousel-track">
                  {loop.map((img, gi) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={gi} className="proj__carousel-logo" src={img} alt="" />
                  ))}
                </div>
              </div>
            );
          }
          if (block.type === 'mosaic3') {
            return <MosaicBlock key={i} images={block.images} aspects={block.aspects} />;
          }
          if (block.type === 'duoStack') {
            return <DuoStackBlock key={i} images={block.images} aspects={block.aspects} />;
          }
          if (block.type === 'quadStack') {
            return <QuadStackBlock key={i} images={block.images} aspects={block.aspects} />;
          }
          if (block.type === 'strip') {
            return (
              <div key={i} className="proj__block-strip" style={{ gridTemplateColumns: `repeat(${block.images.length}, 1fr)` }}>
                {block.images.map((img, gi) => (
                  <div key={gi} className="proj__block-item proj__strip-item">
                    <Image src={img} alt="" fill sizes="(max-width: 820px) 33vw, 16vw" style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            );
          }
          return (
            <div key={i} className={block.type === 'triple' ? 'proj__block-triple' : 'proj__block-pair'}>
              {block.images.map((img, gi) => (
                <div key={gi} className="proj__block-item" style={block.aspects?.[gi] ? { aspectRatio: block.aspects[gi] } : undefined}>
                  <Image src={img} alt="" fill sizes="(max-width: 820px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
