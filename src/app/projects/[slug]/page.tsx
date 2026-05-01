import ProjectClient from './ProjectClient';
import type { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/* ── Fallback project data when backend is not running ── */
const FALLBACK_PROJECTS: Record<string, any> = {
  gardenia: {
    title: 'Ecolife Gardenia',
    slug: 'gardenia',
    description: 'Premium DTCP/RERA-approved plots in a secure gated community at Karamadai, Coimbatore. Flexible payment plans with eco-friendly living.',
    content: `
      <h2>About Ecolife Gardenia</h2>
      <p>Ecolife Gardenia is our flagship project offering premium residential plots in the serene town of Karamadai, Coimbatore. Nestled amidst lush greenery and rolling hills, this DTCP/RERA-approved development provides the perfect balance of modern amenities and sustainable living.</p>
      <h3>Key Highlights</h3>
      <ul>
        <li>DTCP & RERA Approved</li>
        <li>Secure Gated Community with 24/7 Security</li>
        <li>Flexible EMI & Payment Plans</li>
        <li>Eco-friendly Infrastructure</li>
        <li>Near Schools, Hospitals & Transport</li>
      </ul>
      <h3>Amenities</h3>
      <p>CCTV Surveillance • Storm Water Drain • LED Street Lights • Jogging Track • Yoga Deck • Gazebo Seating • Senior Citizen Park • Turf Court • Open Play Area • Outdoor Gym • Compound Wall • Kids' Play Zone • Overhead Tank • 24/7 Security</p>
      <h3>Location Advantage</h3>
      <p>Karamadai is one of the fastest-growing residential destinations in Coimbatore. With excellent connectivity to Mettupalayam, Coimbatore CBD, and major IT corridors, your investment is poised for significant appreciation.</p>
    `,
    images: [
      '/Images/Gardenia/IMG_4923.JPG',
      '/Images/Gardenia/IMG_4924.JPG',
      '/Images/Gardenia/IMG_4925.JPG',
      '/Images/Gardenia/IMG_4926.JPG',
      '/Images/Gardenia/IMG_4927.JPG',
      '/Images/Gardenia/IMG_4928.JPG',
    ],
    status: 'Completed',
    location: 'Karamadai, Coimbatore',
    plotSizes: '1,200 – 5,000 sq ft',
    priceRange: '₹8.5L – ₹35L',
  },
  'mount-shadows': {
    title: 'Mount Shadows',
    slug: 'mount-shadows',
    description: 'Premium hillside plots overlooking the Western Ghats with world-class amenities and serene surroundings in Karamadai.',
    content: `
      <h2>About Mount Shadows</h2>
      <p>Mount Shadows offers an exclusive hillside living experience with panoramic views of the Western Ghats. Located in Karamadai, this project combines the tranquility of nature with modern infrastructure and world-class amenities.</p>
      <h3>Key Highlights</h3>
      <ul>
        <li>Hillside Location with Panoramic Views</li>
        <li>Premium Infrastructure & Landscaping</li>
        <li>Gated Community with Advanced Security</li>
        <li>Close to Nature, Connected to City</li>
      </ul>
    `,
    images: [
      '/Images/Mount Shadows/DJI_0301.JPG',
      '/Images/Mount Shadows/DJI_0306.JPG',
      '/Images/Mount Shadows/DJI_0308.JPG',
      '/Images/Mount Shadows/DJI_0310.JPG',
      '/Images/Mount Shadows/DJI_0311.JPG',
    ],
    status: 'Completed',
    location: 'Karamadai, Coimbatore',
    plotSizes: '2,000 – 4,500 sq ft',
    priceRange: 'Coming Soon',
  },
  frenchville: {
    title: 'Frenchville',
    slug: 'frenchville',
    description: 'French-inspired villa plots featuring Mediterranean architecture, premium landscaping, and sustainable design in Coimbatore.',
    content: `
      <h2>About Frenchville</h2>
      <p>Inspired by the elegance of French provincial architecture, Frenchville brings European charm to the heart of Coimbatore. This exclusive development features carefully curated villa plots designed for those who appreciate refined living.</p>
      <h3>Key Highlights</h3>
      <ul>
        <li>French-inspired Architecture Guidelines</li>
        <li>Mediterranean Landscaping</li>
        <li>Premium Clubhouse & Recreation</li>
        <li>Eco-friendly & Sustainable Design</li>
      </ul>
    `,
    images: [
      '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.12.21 PM1.jpeg',
      '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.12.21 PM2.jpeg',
      '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.12.22 PM3.jpeg',
      '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.05.14 PM.jpeg',
      '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.11.36 PM.jpeg',
    ],
    status: 'Upcoming',
    location: 'Coimbatore',
    plotSizes: '1,500 – 3,500 sq ft',
    priceRange: 'Coming Soon',
  },
  ecolife: {
    title: 'EcoLife',
    slug: 'ecolife',
    description: 'Our flagship eco-friendly community combining sustainable living with modern convenience and energy-efficient design.',
    content: `
      <h2>About EcoLife</h2>
      <p>EcoLife is the flagship project from EcoVistaLife, embodying our core philosophy of sustainable luxury. This development pushes the boundaries of eco-friendly living with innovative green technologies and energy-efficient designs.</p>
      <h3>Key Highlights</h3>
      <ul>
        <li>Zero-waste Community Design</li>
        <li>Solar-powered Common Areas</li>
        <li>Rainwater Harvesting Systems</li>
        <li>Native Plant Landscaping</li>
      </ul>
    `,
    images: [
      '/Images/Gardenia/IMG_4928.JPG',
      '/Images/Gardenia/IMG_4923.JPG',
    ],
    status: 'Completed',
    location: 'Karamadai, Coimbatore',
    plotSizes: '1,200 – 4,000 sq ft',
    priceRange: '₹7.5L – ₹28L',
  },
};

async function getProject(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/projects/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Not found');
    return res.json();
  } catch {
    // Fallback to static data when backend is not running
    return FALLBACK_PROJECTS[slug] || null;
  }
}

export async function generateStaticParams() {
  return Object.keys(FALLBACK_PROJECTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return {
    title: project ? `${project.title} | Projects | EcoVistaLife` : 'Project Not Found | EcoVistaLife',
    description: project?.description || 'Premium property development in Coimbatore by EcoVistaLife.',
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'var(--color-bg-primary)', paddingTop: '100px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Project Not Found</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>The project you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <ProjectClient
      title={project.title}
      description={project.description || ''}
      content={project.content || ''}
      images={project.images || []}
      status={project.status}
      location={project.location}
      plotSizes={project.plotSizes}
      priceRange={project.priceRange}
    />
  );
}
