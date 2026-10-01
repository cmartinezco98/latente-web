import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Latente Estudio — Donde las ideas empiezan a existir.',
  description:
    'Estudio de diseño especializado en branding, fotografía, diseño editorial, web y creación de contenido. Bogotá / Medellín · CO',
  openGraph: {
    title: 'Latente Estudio',
    description: 'Donde las ideas empiezan a existir.',
    siteName: 'Latente Estudio',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
