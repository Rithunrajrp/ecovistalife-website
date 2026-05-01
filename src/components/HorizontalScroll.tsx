"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface Panel {
  title: string;
  description: string;
  image?: string;
}

export default function HorizontalScroll({ panels }: { panels: Panel[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(panels.length - 1) * 100}vw`]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-bg-secondary">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {panels.map((panel, index) => {
            return <Card panel={panel} key={index} index={index} progress={scrollYProgress} total={panels.length} />;
          })}
        </motion.div>
      </div>
    </section>
  );
}

const Card = ({ panel, index, progress, total }: { panel: Panel; index: number; progress: MotionValue<number>; total: number }) => {
  // Calculate the local progress for this specific card
  // A card is fully in view when progress is around index / (total - 1)
  const target = index / (total - 1 || 1);
  const range = 1 / (total - 1 || 1);
  
  const input = [];
  const opacityOutput = [];
  const yOutput = [];
  const scaleOutput = [];
  const rotateOutput = [];

  if (target - range >= 0) {
    input.push(target - range);
    opacityOutput.push(0);
    yOutput.push(100);
    scaleOutput.push(0.8);
    rotateOutput.push(5);
  }

  input.push(target);
  opacityOutput.push(1);
  yOutput.push(0);
  scaleOutput.push(1);
  rotateOutput.push(0);

  if (target + range <= 1) {
    input.push(target + range);
    opacityOutput.push(0);
    yOutput.push(-100);
    scaleOutput.push(0.8);
    rotateOutput.push(-5);
  }
  
  // Animate elements based on scroll progress mapping
  const imageScale = useTransform(progress, input, scaleOutput);
  const imageRotate = useTransform(progress, input, rotateOutput);
  const textY = useTransform(progress, input, yOutput);
  const opacity = useTransform(progress, input, opacityOutput);

  return (
    <div className="w-screen h-screen flex items-center justify-center shrink-0 relative overflow-hidden group">
      
      {/* Immersive Background Image */}
      {panel.image && (
        <motion.div 
          style={{ scale: imageScale, rotate: imageRotate, opacity }}
          className="absolute inset-0 z-0"
        >
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
           <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-transparent transition-colors duration-1000" />
           <img 
             src={panel.image} 
             alt={panel.title} 
             className="w-full h-full object-cover"
           />
        </motion.div>
      )}

      {/* Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 md:px-24 w-full h-full flex flex-col justify-end pb-32">
        <motion.div 
          style={{ opacity, y: textY }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-6 mb-8">
            <span className="text-accent font-mono text-3xl md:text-5xl font-bold opacity-80">0{index + 1}</span>
            <div className="h-px w-24 bg-accent/50" />
          </div>
          <h3 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-white leading-none tracking-tighter">
            {panel.title}
          </h3>
          <p className="text-white/70 text-xl md:text-2xl leading-relaxed max-w-2xl font-light backdrop-blur-sm bg-black/10 p-6 rounded-3xl border border-white/5">
            {panel.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
