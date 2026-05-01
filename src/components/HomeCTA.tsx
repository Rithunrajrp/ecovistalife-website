"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import MagneticButton from '@/components/MagneticButton';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function HomeCTA() {
  return (
    <SectionWrapper className="py-20 sm:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
        className="max-w-4xl mx-auto text-center px-4 sm:px-6"
      >
        <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8">Ready to Build Your Dream?</h2>
        <p className="text-base sm:text-xl text-text-secondary mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover premium, eco-friendly plots and villas in Coimbatore.
          Start your journey towards sustainable luxury living today.
        </p>
        <div className="flex justify-center">
          <Link href="/contact">
            <MagneticButton>Book a Site Visit</MagneticButton>
          </Link>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
