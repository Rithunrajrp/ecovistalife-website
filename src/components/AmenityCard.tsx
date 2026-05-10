"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AmenityCardProps {
  name: string;
  image?: string | null;
  icon?: React.ReactNode;
  index: number;
}

export default function AmenityCard({ name, image, icon, index }: AmenityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
      className="group relative"
    >
      <div className="relative aspect-square rounded-[1.5rem] sm:rounded-[2.5rem] bg-white/5 border border-white/5 overflow-hidden transition-all duration-700 group-hover:border-accent/30 group-hover:bg-white/[0.08] shadow-2xl flex flex-col items-center justify-center p-4 sm:p-6">
        {/* Decorative Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Animated Inner Border */}
        <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] transition-all duration-700 scale-95 group-hover:scale-100" />

        {/* Icon/Image Container */}
        <div className="relative w-12 h-12 sm:w-24 sm:h-24 flex items-center justify-center mb-4 sm:mb-6">
          {/* Ambient Shadow behind icon */}
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform transition-transform duration-700 group-hover:scale-110" 
            />
          ) : (
            <div className="text-accent group-hover:scale-110 transition-transform duration-700">
              {icon}
            </div>
          )}
        </div>

        {/* Label */}
        <div className="space-y-1 sm:space-y-2 text-center relative z-10">
          <span className="block text-[8px] sm:text-xs font-mono font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40 group-hover:text-accent transition-colors duration-500">
            Amenity
          </span>
          <h4 className="text-white font-heading font-bold text-[10px] sm:text-lg leading-tight tracking-tight group-hover:text-white transition-colors duration-500 px-2 truncate w-full">
            {name}
          </h4>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-accent group-hover:w-1/3 transition-all duration-700 rounded-t-full" />
      </div>
    </motion.div>
  );
}
