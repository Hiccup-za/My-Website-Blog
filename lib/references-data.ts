export interface Reference {
  id: string;
  title: string;
  company: string;
  description?: string[];
  highlights?: string[];
}

export const references: Reference[] = [
  {
    id: "ceo-precium",
    title: "Chief Executive Officer",
    company: "Precium",
    description: []
  },
  {
    id: "cpo-precium",
    title: "Chief Product Officer",
    company: "Precium",
    description: []
  },
  {
    id: "cto-precium",
    title: "Chief Technology Officer",
    company: "Precium",
    description: []
  },
  {
    id: "head-eng-precium",
    title: "Head of Engineering",
    company: "Precium",
    description: []
  },
  {
    id: "team-lead-precium",
    title: "Team Lead",
    company: "Precium",
    description: []
  },
  {
    id: "team-member-precium",
    title: "Team Member",
    company: "Precium",
    description: []
  },
  {
    id: "team-member-kohort",
    title: "Team Member",
    company: "Kohort",
    description: [
      "I had the pleasure of working with Christopher Zeuch at Kohort, where he excelled as a UA tester. Christopher's enthusiasm for getting involved in all projects is truly impressive. He consistently demonstrated a keen desire to learn new skills and venturing into coding and automation, showcasing his commitment to personal and professional growth.",
      "Christopher's eye for detail is exceptional. His meticulous nature ensures that his tasks are executed efficiently, enhancing the quality of our projects. Additionally, his documentation skills are excellent, producing clear and comprehensive documentation.",
      "What sets Christopher apart is his friendly disposition. He fosters a positive and collaborative work environment, making him a pleasure to work with. His approachable nature and willingness to support his colleagues is incomparable.",
      "In summary, Christopher Zeuch is a dedicated professional with a rare blend of technical skills, attention to detail, and a collaborative spirit. I highly recommend him for any opportunity he pursues."
    ],
    highlights: [
      "Exceptional attention to detail",
      "Strong documentation skills", 
      "Enthusiastic learner and self-improver",
      "Collaborative team player",
      "Excellent communication skills"
    ]
  },
  {
    id: "pm-delta",
    title: "Product Manager",
    company: "The Delta",
    description: []
  },
  {
    id: "vp-eng-entersekt",
    title: "VP of Engineering",
    company: "Entersekt",
    description: []
  },
];
