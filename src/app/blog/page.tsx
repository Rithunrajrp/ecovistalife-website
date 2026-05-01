import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import PageHeader from '@/components/ui/PageHeader';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog | EcoVistaLife — Real Estate Insights & Sustainable Living',
  description: 'Expert insights on sustainable living, eco-friendly homes, real estate investment, and property buying guides from EcoVistaLife Coimbatore.',
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const FALLBACK_BLOGS = [
  {
    slug: 'enrich-your-mind-envision-your-future-education-for-success',
    title: 'Green Living Made Easy: How Ecovista Life Transforms House, Flat, and Land Ownership',
    excerpt: 'As the demand for eco-friendly lifestyles grows, Ecovista Life is at the forefront of transforming home ownership into a more sustainable, accessible reality. Whether you\'re looking for a house, flat, or land, we provide environmentally conscious options.',
    coverImage: 'https://ecovistalife.in/wp-content/uploads/2024/04/Affordable-Rental.jpg',
    category: 'Modern Houses',
    author: 'EcoVistaLife',
    publishedAt: '2024-04-17T00:00:00.000Z',
  },
  {
    slug: 'university-class-starting-soon-while-the-lovely-valley-team-work',
    title: 'Your Dream Home Awaits: Exploring Ecovista Life\'s Sustainable House, Flat, and Land Offers',
    excerpt: 'Finding the perfect home is more than just choosing a location — it\'s about finding a space that reflects your values. Discover how Ecovista Life is redefining real estate with sustainable homes and modern flats.',
    coverImage: 'https://ecovistalife.in/wp-content/uploads/2024/11/freepik__candid-image-photography-natural-textures-highly-r__93777.jpeg',
    category: 'Property',
    author: 'EcoVistaLife',
    publishedAt: '2024-04-17T00:00:00.000Z',
  },
  {
    slug: 'discover-unparalleled-expertise-in-market',
    title: 'Buying Smart: A Guide to Eco-Friendly Homes, Flats, and Land Investments',
    excerpt: 'Smart real estate investment starts with choosing properties that offer both immediate value and long-term sustainability. Here\'s your comprehensive guide to making smart property investments.',
    coverImage: 'https://ecovistalife.in/wp-content/uploads/2024/11/freepik__candid-image-photography-natural-textures-highly-r__70156.jpeg',
    category: 'Property',
    author: 'EcoVistaLife',
    publishedAt: '2024-04-17T00:00:00.000Z',
  },
];

async function getBlogs() {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed');
    return res.json();
  } catch {
    return FALLBACK_BLOGS;
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  const [featured, ...rest] = blogs;

  return (
    <main className="bg-bg-primary min-h-screen">
      <PageHeader 
        label="Insights & Updates"
        title="Journal"
        subtitle="Expert insights on sustainable living, eco-friendly homes, and smart real estate investment in Coimbatore."
      />

      {blogs.length === 0 ? (
        <SectionWrapper className="pt-0">
          <div className="py-32 text-center bg-bg-secondary rounded-3xl mx-6 md:mx-12 border border-white/5">
            <h2 className="font-heading text-3xl font-bold mb-4">No Posts Yet</h2>
            <p className="text-text-secondary">Blog posts are on their way. Check back soon.</p>
          </div>
        </SectionWrapper>
      ) : (
        <>
          {/* Featured Post */}
          {featured && (
            <SectionWrapper className="pt-0 pb-16">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <Link href={`/blog/${featured.slug}`} className="group block relative rounded-[2.5rem] overflow-hidden bg-bg-secondary border border-white/5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
                    {featured.coverImage && (
                      <div className="relative h-full min-h-[40vh] w-full overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img 
                          src={featured.coverImage} 
                          alt={featured.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center p-10 md:p-16 relative z-20">
                      <div className="mb-6">
                        <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent/20 text-accent border border-accent/20">
                          {featured.category || 'Featured'}
                        </span>
                      </div>
                      <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-accent transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-text-secondary text-lg leading-relaxed mb-8">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-text-secondary gap-4 mb-8">
                        <span>{featured.author || 'EcoVistaLife'}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>{new Date(featured.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="text-accent font-medium flex items-center gap-2 group-hover:gap-4 transition-all">
                        Read Article <span>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </SectionWrapper>
          )}

          {/* Remaining Posts Grid */}
          {rest.length > 0 && (
            <SectionWrapper className="py-16">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-12 border-b border-white/10 pb-4">
                  <h3 className="font-heading text-3xl font-bold">Latest Articles</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((blog: any, i: number) => (
                    <Link href={`/blog/${blog.slug}`} key={blog.slug} className="group flex flex-col bg-bg-secondary rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors">
                      {blog.coverImage && (
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                          <img 
                            src={blog.coverImage} 
                            alt={blog.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <div className="flex flex-col flex-grow p-8">
                        <div className="text-accent text-xs font-bold uppercase tracking-widest mb-4">
                          {blog.category || 'Article'}
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors leading-snug">
                          {blog.title}
                        </h3>
                        <p className="text-text-secondary line-clamp-3 mb-6 flex-grow">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                          <span className="text-xs text-text-secondary">
                            {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="text-accent text-sm font-medium group-hover:mr-[-4px] transition-all">
                            Read →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </SectionWrapper>
          )}
        </>
      )}

      <Footer heading="Get In Touch"  image="/logo.png" />
    </main>
  );
}

