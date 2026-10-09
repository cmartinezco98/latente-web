'use client';

import { useEffect, useState } from 'react';
import type { Lang, Route } from '@/lib/types';
import { PROJECTS } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HomePage from '@/components/views/HomePage';
import PortfolioPage from '@/components/views/PortfolioPage';
import ProjectDetailPage from '@/components/views/ProjectDetailPage';
import ServicesPage from '@/components/views/ServicesPage';
import AboutPage from '@/components/views/AboutPage';
import ContactPage from '@/components/views/ContactPage';

function parseHash(): { route: Route; projectId: string | null } {
  if (typeof window === 'undefined') return { route: 'home', projectId: null };
  const raw = window.location.hash.replace('#', '');
  const [routePart, projectPart] = raw.split('/');
  const valid: Route[] = ['home', 'work', 'services', 'about', 'contact'];
  const route = valid.includes(routePart as Route) ? (routePart as Route) : 'home';
  const projectId = route === 'work' && projectPart ? projectPart : null;
  return { route, projectId };
}

export default function SPA() {
  const [route, setRouteState] = useState<Route>('home');
  const [projectId, setProjectId] = useState<string | null>(null);
  const [lang, setLangState] = useState<Lang>('es');

  // Initialise from hash + localStorage on mount
  useEffect(() => {
    const parsed = parseHash();
    setRouteState(parsed.route);
    setProjectId(parsed.projectId);
    const stored = localStorage.getItem('lat-lang');
    if (stored === 'en' || stored === 'es') setLangState(stored);
  }, []);

  // Sync hash → route on back/forward
  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHash();
      setRouteState(parsed.route);
      setProjectId(parsed.projectId);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const setRoute = (r: Route) => {
    setRouteState(r);
    setProjectId(null);
    window.location.hash = r === 'home' ? '' : r;
  };

  const openProject = (id: string) => {
    setRouteState('work');
    setProjectId(id);
    window.location.hash = `work/${id}`;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const closeProject = () => {
    setProjectId(null);
    window.location.hash = 'work';
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const activeProject = projectId ? PROJECTS.find((p) => p.id === projectId) ?? null : null;

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lat-lang', l);
    document.documentElement.lang = l;
  };

  return (
    <>
      <Header route={route} setRoute={setRoute} lang={lang} setLang={setLang} />
      <main key={`${route}-${projectId ?? ''}`}>
        {route === 'home'     && <HomePage    lang={lang} setRoute={setRoute} projects={PROJECTS} />}
        {route === 'work' && activeProject   && <ProjectDetailPage lang={lang} project={activeProject} onBack={closeProject} />}
        {route === 'work' && !activeProject  && <PortfolioPage lang={lang} projects={PROJECTS} onOpenProject={openProject} />}
        {route === 'services' && <ServicesPage  lang={lang} setRoute={setRoute} />}
        {route === 'about'    && <AboutPage    lang={lang} />}
        {route === 'contact'  && <ContactPage  lang={lang} />}
      </main>
      <Footer setRoute={setRoute} lang={lang} />
      <WhatsAppButton />
    </>
  );
}
