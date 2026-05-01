import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers — Join the EcoVistaLife Team',
  description: 'Build your career with Coimbatore\'s leading premium property developers. Explore opportunities in real estate sales, architecture, and construction.',
  openGraph: {
    title: 'Careers | EcoVistaLife',
    description: 'We are looking for passionate individuals to help us shape the future of sustainable luxury living. Join our team today.',
    url: 'https://ecovistalife.in/career',
    images: [{ url: '/Images/Gardenia/IMG_4923.JPG', width: 1200, height: 630, alt: 'EcoVistaLife Careers' }],
  },
  alternates: { canonical: 'https://ecovistalife.in/career' },
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
