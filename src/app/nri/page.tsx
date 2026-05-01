"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/MagneticButton';
import Link from 'next/link';

export default function NRIPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <main ref={containerRef} className="bg-bg-primary min-h-screen selection:bg-accent selection:text-black">
      
      {/* Cinematic Hero */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-bg-primary z-10" />
          <img 
            src="/Images/Mount Shadows/DJI_0301.JPG" 
            alt="Investment View" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase mb-6 block">
              Global Investments
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 sm:mb-8 leading-[0.9] tracking-tighter">
              Your Roots. <br />
              <span className="text-white/20">Our Commitment.</span>
            </h1>
            <p className="text-white/60 text-base sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
              Distance shouldn't be a barrier to securing your future. We offer a seamless, transparent investment experience for the Global Indian.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-4 opacity-20 hidden sm:flex">
          <span className="text-white text-[10px] uppercase tracking-[0.5em] rotate-90 mb-8 font-mono">Vision</span>
          <div className="w-px h-12 bg-white" />
        </div>
      </section>

      {/* The Homecoming Narrative */}
      <SectionWrapper className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="w-12 h-1 bg-accent" />
                <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                  Invest in the Future of Coimbatore.
                </h2>
                <p className="text-white/60 text-base sm:text-xl leading-relaxed font-light">
                  Ranked as one of India's safest and fastest-growing cities, Coimbatore offers a lifestyle of serenity and an investment landscape of high returns. We bridge the gap between where you are and where you belong.
                </p>
                <div className="pt-8">
                  <Link href="/contact">
                    <MagneticButton className="px-12 py-5">Schedule a Virtual Tour</MagneticButton>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl sm:rounded-[3rem] overflow-hidden">
                <StatCard label="Annual Appreciation" value="15%+" />
                <StatCard label="Secure Titles" value="100%" />
                <StatCard label="Smart City Growth" value="#1" />
                <StatCard label="Digital Process" value="Paperless" />
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Visual Process Section */}
      <SectionWrapper className="bg-bg-secondary rounded-2xl sm:rounded-[3rem] lg:rounded-[5rem] py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-4 block">The Journey</span>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold text-white">Seamless Transparency.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[40%] left-[10%] right-[10%] h-px bg-white/5 z-0" />
            
            <ProcessStep 
              number="01" 
              title="Virtual Discovery" 
              description="Experience our properties from anywhere in the world with high-definition virtual tours and real-time project updates."
            />
            <ProcessStep 
              number="02" 
              title="Digital Documentation" 
              description="Fully compliant legal processes handled digitally. From KYC to Sale Agreements, we manage it all remotely."
            />
            <ProcessStep 
              number="03" 
              title="Asset Management" 
              description="Post-purchase support including maintenance, tax assistance, and property management for your peace of mind."
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Global Presence Section */}
      <SectionWrapper className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-white/5 p-8 sm:p-16 md:p-24 rounded-2xl sm:rounded-[3rem] lg:rounded-[4rem] border border-white/5 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
            <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8">Dedicated NRI Concierge.</h2>
                <div className="space-y-6">
                  <ConciergeItem title="Power of Attorney Assistance" />
                  <ConciergeItem title="NRE/NRO Account Setup" />
                  <ConciergeItem title="TDS & Tax Advisory" />
                  <ConciergeItem title="Resale & Rental Support" />
                </div>
              </div>
              <div className="relative aspect-square rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="/Images/Gardenia/IMG_4925.JPG" alt="Concierge" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <Footer 
        heading="Securing Legacies Globally." 
         
        image="/logo.png" 
      />
    </main>
  );
}

const StatCard = ({ label, value }: { label: string, value: string }) => (
  <div className="p-8 sm:p-12 bg-bg-secondary hover:bg-accent/5 transition-colors duration-500 text-center sm:text-left">
    <div className="font-heading text-3xl sm:text-5xl font-bold text-white mb-4">{value}</div>
    <div className="text-accent/50 text-[10px] uppercase tracking-[0.3em] font-mono">{label}</div>
  </div>
);

const ProcessStep = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative z-10 bg-bg-primary p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] border border-white/5 hover:border-accent/20 transition-all duration-500 group"
  >
    <div className="text-accent font-mono text-sm mb-6 flex items-center gap-4">
      <span className="w-8 h-px bg-accent/20 group-hover:w-12 transition-all" />
      {number}
    </div>
    <h3 className="font-heading text-2xl font-bold text-white mb-6">{title}</h3>
    <p className="text-white/40 text-sm leading-relaxed font-light">{description}</p>
  </motion.div>
);

const ConciergeItem = ({ title }: { title: string }) => (
  <div className="flex items-center gap-6 group">
    <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform" />
    <span className="text-white/70 text-lg md:text-xl font-light group-hover:text-white transition-colors">{title}</span>
  </div>
);

