import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services | EcoVistaLife — Premium Real Estate Solutions',
  description: 'Premium villa plots, sustainable communities, investment solutions, and custom home design in Coimbatore.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
