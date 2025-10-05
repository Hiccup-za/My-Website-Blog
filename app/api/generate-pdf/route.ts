import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium';
import { buildCVDataFromWebsite } from '@/lib/dynamic-data-extractor';

export async function POST(request: NextRequest) {
  try {
    // Use different configuration for local vs production
    const isProduction = process.env.NODE_ENV === 'production';
    
    const browser = await puppeteer.launch({
      args: isProduction ? chromium.args : [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ],
      executablePath: isProduction ? await chromium.executablePath() : undefined,
      headless: true,
    });
    
    const page = await browser.newPage();
    
    // Set viewport and timeout for serverless environment
    await page.setViewport({ width: 1200, height: 800 });
    page.setDefaultTimeout(30000);
    
    // Get CV data
    const cvData = buildCVDataFromWebsite();
    
    // Create HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Christopher Zeuch CV</title>
          <style>
            body {
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
          </style>
        </head>
        <body>
          <!-- Header -->
          <div class="header">
            <h1 class="name">${cvData.personalInfo.name}</h1>
            <h2 class="title">${cvData.personalInfo.title}</h2>
            <p class="location">${cvData.personalInfo.location}</p>
          </div>

          <!-- Summary -->
          <div class="section">
            <h3 class="section-title">Professional Summary</h3>
            <div class="summary">
              ${cvData.summary.split('\n\n').map(paragraph => `<p>${paragraph.trim()}</p>`).join('')}
            </div>
          </div>

          <!-- Experience -->
          <div class="section">
            <h3 class="section-title">Professional Experience</h3>
            ${cvData.experience.map(exp => `
              <div class="experience-item">
                <div class="job-title">${exp.title}</div>
                <div class="company">${exp.company}</div>
                <div class="period">${exp.location} • ${exp.period}</div>
                
                <div class="tech-stack">
                  ${exp.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                
                <div class="description">
                  ${exp.description.split('\n\n').map(paragraph => `<p>${paragraph.trim()}</p>`).join('')}
                </div>
                
                <div>
                  <div class="responsibilities-title">Key Responsibilities:</div>
                  ${exp.responsibilities.map(resp => `<div class="responsibility-list">• ${resp}</div>`).join('')}
                </div>
                
                        <div>
                          <div class="achievements-title">Key Achievements:</div>
                          ${exp.achievements.map(ach => `<div class="achievement-list">• ${ach}</div>`).join('')}
                        </div>
              </div>
            `).join('')}
          </div>

          <!-- Projects -->
          <div class="section">
            <h3 class="section-title">Featured Projects</h3>
            ${cvData.projects.map(project => `
              <div class="project-item">
                <div class="project-title">${project.title}</div>
                <div class="project-description">${project.description}</div>
              </div>
            `).join('')}
          </div>

          <!-- Links -->
          <div class="section">
            <h3 class="section-title">Links</h3>
            <div class="links-container">
              ${cvData.links.map(link => `<div class="link-item">• ${link}</div>`).join('')}
            </div>
          </div>

          <!-- Skills -->
          <div class="section">
            <h3 class="section-title">Technical Skills</h3>
            <div class="skills-container">
              ${cvData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </div>
        </body>
      </html>
    `;
    
    await page.setContent(htmlContent);
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });
    
    await browser.close();
    
    return new NextResponse(pdf as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Christopher_Zeuch_CV.pdf"'
      }
    });
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json({ 
      error: 'Failed to generate PDF', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
