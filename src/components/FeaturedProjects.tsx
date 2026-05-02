import Link from 'next/link';
import { cn } from '@/lib/utils';
import SectionWrapper from '@/components/ui/SectionWrapper';
import FeaturedProjectsClient from './FeaturedProjectsClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function getProjects() {
  try {
    const res = await fetch(`${API_URL}/api/projects`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    // Fallback data when backend is not running
    return [
      {
        slug: 'gardenia',
        title: 'Gardenia',
        description: 'Land for Sale in Karamadai with flexible payments and eco-friendly gated community living.',
        images: ['/Images/Gardenia/IMG_4923.JPG'],
        status: 'Completed',
      },
      {
        slug: 'mount-shadows',
        title: 'Mount Shadows',
        description: 'Premium aerial plots in Karamadai with world-class amenities and serene surroundings.',
        images: ['/Images/Mount Shadows/DJI_0301.JPG'],
        status: 'Ongoing',
      },
    ];
  }
}

export default async function FeaturedProjects() {
  let projects = await getProjects();
  // Filter out frenchville and show top 2 featured projects to maximize space
  projects = projects.filter((p: any) => p.slug !== 'frenchville').slice(0, 2);

  return (
    <SectionWrapper className="py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6 block">Featured Projects</span>
            <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter">Latest Developments</h2>
          </div>
          <Link href="/projects" className="text-white/60 hover:text-white text-sm uppercase tracking-widest font-medium transition-colors flex items-center gap-4 group pb-4 border-b border-white/10 hover:border-accent">
            View Portfolio
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>

        <FeaturedProjectsClient projects={projects} />
      </div>
    </SectionWrapper>
  );
}
