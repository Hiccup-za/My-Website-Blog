import { getPosts, getCategories, getTags } from '@/lib/marble-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ReadMoreButton from '@/components/read-more-button';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft, Package, Tag as TagIcon, ChevronDown } from 'lucide-react';
import Navigation from '@/components/navigation';
import BlogFilters from '../../components/blog-filters';
import type { Metadata } from 'next';

// Revalidate this page every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on QA Engineering, Test Automation, and Software Development by Christopher Zeuch',
  keywords: ['blog', 'QA Engineering', 'Test Automation', 'Software Development', 'Christopher Zeuch'],
};

export default async function BlogPage() {
  // Fetch blog data on the server
  const [postsData, categoriesData, tagsData] = await Promise.all([
    getPosts(),
    getCategories(),
    getTags(),
  ]);

  const posts = postsData?.posts || [];
  const categories = categoriesData?.categories || [];
  const tags = tagsData?.tags || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="blog" />
      
      <div className="pb-16">
      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-primary">Blog</span>
            </h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
          <div className="text-center">
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Thoughts on QA Engineering, Test Automation, and Software Development
            </p>
          </div>

        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Dropdowns */}
          <BlogFilters categories={categories} tags={tags} />
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">No posts yet</h2>
              <p className="text-muted-foreground">
                Check back soon for insights on QA Engineering and Software Development!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  {post.coverImage && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    
                    <CardTitle className="line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    
                    <CardDescription className="line-clamp-3">
                      {post.description || 'No description available'}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <User className="h-4 w-4" />
                      <span>{post.authors?.[0]?.name || 'Unknown Author'}</span>
                    </div>
                    
                    {/* Categories and Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.category && (
                        <Badge className="text-xs">
                          {post.category.name}
                        </Badge>
                      )}
                      {post.tags?.slice(0, 3).map((tag: any) => (
                        <Badge key={tag.id} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    
                    <ReadMoreButton 
                      href={`/blog/${post.slug}`}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      Read More
                    </ReadMoreButton>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>

    {/* Fixed Marble CMS Attribution Footer */}
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-3 px-4 z-50">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          Powered by{' '}
          <a 
            href="https://marblecms.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            Marble CMS
          </a>
        </p>
      </div>
    </footer>
    </div>
  );
}
