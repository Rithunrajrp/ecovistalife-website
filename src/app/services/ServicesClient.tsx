"use client";

import { motion } from 'framer-motion';
import HorizontalScroll from '@/components/HorizontalScroll';
import Footer from '@/components/Footer';
import PageHeader from '@/components/ui/PageHeader';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { 
  Camera, CloudRain, Lightbulb, Footprints, Activity, 
  Home, Users, Trophy, Gamepad2, Dumbbell, Shield, 
  Smile, Database, ShieldCheck, CheckCircle2, Palmtree
} from 'lucide-react';
import AmenityCard from '@/components/AmenityCard';

const getAmenityImage = (amenity: string) => {
  const lower = amenity.toLowerCase();
  if (lower.includes('cctv') || lower.includes('camera')) return '/Images/amenities/cctv.png';
  if (lower.includes('jogging') || lower.includes('track')) return '/Images/amenities/jogging.png';
  if (lower.includes('gym') || lower.includes('fitness')) return '/Images/amenities/gym.png';
  if (lower.includes('kids') || lower.includes('children') || lower.includes('play')) return '/Images/amenities/kids_play.png';
  if (lower.includes('garden') || lower.includes('park') || lower.includes('landscape')) return '/Images/amenities/garden.png';
  if (lower.includes('light') || lower.includes('led')) return '/Images/amenities/lights.png';
  if (lower.includes('clubhouse')) return '/Images/amenities/clubhouse.png';
  if (lower.includes('security') || lower.includes('guard')) return '/Images/amenities/security.png';
  if (lower.includes('water') || lower.includes('drain')) return '/Images/amenities/drain.png';
  if (lower.includes('yoga') || lower.includes('health')) return '/Images/amenities/yoga.png';
  if (lower.includes('gazebo') || lower.includes('seating')) return '/Images/amenities/gazebo.png';
  if (lower.includes('senior') || lower.includes('citizen')) return '/Images/amenities/senior_citizen.png';
  if (lower.includes('turf') || lower.includes('court')) return '/Images/amenities/turf.png';
  if (lower.includes('wall') || lower.includes('compound')) return '/Images/amenities/compound_wall.png';
  if (lower.includes('tank') || lower.includes('storage')) return '/Images/amenities/water_tank.png';
  if (lower.includes('mediterranean') || lower.includes('themed park')) return '/Images/amenities/garden.png';
  return null;
};

const getAmenityIcon = (amenity: string, size = 32) => {
  const lower = amenity.toLowerCase();
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
  if (lower.includes('mediterranean') || lower.includes('themed park')) return <Palmtree size={size} />;
  return <CheckCircle2 size={size} />;
};

const AMENITIES = [
  'CCTV', 'Drainage', 'LED Lights', 'Jogging',
  'Yoga Deck', 'Gazebo', 'Senior Park', 'Sports Turf',
  'Play Area', 'Outdoor Gym', 'Compound Wall', 'Kids Play',
  'Water Tank', 'Security', 'Mediterranean',
];

const SERVICES = [
  { title: 'Premium Land Acquisition', description: 'We identify and acquire prime real estate with unmatched appreciation potential. Every plot is fully DTCP/RERA approved, ensuring completely secure investments in pristine, high-growth corridors.', image: '/Images/Mount Shadows/DJI_0301.JPG' },
  { title: 'Bespoke Architectural Design', description: 'Our in-house architects work closely with you to design custom villas that perfectly balance modern Mediterranean and minimalist aesthetics with your personal lifestyle requirements.', image: '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.05.14 PM.jpeg' },
  { title: 'Sustainable Construction', description: 'We construct homes using eco-friendly materials, integrating solar energy, rainwater harvesting, and advanced air purification systems to create truly sustainable, zero-waste living environments.', image: '/Images/Gardenia/IMG_4928.JPG' },
  { title: 'Comprehensive Estate Management', description: 'Our dedication continues long after handover. We provide 24/7 security, lush landscape maintenance, and continuous community management to protect and elevate your property value.', image: '/Images/Gardenia/IMG_4923.JPG' },
];

const VISUALIZATION_STEPS = [
  { step: '01', title: 'Consultation', desc: 'Understanding your vision and lifestyle requirements through deep dialogue.' },
  { step: '02', title: 'Site Selection', desc: 'Curating the perfect plot in our premium, hand-picked communities.' },
  { step: '03', title: 'Design', desc: 'Crafting bespoke architectural blueprints tailored entirely for you.' },
  { step: '04', title: 'Execution', desc: 'Building your dream with uncompromising quality and sustainable practices.' },
];

export default function ServicesClient() {
  return (
    <main className="bg-bg-primary min-h-screen">
      <PageHeader 
        label="What We Offer"
        title="Our Services"
        subtitle="From acquiring premium land to bespoke architectural design and lifelong estate management. Experience the complete journey of sustainable luxury real estate."
      />

      {/* Process Visualization Section (No Icons) */}
      <SectionWrapper className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-20">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">The Journey</span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold max-w-3xl leading-tight">Visualizing Your Path to Premium Living.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-[2rem] overflow-hidden border border-white/10">
            {VISUALIZATION_STEPS.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-bg-primary p-6 sm:p-10 group hover:bg-bg-secondary transition-colors duration-500 flex flex-col justify-between min-h-[220px] sm:min-h-[300px]"
              >
                <span className="font-mono text-accent text-4xl sm:text-6xl font-bold opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-left">{item.step}</span>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* The HorizontalScroll component has its own sticky/scroll logic and takes up full viewport height */}
      <HorizontalScroll panels={SERVICES} />

      <SectionWrapper className="bg-bg-secondary py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16 text-center">
            <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-4 block">Community Features</span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold">EcoVistaLife Amenities</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {AMENITIES.map((amenity, i) => (
              <AmenityCard 
                key={i} 
                name={amenity} 
                index={i}
                image={getAmenityImage(amenity)}
                icon={getAmenityIcon(amenity)}
              />
            ))}
          </div>
        </div>
      </SectionWrapper>

      <Footer heading="Get In Touch"  image="/logo.png" />
    </main>
  );
}

