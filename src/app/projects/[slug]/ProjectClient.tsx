"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import MagneticButton from '@/components/MagneticButton';
import { cn } from '@/lib/utils';
import { 
  Camera, CloudRain, Lightbulb, Footprints, Activity, 
  Home, Users, Trophy, Gamepad2, Dumbbell, Shield, 
  Smile, Database, ShieldCheck, CheckCircle2, ChevronDown
} from 'lucide-react';

const PROJECT_FAQS = [
  { q: "Are the properties DTCP/RERA approved?", a: "Yes, all our projects are fully approved by DTCP and RERA, ensuring clear titles and secure investments." },
  { q: "Do you assist with home loans?", a: "Absolutely. We have tie-ups with all major banks and our CRM team will assist you through the entire loan processing phase." },
  { q: "What is the handover timeline?", a: "For plots, registration can be done immediately. For custom villas, construction and handover typically take 8 to 12 months." },
  { q: "Can NRIs buy property here?", a: "Yes, NRIs can seamlessly invest. We offer virtual tours, digital documentation assistance, and dedicated NRI support." }
];

const getAmenityIcon = (amenity: string) => {
  const lower = amenity.toLowerCase();
  const size = 20;
  if (lower.includes('cctv') || lower.includes('camera')) return <Camera size={size} />;
  if (lower.includes('water') || lower.includes('drain')) return <CloudRain size={size} />;
  if (lower.includes('light') || lower.includes('led')) return <Lightbulb size={size} />;
  if (lower.includes('jogging') || lower.includes('track')) return <Footprints size={size} />;
  if (lower.includes('yoga') || lower.includes('health')) return <Activity size={size} />;
  if (lower.includes('gazebo') || lower.includes('seating')) return <Home size={size} />;
  if (lower.includes('senior') || lower.includes('citizen')) return <Users size={size} />;
  if (lower.includes('turf') || lower.includes('court')) return <Trophy size={size} />;
  if (lower.includes('play') || lower.includes('game')) return <Gamepad2 size={size} />;
  if (lower.includes('gym') || lower.includes('fitness')) return <Dumbbell size={size} />;
  if (lower.includes('wall') || lower.includes('compound')) return <Shield size={size} />;
  if (lower.includes('kids') || lower.includes('children')) return <Smile size={size} />;
  if (lower.includes('tank') || lower.includes('storage')) return <Database size={size} />;
  if (lower.includes('security') || lower.includes('guard')) return <ShieldCheck size={size} />;
  return <CheckCircle2 size={size} />;
};

interface ProjectClientProps {
  title: string;
  description: string;
  content: string;
  images: string[];
  status?: string;
  location?: string;
  plotSizes?: string;
  priceRange?: string;
}

