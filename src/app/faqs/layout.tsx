import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Property Buying Guide',
  description: 'Find answers to common questions about DTCP/RERA approvals, home loans, NRI investment, and the home-buying process with EcoVistaLife.',
  openGraph: {
    title: 'FAQs | EcoVistaLife',
    description: 'Everything you need to know about buying property and building your dream home in Coimbatore.',
    url: 'https://ecovistalife.in/faqs',
    images: [{ url: '/Images/Gardenia/IMG_4923.JPG', width: 1200, height: 630, alt: 'EcoVistaLife FAQs' }],
  },
  alternates: { canonical: 'https://ecovistalife.in/faqs' },
};

export default function FAQsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
