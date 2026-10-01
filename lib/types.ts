export type Lang = 'es' | 'en';

export type Route = 'home' | 'work' | 'services' | 'about' | 'contact';

export interface ProjectDetailBlock {
  type: 'full' | 'pair' | 'triple' | 'mosaic3' | 'duoStack' | 'quadStack' | 'strip' | 'carousel';
  images: string[];
  aspect?: string;
  aspects?: string[];
  bg?: string;
}

export interface ProjectDetail {
  paragraphs: { es: string[]; en: string[] };
  blocks: ProjectDetailBlock[];
}

export type GridSize = 'size-wide' | 'size-tall' | 'size-sq' | 'size-half' | 'size-full';

export interface Project {
  id: string;
  title: { es: string; en: string };
  client: { es: string; en: string };
  year: string;
  cats: string[];
  catsLabel: { es: string; en: string };
  summary: { es: string; en: string };
  cover: string;
  coverFit?: 'contain';
  aspect: string;
  accent: string;
  hideHero?: boolean;
  heroImage?: string;
  // Fixed grid span for the portfolio card. A plain value applies in every
  // filter view; a map lets the pin only kick in for specific filter keys
  // (e.g. a "size-half" pairing that only makes sense within one category),
  // so the project falls back to auto-sizing everywhere else and never
  // ends up orphaned in a view where its intended partner isn't present.
  gridSize?: GridSize | Partial<Record<string, GridSize>>;
  detail?: ProjectDetail;
}

export type ServiceIntroSegment = string | { term: string };

export interface ServiceItem {
  id: string;
  n: string;
  t: string;
  d: string;
  intro?: ServiceIntroSegment[];
  glossary?: Record<string, string>;
}

export interface QAItem {
  q: string;
  a: string[];
}
