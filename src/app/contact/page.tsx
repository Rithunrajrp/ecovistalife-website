import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | EcoVistaLife — Property Developers Coimbatore',
  description: 'Get in touch with EcoVistaLife for premium plots and villas in Karamadai, Coimbatore. Book a site visit today.',
};

export default function ContactPage() {
  return <ContactClient />;
}
