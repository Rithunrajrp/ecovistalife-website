import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services — Land Acquisition, Design & Estate Management',
  description:
    'Premium land acquisition, bespoke architectural design, sustainable construction, and lifelong estate management services by EcoVistaLife in Coimbatore.',
  openGraph: {
    title: 'Our Services | EcoVistaLife',
    description:
      'From acquiring premium land to bespoke architectural design and lifelong estate management. Experience the complete journey of sustainable luxury real estate.',
    url: 'https://ecovistalife.in/services',
    images: [{ url: '/Images/Gardenia/IMG_4928.JPG', width: 1200, height: 630, alt: 'EcoVistaLife Services' }],
  },
  alternates: { canonical: 'https://ecovistalife.in/services' },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
