"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import VisionMission from "@/components/VisionMission";

const VALUES = [
  { title: 'Excellence in Craftsmanship', desc: 'Superior craftsmanship with precise attention to detail, ensuring exceptional quality in every aspect of our properties. We do not compromise on the foundation of our legacy.' },
  { title: 'Pioneering Innovation', desc: 'Cutting-edge technologies and modern architectural trends, constantly pushing boundaries to deliver innovative, future-proof living solutions.' },
  { title: 'Client-Centric Approach', desc: 'Transparent communication, personalized care, and consistent support to exceed expectations and build relationships that last generations.' },
  { title: 'Environmental Stewardship', desc: 'Sustainable practices creating eco-friendly communities that prioritize the health and well-being of our residents and the planet.' },
];

const DIRECTORS = [
  { name: 'Jaganathan T', role: 'Managing Director', image: '/Images/Managing Director/JAGANATHAN T.jpeg' },
  { name: 'Sakthi NM', role: 'Managing Director', image: '/Images/Managing Director/SAKTHI NM.jpeg' },
];

const TEAM = [
  { name: 'EcoVistaLife Team', role: '', image: '/Images/Family Fest/team/IMG_0055.JPG' },
];

const TIMELINE = [
  { year: '2012', title: 'The Genesis', desc: 'Founded with a clear vision: to redefine premium real estate in Coimbatore through unwavering quality and profound trust.' },
  { year: '2016', title: 'First Milestone', desc: 'Successfully delivered our inaugural 50-plot gated community in Karamadai, setting a new benchmark for timely delivery.' },
  { year: '2020', title: 'The Eco Pivot', desc: 'Transitioned our core philosophy to focus exclusively on sustainable, environmentally conscious developments and smart integration.' },
  { year: '2024', title: 'Market Leaders', desc: 'Recognized as the region\'s premier sustainable property developer, proudly serving over 300 happy families.' },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
};

const nestedTextVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const lineVariants = {
  hidden: { height: 0 },
  show: { height: "100%", transition: { duration: 1, ease: "easeInOut" as const } }
};

