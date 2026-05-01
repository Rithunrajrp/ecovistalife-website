"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import PageHeader from '@/components/ui/PageHeader';
import SectionWrapper from '@/components/ui/SectionWrapper';
import MagneticButton from '@/components/MagneticButton';
import { cn } from '@/lib/utils';

const PROJECTS = [
  {
    slug: 'gardenia',
    title: 'Gardenia',
    subtitle: 'Premium Gated Plots',
    description: 'Eco-friendly gated community living in Karamadai with flexible payments and sustainable infrastructure.',
    image: '/Images/Gardenia/IMG_4923.JPG',
    status: 'Completed',
    location: 'Karamadai, Coimbatore',
    id: '01'
  },
  {
    slug: 'mount-shadows',
    title: 'Mount Shadows',
    subtitle: 'Hillside Living',
    description: 'Breathtaking views of the Western Ghats combined with modern world-class amenities in a serene hillside location.',
    image: '/Images/Mount Shadows/DJI_0301.JPG',
    status: 'Completed',
    location: 'Karamadai, Coimbatore',
    id: '02'
  },
  {
    slug: 'frenchville',
    title: 'French Ville',
    subtitle: 'European Charm',
    description: 'Exclusive villa plots featuring French-inspired architecture and Mediterranean landscaping in a prime location.',
    image: '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.05.14 PM.jpeg',
    status: 'Upcoming',
    location: 'Coimbatore',
    id: '03'
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-bg-primary min-h-screen selection:bg-accent selection:text-black">
      <PageHeader 
        label="Our Portfolio"
        title="Living Spaces"
        subtitle="Explore our curated collection of premium eco-friendly developments, designed for sustainable luxury living."
      />

      <div className="space-y-40 pb-40">
        {PROJECTS.map((project, index) => (
          <ProjectSection key={project.slug} project={project} index={index} />
        ))}
      </div>

      <Footer 
        heading="Begin Your Journey" 
         
        image="/logo.png" 
      />
    </main>
  );
}

function ProjectSection({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={container} className="relative min-h-[80vh] lg:min-h-[120vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Project Image Panel */}
        <div className={cn(
          "lg:col-span-7 relative z-10",
          index % 2 !== 0 ? "lg:order-2" : ""
        )}>
          <motion.div 
            style={{ scale }}
            className="relative aspect-[4/3] sm:aspect-square lg:aspect-[4/3] rounded-2xl sm:rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-2xl group border border-white/5"
          >
            <motion.img 
              style={{ y }}
              src={project.image} 
              alt={project.title} 
              className="absolute inset-0 w-full h-[120%] object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            
            {/* Overlay Status */}
            <div className="absolute top-10 left-10 z-20">
              <span className={cn(
                "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-xl border",
                project.status.toLowerCase() === 'upcoming' 
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30" 
                  : "bg-accent/20 text-accent border-accent/30"
              )}>
                {project.status}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Project Text Panel */}
        <div className={cn(
          "lg:col-span-5 relative z-20",
          index % 2 !== 0 ? "lg:order-1 lg:text-right lg:items-end" : ""
        )}>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={cn("flex flex-col", index % 2 !== 0 ? "lg:items-end" : "items-start")}
          >
            <div className="font-mono text-accent text-5xl sm:text-6xl md:text-8xl opacity-10 mb-4 sm:mb-6 font-bold">
              {project.id}
            </div>
            
            <span className="text-white/40 uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
              {project.subtitle}
            </span>
            
            <h2 className="font-heading text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 sm:mb-8 tracking-tighter leading-none">
              {project.title}
            </h2>
            
            <p className={cn(
              "text-white/60 text-base sm:text-lg md:text-xl leading-relaxed font-light mb-8 sm:mb-12 max-w-lg",
              index % 2 !== 0 ? "lg:text-right" : ""
            )}>
              {project.description}
            </p>

            <div className={cn("flex flex-wrap gap-3 sm:gap-4", index % 2 !== 0 ? "lg:justify-end" : "justify-start")}>
              <Link href={`/projects/${project.slug}`}>
                <MagneticButton className="px-8 py-4 text-xs uppercase tracking-widest">
                  View Project
                </MagneticButton>
              </Link>
              <button className="px-8 py-4 text-xs uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-colors rounded-full text-white/60 hover:text-white">
                Download Brochure
              </button>
            </div>
          </motion.div>
        </div>

      </div>
      
      {/* Background Large Title (Watermark) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 opacity-[0.02]">
        <h2 className="font-heading text-[30vw] font-bold whitespace-nowrap text-white">
          {project.title}
        </h2>
      </div>
    </section>
  );
}

