"use client";

import { motion } from 'framer-motion';
import HorizontalScroll from '@/components/HorizontalScroll';
import Footer from '@/components/Footer';
import PageHeader from '@/components/ui/PageHeader';
import SectionWrapper from '@/components/ui/SectionWrapper';

const AMENITIES = [
  'CCTV Surveillance', 'Storm Water Drain', 'LED Street Lights', 'Jogging Track',
  'Yoga Deck', 'Gazebo Seating', 'Senior Citizen Park', 'Turf Court',
  'Open Play Area', 'Outdoor Gym', 'Compound Wall', 'Kids\' Play Zone',
  'Overhead Tank', '24/7 Security',
];

const SERVICES = [
  { title: 'Premium Villa Plots', description: 'DTCP/RERA-approved plots in secure gated communities with eco-friendly surroundings and world-class amenities.', image: '/Images/Gardenia/IMG_4923.JPG' },
  { title: 'Sustainable Communities', description: 'Energy-efficient designs with natural light, air purification, and vibrant green spaces for well-being.', image: '/Images/Mount Shadows/DJI_0301.JPG' },
  { title: 'Investment Solutions', description: 'Strategically located properties with excellent returns and transparent pricing in Coimbatore.', image: '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.05.14 PM.jpeg' },
  { title: 'Custom Home Design', description: 'Flexible layouts and designs crafted by expert architects to bring your personal vision to life.', image: '/Images/Gardenia/IMG_4928.JPG' },
];

export default function ServicesClient() {
  return (
    <main className="bg-bg-primary min-h-screen">
      <PageHeader 
        label="What We Offer"
        title="Our Services"
        subtitle="We create outstanding villas, plots, and gated communities in Karamadai and Coimbatore. From sustainable living to investment solutions, we offer comprehensive real estate services."
      />

      {/* The HorizontalScroll component has its own sticky/scroll logic and takes up full viewport height */}
      <HorizontalScroll panels={SERVICES} />

      <SectionWrapper className="bg-bg-secondary py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16 text-center">
            <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-4 block">Community Features</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">EcoVistaLife Amenities</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {AMENITIES.map((amenity, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-accent/50 transition-all duration-300 group flex items-center justify-center text-center"
              >
                <span className="text-text-secondary group-hover:text-white transition-colors font-medium text-sm md:text-base">
                  {amenity}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <Footer heading="Get In Touch"  image="/logo.png" />
    </main>
  );
}