export default function AboutClient() {
  return (
    <main className="bg-bg-primary min-h-screen">
      <PageHeader 
        label="Our Heritage"
        title="Building the Future of Sustainable Living."
        subtitle="For over a decade, ECOVISTALIFE has shaped luxurious, eco-friendly living spaces in Coimbatore. We are defined by uncompromising quality, architectural innovation, and absolute transparency."
      />

      {/* Editorial Intro Section */}
      <SectionWrapper className="pt-12 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
            viewport={{ once: false, amount: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] sm:aspect-[4/5] w-full rounded-2xl sm:rounded-[2rem] overflow-hidden group">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img 
                src="/Images/stock/about.jpg" 
                alt="EcoVistaLife Architecture" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
            </div>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="lg:col-span-7"
          >
            <motion.span variants={itemVariants} className="font-mono text-accent text-xs tracking-[0.5em] uppercase mb-8 block">The EcoVista Standard</motion.span>
            <motion.h2 variants={itemVariants} className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-10 leading-tight tracking-tighter">
              A Legacy of <br className="hidden md:block" />
              <span className="text-white/40">Trust & Excellence.</span>
            </motion.h2>
            <motion.div variants={{ hidden: { width: 0 }, show: { width: 80, transition: { duration: 1 } } }} className="h-px bg-white/20 mb-10" />
            <motion.p variants={itemVariants} className="text-white/70 text-lg md:text-xl leading-relaxed mb-12 font-light">
              We do not just sell plots; we curate environments where families can thrive for generations. Every EcoVista development is meticulously planned, ensuring perfect harmony between modern convenience and natural serenity.
            </motion.p>
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div>
                <div className="font-heading text-4xl font-bold text-accent mb-2">100%</div>
                <div className="text-xs uppercase tracking-widest text-white/40">DTCP/RERA Approved</div>
              </div>
              <div>
                <div className="font-heading text-4xl font-bold text-accent mb-2">Zero</div>
                <div className="text-xs uppercase tracking-widest text-white/40">Hidden Costs</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Manifesto: Vision & Mission */}
      <VisionMission />

      {/* Editorial Core Values (Nested Stagger) */}
      <SectionWrapper className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="mb-24 md:flex items-end justify-between border-b border-white/10 pb-10">
            <div>
              <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">The Foundation</span>
              <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter">Our Core Values.</h2>
            </div>
            <p className="text-white/40 max-w-sm mt-8 md:mt-0 text-sm leading-relaxed">
              These principles guide every architectural decision, every client interaction, and every brick laid.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-y-24 md:gap-x-16"
          >
            {VALUES.map((v, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="group relative flex flex-col"
              >
                {/* Architectural Line Animation */}
                <div className="w-full h-px bg-white/5 mb-8 relative overflow-hidden">
                  <motion.div 
                    variants={{ hidden: { x: "-100%" }, show: { x: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } } }} 
                    className="absolute inset-0 bg-accent w-1/3" 
                  />
                </div>
                
                <div className="overflow-hidden mb-4">
                  <motion.h3 
                    variants={{ hidden: { y: "100%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } } }} 
                    className="font-heading text-2xl md:text-3xl font-bold text-white"
                  >
                    {v.title}
                  </motion.h3>
                </div>
                
                <motion.p 
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } } }} 
                  className="text-white/60 leading-relaxed font-light"
                >
                  {v.desc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Premium Timeline Section (Nested Reveal) */}
      <SectionWrapper className="py-32 bg-bg-secondary border-y border-white/5 mt-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Our Evolution</span>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter">A Decade of Growth.</h2>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1, margin: "-100px" }}
            className="space-y-24"
          >
            {TIMELINE.map((item, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start group"
              >
                <div className="md:col-span-3 text-left md:text-right overflow-hidden">
                  <motion.span variants={nestedTextVariants} className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-white/5 group-hover:text-accent transition-colors duration-700 block leading-none">{item.year}</motion.span>
                </div>
                <div className="hidden md:block md:col-span-1 relative h-full flex justify-center mt-4">
                  <motion.div variants={lineVariants} className="w-px bg-white/5 group-hover:bg-accent/30 transition-colors duration-700 absolute top-0" />
                  <motion.div 
                    variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", delay: 0.4 } } }}
                    className="w-3 h-3 rounded-full bg-bg-secondary border border-white/20 group-hover:border-accent group-hover:bg-accent transition-all duration-700 relative z-10" 
                  />
                </div>
                <div className="md:col-span-8 pb-12 border-b border-white/5 group-hover:border-white/20 transition-colors duration-700">
                  <div className="overflow-hidden mb-4">
                    <motion.h3 variants={nestedTextVariants} className="font-heading text-3xl font-bold">{item.title}</motion.h3>
                  </div>
                  <motion.p variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1, delay: 0.2 } } }} className="text-white/50 leading-relaxed font-light text-lg">
                    {item.desc}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Editorial Team Section (Nested Stagger) */}
      <SectionWrapper className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-20 text-center flex flex-col items-center">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6 block">Our Visionaries</span>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter">Managing Directors.</h2>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20 max-w-5xl mx-auto mb-32"
          >
            {DIRECTORS.map((member, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/5 mb-8 shadow-2xl">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  />
                </div>
                <div className="text-center overflow-hidden">
                  <motion.h3 variants={nestedTextVariants} className="font-heading text-3xl font-bold text-white mb-2">{member.name}</motion.h3>
                  <motion.p variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.2 } } }} className="text-accent uppercase tracking-[0.2em] text-xs font-mono font-bold">{member.role}</motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mb-20 text-center flex flex-col items-center pt-20 border-t border-white/5">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6 block">Our People</span>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter">EcoVistaLife Team.</h2>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1, margin: "-50px" }}
            className="max-w-6xl mx-auto"
          >
            {TEAM.map((member, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl sm:rounded-[3rem] border border-white/5 shadow-2xl">
                  <motion.img 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Rewards & Recognition Section */}
      <SectionWrapper className="py-32 bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Employee Excellence</span>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter">Honouring Our People.</h2>
            <p className="text-white/40 max-w-xl mx-auto mt-6 text-sm leading-relaxed">
              We celebrate the dedication, innovation, and hard work of the individuals who bring the EcoVistaLife vision to life every single day.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                title: 'Visionary Leadership Award', 
                year: 'Annual Meet',
                org: 'Corporate Excellence',
                image: '/Images/awards/trophy-portrait-1.png',
                desc: 'Honouring the strategic vision and leadership that drives our commitment to sustainable luxury and ethical growth.'
              },
              { 
                title: 'Rock Star Performer', 
                year: 'Quarterly Honors',
                org: 'Civil & Engineering',
                image: '/Images/awards/trophy-landscape-1.png',
                desc: 'Recognizing outstanding dedication on-site and uncompromising quality in every brick laid and plot developed.'
              },
              { 
                title: 'The Maverick Award', 
                year: 'Special Recognition',
                org: 'Innovation & Strategy',
                image: '/Images/awards/trophy-landscape-2.png',
                desc: 'Celebrating those who push boundaries, think differently, and bring innovative solutions to the real estate landscape.'
              }
            ].map((award, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="group bg-white/5 border border-white/5 rounded-2xl sm:rounded-3xl p-8 hover:bg-white/10 transition-all duration-500"
              >
                <div className="aspect-[4/5] w-full mb-8 overflow-hidden rounded-xl bg-black/20 flex items-center justify-center p-6 sm:p-10">
                  <img 
                    src={award.image} 
                    alt={award.title} 
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                <span className="text-accent font-mono text-[10px] tracking-widest uppercase mb-2 block">{award.year} • {award.org}</span>
                <h3 className="font-heading text-xl font-bold mb-4 group-hover:text-accent transition-colors">{award.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">{award.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="py-20 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
          className="max-w-4xl mx-auto text-center px-6"
        >
          <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 tracking-tighter">Ready to Build Your Legacy?</h2>
          <p className="text-base sm:text-xl text-white/50 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Join hundreds of happy families who have chosen EcoVistaLife for their dream home.
          </p>
          <div className="flex justify-center">
            <MagneticButton className="px-12 py-5 uppercase tracking-widest text-sm bg-white text-black hover:bg-accent transition-colors">
              Contact Us Today
            </MagneticButton>
          </div>
        </motion.div>
      </SectionWrapper>

      <Footer />
    </main>
  );
}

