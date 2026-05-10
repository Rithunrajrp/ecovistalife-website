import Link from 'next/link';
import Hero from '@/components/Hero';
import HomeSections from '@/components/HomeSections';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import FeaturedProjects from '@/components/FeaturedProjects';
import VisionMission from '@/components/VisionMission';
import CustomerMarquee from '@/components/CustomerMarquee';
import HomeFAQs from '@/components/HomeFAQs';
import HomeCTA from '@/components/HomeCTA';

const STATS = [
  { number: '3+', label: 'Projects' },
  { number: '550+', label: 'Plots' },
  { number: '400+', label: 'Luxury Houses' },
  { number: '400+', label: 'Happy Clients' },
];

const HERO_IMAGES = [
  '/Images/hero/banner1.jpeg',
  '/Images/hero/banner2.jpeg',
  '/Images/hero/banner3.jpeg',
];

const FEATURES = [
  { title: 'Prime Location', description: 'Sulur, Karamadai & Coimbatore — where peace meets connectivity.' },
  { title: 'High Returns', description: 'Smart investment. Growing demand. Proven appreciation.' },
  { title: 'Eco-Friendly Living', description: 'Sustainable by design. Modern by choice.' },
  { title: 'World-Class Amenities', description: 'Gardens, clubhouse, jogging tracks & 24/7 security.' },
  { title: 'Premium Quality', description: 'Built to last. No shortcuts, ever.' },
  { title: 'Gated Community', description: 'Your family\'s safety, guaranteed around the clock.' },
];

const TESTIMONIALS = [
  {
    name: 'Mr. Sanjay Anbuchelvan',
    role: 'Property Owner',
    quote: 'ECOVISTALIFE has crafted a perfect environment for families looking to build their dream homes. The accessibility and thoughtfully designed amenities have made this investment truly worthwhile. The team guided us at every step, ensuring our villa plot was tailored to our needs. Highly recommend ECOVISTALIFE!',
    image: '/Images/Customers/571B3082.JPG',
  },
  {
    name: 'Mr. Aravind Subramanian',
    role: 'Villa Plot Buyer',
    quote: 'ECOVISTALIFE exceeded our expectations in every way. From the well-planned layouts to the serene surroundings, they have created a truly peaceful community. Our villa plot is exactly what we envisioned, and we can’t wait to start building our dream home. The professionalism and attention to detail are remarkable!',
    image: '/Images/Customers/571B3084.JPG',
  },
  {
    name: 'Mrs. Meena Raghavan',
    role: 'Homeowner',
    quote: 'Choosing ECOVISTALIFE was the best decision for our family. The level of planning and infrastructure development here is unmatched. The privacy and security features give us peace of mind, and the beautiful landscaping adds a touch of elegance. This is where we feel at home, even before construction has started.',
    image: '/Images/Customers/571B3087.JPG',
  },
];

export default function Home() {
  return (
    <main className="bg-bg-primary min-h-screen">
      <Hero
        heading="Premium Lands. Exceptional Life."
        body="Invest in a legacy of sustainable luxury. We create high-appreciation gated communities and premium villa plots across Coimbatore, Karamadai and Sulur."
        images={HERO_IMAGES}
        buttons={[{ text: 'Explore Portfolio', href: '/projects' }]}
      />

      <FeaturedProjects />
      <VisionMission />
      <HomeSections stats={STATS} features={FEATURES} testimonials={TESTIMONIALS} />

      <CustomerMarquee />

      <HomeFAQs />

      <HomeCTA />

      <Footer
        heading="Get In Touch"
        image="/logo.png"
      />
    </main>
  );
}
