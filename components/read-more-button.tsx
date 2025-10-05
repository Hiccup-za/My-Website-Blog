"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, ReactNode } from "react";

interface ReadMoreButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  loadingText?: string;
}

export default function ReadMoreButton({ 
  href, 
  children, 
  variant = "outline", 
  size = "sm",
  className,
  loadingText
}: ReadMoreButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Use router.push for programmatic navigation
    router.push(href);
  };

  // Reset loading state when pathname changes (navigation completes)
  useEffect(() => {
    if (isLoading && pathname === href) {
      setIsLoading(false);
    }
  }, [pathname, href, isLoading]);

  return (
    <Button 
      size={size} 
      variant={isLoading ? "outline" : variant}
      className={className}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Spinner size="sm" className="mr-2" />
          <span>{loadingText || "Loading..."}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}
