"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface Panel {
  title: string;
  description: string;
  image?: string;
}

export default function HorizontalScroll({ panels }: { panels: Panel[] }) {
  const [isMobile, setIsMobile] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(panels.length - 1) * 100}vw`]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mobile: vertical card stack
  if (isMobile) {
    return (
      <section className="bg-bg-primary py-16">
        <div className="space-y-16 px-6">
          {panels.map((panel, index) => (
            <MobileCard key={index} panel={panel} index={index} />
          ))}
        </div>
      </section>
    );
  }

  // Desktop: horizontal scroll
  return (
    <section ref={targetRef} className="relative bg-bg-primary" style={{ height: `${panels.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Ambient Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-heading font-bold text-white/5 whitespace-nowrap pointer-events-none selection:bg-transparent">
          Our Services
        </div>

        <motion.div style={{ x }} className="flex h-full items-center">
          {panels.map((panel, index) => (
            <div key={index} className="w-[100vw] h-full flex items-center justify-center shrink-0 px-12 md:px-24">
              <Card panel={panel} index={index} progress={scrollYProgress} total={panels.length} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const MobileCard = ({ panel, index }: { panel: Panel; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="flex flex-col gap-6"
    >
      <div className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl border border-white/10">
        {panel.image && (
          <img src={panel.image} alt={panel.title} className="w-full h-full object-cover" />
        )}
      </div>
      <div>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-accent font-mono text-xl font-bold opacity-80">0{index + 1}</span>
          <div className="h-px w-12 bg-accent/50" />
        </div>
        <h3 className="font-heading text-3xl font-bold mb-3 text-white leading-tight">
          {panel.title}
        </h3>
        <p className="text-white/60 text-base leading-relaxed font-light">
          {panel.description}
        </p>
      </div>
    </motion.div>
  );
};

const Card = ({ panel, index, progress, total }: { panel: Panel; index: number; progress: MotionValue<number>; total: number }) => {
  
  // Parallax effect for the image inside the card
  const target = index / Math.max(1, total - 1);
  const range = 1 / Math.max(1, total - 1);
  
  // Image scales up slightly as it approaches center
  const scale = useTransform(progress, (v) => {
    const dist = Math.abs(v - target);
    if (dist >= range) return 0.85;
    const factor = dist / range;
    return 1 - factor * 0.15;
  });
  
  const opacity = useTransform(progress, (v) => {
    const dist = Math.abs(v - target);
    if (dist >= range) return 0.3;
    const factor = dist / range;
    return 1 - factor * 0.7;
  });

  return (
    <motion.div style={{ scale, opacity }} className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
      
      {/* Image Section */}
      <div className="lg:col-span-7 relative">
        <div className="aspect-[16/10] rounded-[2rem] sm:rounded-[3rem] overflow-hidden relative group shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] border border-white/5 bg-white/5">
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay" />
          {panel.image && (
            <img 
              src={panel.image} 
              alt={panel.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
          )}
        </div>
      </div>

      {/* Text Section */}
      <div className="lg:col-span-5 flex flex-col justify-center">
        <div className="flex items-center gap-6 mb-8">
          <span className="text-accent font-mono text-2xl lg:text-3xl font-bold opacity-80">0{index + 1}</span>
          <div className="h-px w-20 bg-accent/50" />
        </div>
        
        <h3 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight">
          {panel.title}
        </h3>
        
        <p className="text-white/60 text-lg lg:text-xl leading-relaxed font-light">
          {panel.description}
        </p>
      </div>

    </motion.div>
  );
};
