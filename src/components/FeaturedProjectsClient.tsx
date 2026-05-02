"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
};

export default function FeaturedProjectsClient({ projects }: { projects: any[] }) {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-30px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
    >
      {projects.map((project: any) => (
        <motion.div key={project.slug} variants={item}>
          <Link 
            href={`/projects/${project.slug}`} 
            className="block group relative rounded-2xl sm:rounded-[2rem] overflow-hidden bg-bg-secondary border border-white/5 h-full"
          >
            {project.images?.[0] && (
              <div className="relative aspect-video w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 transition-opacity duration-500" />
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={project.images[0]} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Status Badge */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute top-6 left-6 z-20"
                >
                  <span className={cn(
                    "backdrop-blur-xl px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                    project.status.toLowerCase() === 'ongoing' ? "bg-blue-500/10 text-blue-300 border-blue-500/20" :
                    project.status.toLowerCase() === 'upcoming' ? "bg-purple-500/10 text-purple-300 border-purple-500/20" :
                    "bg-accent/10 text-accent border-accent/20"
                  )}>
                    {project.status}
                  </span>
                </motion.div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 flex flex-col justify-end h-full">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-heading text-3xl font-bold text-white group-hover:text-accent transition-colors duration-500 mb-3">
                      {project.title}
                    </h3>
                    <div className="overflow-hidden">
                      <p className="text-white/60 text-sm leading-relaxed line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                {/* Hover Reveal Line */}
                <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-700 ease-out z-30" />
              </div>
            )}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