export default function ProjectClient({
  title, description, content, images,
  status = 'Published', location, plotSizes, priceRange,
}: ProjectClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  const statusClass = status?.toLowerCase() === 'ongoing'
    ? "bg-accent/20 text-accent border-accent/30"
    : status?.toLowerCase() === 'upcoming'
    ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";

  let displayContent = content;
  let amenitiesList: string[] = [];

  if (content) {
    const amenityRegex = /<h3>Amenities<\/h3>\s*<p>(.*?)<\/p>/i;
    const match = content.match(amenityRegex);
    if (match) {
      displayContent = content.replace(match[0], '');
      amenitiesList = match[1].split('•').map(a => a.trim()).filter(Boolean);
    }
  }

  return (
    <main ref={containerRef} className="bg-bg-primary min-h-screen selection:bg-accent selection:text-black">
      
      {/* Cinematic Hero */}
      <div className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }} 
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-bg-primary z-10" />
          <img 
            className="w-full h-full object-cover" 
            src={images[0] || '/Images/Gardenia/IMG_4923.JPG'} 
            alt={title} 
          />
        </motion.div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className={cn("px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border", statusClass)}>
                {status}
              </span>
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/60 text-xs uppercase tracking-[0.3em] font-mono">
                {location}
              </span>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 sm:mb-8 leading-[0.9]">
              {title.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-4">{word}</span>
              ))}
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white/60 text-base sm:text-xl md:text-2xl max-w-2xl leading-relaxed font-light"
            >
              {description}
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-4 hidden sm:flex"
        >
          <span className="text-white/20 text-[10px] uppercase tracking-[0.5em] rotate-90 mb-8">Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </div>

      {/* Project Overview & Features */}
      <SectionWrapper className="relative z-30 pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-20">
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-2xl">
                <FeatureCard label="Location" value={location} />
                <FeatureCard label="Plot Sizes" value={plotSizes} />
                <FeatureCard label="Price Range" value={priceRange} />
                <FeatureCard label="Approvals" value="DTCP & RERA" />
              </div>

              {/* Main Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-invert prose-2xl max-w-none"
              >
                {displayContent ? (
                  <div 
                    className="space-y-8 text-white/70 leading-relaxed font-light [&>h2]:text-white [&>h2]:font-heading [&>h2]:text-5xl [&>h2]:font-bold [&>h3]:text-accent [&>h3]:uppercase [&>h3]:tracking-widest [&>h3]:text-sm [&>ul]:grid [&>ul]:grid-cols-1 [&>ul]:md:grid-cols-2 [&>ul]:gap-4 [&>ul]:list-none [&>ul]:p-0 [&>li]:flex [&>li]:items-center [&>li]:gap-3 [&>li]:before:content-['—'] [&>li]:before:text-accent"
                    dangerouslySetInnerHTML={{ __html: displayContent }} 
                  />
                ) : (
                  <div className="space-y-8">
                    <h2 className="font-heading text-5xl font-bold">About the Project</h2>
                    <p className="text-white/70 text-xl leading-relaxed font-light">{description}</p>
                  </div>
                )}
              </motion.div>

              {/* Amenities Grid */}
              {amenitiesList.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-16"
                >
                  <h3 className="font-heading text-3xl font-bold text-white mb-8">Premium Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {amenitiesList.map((amenity, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/10 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="text-white/80 font-medium text-xs">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-bg-secondary p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <img src="/logo.png" alt="EcoVista" className="w-24 invert" />
                  </div>
                  
                  <h3 className="font-heading text-3xl font-bold mb-8">Secure Your Future</h3>
                  <p className="text-white/50 mb-10 leading-relaxed">
                    Join our exclusive community of premium plot owners. Schedule a personalized site visit today.
                  </p>
                  
                  <div className="space-y-6 mb-12">
                    <div className="flex items-center gap-4 text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>Premium Hill-view Plots</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>Secured Gated Community</span>
                    </div>
                  </div>

                  <Link href="/contact" className="block">
                    <MagneticButton className="w-full py-6 text-lg">Enquire Now</MagneticButton>
                  </Link>
                </motion.div>

                <div className="p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] bg-accent/5 border border-accent/10 flex items-center justify-between">
                  <div>
                    <p className="text-accent text-xs uppercase tracking-widest mb-1">Direct Line</p>
                    <p className="text-white font-heading font-bold text-2xl">+91 97877 95555</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Modern Gallery Section */}
      {images.length > 0 && (
        <SectionWrapper className="bg-bg-secondary rounded-t-[5rem] mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="max-w-2xl">
                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Visual Journey</span>
                <h3 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-none">The Project Gallery</h3>
              </div>
              <p className="text-white/40 max-w-sm text-sm uppercase tracking-widest leading-loose">
                Every corner of {title} is designed with precision and natural harmony.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((img, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={cn(
                    "relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] cursor-pointer group shadow-2xl bg-white/5 border border-white/5",
                    i === 0 ? "lg:col-span-2 aspect-[16/9]" : "aspect-[4/5]"
                  )}
                  onClick={() => setLightboxSrc(img)}
                >
                  <img 
                    src={img} 
                    alt={`${title} Gallery Image ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 shadow-2xl">
                      ⤢
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6"
            onClick={() => setLightboxSrc(null)}
          >
            <button className="absolute top-4 right-4 sm:top-10 sm:right-10 text-white/60 hover:text-white text-3xl sm:text-4xl z-10">✕</button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={lightboxSrc}
              className="max-h-[90vh] max-w-full object-contain rounded-3xl shadow-2xl border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project FAQs Section */}
      <SectionWrapper className="bg-bg-primary pt-0 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Got Questions?</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {PROJECT_FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              >
                <FAQItem question={faq.q} answer={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <Footer
        heading="Ready to Build Your Dream?"
        body="Door no. 60/1, 60/2, Thirumurugan Nagar, Krishna Park, Veeriyampalayam Road, Nehru Nagar, Kalapatti, Coimbatore - 641048 | +91 97877 95555 | info@ecovistalife.com"
        image="/logo.png"
      />
    </main>
  );
}

const FeatureCard = ({ label, value }: { label: string, value?: string }) => (
  <div className="bg-bg-secondary p-10 group hover:bg-accent/5 transition-colors duration-500">
    <div className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-4 font-mono">{label}</div>
    <div className="font-heading font-bold text-xl text-white group-hover:text-accent transition-colors">
      {value || 'TBA'}
    </div>
  </div>
);

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={false}
      className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-bg-secondary border-accent/30' : 'bg-transparent border-white/10 hover:border-white/20'}`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left gap-4"
      >
        <span className="font-heading text-lg md:text-xl font-bold text-white pr-8">{question}</span>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isOpen ? 'bg-accent text-bg-primary' : 'bg-white/5 text-white'}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 md:px-8 pb-8 pt-2 text-text-secondary leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
