export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export const experienceData: Experience[] = [
  {
    id: "1",
    role: "Senior Frontend Engineer",
    company: "TechNova Solutions",
    period: "2024 - Present",
    location: "Jakarta, ID",
    highlights: [
      "Led the migration of a legacy React app to Next.js App Router, improving LCP by 40%.",
      "Architected a scalable component library using Tailwind CSS and Radix UI.",
      "Mentored junior developers and established CI/CD best practices.",
    ],
  },
  {
    id: "2",
    role: "Fullstack Developer",
    company: "Creative Studio",
    period: "2022 - 2024",
    location: "Bandung, ID",
    highlights: [
      "Developed custom e-commerce solutions for 10+ clients using Next.js and Stripe.",
      "Built a headless CMS integration that reduced content update time by 60%.",
      "Optimized database queries in PostgreSQL, reducing server response times.",
    ],
  },
  {
    id: "3",
    role: "Junior Web Developer",
    company: "Digital Agency",
    period: "2021 - 2022",
    location: "Nganjuk, ID",
    highlights: [
      "Created responsive landing pages and interactive web experiences.",
      "Collaborated closely with UI/UX designers to implement pixel-perfect designs.",
      "Maintained and updated existing WordPress and React websites.",
    ],
  },
];
