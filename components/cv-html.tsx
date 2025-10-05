"use client";

import { buildCVDataFromWebsite, CVData } from '@/lib/dynamic-data-extractor';

interface CVHTMLProps {
  data?: CVData;
}

export const CVHTML = ({ data = buildCVDataFromWebsite() }: CVHTMLProps) => {
  return (
    <div className="cv-container">
      <style jsx>{`
        .cv-container {
          font-family: 'Helvetica', 'Arial', sans-serif;
          font-size: 11px;
          line-height: 1.5;
          color: #000000;
          background-color: #ffffff;
          max-width: 210mm;
          margin: 0 auto;
          padding: 40px;
          min-height: 297mm;
        }
        
        .header {
          margin-bottom: 30px;
          text-align: center;
          padding-bottom: 20px;
        }
        
        .name {
          font-size: 28px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 8px;
        }
        
        .title {
          font-size: 16px;
          color: #000000;
          margin-bottom: 8px;
          font-weight: bold;
        }
        
        .location {
          font-size: 10px;
          color: #6b7280;
          margin-bottom: 0;
        }
        
        .section {
          margin-bottom: 25px;
        }
        
        .section-title {
          font-size: 16px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 12px;
          border-bottom: 2px solid #3b82f6;
          padding-bottom: 5px;
        }
        
        .summary {
          font-size: 11px;
          color: #000000;
          line-height: 1.6;
          text-align: left;
        }
        
        .summary p {
          margin-bottom: 8px;
          margin: 0 0 8px 0;
        }
        
        .experience-item {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .job-title {
          font-size: 13px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 2px;
        }
        
        .company {
          font-size: 12px;
          color: #000000;
          font-weight: bold;
          margin-bottom: 2px;
        }
        
        .period {
          font-size: 9px;
          color: #6b7280;
          font-style: italic;
          margin-bottom: 8px;
        }
        
        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 8px;
        }
        
        .tech-tag {
          font-size: 7px;
          color: #374151;
          background-color: #f3f4f6;
          padding: 2px 6px;
          border-radius: 3px;
        }
        
        .description {
          font-size: 10px;
          color: #000000;
          line-height: 1.5;
          margin-bottom: 10px;
        }
        
        .description p {
          margin-bottom: 8px;
          margin: 0 0 8px 0;
        }
        
        .responsibilities-title {
          font-size: 10px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 5px;
        }
        
        .responsibility-list {
          font-size: 9px;
          color: #000000;
          margin-left: 12px;
          margin-bottom: 2px;
        }
        
        .achievements-title {
          font-size: 10px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 5px;
        }
        
        .achievement-list {
          font-size: 9px;
          color: #000000;
          margin-left: 12px;
          margin-bottom: 2px;
        }
        
        .project-item {
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .project-title {
          font-size: 12px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 5px;
        }
        
        .project-description {
          font-size: 10px;
          color: #000000;
          line-height: 1.4;
        }
        
        .links-container {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        
        .link-item {
          font-size: 10px;
          color: #000000;
          line-height: 1.5;
          margin-bottom: 3px;
        }
        
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        
        .skill-tag {
          font-size: 9px;
          color: #000000;
          background-color: #f3f4f6;
          padding: 4px 8px;
          border-radius: 4px;
          margin-bottom: 4px;
        }
      `}</style>
      
      {/* Header */}
      <div className="header">
        <h1 className="name">{data.personalInfo.name}</h1>
        <h2 className="title">{data.personalInfo.title}</h2>
        <p className="location">{data.personalInfo.location}</p>
      </div>

      {/* Summary */}
      <div className="section">
        <h3 className="section-title">Professional Summary</h3>
        <div className="summary">
          {data.summary.split('\n\n').map((paragraph: string, idx: number) => (
            <p key={idx}>{paragraph.trim()}</p>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="section">
        <h3 className="section-title">Professional Experience</h3>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="experience-item">
            <div className="job-title">{exp.title}</div>
            <div className="company">{exp.company}</div>
            <div className="period">{exp.location} • {exp.period}</div>
            
            <div className="tech-stack">
              {exp.tech.map((tech: string, idx: number) => (
                <span key={idx} className="tech-tag">{tech}</span>
              ))}
            </div>
            
            <div className="description">
              {exp.description.split('\n\n').map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph.trim()}</p>
              ))}
            </div>
            
            <div>
              <div className="responsibilities-title">Key Responsibilities:</div>
              {exp.responsibilities.map((resp: string, idx: number) => (
                <div key={idx} className="responsibility-list">• {resp}</div>
              ))}
            </div>
            
            <div>
              <div className="achievements-title">Key Achievements:</div>
              {exp.achievements.map((ach: string, idx: number) => (
                <div key={idx} className="achievement-list">• {ach}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="section">
        <h3 className="section-title">Featured Projects</h3>
        {data.projects.map((project: any, index: number) => (
          <div key={index} className="project-item">
            <div className="project-title">{project.title}</div>
            <div className="project-description">{project.description}</div>
          </div>
        ))}
      </div>

      {/* Links */}
      <div className="section">
        <h3 className="section-title">Links</h3>
        <div className="links-container">
          {data.links.map((link: string, index: number) => (
            <div key={index} className="link-item">• {link}</div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="section">
        <h3 className="section-title">Technical Skills</h3>
        <div className="skills-container">
          {data.skills.map((skill: string, index: number) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
