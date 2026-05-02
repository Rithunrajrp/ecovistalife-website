"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import MagneticButton from './MagneticButton';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeroProps {
  heading: string;
  body: string;
  image?: string;
  images?: string[];
  buttons?: any[];
}

export default function Hero({ heading, body, image, images, buttons }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerImages = images || (image ? [image] : []);

  useEffect(() => {
    if (bannerImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Invert the movement by multiplying by -40 instead of 40
      const x = (clientX / innerWidth - 0.5) * -40; 
      const y = (clientY / innerHeight - 0.5) * -40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-bg-primary selection:bg-accent selection:text-black">
      
      {/* Dynamic Background Layers */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale, y: scrollY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-bg-primary z-10" />
        <div className="absolute inset-0 overflow-hidden">
          {bannerImages.map((img, idx) => (
            <motion.img 
              key={img}
              style={{ 
                x: springX, 
                y: springY,
                opacity: currentIndex === idx ? 1 : 0
              }}
              initial={false}
              animate={{ 
                opacity: currentIndex === idx ? 1 : 0,
                scale: currentIndex === idx ? 1.1 : 1.15
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              src={img} 
              alt={`Background ${idx + 1}`} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[150px] opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px] opacity-20 animate-pulse delay-1000" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 z-[5] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* Main Content Layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Text Side */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-px bg-accent" />
              <span className="text-accent font-mono text-xs tracking-[0.6em] uppercase">Invest in Excellence</span>
            </motion.div>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter text-white mb-6 sm:mb-10 max-w-3xl"
          >
            {heading}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12"
          >
            <p className="text-white/60 text-base sm:text-lg max-w-md leading-relaxed font-light">
              {body}
            </p>
            {buttons && buttons.length > 0 && (
              <Link href={buttons[0].href}>
                <MagneticButton className="px-12 py-5 text-sm uppercase tracking-widest bg-white text-black hover:bg-accent transition-colors">
                  {buttons[0].text}
                </MagneticButton>
              </Link>
            )}
          </motion.div>
        </div>

        {/* Floating Property Card (Side Panel) */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="hidden lg:flex lg:col-span-4 flex-col gap-6"
        >
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] shadow-2xl relative group">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/40 transition-all" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-4 block">New Launch</span>
            <h3 className="font-heading text-3xl font-bold text-white mb-4 leading-tight">French Ville <br /> Luxury Plots</h3>
            <p className="text-white/40 text-xs leading-relaxed mb-6">Experience European charm in the heart of Karamadai. Pre-launch offers starting now.</p>
            <Link href="/projects/frenchville" className="text-white text-[10px] uppercase tracking-widest font-bold border-b border-accent pb-1 inline-block hover:text-accent transition-colors">Explore Launch</Link>
          </div>

          <div className="flex gap-4">
            <TrustBadge label="100%" sub="Secure" />
            <TrustBadge label="DTCP & RERA" sub="Approved" />
          </div>
        </motion.div>
      </div>

      {/* Floating Brand Mark */}
      <div className="absolute top-12 left-12 z-30 opacity-20 pointer-events-none hidden md:block">
        <img src="/logo.png" alt="EcoVista" className="w-16 grayscale invert" />
      </div>

      {/* Modern Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-4 group cursor-pointer hidden sm:flex">
        <span className="text-white/20 group-hover:text-white transition-colors text-[10px] uppercase tracking-[0.5em] font-mono [writing-mode:vertical-rl] rotate-180">Scroll</span>
        <div className="w-px h-16 bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full bg-accent"
          />
        </div>
      </div>
    </section>
  );
}

const TrustBadge = ({ label, sub }: { label: string, sub: string }) => (
  <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] text-center">
    <div className="text-white font-heading font-bold text-xl">{label}</div>
    <div className="text-[10px] uppercase tracking-widest text-white/30">{sub}</div>
  </div>
);
