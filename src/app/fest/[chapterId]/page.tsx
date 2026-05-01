'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { CHAPTERS } from '@/data/festChapters';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ChapterGalleryPage() {
  const { chapterId } = useParams();
  const router = useRouter();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const chapter = CHAPTERS.find(c => c.id === chapterId);

  if (!chapter) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-6">Chapter Not Found</h1>
        <Link href="/fest" className="text-accent hover:underline">Back to Fest</Link>
      </div>
    );
  }

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx(i => (i === null ? 0 : (i - 1 + chapter.images.length) % chapter.images.length));
  const next = () => setLightboxIdx(i => (i === null ? 0 : (i + 1) % chapter.images.length));

  return (
    <main className="bg-bg-primary min-h-screen">
      {/* Header */}
      <div className="pt-40 pb-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <Link href="/fest" className="inline-flex items-center gap-2 text-white/40 hover:text-accent transition-colors mb-12 uppercase tracking-[0.2em] text-xs font-bold">
            <span className="text-lg">←</span> Back to Story
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
              {chapter.subtitle}
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 text-white">
              {chapter.title}
            </h1>
            <p className="text-text-secondary text-xl max-w-3xl leading-relaxed">
              {chapter.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gallery Grid */}
      <SectionWrapper className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            {chapter.images.map((src, idx) => (
              <motion.div
                key={src}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  show: { opacity: 1, scale: 1 }
                }}
                className="break-inside-avoid overflow-hidden rounded-3xl cursor-pointer group relative shadow-xl bg-white/5 border border-white/5"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={src}
                  alt={`${chapter.title} ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl">
                    ⤢
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl z-10">✕</button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-8 text-white/60 hover:text-white text-4xl z-10 w-16 h-16 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-all">‹</button>
            <motion.img
              key={chapter.images[lightboxIdx]}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={chapter.images[lightboxIdx]}
              alt="Gallery"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-8 text-white/60 hover:text-white text-4xl z-10 w-16 h-16 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-all">›</button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer
        heading="Be Part of Our Next Story"
        body="Door no. 60/1, 60/2, Thirumurugan Nagar, Krishna Park, Veeriyampalayam Road, Nehru Nagar, Kalapatti, Coimbatore - 641048 | +91 97877 95555 | info@ecovistalife.com"
        image="/logo.png"
      />
    </main>
  );
}
