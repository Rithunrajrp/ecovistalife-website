import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Portfolio — Premium Gated Communities & Villa Plots',
  description: 'Explore EcoVistaLife\'s portfolio of premium residential projects in Coimbatore and Karamadai. Sustainable luxury living spaces designed for your future.',
  openGraph: {
    title: 'Our Projects | EcoVistaLife',
    description: 'Explore our curated collection of premium eco-friendly developments — Gardenia, Mount Shadows, and French Ville.',
    url: 'https://ecovistalife.in/projects',
    images: [{ url: '/Images/Gardenia/IMG_4923.JPG', width: 1200, height: 630, alt: 'EcoVistaLife Projects' }],
  },
  alternates: { canonical: 'https://ecovistalife.in/projects' },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
