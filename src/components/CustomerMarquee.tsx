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
  '/Images/Customers/571B3108.JPG',
  '/Images/Customers/571B3109.JPG',
  '/Images/Customers/571B3110.JPG',
  '/Images/Customers/571B3111.JPG',
  '/Images/Customers/571B3112.JPG',
  '/Images/Customers/571B3116.JPG',
  '/Images/Customers/571B3117.JPG',
  '/Images/Customers/IMG_9593.JPG',
  '/Images/Customers/IMG_9601.JPG',
  '/Images/Customers/IMG_9607.JPG',
  '/Images/Customers/IMG_9611.JPG',
  '/Images/Customers/IMG_9613.JPG',
  '/Images/Customers/IMG_9615.JPG',
  '/Images/Customers/IMG_9621.JPG',
  '/Images/Customers/IMG_9624.JPG',
  '/Images/Customers/IMG_9625.JPG',
  '/Images/Customers/IMG_9628.JPG',
  '/Images/Customers/IMG_9629.JPG',
  '/Images/Customers/IMG_9632.JPG',
  '/Images/Customers/IMG_9635.JPG',
  '/Images/Customers/IMG_9638.JPG',
  '/Images/Customers/IMG_9639.JPG',
  '/Images/Customers/IMG_9641.JPG',
  '/Images/Customers/IMG_9642.JPG',
  '/Images/Customers/IMG_9643.JPG',
  '/Images/Customers/IMG_9644.JPG',
  '/Images/Customers/IMG_9645.JPG',
  '/Images/Customers/IMG_9647.JPG',
  '/Images/Customers/IMG_9649.JPG',
  '/Images/Customers/IMG_9652.JPG',
  '/Images/Customers/IMG_9653.JPG',
  '/Images/Customers/IMG_9670.JPG',
  '/Images/Customers/IMG_9672.JPG',
  '/Images/Customers/IMG_9673.JPG',
  '/Images/Customers/IMG_9678.JPG',
  '/Images/Customers/IMG_9680.JPG',
  '/Images/Customers/IMG_9681.JPG',
  '/Images/Customers/IMG_9682.JPG',
  '/Images/Customers/IMG_9684.JPG',
  '/Images/Customers/IMG_9686.JPG',
  '/Images/Customers/IMG_9695.JPG',
  '/Images/Customers/IMG_9699.JPG',
  '/Images/Customers/IMG_9703.JPG',
  '/Images/Customers/IMG_9706.JPG',
  '/Images/Customers/IMG_9708.JPG',
  '/Images/Customers/IMG_9714.JPG',
  '/Images/Customers/IMG_9715.JPG',
  '/Images/Customers/IMG_9720.JPG',
  '/Images/Customers/IMG_9722.JPG',
  '/Images/Customers/new1.jpg',
  '/Images/Customers/new3.jpg',
  '/Images/Customers/new4.jpg',
  '/Images/Customers/new5.jpg',
  '/Images/Customers/new6.jpg',
  '/Images/Customers/new7.jpg',
  '/Images/Customers/new8.jpg',
  '/Images/Customers/new9.jpg',
];

// Split images for two rows
const midpoint = Math.ceil(CUSTOMER_IMAGES.length / 2);
const row1 = CUSTOMER_IMAGES.slice(0, midpoint);
const row2 = CUSTOMER_IMAGES.slice(midpoint);

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
        <MarqueeRow images={row1} direction="left" speed={100} />
        
        {/* Row 2 - Moving Right */}
        <MarqueeRow images={row2} direction="right" speed={100} />
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
        className="flex gap-4 hover:[animation-play-state:paused] will-change-transform"
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
      className={`relative h-40 sm:h-52 md:h-64 w-[160px] sm:w-[200px] md:w-[240px] shrink-0 group perspective-1000 ${rotation} hover:rotate-0 hover:z-30 transition-all duration-500`}
    >
      <div className="absolute inset-0 bg-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl overflow-hidden group-hover:border-accent/30 transition-colors duration-500 will-change-transform">
        
        <Image 
          src={src} 
          alt="EcoVista Community Member" 
          fill
          sizes="(max-width: 768px) 200px, 240px"
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
