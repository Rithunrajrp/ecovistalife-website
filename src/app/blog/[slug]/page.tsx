import type { Metadata } from 'next';
import BlogClient from './BlogClient';
import { notFound } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function getBlogPost(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
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
      url: `https://ecovistalife.in/blog/${params.slug}`,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author || 'EcoVistaLife'],
    },
    alternates: {
      canonical: `https://ecovistalife.in/blog/${params.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

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
