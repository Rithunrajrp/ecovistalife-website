"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  label?: string;
}

export default function PageHeader({ title, subtitle, label }: PageHeaderProps) {
  return (
    <header className="relative pt-28 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="block text-accent uppercase tracking-widest text-xs sm:text-sm font-semibold mb-4"
        >
          {label}
        </motion.span>
      )}
      
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
