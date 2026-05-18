"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeroProps {
  heading?: string;
  body?: string;
  image?: string;
  images?: string[];
  buttons?: any[];
  showFloatingCard?: boolean;
  scrollReveal?: boolean;
}

export default function Hero({ heading, body, image, images, buttons, showFloatingCard = true, scrollReveal = false }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerImages = images || (image ? [image] : []);

  // Handle banner rotation
  useEffect(() => {
    if (bannerImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  // Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Standard parallax for non-reveal mode
  const { scrollYProgress: standardProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const standardY = useTransform(standardProgress, [0, 1], ["0%", "30%"]);
  const standardOpacity = useTransform(standardProgress, [0, 0.8], [1, 0]);

  // Scroll Reveal Animations (fades extremely fast within the first 10% of scroll track)
  // imageOpacity goes 1 -> 0
  const imageRevealOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  // textOpacity goes 0 -> 1
  const textRevealOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  // textY goes 50 -> 0
  const textRevealY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  // Apply conditional values based on scrollReveal mode
  const finalImageOpacity = scrollReveal ? imageRevealOpacity : 1;
  const finalTextOpacity = scrollReveal ? textRevealOpacity : 1;
  const finalTextY = scrollReveal ? textRevealY : 0;
  const containerY = scrollReveal ? "0%" : standardY;
  const containerOpacity = scrollReveal ? 1 : standardOpacity;

  return (
    <section 
      ref={containerRef} 
      className={cn(
        "relative w-full bg-black selection:bg-accent selection:text-black", 
        scrollReveal ? "h-[200vh]" : "h-[100svh] overflow-hidden"
      )}
    >
      <div 
        className={cn(
          "w-full h-[100svh] flex items-center justify-center overflow-hidden", 
          scrollReveal ? "sticky top-0 left-0" : "relative"
        )}
      >
        {/* Layer 1 & 2: Background Base and Image */}
        <motion.div 
          style={{ opacity: containerOpacity, y: containerY }}
          className="absolute inset-0 z-0 bg-black"
        >
          {/* This wrapper holds the image and fades out to reveal the black base */}
          <motion.div style={{ opacity: finalImageOpacity }} className="absolute inset-0 overflow-hidden">
            {bannerImages.map((img, idx) => (
              <motion.img 
                key={img}
                initial={false}
                animate={{ 
                  opacity: currentIndex === idx ? 1 : 0,
                  scale: currentIndex === idx ? 1.0 : 1.05
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                src={img} 
                alt={`Hero Background ${idx + 1}`} 
                className="absolute inset-0 w-full h-full object-contain"
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Noise Texture (Constant) */}
        <div className="absolute inset-0 z-[5] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

        {/* Layer 3: Main Content */}
        <motion.div 
          style={{ opacity: finalTextOpacity, y: finalTextY }} 
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          
          {/* Text Side */}
          <div className={cn("flex flex-col items-start text-left z-20", showFloatingCard ? "lg:col-span-8" : "lg:col-span-12")}>
            <div className="overflow-hidden mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-accent" />
                <span className="text-accent font-mono text-xs tracking-[0.6em] uppercase">Invest in Excellence</span>
              </div>
            </div>

            {heading && (
              <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter text-white mb-6 sm:mb-10 max-w-3xl">
                {heading}
              </h1>
            )}

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
              {body && (
                <p className="text-white/60 text-base sm:text-lg max-w-md leading-relaxed font-light">
                  {body}
                </p>
              )}
              {buttons && buttons.length > 0 && (
                <Link href={buttons[0].href}>
                  <MagneticButton className="px-12 py-5 text-sm uppercase tracking-widest bg-white text-black hover:bg-accent transition-colors">
                    {buttons[0].text}
                  </MagneticButton>
                </Link>
              )}
            </div>
          </div>

          {/* Floating Property Card (Side Panel) */}
          {showFloatingCard && (
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-6">
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] shadow-2xl relative group">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/40 transition-all" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-4 block">New Launch</span>
                <h3 className="font-heading text-3xl font-bold text-white mb-4 leading-tight">French Ville <br /> Luxury Plots</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-6">Experience European charm in the heart of Sulur. Pre-launch offers starting now.</p>
                <Link href="/projects/frenchville" className="text-white text-[10px] uppercase tracking-widest font-bold border-b border-accent pb-1 inline-block hover:text-accent transition-colors">Explore Launch</Link>
              </div>

              <div className="flex gap-4 items-stretch">
                <TrustBadge label="100%" sub="Secure" />
                <TrustBadge label="DTCP & RERA" sub="Approved" />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Floating Brand Mark */}
      <div className="absolute top-12 left-12 z-30 opacity-20 pointer-events-none hidden md:block">
        <img src="/logo.png" alt="EcoVista" className="w-16 grayscale invert" />
      </div>

      {/* Modern Scroll Indicator */}
      {scrollReveal && (
        <motion.div style={{ opacity: finalTextOpacity }} className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-4 group cursor-pointer hidden sm:flex">
          <span className="text-white/20 group-hover:text-white transition-colors text-[10px] uppercase tracking-[0.5em] font-mono [writing-mode:vertical-rl] rotate-180">Scroll</span>
          <div className="w-px h-16 bg-white/10 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-accent to-transparent"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}

const TrustBadge = ({ label, sub }: { label: string, sub: string }) => (
  <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-[2rem] flex flex-col items-center justify-center text-center">
    <div className="text-white font-heading font-bold text-xl sm:text-2xl leading-tight">{label}</div>
    <div className="text-[10px] uppercase tracking-widest text-white/30 mt-2">{sub}</div>
  </div>
);
