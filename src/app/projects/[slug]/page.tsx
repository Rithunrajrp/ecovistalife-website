import ProjectClient from './ProjectClient';
import type { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/* ── Fallback project data when backend is not running ── */
const FALLBACK_PROJECTS: Record<string, any> = {
  gardenia: {
    title: 'Ecolife Gardenia',
    slug: 'gardenia',
    description: 'Premium DTCP/RERA-approved plots in a secure gated community at Ganeshapuram, Coimbatore. Flexible payment plans with eco-friendly living.',
    content: `
      <h2>About Ecolife Gardenia</h2>
      <p>Ecolife Gardenia is our flagship project offering premium residential plots in the serene town of Ganeshapuram, Coimbatore. Nestled amidst lush greenery and rolling hills, this DTCP/RERA-approved development provides the perfect balance of modern amenities and sustainable living.</p>
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
      <p>Ganeshapuram is one of the fastest-growing residential destinations in Coimbatore, offering strategic proximity to Sathy Road, major educational institutions, and healthcare centers. With rapidly developing infrastructure and easy access to the city's key hubs, your investment in Gardenia is positioned for exponential growth and premium appreciation.</p>
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
    location: 'Ganeshapuram, Coimbatore',
    plotSizes: '1,200 – 5,000 sq ft',
    priceRange: '₹5.5L – ₹35L',
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
      <h3>Amenities</h3>
      <p>CCTV Surveillance • Storm Water Drain • LED Street Lights • Jogging Track • Yoga Deck • Senior Citizen Park • Outdoor Gym • Compound Wall • 24/7 Security • Overhead Tank</p>
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
    priceRange: '₹10.49L / cent & 2 BHK Villas from ₹49L Onwards',
    brochure: '/brochure/mount shadows.pdf',
  },
  frenchville: {
    title: 'Frenchville',
    slug: 'frenchville',
    description: 'French-inspired villa plots featuring Mediterranean architecture, premium landscaping, and sustainable design in Sulur, Coimbatore.',
    content: `
      <h2>About Frenchville</h2>
      <p>Inspired by the elegance of French provincial architecture, Frenchville brings European charm to the heart of Sulur, Coimbatore. This exclusive development features carefully curated villa plots designed for those who appreciate refined living in a rapidly developing hub.</p>
      <h3>Key Highlights</h3>
      <ul>
        <li>French-inspired Architecture Guidelines</li>
        <li>Mediterranean Landscaping</li>
        <li>Premium Clubhouse & Recreation</li>
        <li>Eco-friendly & Sustainable Design</li>
      </ul>
      <h3>Amenities</h3>
      <p>French Clubhouse • Mediterranean Garden • CCTV Surveillance • LED Street Lights • Jogging Track • Kids Play Area • Senior Citizen Seating • Compound Wall • 24/7 Security • Rainwater Harvesting</p>
      <h3>Location Advantage</h3>
      <p>Sulur is one of Coimbatore's most strategic and fastest-growing residential and industrial corridors. Its proximity to the Coimbatore International Airport (15-20 mins) and excellent connectivity via the Salem-Kochi Highway (NH 544) make it an ideal choice for families and investors alike. Being home to the Sulur Air Force Base, the area enjoys enhanced security, high-quality infrastructure, and a peaceful yet well-connected lifestyle.</p>
    `,
    images: [
      '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.12.21 PM1.jpeg',
      '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.12.21 PM2.jpeg',
      '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.12.22 PM3.jpeg',
      '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.05.14 PM.jpeg',
      '/Images/French Ville/WhatsApp Image 2026-04-10 at 3.11.36 PM.jpeg',
    ],
    status: 'Upcoming',
    location: 'Sulur, Coimbatore',
    plotSizes: '1,500 – 3,500 sq ft',
    priceRange: 'starting from 12.49L',
    video: '/video/frenchville.mp4',
    endImage: '/Images/French Ville/frenchville_bg.jpeg',
    brochure: '/brochure/FrenchVilla.pdf',
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
  
  if (!project) {
    return {
      title: 'Project Not Found | EcoVistaLife',
    };
  }

  return {
    title: `${project.title} — Premium Villa Plots in ${project.location || 'Coimbatore'}`,
    description: project.description || `Explore ${project.title}, a premium gated community by EcoVistaLife in ${project.location || 'Coimbatore'}.`,
    openGraph: {
      title: `${project.title} | EcoVistaLife`,
      description: project.description,
      url: `https://ecovistalife.in/projects/${slug}`,
      images: project.images?.[0] ? [{ url: project.images[0] }] : [],
    },
    alternates: {
      canonical: `https://ecovistalife.in/projects/${slug}`,
    },
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
      video={project.video}
      endImage={project.endImage}
      brochure={project.brochure}
    />
  );
}
