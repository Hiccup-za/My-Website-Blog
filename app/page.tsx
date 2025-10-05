import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

// Custom X (formerly Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="home" />

      {/* Hero Section */}
      <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hi, I'm <span className="text-primary">Chris</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm a Lead QA Engineer, Developer and the founder of OmniLens.<br />
              🇿🇦
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <a href="https://github.com/Hiccup-za" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <a href="https://linkedin.com/in/christopher-zeuch" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <a href="https://x.com/Hiccup_za" target="_blank" rel="noopener noreferrer">
                  <XIcon className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              I'm a hardworking and highly autonomous individual with a very deep passion for Quality Assurance and Engineering.
              I enjoy challenging myself and working in areas in software that I am unfamilair with or have a very deep interest in.
            </p>
            <p className="text-lg text-muted-foreground">
              I've worked for various companies and startups; with products ranging from PoCs and MVPs to large production systems in fintech and financial forecasting.
              My focus has been on automation, leadership and continuous process improvement.
            </p>
            <p className="text-lg text-muted-foreground">
              I'm also the founder of OmniLens, an open source tool for monitoring and optimizing your GitHub Action workflows.
              This is my first step into the world of solo development and I plan on building a lot more tools in the future.
            </p>
            <p className="text-lg text-muted-foreground">
              When I'm not coding or testing, you'll find me exploring new technologies, listening to music, posting on X and gaming.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="pt-4 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
            {/* <Button size="lg" asChild>
              <Link href="/projects">View All</Link>
            </Button> */}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "OmniLens",
                description: "OmniLens provides comprehensive visibility into your GitHub Actions workflow with real-time metrics.",
                link: "https://www.omnilens.xyz",
                githubLink: "https://github.com/OmniLens/OmniLens"
              },
              {
                title: "StealthList", 
                description: "An open-source waitlist management platform built for collecting emails and tracking signups.",
                link: "#",
                githubLink: "https://github.com/Visi0ncore/StealthList"
              },
              {
                title: "My Website",
                description: "The website you're currently on! Built to showcase my projects and experience. Blog coming soon!",
                link: "#",
                githubLink: "https://github.com/Hiccup-za/my-website"
              }
            ].map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {project.link && project.link !== "#" && (
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          View Project
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={project.githubLink || "#"} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-6">Latest Work Experience</h2>
            <Button size="lg" asChild>
              <Link href="/experience">View All</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Lead QA Engineer",
                company: "Precium",
                description: 
                "Led complete testing infrastructure overhaul with runtime performance improvements. "+
                "Enabled seamless test execution & reporting across API & frontend applications.",
                tech: ["Bun", "Cursor", "Cypress", "GitHub Actions", "Postman", "TypeScript", "YAML"],
                period: "2024 - 2025"
              },
              {
                title: "Lead QA Engineer", 
                company: "Kohort",
                description: 
                "Implemented comprehensive QA processes & automated testing framework. "+
                "Built custom Streamlit applications for data generation & environment management.",
                tech: ["Cursor", "GitHub Actions", "Python", "SeleniumBase", "Streamlit", "YAML"],
                period: "2023 - 2024"
              }
            ].map((experience, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {experience.title}
                    <Badge variant="outline" className="text-xs">
                      {experience.period}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {experience.company}
                  </CardDescription>
                  <CardDescription>{experience.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {experience.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/experience#experience-${index}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
        </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground mb-8">
            I'm always interested in new opportunities and exciting projects.<br />
            Let's discuss how we can work together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href="https://linkedin.com/in/christopher-zeuch" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                Connect on LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href="https://x.com/Hiccup_za" target="_blank" rel="noopener noreferrer">
                <XIcon className="mr-2 h-4 w-4" />
                Send a DM
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
