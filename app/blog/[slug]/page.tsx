import { getSinglePost } from '@/lib/marble-query';
import { BlogProse } from '@/components/prose';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ReadMoreButton from '@/components/read-more-button';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Revalidate this page every hour
export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { post } = await getSinglePost(slug);
    return {
      title: post.title,
      description: post.description || 'Read more about this topic',
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;
    const { post } = await getSinglePost(slug);

    return (
      <div className="min-h-screen bg-background">
        {/* Back Navigation - Hidden on mobile */}
        <section className="pt-20 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="hidden md:block">
              <ReadMoreButton 
                href="/blog"
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
                loadingText="Back to Blog"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </ReadMoreButton>
            </div>
          </div>
        </section>

        {/* Article Header */}
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <article>
              {/* Post Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.authors?.[0]?.name || 'Unknown Author'}</span>
                </div>
                {post.updatedAt !== post.publishedAt && (
                  <div className="text-xs">
                    Updated {new Date(post.updatedAt).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Post Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Post Excerpt */}
              {post.description && (
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {post.description}
                </p>
              )}

              {/* Categories and Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.category && (
                  <Badge >
                    {post.category.name}
                  </Badge>
                )}
                {post.tags?.map((tag: any) => (
                  <Badge key={tag.id} variant="secondary">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag.name}
                  </Badge>
                ))}
              </div>

              {/* Featured Image */}
              {post.coverImage && (
                <div className="mb-8">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Post Content */}
              <div className="prose-wrapper">
                <BlogProse html={post.content} />
              </div>

            </article>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
