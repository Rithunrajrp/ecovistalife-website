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
    <div className="w-screen h-screen flex items-center justify-center p-8 md:p-24 shrink-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center max-w-7xl mx-auto w-full">
        <motion.div 
          style={{ opacity, y: textY }}
          className="flex flex-col justify-center"
        >
          <span className="text-accent font-mono text-xl md:text-2xl mb-6">0{index + 1}</span>
          <h3 className="font-heading text-5xl md:text-7xl font-bold mb-8 text-text-primary leading-tight">
            {panel.title}
          </h3>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-md">
            {panel.description}
          </p>
        </motion.div>
        
        {panel.image && (
          <motion.div 
            style={{ scale: imageScale, rotate: imageRotate, opacity }}
            className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden rounded-3xl"
          >
             <div className="absolute inset-0 bg-black/10 z-10" />
             <img 
               src={panel.image} 
               alt={panel.title} 
               className="w-full h-full object-cover"
             />
          </motion.div>
        )}
      </div>
    </div>
  );
};
