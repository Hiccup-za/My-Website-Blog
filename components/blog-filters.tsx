"use client";

import { Button } from '@/components/ui/button';
import { Package, Tag as TagIcon, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BlogFiltersProps {
  categories: any[];
  tags: any[];
}

export default function BlogFilters({ categories, tags }: BlogFiltersProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isCategoriesOpen || isTagsOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.relative')) {
          setIsCategoriesOpen(false);
          setIsTagsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCategoriesOpen, isTagsOpen]);

  return (
    <div className="flex flex-wrap gap-3 mb-12 justify-center">
      {/* Categories Dropdown */}
      <div className="relative">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
        >
          <Package className="h-4 w-4" />
          Categories
          <ChevronDown className="h-4 w-4" />
        </Button>
        {isCategoriesOpen && (
          <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10 min-w-[200px]">
            {categories.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground">No categories available</div>
            ) : (
              <div className="py-1">
                {categories.map((category: any) => (
                  <button
                    key={category.id}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                    onClick={() => {
                      // TODO: Implement category filtering
                      setIsCategoriesOpen(false);
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tags Dropdown */}
      <div className="relative">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => setIsTagsOpen(!isTagsOpen)}
        >
          <TagIcon className="h-4 w-4" />
          Tags
          <ChevronDown className="h-4 w-4" />
        </Button>
        {isTagsOpen && (
          <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10 min-w-[200px]">
            {tags.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground">No tags available</div>
            ) : (
              <div className="py-1">
                {tags.map((tag: any) => (
                  <button
                    key={tag.id}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                    onClick={() => {
                      // TODO: Implement tag filtering
                      setIsTagsOpen(false);
                    }}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
