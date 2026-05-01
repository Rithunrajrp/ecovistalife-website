import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us — Book a Site Visit in Coimbatore',
  description:
    'Get in touch with EcoVistaLife for premium plots and villas in Karamadai, Coimbatore. Book a free site visit, call +91 97877 95555, or visit our head office.',
  openGraph: {
    title: 'Contact EcoVistaLife',
    description:
      'Schedule a free site visit, get a callback, or visit our Coimbatore office. Your dream home journey starts with a conversation.',
    url: 'https://ecovistalife.in/contact',
    images: [{ url: '/Images/Gardenia/IMG_4923.JPG', width: 1200, height: 630, alt: 'Contact EcoVistaLife' }],
  },
  alternates: { canonical: 'https://ecovistalife.in/contact' },
};

export default function ContactPage() {
  return <ContactClient />;
}
