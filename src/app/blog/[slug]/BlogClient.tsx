"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

interface BlogClientProps {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  coverImage?: string;
  category?: string;
  readTime?: string;
  tags?: string[];
}

export default function BlogClient({
  title, content, excerpt, author, publishedAt,
  coverImage, category, readTime, tags = [],
}: BlogClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <main className="bg-bg-primary min-h-screen relative">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[60]"
        style={{ scaleX }}
      />

      <article className="pt-32 pb-20">
        {/* Hero Area */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            {category && (
              <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent/20 text-accent border border-accent/20 mb-6">
                {category}
              </span>
            )}
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-text-secondary text-sm md:text-base">
              <span>By <span className="text-white font-medium">{author}</span></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>{formattedDate}</span>
              {readTime && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span>{readTime}</span>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Cover Image */}
        {coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto px-6 mb-20"
          >
            <div className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden relative border border-white/5 shadow-2xl shadow-black/50">
              <img 
                src={coverImage} 
                alt={title} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Article Content */}
        <SectionWrapper className="pt-0">
          <div className="max-w-3xl mx-auto px-6">
            <div 
              className={cn(
                "prose prose-invert prose-lg md:prose-xl max-w-none",
                "prose-headings:font-heading prose-headings:font-bold prose-headings:text-white",
                "prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6",
                "prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4",
                "prose-p:text-text-secondary prose-p:leading-relaxed",
                "prose-a:text-accent hover:prose-a:text-white prose-a:transition-colors",
                "prose-strong:text-white",
                "prose-ul:text-text-secondary prose-li:marker:text-accent",
                "prose-blockquote:border-l-accent prose-blockquote:bg-bg-secondary prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-white prose-blockquote:not-italic"
              )}
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-16 pt-8 border-t border-white/10">
                <div className="text-sm uppercase tracking-widest text-text-secondary mb-4">Related Topics</div>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag, i) => (
                    <span key={i} className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Blog */}
            <div className="mt-16 text-center">
              <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors font-medium">
                <span>←</span> Back to All Posts
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </article>

      <Footer
        heading="Enjoyed This Article?"
        body="Door no. 60/1, 60/2, Thirumurugan Nagar, Krishna Park, Veeriyampalayam Road, Nehru Nagar, Kalapatti, Coimbatore - 641048 | +91 97877 95555 | info@ecovistalife.com"
        image="/logo.png"
      />
    </main>
  );
}
