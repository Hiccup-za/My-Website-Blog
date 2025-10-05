import type { Metadata } from 'next';
import type { MarblePost } from './marble-types';

/**
 * Generate SEO metadata for blog posts
 */
export function generateBlogPostMetadata(post: MarblePost): Metadata {
  const baseUrl = 'https://christopherzeuch.com';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt || 'Read more about this topic',
    keywords: post.seo?.keywords || [],
    authors: [{ name: post.author.name }],
    creator: post.author.name,
    publisher: 'Christopher Zeuch',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || 'Read more about this topic',
      type: 'article',
      url: postUrl,
      siteName: 'Christopher Zeuch',
      locale: 'en_US',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: post.featuredImage ? [
        {
          url: post.featuredImage.url,
          width: post.featuredImage.width,
          height: post.featuredImage.height,
          alt: post.featuredImage.alt,
        }
      ] : [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Christopher Zeuch - QA Engineer & Developer',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || 'Read more about this topic',
      creator: '@Hiccup_za',
      images: post.featuredImage ? [post.featuredImage.url] : [`${baseUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

/**
 * Generate structured data for blog posts
 */
export function generateBlogPostStructuredData(post: MarblePost) {
  const baseUrl = 'https://christopherzeuch.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || 'Read more about this topic',
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Christopher Zeuch',
      url: baseUrl,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    url: `${baseUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    image: post.featuredImage ? {
      '@type': 'ImageObject',
      url: post.featuredImage.url,
      width: post.featuredImage.width,
      height: post.featuredImage.height,
    } : {
      '@type': 'ImageObject',
      url: `${baseUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    keywords: post.tags.map(tag => tag.name).join(', '),
    articleSection: post.categories.map(category => category.name).join(', '),
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(post: MarblePost) {
  const baseUrl = 'https://christopherzeuch.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${baseUrl}/blog/${post.slug}`,
      },
    ],
  };
}

/**
 * Generate blog listing page metadata
 */
export function generateBlogListingMetadata(): Metadata {
  return {
    title: 'Blog - Christopher Zeuch',
    description: 'Thoughts on QA Engineering, Test Automation, and Software Development by Christopher Zeuch',
    keywords: [
      'blog',
      'QA Engineering',
      'Test Automation',
      'Software Development',
      'Christopher Zeuch',
      'Quality Assurance',
      'Testing',
      'Engineering',
    ],
    openGraph: {
      title: 'Blog - Christopher Zeuch',
      description: 'Thoughts on QA Engineering, Test Automation, and Software Development',
      type: 'website',
      url: 'https://christopherzeuch.com/blog',
      siteName: 'Christopher Zeuch',
      locale: 'en_US',
      images: [
        {
          url: 'https://christopherzeuch.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Christopher Zeuch - QA Engineer & Developer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog - Christopher Zeuch',
      description: 'Thoughts on QA Engineering, Test Automation, and Software Development',
      creator: '@Hiccup_za',
      images: ['https://christopherzeuch.com/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://christopherzeuch.com/blog',
    },
  };
}
