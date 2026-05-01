'use client';

import { motion } from 'framer-motion';

const CUSTOMER_IMAGES = [
  '/Images/Customers/571B3082.JPG',
  '/Images/Customers/571B3084.JPG',
  '/Images/Customers/571B3087.JPG',
  '/Images/Customers/571B3088.JPG',
  '/Images/Customers/571B3089.JPG',
  '/Images/Customers/571B3093.JPG',
  '/Images/Customers/571B3095.JPG',
  '/Images/Customers/571B3096.JPG',
  '/Images/Customers/571B3098.JPG',
  '/Images/Customers/571B3101.JPG',
  '/Images/Customers/571B3102.JPG',
  '/Images/Customers/571B3104.JPG',
  '/Images/Customers/IMG_9593.JPG',
  '/Images/Customers/IMG_9601.JPG',
  '/Images/Customers/IMG_9607.JPG',
];

// Split images for two rows
const row1 = CUSTOMER_IMAGES.slice(0, 8);
const row2 = CUSTOMER_IMAGES.slice(8);

export default function CustomerMarquee() {
  return (
    <div className="w-full py-20 sm:py-32 bg-bg-primary overflow-hidden relative border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-20">
        <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6 block">Our Community</span>
        <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter">The Faces of EcoVista.</h2>
      </div>

      <div className="relative flex flex-col gap-8 md:gap-12 overflow-hidden group/marquee">
        {/* Left/Right Fades for seamless looping */}
        <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-gradient-to-r from-bg-primary to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-gradient-to-l from-bg-primary to-transparent z-20 pointer-events-none" />

        {/* Row 1 - Moving Left */}
        <MarqueeRow images={row1} direction="left" speed={40} />
        
        {/* Row 2 - Moving Right */}
        <MarqueeRow images={row2} direction="right" speed={45} />
      </div>
    </div>
  );
}

import Image from 'next/image';

function MarqueeRow({ images, direction, speed }: { images: string[], direction: 'left' | 'right', speed: number }) {
  // Duplicate array to ensure seamless looping (only need 2 sets if images are enough, but 3 is safe)
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="flex">
      <motion.div
        animate={{
          x: direction === 'left' ? ["0%", "-33.33%"] : ["-33.33%", "0%"]
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        className="flex gap-6 md:gap-8 hover:[animation-play-state:paused] will-change-transform"
        style={{ width: "fit-content" }}
      >
        {duplicatedImages.map((src, i) => (
          <ImageCard key={i} src={src} index={i} />
        ))}
      </motion.div>
    </div>
  );
}

function ImageCard({ src, index }: { src: string, index: number }) {
  // Add slight random rotation for an organic feel
  const rotation = index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]";
  
  return (
    <div 
      className={`relative h-48 sm:h-64 md:h-96 w-[200px] sm:w-[280px] md:w-[400px] shrink-0 group perspective-1000 ${rotation} hover:rotate-0 hover:z-30 transition-all duration-500`}
    >
      <div className="absolute inset-0 bg-white/5 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden group-hover:border-accent/30 transition-colors duration-500 will-change-transform">
        
        <Image 
          src={src} 
          alt="EcoVista Community Member" 
          fill
          sizes="(max-width: 768px) 280px, 400px"
          quality={75}
          loading="lazy"
          className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
        />
        
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-accent" />
            <span className="text-white font-mono text-[10px] uppercase tracking-widest font-bold">Happy Client</span>
          </div>
        </div>
      </div>
    </div>
  );
}
