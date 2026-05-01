import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us — A Decade of Trust & Excellence in Real Estate',
  description:
    'EcoVistaLife: over a decade of creating luxurious, sustainable living spaces in Coimbatore with DTCP/RERA-approved premium plots and eco-friendly homes.',
  openGraph: {
    title: 'About EcoVistaLife',
    description:
      'A legacy of trust and excellence — our vision, mission, core values, and the leadership team behind Coimbatore\'s premium real estate developer.',
    url: 'https://ecovistalife.in/about',
    images: [{ url: '/Images/Gardenia/IMG_4923.JPG', width: 1200, height: 630, alt: 'About EcoVistaLife' }],
  },
  alternates: { canonical: 'https://ecovistalife.in/about' },
};

export default function AboutPage() {
  return <AboutClient />;
}
