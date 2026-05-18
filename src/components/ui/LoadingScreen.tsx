"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Video Assets to Preload
    const VIDEO_ASSETS = [
      'https://ik.imagekit.io/bgvtzewqf/ecovista/testimonial-video-landscape-1.mp4',
      'https://ik.imagekit.io/bgvtzewqf/ecovista/testimonial-video-landscape-2.mp4',
      'https://ik.imagekit.io/bgvtzewqf/ecovista/testimonial-video-portrait-1.mp4',
      'https://ik.imagekit.io/bgvtzewqf/ecovista/testimonial-video-portrait-2.mp4',
      'https://ik.imagekit.io/bgvtzewqf/ecovista/testimonial-video-portrait-3.mp4',
      'https://ik.imagekit.io/bgvtzewqf/ecovista/testimonial-video-portrait-4.mp4',
    ];

    // Prefetch videos
    VIDEO_ASSETS.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'video';
      document.head.appendChild(link);
    });

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    const handleLoad = () => {
      // Ensure we reach 100%
      setProgress(100);
      
      // Minimum loading time for the animation to look good
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = '';
      }, 1500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
        document.body.style.overflow = '';
      };
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { 
              duration: 1.2, 
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2
            }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0081C9]/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#79C043]/5 rounded-full blur-[120px] animate-pulse delay-700" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-12 relative"
            >
              <div className="absolute -inset-4 bg-[#0081C9]/20 blur-2xl rounded-full animate-ping opacity-20" />
              <img src="/logo.png" alt="EcoVista" className="w-20 sm:w-24 h-auto invert grayscale relative z-10" />
            </motion.div>

            {/* Brand Text */}
            <div className="overflow-hidden mb-12 text-center">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-white font-heading text-4xl sm:text-6xl font-bold tracking-[0.3em] uppercase">
                  EcoVista<span className="text-[#0081C9]">Life</span>
                </h1>
                <p className="text-white/30 font-mono text-[10px] uppercase tracking-[0.5em] mt-4">Sustainable Luxury Living</p>
              </motion.div>
            </div>

            {/* Progress Section */}
            <div className="flex flex-col items-center gap-6 w-72 sm:w-80">
              <div className="w-full h-[2px] bg-white/5 relative overflow-hidden rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0081C9] to-[#79C043]"
                />
              </div>
              <div className="flex justify-between w-full px-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0081C9] animate-pulse" />
                  <span className="text-white/40 font-mono text-[9px] uppercase tracking-widest">Initializing Assets</span>
                </div>
                <span className="text-white/60 font-mono text-[10px] tabular-nums">{progress.toString().padStart(3, '0')}%</span>
              </div>
            </div>
          </div>

          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 z-20 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          
          {/* Decorative Corner Lines */}
          <div className="absolute inset-12 pointer-events-none opacity-20">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute top-0 left-0 w-24 h-px bg-white origin-left"
            />
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute top-0 left-0 w-px h-24 bg-white origin-top"
            />
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-0 right-0 w-24 h-px bg-white origin-right"
            />
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-0 right-0 w-px h-24 bg-white origin-bottom"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
