"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import SectionWrapper from "./ui/SectionWrapper";
import { cn } from "@/lib/utils";

interface StatItem {
  number: string;
  label: string;
}

interface FeatureItem {
  title: string;
  description: string;
}

interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  image: string;
}

interface HomeSectionsProps {
  stats: StatItem[];
  features: FeatureItem[];
  testimonials: TestimonialItem[];
}

export default function HomeSections({ stats, features, testimonials }: HomeSectionsProps) {
  return (
    <div className="bg-bg-primary">
      {/* Stats Section */}
      <SectionWrapper className="pt-20 sm:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col items-center text-center relative"
            >
              <div className="flex items-baseline gap-1">
                <Counter value={parseInt(stat.number)} />
                <span className="text-accent text-3xl md:text-5xl font-bold">{stat.number.replace(/[0-9]/g, '')}</span>
              </div>
              <div className="text-text-secondary uppercase tracking-[0.3em] text-[10px] font-mono mt-4">{stat.label}</div>
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Features Section */}
      <SectionWrapper className="py-16 sm:py-24 px-4 md:px-12">
        <div className="max-w-7xl mx-auto bg-bg-secondary/80 backdrop-blur-xl rounded-2xl sm:rounded-[3rem] lg:rounded-[4rem] p-6 sm:p-12 md:p-24 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -mr-48 -mt-48" />
          
          <div className="mb-20 relative z-10">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6 block">Why EcoVistaLife</span>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold max-w-3xl leading-none tracking-tighter">
              Crafting Excellence. <br />
              <span className="text-white/20">Delivering Trust.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl sm:rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
            {features.map((feature, i) => (
              <FeatureCard key={i} index={i} feature={feature} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-20 text-center flex flex-col items-center">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 sm:mb-6 block">Client Stories</span>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter">Voices of Satisfaction.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] group hover:bg-accent/5 transition-all duration-700 relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 text-[12rem] font-serif text-white/5 group-hover:text-accent/10 transition-colors pointer-events-none">&ldquo;</div>
                <p className="text-base sm:text-lg leading-relaxed text-white/70 mb-6 sm:mb-10 relative z-10 font-light italic">"{t.quote}"</p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors p-1">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg tracking-tight group-hover:text-accent transition-colors">{t.name}</p>
                    <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

function Counter({ value }: { value: number }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        (ref.current as any).textContent = Intl.NumberFormat("en-US").format(
          Math.round(latest)
        );
      }
    });
  }, [springValue]);

  return <span ref={ref} className="font-heading text-5xl md:text-7xl font-bold text-white">0</span>;
}

function FeatureCard({ feature, index }: { feature: FeatureItem, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-bg-secondary/80 backdrop-blur-xl p-8 sm:p-12 group hover:bg-white/5 transition-colors duration-700 relative"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
      >
        <span className="font-mono text-accent/20 text-5xl font-bold block mb-8 group-hover:text-accent group-hover:scale-110 transition-all origin-left duration-500">
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>
      
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
        className="font-heading text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors"
      >
        {feature.title}
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
        className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/60 transition-colors"
      >
        {feature.description}
      </motion.p>
    </motion.div>
  );
}
