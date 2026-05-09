'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

import { CHAPTERS } from '@/data/festChapters';
import Link from 'next/link';

// All images for lightbox reference
const ALL_IMAGES = CHAPTERS.flatMap(c => c.images);

// ── Lightbox Component ────────────────────────────────────────────────────────

function Lightbox({ src, onClose, onPrev, onNext }: { src: string; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl z-10 transition-colors">✕</button>
      
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 text-white/60 hover:text-white text-4xl z-10 w-16 h-16 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-all"
      >‹</button>

      <motion.img
        key={src}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        src={src}
        alt="Gallery"
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 text-white/60 hover:text-white text-4xl z-10 w-16 h-16 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-all"
      >›</button>
    </motion.div>
  );
}

// ── Story Chapter Component ────────────────────────────────────────────────────

function StoryChapter({ chapter, onImageClick, index }: { chapter: typeof CHAPTERS[0], onImageClick: (src: string) => void, index: number }) {
  const ref = useRef(null);
  
  return (
    <SectionWrapper className="py-20 sm:py-32 border-b border-white/5 last:border-0 relative overflow-hidden">
      {/* Chapter Number Background */}
      <div className="absolute top-20 right-0 pointer-events-none opacity-[0.02] select-none">
        <span className="font-heading text-[20rem] font-bold leading-none text-white">
          0{index + 1}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          {/* Balanced Centered Layout */}
          <div className="lg:col-span-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-10 h-px bg-accent" />
                <span className="text-accent font-mono text-sm tracking-[0.3em] uppercase">
                  {chapter.subtitle}
                </span>
                <div className="w-10 h-px bg-accent" />
              </motion.div>

              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold mb-8 text-white leading-tight"
              >
                {chapter.title}
              </motion.h2>

              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-text-secondary text-lg sm:text-2xl leading-relaxed font-light max-w-3xl"
              >
                {chapter.description}
              </motion.p>
            </motion.div>

            {/* Chapter Images (Balanced Grid) */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10"
            >
              {chapter.images.slice(0, 12).map((src, idx) => (
                <motion.div
                  key={src}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.9 },
                    show: { opacity: 1, y: 0, scale: 1 }
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                  className={cn(
                    "relative aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-[3rem] cursor-pointer group shadow-2xl bg-white/5 border border-white/5",
                    idx % 7 === 0 ? "lg:col-span-2 lg:aspect-[16/9]" : ""
                  )}
                  onClick={() => onImageClick(src)}
                >
                  <img
                    src={src}
                    alt={`${chapter.title} ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100 shadow-2xl">
                      <span className="text-2xl font-light">⤢</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {chapter.images.length > 12 && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-16 text-center"
              >
                <Link 
                  href={`/fest/${chapter.id}`}
                  className="inline-flex items-center gap-6 group"
                >
                  <span className="text-white/40 group-hover:text-accent transition-colors text-xs uppercase tracking-[0.4em] font-bold">Explore Full Gallery</span>
                  <div className="w-12 h-px bg-white/20 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
    </SectionWrapper>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────────


export default function FestPage() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const openLightbox = (src: string) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);

  const currentIdx = lightboxSrc ? ALL_IMAGES.indexOf(lightboxSrc) : -1;
  
  const prev = () => {
    if (currentIdx > 0) setLightboxSrc(ALL_IMAGES[currentIdx - 1]);
    else setLightboxSrc(ALL_IMAGES[ALL_IMAGES.length - 1]);
  };
  
  const next = () => {
    if (currentIdx < ALL_IMAGES.length - 1) setLightboxSrc(ALL_IMAGES[currentIdx + 1]);
    else setLightboxSrc(ALL_IMAGES[0]);
  };

  return (
    <main className="bg-bg-primary min-h-screen selection:bg-accent selection:text-black" ref={containerRef}>
      
      {/* Dynamic Hero Section */}
      <div className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-bg-primary/40 to-bg-primary z-10" />
          <img 
            src="/Images/Family Fest/Background.JPG" 
            alt="Family Fest" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="text-accent uppercase tracking-[0.5em] text-sm font-bold mb-8 block">
              The Grand Event
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 sm:mb-8 text-white leading-tight">
              Family <span className="text-transparent stroke-text">Fest</span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Experience the story of community, joy, and togetherness. A visual journey through the moments that define EcoVistaLife.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-12 sm:mt-16 flex-col items-center hidden sm:flex"
          >
            <div className="w-px h-24 bg-gradient-to-b from-accent to-transparent" />
            <span className="text-accent/50 text-xs uppercase tracking-widest mt-4">Scroll to discover</span>
          </motion.div>
        </div>
      </div>

      {/* Vertical Progress Line */}
      <motion.div 
        className="fixed left-8 top-1/2 -translate-y-1/2 w-px h-64 bg-white/10 z-40 hidden xl:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div 
          className="w-full bg-accent origin-top"
          style={{ height: '100%', scaleY: scrollYProgress }}
        />
        <div className="absolute top-0 -left-1 text-[10px] text-accent/50 uppercase tracking-tighter -rotate-90 origin-left mt-[-40px]">Start</div>
        <div className="absolute bottom-0 -left-1 text-[10px] text-accent/50 uppercase tracking-tighter -rotate-90 origin-left mb-[-40px]">End</div>
      </motion.div>

      {/* Story Chapters */}
      <div className="relative z-10 bg-bg-primary">
        {CHAPTERS.map((chapter, index) => (
          <StoryChapter 
            key={chapter.id} 
            chapter={chapter} 
            onImageClick={openLightbox} 
            index={index}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <Lightbox
            src={lightboxSrc}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>

      <Footer
        heading="Be Part of Our Next Story"
        
        image="/logo.png"
      />
      
      <style jsx global>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </main>
  );
}

