# Christopher Zeuch - Personal Website

A modern personal website showcasing my work as a Lead QA Engineer, Developer, and founder of OmniLens.  
Built with Next.js and featuring a clean, professional design with CV export functionality that is easy to update and ready to deploy.

## 🚀 Getting Started

1. Install dependencies:
```bash
bun install
```

2. Run the development server:
```bash
bun run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project Structure

```
├── app/
│   ├── page.tsx              # Main homepage with all sections
│   ├── experience/           # Work experience page
│   ├── cv/                  # CV export page with preview and download
│   ├── api/generate-pdf/     # PDF generation API endpoint
│   ├── layout.tsx            # Root layout with metadata
│   ├── sitemap.ts            # SEO sitemap
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # Reusable UI components (Button, Card, Badge)
│   └── cv-html.tsx           # HTML CV component for preview
├── lib/
│   ├── utils.ts              # Utility functions
│   ├── dynamic-data-extractor.ts # Dynamic CV data extraction
│   ├── experience-data.ts    # Centralized experience data
│   └── cv-data.ts            # Centralized CV data
└── public/                   # Static assets
```

## Content Sections

- 👨‍💻 **About Me** - Personal background and introduction
- 💼 **Work Experience** - Professional experience showcase
- 🧠 **Featured Projects** - Portfolio of key projects
- 📞 **Contact Information** - Social links and contact details
- 💾 **CV Export** - Downloadable PDF CV with live preview


## 🎨 Customization

- **About Me**: Update personal information in `app/page.tsx`
- **Work Experience**: Modify experience entries in `lib/experience-data.ts`
- **Featured Projects**: Add/update projects in `lib/cv-data.ts`
- **Contact Information**: Update social links and contact details in `lib/cv-data.ts`
- **CV Content**: Automatically synced from website data via `lib/dynamic-data-extractor.ts`
- **CV Styling**: Customize in `components/cv-html.tsx` and `app/api/generate-pdf/route.ts`
- **Website Styling**: Modify `app/globals.css` and `tailwind.config.ts`
- **UI Components**: Add new components in `components/ui/` directory

## 🧰 Tech Stack

- **Deployment**: Vercel
- **Framework**: Next.js 15
- **Icons**: Lucide React
- **Language**: TypeScript
- **Package Manager**: Bun
- **PDF Generation**: Puppeteer
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom components
- **Features**: Modern dark theme, fully responsive design, SEO optimized, Vercel Analytics ready

## 🤝 Contributing

We welcome contributions!  
Whether it's bug fixes, feature improvements, or documentation updates, we're open to contributors who want to help make this project better.

## 🔑 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
