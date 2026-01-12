import { PrismaClient } from '../src/generated/prisma/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: true,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data (optional, but good for idempotent seeds)
  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();

  console.log('Deleted existing data...');

  // --- Skills ---
  const skillsData = [
    // Frontend
    { name: 'React', category: 'Frontend', icon: 'Atom', proficiency: 95 },
    { name: 'Next.js', category: 'Frontend', icon: 'Code2', proficiency: 90 },
    {
      name: 'TypeScript',
      category: 'Frontend',
      icon: 'FileCode2',
      proficiency: 85,
    },
    {
      name: 'Tailwind CSS',
      category: 'Frontend',
      icon: 'Palette',
      proficiency: 95,
    },
    {
      name: 'Framer Motion',
      category: 'Frontend',
      icon: 'Move',
      proficiency: 80,
    },

    // Backend
    { name: 'Node.js', category: 'Backend', icon: 'Server', proficiency: 80 },
    {
      name: 'PostgreSQL',
      category: 'Backend',
      icon: 'Database',
      proficiency: 75,
    },
    { name: 'Prisma', category: 'Backend', icon: 'Database', proficiency: 85 },
    { name: 'Express', category: 'Backend', icon: 'Server', proficiency: 80 },

    // Design & Tools
    { name: 'Figma', category: 'Design', icon: 'PenTool', proficiency: 70 },
    { name: 'Git', category: 'Tools', icon: 'GitBranch', proficiency: 90 },
    { name: 'Docker', category: 'Tools', icon: 'Container', proficiency: 60 },
  ];

  await prisma.skill.createMany({ data: skillsData });
  console.log('Seeded Skills...');

  // --- Experience ---
  const experienceData = [
    {
      company: 'TechCorp Solutions',
      position: 'Senior Frontend Developer',
      startDate: new Date('2023-01-01'),
      endDate: null, // Current
      description:
        'Leading the frontend team in building scalable SaaS applications. Implemented a new design system using Tailwind and React, improving development speed by 40%.',
      location: 'San Francisco, CA (Remote)',
    },
    {
      company: 'Creative Agency X',
      position: 'Full Stack Developer',
      startDate: new Date('2021-06-01'),
      endDate: new Date('2022-12-31'),
      description:
        'Developed custom e-commerce solutions for various clients. Integrated Stripe payments and optimized site performance for SEO.',
      location: 'New York, NY',
    },
    {
      company: 'Startup Inc.',
      position: 'Junior Web Developer',
      startDate: new Date('2020-01-01'),
      endDate: new Date('2021-05-31'),
      description:
        'Collaborated with the design team to implement responsive landing pages. Maintained legacy codebases and fixed UI bugs.',
      location: 'Austin, TX',
    },
  ];

  await prisma.experience.createMany({ data: experienceData });
  console.log('Seeded Experience...');

  // --- Projects ---
  const projectsData = [
    {
      title: 'E-Commerce Platform',
      slug: 'e-commerce-platform',
      description:
        'A full-stack e-commerce solution with real-time inventory and secure payments.',
      content: `# E-Commerce Platform\n\nBuilt a modern shopping experience using Next.js 14 and Stripe.\n\n## Features\n- Real-time stock updates\n- Admin dashboard\n- Secure checkout flow`,
      imageUrl:
        'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2664&auto=format&fit=crop',
      demoUrl: 'https://example.com',
      repoUrl: 'https://github.com/example/ecommerce',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
      featured: true,
    },
    {
      title: 'AI Analytics Dashboard',
      slug: 'ai-analytics-dashboard',
      description:
        'Real-time data visualization platform powered by AI insights.',
      content: `# AI Analytics\n\nVisualizing complex datasets with Recharts and OpenAI integration.\n\n## Tech Stack\n- Next.js\n- Python Backend\n- WebSocket`,
      imageUrl:
        'https://images.unsplash.com/photo-1551288049-b1f7c5e8c0f5?q=80&w=2670&auto=format&fit=crop',
      demoUrl: 'https://example.com',
      repoUrl: 'https://github.com/example/ai-dashboard',
      tags: ['React', 'D3.js', 'Python', 'AI'],
      featured: true,
    },
    {
      title: 'Portfolio Design System',
      slug: 'portfolio-design-system',
      description:
        'A comprehensive UI kit for personal portfolios with dark mode support.',
      content: `# Design System\n\nReusable component library built with Tailwind CSS.\n\n## Components\n- Buttons\n- Cards\n- Inputs\n- Modals`,
      imageUrl:
        'https://images.unsplash.com/photo-1555066931-bf19c0fd1085?q=80&w=2674&auto=format&fit=crop',
      demoUrl: 'https://example.com',
      repoUrl: 'https://github.com/example/design-system',
      tags: ['Storybook', 'Tailwind', 'React'],
      featured: false,
    },
  ];

  await prisma.project.createMany({ data: projectsData });
  console.log('Seeded Projects...');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
