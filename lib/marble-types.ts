// Marble CMS TypeScript Type Definitions
// Based on Marble CMS API structure

export interface MarblePost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  publishedAt: string;
  updatedAt: string;
  status: 'published' | 'draft' | 'archived';
  featuredImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  author: MarbleAuthor;
  categories: MarbleCategory[];
  tags: MarbleTag[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface MarblePostList {
  posts: MarblePost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MarbleAuthor {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url: string;
    alt: string;
  };
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface MarbleAuthorList {
  authors: MarbleAuthor[];
}

export interface MarbleCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface MarbleCategoryList {
  categories: MarbleCategory[];
}

export interface MarbleTag {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface MarbleTagList {
  tags: MarbleTag[];
}

// API Response wrapper types
export interface MarbleApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Error handling types
export interface MarbleError {
  message: string;
  code?: string;
  status?: number;
}

// Query parameters for filtering posts
export interface MarblePostQuery {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  author?: string;
  status?: 'published' | 'draft' | 'archived';
  search?: string;
  sortBy?: 'publishedAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}
