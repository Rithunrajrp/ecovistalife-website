import type { Metadata } from 'next';
import BlogClient from './BlogClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/* ── Fallback blog data when backend is not running ── */
const FALLBACK_BLOGS: Record<string, any> = {
  'enrich-your-mind-envision-your-future-education-for-success': {
    title: 'Green Living Made Easy: How Ecovista Life Transforms House, Flat, and Land Ownership',
    slug: 'enrich-your-mind-envision-your-future-education-for-success',
    excerpt: 'As the demand for eco-friendly lifestyles grows, Ecovista Life is at the forefront of transforming home ownership into a more sustainable, accessible reality.',
    coverImage: 'https://ecovistalife.in/wp-content/uploads/2024/04/Affordable-Rental.jpg',
    category: 'Modern Houses',
    author: 'EcoVistaLife',
    publishedAt: '2024-04-17T00:00:00.000Z',
    content: `
      <p>As the demand for eco-friendly lifestyles grows, Ecovista Life is at the forefront of transforming home ownership into a more sustainable, accessible reality. Whether you're looking for a house, flat, or land, Ecovista Life provides environmentally conscious options that make green living easy and affordable.</p>

      <p>Ecovista Life's homes are built with sustainability in mind, using eco-friendly materials and energy-efficient designs. From solar-powered systems to water-saving technology, every detail in an Ecovista Life home is designed to reduce environmental impact while enhancing your comfort and quality of life. Living green no longer has to mean sacrificing modern conveniences — Ecovista Life homes provide luxury, efficiency, and sustainability in perfect balance.</p>

      <h2>Houses for a Greener Future</h2>
      <p>Ecovista Life's eco-friendly houses are designed to support green living. With features like natural ventilation, renewable energy options, and sustainable construction materials, these homes allow you to reduce your carbon footprint while enjoying a modern, stylish living space. By adopting energy-efficient designs, you'll experience lower utility bills and contribute to a healthier planet.</p>

      <h2>Flats with Eco-Conscious Designs</h2>
      <p>For urban dwellers, Ecovista Life offers flats that integrate green living into everyday city life. These flats use innovative technologies to reduce energy consumption and waste. They are ideal for individuals or families who want to live in an eco-conscious environment without compromising on style, comfort, or location.</p>

      <h2>Land for Sustainable Development</h2>
      <p>Ecovista Life also offers plots of land designed for sustainable development. These plots come with eco-friendly guidelines and infrastructure, ensuring that any construction aligns with environmental best practices. Whether you want to build a custom green home or develop a small community, Ecovista Life's land offerings provide the foundation for sustainable growth.</p>

      <h2>Community-Centered Living</h2>
      <p>Join your neighbors for an eco-friendly social gathering as the day comes to a conclusion. Savor refreshments made with sustainable ingredients and have discussions on sustainable life. By fostering a sense of community, Ecovista Life creates neighborhoods where residents share a commitment to green living.</p>

      <p>Whether you work from home or commute to a nearby office, the energy-efficient features of your home contribute to a productive and eco-conscious workday. Smart home systems allow you to monitor and control energy usage, ensuring that your environmental impact remains minimal.</p>
    `,
    readTime: '5 min read',
    tags: ['Green Living', 'Sustainability', 'Eco-Friendly Homes'],
  },
  'university-class-starting-soon-while-the-lovely-valley-team-work': {
    title: 'Your Dream Home Awaits: Exploring Ecovista Life\'s Sustainable House, Flat, and Land Offers',
    slug: 'university-class-starting-soon-while-the-lovely-valley-team-work',
    excerpt: 'Discover how Ecovista Life is redefining real estate with sustainable homes, modern flats, and premium land that blends luxury with eco-conscious living.',
    coverImage: 'https://ecovistalife.in/wp-content/uploads/2024/04/image-1-85x85.jpg',
    category: 'Property',
    author: 'EcoVistaLife',
    publishedAt: '2024-04-17T00:00:00.000Z',
    content: `
      <p>Finding the perfect home is more than just choosing a location — it's about finding a space that reflects your values and supports your lifestyle. Ecovista Life understands this deeply, which is why every property we develop is designed with sustainability, comfort, and modern living in mind.</p>

      <h2>Premium Houses with Sustainable Design</h2>
      <p>Our residential houses are crafted with precision and care. Each home features energy-efficient architecture, eco-friendly building materials, and thoughtful design that maximizes natural light and ventilation. These aren't just houses — they're sanctuaries designed for modern families who care about the planet.</p>

      <h2>Modern Flats for Urban Living</h2>
      <p>City living doesn't have to come at the cost of sustainability. Our flats offer the best of both worlds: prime urban locations with green building certifications. Smart home technology, water recycling systems, and energy-efficient appliances come standard in every unit.</p>

      <h2>Investment-Grade Land Opportunities</h2>
      <p>For those looking to build their dream from the ground up, our land offerings present exceptional investment opportunities. Each plot is strategically located, comes with clear titles, and is designed within eco-friendly community frameworks that ensure long-term value appreciation.</p>

      <h2>Why Choose EcoVistaLife?</h2>
      <ul>
        <li>DTCP and RERA approved developments</li>
        <li>Transparent pricing with zero hidden costs</li>
        <li>Dedicated customer support throughout your journey</li>
        <li>World-class amenities in every project</li>
        <li>Proven track record of timely delivery</li>
      </ul>

      <p>Your dream home isn't just a place to live — it's a statement about the future you want to build. Start your journey with EcoVistaLife today and discover properties that are as kind to the earth as they are beautiful to live in.</p>
    `,
    readTime: '4 min read',
    tags: ['Dream Home', 'Real Estate', 'Investment'],
  },
  'discover-unparalleled-expertise-in-market': {
    title: 'Buying Smart: A Guide to Ecovista Life\'s Eco-Friendly Homes, Flats, and Land Investments',
    slug: 'discover-unparalleled-expertise-in-market',
    excerpt: 'Smart real estate investment starts with choosing properties that offer both immediate value and long-term sustainability. Here\'s your comprehensive guide.',
    coverImage: 'https://ecovistalife.in/wp-content/uploads/2024/09/00d0d_iIqvWycA7u7_0jh0aA_600x450-85x85.jpg',
    category: 'Property',
    author: 'EcoVistaLife',
    publishedAt: '2024-04-17T00:00:00.000Z',
    content: `
      <p>Smart real estate investment starts with choosing properties that offer both immediate value and long-term sustainability. In today's market, eco-friendly homes are not just a trend — they represent the future of real estate. Here's your comprehensive guide to making smart property investments with EcoVistaLife.</p>

      <h2>Understanding the Green Premium</h2>
      <p>Eco-friendly properties often command a premium in the market, but this isn't just about paying more — it's about getting more value. Green homes offer lower utility costs, higher resale values, and better quality of life. Studies show that energy-efficient homes appreciate 10-15% faster than conventional properties.</p>

      <h2>Key Factors to Consider</h2>
      <p>When evaluating an eco-friendly property investment, consider these crucial factors:</p>
      <ul>
        <li><strong>Location:</strong> Proximity to public transport, schools, hospitals, and commercial centers</li>
        <li><strong>Certifications:</strong> Look for DTCP approval, RERA registration, and green building certifications</li>
        <li><strong>Infrastructure:</strong> Quality of roads, water supply, electricity, and internet connectivity</li>
        <li><strong>Community:</strong> The developer's track record, community design, and maintenance plans</li>
        <li><strong>Future Growth:</strong> Upcoming infrastructure projects and development plans in the area</li>
      </ul>

      <h2>Why Coimbatore Is the Smart Choice</h2>
      <p>Coimbatore has emerged as one of India's most promising real estate markets. With its pleasant climate, growing IT sector, excellent educational institutions, and proximity to the Western Ghats, the city offers an unmatched quality of life. Areas like Karamadai, in particular, are experiencing rapid growth while maintaining their natural charm.</p>

      <h2>EcoVistaLife's Competitive Edge</h2>
      <p>What sets EcoVistaLife apart from other developers:</p>
      <ul>
        <li>Over 300+ happy clients and counting</li>
        <li>400+ plots delivered with zero legal complications</li>
        <li>Transparent pricing — what you see is what you pay</li>
        <li>World-class amenities including 24/7 security, jogging tracks, and landscaped gardens</li>
        <li>Flexible payment options including easy EMI plans</li>
      </ul>

      <p>Investing in an EcoVistaLife property isn't just a financial decision — it's a lifestyle choice. Join hundreds of satisfied homeowners who have chosen to invest in a greener, more sustainable future.</p>
    `,
    readTime: '6 min read',
    tags: ['Investment Guide', 'Smart Buying', 'Coimbatore Real Estate'],
  },
};

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Not found');
    return res.json();
  } catch {
    return FALLBACK_BLOGS[slug] || null;
  }
}

export async function generateStaticParams() {
  return Object.keys(FALLBACK_BLOGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  return {
    title: blog ? `${blog.title} | Blog | EcoVistaLife` : 'Post Not Found | EcoVistaLife',
    description: blog?.excerpt || 'Real estate insights and sustainable living tips from EcoVistaLife.',
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'var(--color-bg-primary)', paddingTop: '100px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Post Not Found</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>The blog post you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <BlogClient
      title={blog.title}
      content={blog.content || ''}
      excerpt={blog.excerpt || ''}
      author={blog.author || 'EcoVistaLife'}
      publishedAt={blog.publishedAt}
      coverImage={blog.coverImage}
      category={blog.category}
      readTime={blog.readTime}
      tags={blog.tags || []}
    />
  );
}
