import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NRI Property Investment — Secure Your Roots in Coimbatore',
  description: 'Specialized real estate investment services for NRIs. Virtual site tours, digital documentation, and dedicated concierge for your property in Coimbatore.',
  openGraph: {
    title: 'NRI Investment | EcoVistaLife',
    description: 'Seamless, transparent property investment for the Global Indian. Secure your future in one of India\'s fastest-growing smart cities.',
    url: 'https://ecovistalife.in/nri',
    images: [{ url: '/Images/Mount Shadows/DJI_0301.JPG', width: 1200, height: 630, alt: 'NRI Investment EcoVistaLife' }],
  },
  alternates: { canonical: 'https://ecovistalife.in/nri' },
};

export default function NRILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
