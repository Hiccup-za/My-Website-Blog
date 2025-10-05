"use client";

import { Button } from "@/components/ui/button";
import NavigationButton from "@/components/navigation-button";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-bold hover:text-primary transition-colors cursor-pointer">Christopher Zeuch</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <NavigationButton 
              href="/blog"
              size="sm" 
              variant={currentPage === "blog" ? "default" : "outline"}
            >
              Blog
            </NavigationButton>
            <Button 
              size="sm" 
              variant={currentPage === "experience" ? "default" : "outline"}
              asChild
            >
              <Link href="/experience">Work Experience</Link>
            </Button>
            <Button 
              size="sm" 
              variant={currentPage === "references" ? "default" : "outline"}
              asChild
            >
              <Link href="/references">References</Link>
            </Button>
            <Button 
              size="sm" 
              variant={currentPage === "cv" ? "default" : "outline"}
              asChild
            >
              <Link href="/cv">Download CV</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-2">
              <Button 
                size="sm" 
                variant={currentPage === "blog" ? "default" : "outline"}
                asChild
                className="w-full justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/blog">Blog</Link>
              </Button>
              <Button 
                size="sm" 
                variant={currentPage === "experience" ? "default" : "outline"}
                asChild
                className="w-full justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/experience">Work Experience</Link>
              </Button>
              <Button 
                size="sm" 
                variant={currentPage === "references" ? "default" : "outline"}
                asChild
                className="w-full justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/references">References</Link>
              </Button>
              <Button 
                size="sm" 
                variant={currentPage === "cv" ? "default" : "outline"}
                asChild
                className="w-full justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/cv">Download CV</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
