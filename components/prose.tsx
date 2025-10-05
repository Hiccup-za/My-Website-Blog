import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface ProseProps extends HTMLAttributes<HTMLElement> {
  as?: 'article' | 'div' | 'section';
  html?: string;
  children?: React.ReactNode;
}

export function Prose({ 
  as: Component = 'article', 
  html, 
  children, 
  className, 
  ...props 
}: ProseProps) {
  return (
    <Component
      className={cn(
        // Base prose styling with dark theme support
        'prose prose-lg max-w-none',
        // Dark theme colors
        'prose-headings:text-foreground prose-headings:font-bold',
        'prose-p:text-muted-foreground prose-p:leading-relaxed',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-foreground prose-strong:font-semibold',
        'prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm',
        'prose-pre:bg-muted prose-pre:border prose-pre:border-border',
        'prose-blockquote:border-l-primary prose-blockquote:bg-muted prose-blockquote:pl-6 prose-blockquote:py-2',
        'prose-ul:text-muted-foreground prose-ol:text-muted-foreground',
        'prose-li:text-muted-foreground',
        'prose-img:rounded-lg prose-img:border prose-img:border-border',
        'prose-table:text-muted-foreground prose-th:text-foreground prose-th:font-semibold',
        'prose-hr:border-border',
        // Custom spacing and typography
        'prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8',
        'prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6',
        'prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5',
        'prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4',
        'prose-p:mb-4',
        'prose-ul:mb-4 prose-ol:mb-4',
        'prose-li:mb-1',
        className
      )}
      {...props}
    >
      {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : children}
    </Component>
  );
}

// Specialized prose variants for different content types
export function BlogProse({ html, className, ...props }: Omit<ProseProps, 'as'>) {
  return (
    <Prose
      as="article"
      html={html}
      className={cn(
        // Blog-specific styling
        'prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8',
        'prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-6 prose-h2:mt-8',
        'prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-6',
        'prose-p:text-base prose-p:leading-7',
        'prose-img:shadow-lg',
        className
      )}
      {...props}
    />
  );
}

export function CompactProse({ html, className, ...props }: Omit<ProseProps, 'as'>) {
  return (
    <Prose
      as="div"
      html={html}
      className={cn(
        // Compact styling for previews and excerpts
        'prose-sm',
        'prose-h1:text-xl prose-h1:mb-3',
        'prose-h2:text-lg prose-h2:mb-2',
        'prose-h3:text-base prose-h3:mb-2',
        'prose-p:text-sm prose-p:mb-2',
        'prose-p:line-clamp-3', // Limit to 3 lines for previews
        className
      )}
      {...props}
    />
  );
}
