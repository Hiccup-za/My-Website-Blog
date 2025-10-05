"use client";

import { buildCVDataFromWebsite } from "@/lib/dynamic-data-extractor";
import { Button } from "@/components/ui/button";
import { Download, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CVHTML } from "@/components/cv-html";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

export default function CVPage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Christopher_Zeuch_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation currentPage="cv" />

      <div className="flex-1">
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
              Download <span className="text-primary">CV</span>
            </h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
          
          {/* Mobile Layout - Stacked */}
          <div className="md:hidden">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold">
                Download <span className="text-primary">CV</span>
              </h1>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              Create, preview and download your professional CV in PDF format.<br />
              All content is pulled from your website.
            </p>
          </div>
        </div>
      </section>

      {/* CV Export Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-16">
            <Button 
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="w-full sm:w-auto"
              size="lg"
            >
              <Download className="mr-2 h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
          
          {/* Live CV Preview */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden max-w-4xl mx-auto">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">CV Preview</span>
                </div>
              </div>
              <div className="max-h-[800px] overflow-y-auto">
                <CVHTML data={buildCVDataFromWebsite()} />
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      <Footer />

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">CV Preview</h3>
              <div className="flex gap-2">
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isGenerating}
                  size="sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {isGenerating ? 'Generating...' : 'Download PDF'}
                </Button>
                <Button
                  onClick={handleClosePreview}
                  variant="outline"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              <div className="bg-white rounded border shadow-sm overflow-hidden">
                <CVHTML data={buildCVDataFromWebsite()} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
