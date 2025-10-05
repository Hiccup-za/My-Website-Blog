// Dynamic data extraction utilities to pull content from actual website components
import { experiences } from '@/lib/experience-data';
import { personalInfo, summary, projects, links, additionalSkills } from '@/lib/cv-data';

// Define the CVData interface
export interface CVData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    email?: string;
    phone?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  summary: string;
  experience: {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    responsibilities: string[];
    achievements: string[];
    tech: string[];
  }[];
  projects: {
    title: string;
    description: string;
    link?: string;
    githubLink?: string;
  }[];
  skills: string[];
  links: string[];
}

// Extract personal info from the main page
export const getPersonalInfo = () => {
  return personalInfo;
};

// Extract summary from the main page
export const getSummary = () => {
  return summary;
};

// Extract experience data dynamically from the experience page
export const getExperienceData = () => {
  return experiences.map(exp => ({
    title: exp.title,
    company: exp.company,
    location: exp.location,
    period: exp.period,
    description: exp.description,
    responsibilities: exp.responsibilities,
    achievements: exp.achievements,
    tech: exp.tech
  }));
};

// Extract projects data from the main page
export const getProjectsData = () => {
  return projects;
};

// Extract links data
export const getLinksData = () => {
  return links;
};

// Extract all skills from experience data
export const getAllSkills = () => {
  const experience = getExperienceData();
  const allTech = experience.flatMap(exp => exp.tech);
  const uniqueSkills = Array.from(new Set(allTech));
  
  return [...uniqueSkills, ...additionalSkills].sort();
};

// Build complete CV data from website components
export const buildCVDataFromWebsite = (): CVData => {
  return {
    personalInfo: getPersonalInfo(),
    summary: getSummary(),
    experience: getExperienceData(),
    projects: getProjectsData(),
    skills: getAllSkills(),
    links: getLinksData()
  };
};
