"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { experiences } from "@/lib/experience-data";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);


  // Initialize experience refs array
  useEffect(() => {
    experienceRefs.current = experienceRefs.current.slice(0, experiences.length);
  }, []);

  // Handle URL hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#experience-')) {
        const index = parseInt(hash.replace('#experience-', ''));
        if (index >= 0 && index < experiences.length) {
          setActiveExperience(index);
          // Scroll to the experience after a short delay to ensure the page is loaded
          setTimeout(() => {
            scrollToExperience(index);
          }, 100);
        }
      }
    };

    // Check for hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Handle scroll detection and sticky navigation
  useEffect(() => {
    let originalNavTop = 0;
    let isInitialized = false;

    const handleScroll = () => {
      if (!navRef.current) return;

      // Store the original position of the navigation on first load
      if (!isInitialized) {
        const navRect = navRef.current.getBoundingClientRect();
        originalNavTop = navRect.top + window.scrollY;
        isInitialized = true;
      }

      const currentScrollY = window.scrollY;
      
      // Check if we've scrolled past the original navigation position
      if (currentScrollY >= originalNavTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Intersection Observer for active experience detection
    const observer = new IntersectionObserver(
      (entries) => {
        // Don't update active experience if we're currently scrolling programmatically
        if (isScrollingRef.current) return;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = experienceRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActiveExperience(index);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-80px 0px -20% 0px'
      }
    );

    // Observe all experience cards
    experienceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollToExperience = (index: number) => {
    const element = document.getElementById(`experience-${index}`);
    if (element) {
      // Set scrolling state to prevent intersection observer from interfering
      isScrollingRef.current = true;
      setActiveExperience(index);
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      const stickyBarHeight = 80; // Approximate height of sticky navigation bar
      const elementPosition = element.offsetTop - stickyBarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Reset scrolling state after scroll completes
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000); // Wait for smooth scroll to complete
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="experience" />

      {/* Header */}
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout - Back button and title in same row */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Work <span className="text-primary">Experience</span>
            </h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
          
          {/* Mobile Layout - Stacked */}
          <div className="md:hidden">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold">
                Work <span className="text-primary">Experience</span>
              </h1>
            </div>
          </div>
          
          {/* Description */}
          <div className="text-center">
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Over 10 years of experience in Quality Assurance engineering and testing,<br />
              with a focus on automation, leadership, and process improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <div 
            ref={navRef}
            className={`flex flex-wrap gap-3 mb-12 justify-center transition-all duration-300 ${
              isSticky 
                ? 'fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-4 shadow-sm' 
                : ''
            }`}
          >
            {isSticky && (
              <div className="hidden md:block">
                <Button variant="ghost" size="sm" asChild className="mr-4">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            )}
            {experiences.map((experience, index) => (
              <Button 
                key={index} 
                variant={activeExperience === index ? "default" : "outline"}
                size="sm"
                onClick={() => scrollToExperience(index)}
                className="transition-all duration-200"
              >
                {experience.company}
              </Button>
            ))}
          </div>
          
          <div className={`space-y-12 ${isSticky ? 'pt-20' : ''}`}>
            {experiences.map((experience, index) => (
              <Card 
                key={index} 
                id={`experience-${index}`} 
                ref={(el) => { experienceRefs.current[index] = el; }}
                className={`hover:shadow-lg transition-all duration-300 ${
                  activeExperience === index 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : ''
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{experience.title}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-primary">{experience.company}</span>
                        <span className="text-muted-foreground">•</span>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {experience.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {experience.period}
                        </div>
                        <Badge variant="outline">{experience.duration}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" asChild>
                        <a href={experience.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Website
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {experience.tech.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <CardDescription className="text-lg mb-6 whitespace-pre-line">
                    {experience.description}
                  </CardDescription>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Responsibilities:</h4>
                    <ul className="space-y-2 list-disc list-inside">
                      {experience.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Key Achievements:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {experience.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-muted-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
