import "./globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Christopher Zeuch - Lead QA Engineer & Developer",
    template: "%s | Christopher Zeuch"
  },
  description: "Lead QA Engineer, Developer, and founder of OmniLens. Specializing in test automation, quality assurance, and building robust testing frameworks. Based in South Africa.",
  keywords: [
    "QA Engineer",
    "Test Automation",
    "Quality Assurance",
    "Developer",
    "OmniLens",
    "GitHub Actions",
    "Cypress",
    "Selenium",
    "TypeScript",
    "Python",
    "South Africa"
  ],
  authors: [{ name: "Christopher Zeuch" }],
  creator: "Christopher Zeuch",
  publisher: "Christopher Zeuch",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://christopherzeuch.com",
    title: "Christopher Zeuch - Lead QA Engineer & Developer",
    description: "QA Engineer, Developer, and founder of OmniLens. Specializing in test automation, quality assurance, and building robust testing frameworks.",
    siteName: "Christopher Zeuch",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Christopher Zeuch - QA Engineer & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Zeuch - Lead QA Engineer & Developer",
    description: "Lead QA Engineer, Developer, and founder of OmniLens. Specializing in test automation and quality assurance.",
    creator: "@Hiccup_za",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://christopherzeuch.com"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
