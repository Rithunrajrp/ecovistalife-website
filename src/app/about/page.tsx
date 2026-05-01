import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | EcoVistaLife — Trusted Builders in Coimbatore',
  description: 'EcoVistaLife: over a decade of creating luxurious living spaces in Coimbatore with DTCP/RERA-approved premium plots and homes.',
};

export default function AboutPage() {
  return <AboutClient />;
}
