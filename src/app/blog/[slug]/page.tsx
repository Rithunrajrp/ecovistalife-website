import type { Metadata } from 'next';
import BlogClient from './BlogClient';
import { notFound } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const FALLBACK_BLOGS = [
  {
    slug: 'enrich-your-mind-envision-your-future-education-for-success',
    title: 'Green Living Made Easy: How Ecovista Life Transforms House, Flat, and Land Ownership',
    excerpt: 'As the demand for eco-friendly lifestyles grows, Ecovista Life is at the forefront of transforming home ownership into a more sustainable, accessible reality. Whether you\'re looking for a house, flat, or land, we provide environmentally conscious options.',
    content: '<p>Sustainability is no longer just a buzzword; it is a way of life. At Ecovista Life, we believe that modern living should not come at the expense of our planet. That\'s why every project we develop integrates green building practices, smart water management, and energy-efficient designs.</p><h2>The Future of Real Estate</h2><p>Our premium villa plots and gated communities are strategically located in Coimbatore and Karamadai to offer you the perfect blend of urban connectivity and natural serenity. Investing in an eco-friendly property not only ensures a healthier lifestyle for your family but also guarantees higher long-term appreciation.</p>',
    coverImage: '/Images/stock/affordable_rental.png',
    category: 'Modern Houses',
    author: 'EcoVistaLife',
    publishedAt: '2024-04-17T00:00:00.000Z',
    readTime: '5 min read',
    tags: ['Sustainability', 'Eco-friendly', 'Real Estate']
  },
  {
    slug: 'university-class-starting-soon-while-the-lovely-valley-team-work',
    title: 'Your Dream Home Awaits: Exploring Ecovista Life\'s Sustainable House, Flat, and Land Offers',
    excerpt: 'Finding the perfect home is more than just choosing a location — it\'s about finding a space that reflects your values. Discover how Ecovista Life is redefining real estate with sustainable homes and modern flats.',
    content: '<p>Our homes are built for the future. From smart energy grids to sustainable water management, everything is designed with you and the environment in mind. We go beyond standard development to build communities that thrive in harmony with nature.</p>',
    coverImage: '/Images/Gardenia/IMG_4928.JPG',
    category: 'Property',
    author: 'EcoVistaLife',
    publishedAt: '2024-04-17T00:00:00.000Z',
    readTime: '4 min read',
    tags: ['Dream Home', 'Properties', 'Investment']
  },
  {
    slug: 'discover-unparalleled-expertise-in-market',
    title: 'Buying Smart: A Guide to Eco-Friendly Homes, Flats, and Land Investments',
    excerpt: 'Smart real estate investment starts with choosing properties that offer both immediate value and long-term sustainability. Here\'s your comprehensive guide to making smart property investments.',
    content: '<p>Investing in eco-friendly properties ensures long-term appreciation and a healthier lifestyle. Learn how our DTCP and RERA approved plots guarantee security and growth. Sustainability is the smartest investment you can make for the next generation.</p>',
    coverImage: '/Images/Mount Shadows/DJI_0301.JPG',
    category: 'Property',
    author: 'EcoVistaLife',
    publishedAt: '2024-04-17T00:00:00.000Z',
    readTime: '6 min read',
    tags: ['Investment', 'Guide', 'Smart Buying']
  },
];

async function getBlogPost(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed');
    return res.json();
  } catch (error) {
    return FALLBACK_BLOGS.find(blog => blog.slug === slug) || null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://ecovistalife.in/blog/${slug}`,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author || 'EcoVistaLife'],
    },
    alternates: {
      canonical: `https://ecovistalife.in/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogClient 
      title={post.title}
      content={post.content}
      excerpt={post.excerpt}
      author={post.author}
      publishedAt={post.publishedAt}
      coverImage={post.coverImage}
      category={post.category}
      readTime={post.readTime}
      tags={post.tags}
    />
  );
}
