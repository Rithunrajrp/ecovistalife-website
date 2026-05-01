import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Family Fest — A Visual Journey of Community',
  description: 'Relive the moments of joy, togetherness, and community at the EcoVistaLife Family Fest. Experience the story of our vibrant neighborhood.',
  openGraph: {
    title: 'Family Fest | EcoVistaLife',
    description: 'A grand celebration of community and sustainable living. Explore the chapters of our Family Fest.',
    url: 'https://ecovistalife.in/fest',
    images: [{ url: '/Images/Family Fest/Background.JPG', width: 1200, height: 630, alt: 'EcoVistaLife Family Fest' }],
  },
  alternates: { canonical: 'https://ecovistalife.in/fest' },
};

export default function FestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
