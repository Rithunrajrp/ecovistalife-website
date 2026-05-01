"use client";

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/ui/PageHeader';
import SectionWrapper from '@/components/ui/SectionWrapper';
import MagneticButton from '@/components/MagneticButton';
import { ArrowUpRight, MapPin, Clock } from 'lucide-react';

const JOB_OPENINGS = [
  {
    id: 1,
    title: "Senior Sales Manager",
    department: "Sales & Marketing",
    location: "Coimbatore",
    type: "Full-Time",
    description: "Lead our premium residential sales division, managing client relations, driving revenue growth, and closing high-ticket villa and plot sales."
  },
  {
    id: 2,
    title: "Civil Engineer",
    department: "Construction",
    location: "Karamadai Site",
    type: "Full-Time",
    description: "Oversee site execution, quality control, and material management for our upcoming luxury villa projects, ensuring timely delivery."
  },
  {
    id: 3,
    title: "Architectural Designer",
    department: "Design",
    location: "Head Office",
    type: "Full-Time",
    description: "Create stunning 3D visualizations and customized floor plans for high-end residential clients looking to build their dream homes."
  }
];

export default function CareerPage() {
  return (
    <main className="bg-bg-primary min-h-screen">
      <Navbar />
      
      <PageHeader 
        label="Join Our Team"
        title="Build Your Career With Us"
        subtitle="We are always looking for passionate, driven individuals to help us shape the future of premium residential living in Coimbatore."
      />

      <SectionWrapper className="py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">Open Positions</h2>
              <p className="text-text-secondary text-lg">
                Explore our current openings below. If you don't see a perfect fit but believe you belong here, send your resume to <a href="mailto:careers@ecovistalife.com" className="text-accent hover:underline">careers@ecovistalife.com</a>.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {JOB_OPENINGS.map((job, idx) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-bg-secondary border border-white/5 rounded-3xl p-8 hover:border-accent/50 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 bg-white/5 text-text-secondary rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <Clock size={12} /> {job.type}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-text-secondary mb-4 leading-relaxed max-w-2xl">
                    {job.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
                    <MapPin size={16} />
                    {job.location}
                  </div>
                </div>
                
                <div className="shrink-0">
                  <MagneticButton variant="outline" className="w-full lg:w-auto flex items-center gap-2 group-hover:bg-accent group-hover:text-bg-primary group-hover:border-accent">
                    Apply Now <ArrowUpRight size={18} />
                  </MagneticButton>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </SectionWrapper>

      <Footer heading="Get In Touch"  image="/logo.png" />
    </main>
  );
}

