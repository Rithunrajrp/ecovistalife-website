"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } 
  }
};

export default function VisionMission() {
  return (
    <SectionWrapper className="py-20 sm:py-40">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Vision Card */}
          <motion.div 
            variants={itemVariants} 
            className="bg-bg-secondary/80 backdrop-blur-xl p-8 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[4rem] border border-white/5 relative overflow-hidden group hover:border-accent/20 transition-all duration-700"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-accent/10 transition-colors duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-accent" />
                <span className="font-mono text-accent text-xs tracking-[0.5em] uppercase">Our Vision</span>
              </div>
              
              <h3 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] tracking-tighter text-white mb-8">
                Building <span className="text-white/40 italic">Harmony</span>.
              </h3>
              
              <p className="text-white/60 text-lg sm:text-xl leading-relaxed font-light">
                To build beautiful, eco-friendly communities where families can live in perfect balance with nature and modern comfort.
              </p>
              
              <div className="mt-12 opacity-20 group-hover:opacity-40 transition-opacity">
                <div className="w-full h-px bg-gradient-to-r from-accent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div 
            variants={itemVariants} 
            className="bg-bg-secondary/80 backdrop-blur-xl p-8 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[4rem] border border-white/5 relative overflow-hidden group hover:border-accent-green/20 transition-all duration-700"
          >
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-green/5 rounded-full blur-[100px] -mr-48 -mb-48 group-hover:bg-accent-green/10 transition-colors duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-accent-green" />
                <span className="font-mono text-accent-green text-xs tracking-[0.5em] uppercase">Our Mission</span>
              </div>
              
              <h3 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] tracking-tighter text-white mb-8">
                Providing <span className="text-white/40 italic">Quality</span>.
              </h3>
              
              <p className="text-white/60 text-lg sm:text-xl leading-relaxed font-light">
                To deliver high-quality homes and plots with complete transparency, helping our clients build a safe and happy future.
              </p>

              <div className="mt-12 opacity-20 group-hover:opacity-40 transition-opacity">
                <div className="w-full h-px bg-gradient-to-r from-accent-green to-transparent" />
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </SectionWrapper>
  );
}
