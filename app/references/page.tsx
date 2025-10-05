"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileLock2 } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { references } from "@/lib/references-data";

export default function ReferencesPage() {
  const handleDownloadReferences = () => {
    // This would typically generate and download a PDF of references
    console.log("Download references functionality would be implemented here");
  };

  // Separate references into highlighted (with descriptions) and regular (without descriptions)
  const highlightedReferences = references.filter(ref => ref.description && ref.description.length > 0);
  const regularReferences = references.filter(ref => !ref.description || ref.description.length === 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation currentPage="references" />

      <div className="flex-1">
        {/* Header */}
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
                Professional <span className="text-primary">References</span>
              </h1>
              <div className="w-24"></div> {/* Spacer for centering */}
            </div>
            <div className="text-center">
              <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
                References from colleagues & managers who have worked closely with me.<br />
                Available on request.
              </p>
            </div>
          </div>
        </section>

        {/* Download Button */}
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center">
              <Button 
                asChild
                className="w-full sm:w-auto"
                size="lg"
              >
                <Link href="https://linkedin.com/in/christopher-zeuch" target="_blank" rel="noopener noreferrer">
                  <FileLock2 className="mr-2 h-4 w-4" />
                  Request References via LinkedIn
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Highlighted References Section */}
        {highlightedReferences.length > 0 && (
          <section className="pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Featured <span className="text-primary">References</span>
              </h2>
              
              <div className="space-y-8">
                {highlightedReferences.map((reference, index) => (
                  <Card key={reference.id} className="max-w-4xl mx-auto">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-primary">
                        {reference.title}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {reference.company}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Highlights Section */}
                      {reference.highlights && reference.highlights.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-primary mb-3">Key Highlights</h4>
                          <div className="flex flex-wrap gap-2">
                            {reference.highlights.map((highlight, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Description Section */}
                      <div className="text-muted-foreground leading-relaxed space-y-4">
                        {reference.description?.map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex} className="text-justify">
                            {paragraphIndex === 0 ? `"${paragraph}` : paragraph}
                            {paragraphIndex === (reference.description?.length || 0) - 1 ? '"' : ''}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular References Section */}
        {regularReferences.length > 0 && (
          <section className="pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">
                Additional <span className="text-primary">References</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularReferences.map((reference) => (
                  <Card key={reference.id} className="h-full">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-primary">
                        {reference.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {reference.company}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* No content - clean minimal card */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
