"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const LANDSCAPE_VIDEOS = [
  {
    url: '/api/video?id=14tX45ogCte2IVjYE1MpZbNW8d6HojZHk',
    title: 'Transforming Lives through Quality Housing',
    author: 'Happy Homeowner'
  },
  {
    url: '/api/video?id=1yagHW5zezq7A2-zhrz1qhinSyaeODOsI',
    title: 'A Seamless Journey to Our Dream Villa',
    author: 'Satisfied Client'
  },
];

const PORTRAIT_VIDEOS = [
  { url: '/api/video?id=1S9K-f8MDmtWsCe6LmDYMmbe42wYEaZ24', author: 'Community Member 1' },
  { url: '/api/video?id=1TdfSGr5TOqBvM8eB9UXWLCBS9aT3O_qn', author: 'Community Member 2' },
  { url: '/api/video?id=1U3ah5lGpsAxnbZrXrEBgdR95xmwsvHvI', author: 'Community Member 3' },
  { url: '/api/video?id=1InaaCT30aw1xw2ZNPvskWPnV3JV4sV7y', author: 'Community Member 4' },
];

export function LandscapeTestimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="bg-bg-primary py-24 sm:py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Voices of Excellence</span>
        <h2 className="font-heading text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8">
          Experience the Lifestyle.
        </h2>
        <div className="h-px w-32 bg-accent/20" />
      </div>
      
      <div className="flex flex-row gap-6 px-6 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory">
        {LANDSCAPE_VIDEOS.map((video, idx) => (
          <LandscapeCard 
            key={idx} 
            video={video} 
            onOpen={() => setActiveVideo(video.url)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export function PortraitTestimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="bg-bg-primary py-24 sm:py-32 overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Community Stories</span>
        <h2 className="font-heading text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-white">
          Real People. Real Joy.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {PORTRAIT_VIDEOS.map((video, idx) => (
            <PortraitCard 
              key={idx} 
              video={video} 
              index={idx}
              onOpen={() => setActiveVideo(video.url)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function LandscapeCard({ video, onOpen }: { video: typeof LANDSCAPE_VIDEOS[0], onOpen: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[45vw] aspect-video group cursor-pointer snap-center"
      onClick={onOpen}
    >
      <div className="absolute inset-0 bg-white/5 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 group-hover:border-accent/30 transition-all duration-700 shadow-2xl">
        <video 
          src={video.url}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          muted
          loop
          autoPlay
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-accent group-hover:border-accent group-hover:text-bg-primary transition-all duration-500">
            <Play fill="currentColor" size={20} className="sm:w-6 sm:h-6 ml-1" />
          </div>
          <p className="text-accent text-[8px] sm:text-[10px] uppercase tracking-widest font-bold mb-1 sm:mb-2">{video.author}</p>
          <h4 className="text-white text-lg sm:text-2xl font-bold max-w-md leading-tight">{video.title}</h4>
        </div>
      </div>
    </motion.div>
  );
}

function PortraitCard({ video, index, onOpen }: { video: typeof PORTRAIT_VIDEOS[0], index: number, onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative aspect-[9/16] group cursor-pointer rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/5"
      onClick={onOpen}
    >
      <video 
        src={video.url}
        className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
        muted
        loop
        autoPlay
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-2 sm:mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <Play fill="white" size={14} className="sm:w-4 sm:h-4 ml-1 text-white" />
        </div>
        <p className="text-white text-[8px] sm:text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">{video.author}</p>
      </div>
    </motion.div>
  );
}

function VideoModal({ url, onClose }: { url: string, onClose: () => void }) {
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPortrait = url.toLowerCase().includes('portrait') || url.includes('1S9K') || url.includes('1Tdf') || url.includes('1U3a') || url.includes('1Ina');

  // Extract ID from /api/video?id=...
  let driveId = null;
  if (url.includes('id=')) {
    try {
      driveId = new URL(url, 'http://localhost').searchParams.get('id');
    } catch (e) {}
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-10"
      onClick={onClose}
    >
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-2xl hover:bg-white/20 transition-all z-10"
        onClick={onClose}
      >
        ✕
      </motion.button>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={cn(
          "relative bg-black rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10",
          isPortrait ? "h-[80vh] sm:h-[85vh] aspect-[9/16]" : "w-full max-w-6xl aspect-video"
        )}
        onClick={e => e.stopPropagation()}
      >
        {driveId ? (
          <iframe
            className="w-full h-full"
            src={`https://drive.google.com/file/d/${driveId}/preview`} 
            title="Video Presentation"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        ) : (
          <video 
            ref={videoRef}
            src={url}
            className="w-full h-full object-contain"
            autoPlay
            controls
            muted={muted}
            onEnded={onClose}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
