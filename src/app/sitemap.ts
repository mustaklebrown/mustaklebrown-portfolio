import { MetadataRoute } from 'next';
import prisma from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mustak.dev';

  // Fetch all projects for dynamic routes
  const projects = await prisma.project.findMany({
    select: { slug: true, updatedAt: true },
  });

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt,
  }));

  const routes = ['', '/projects', '/about', '/experience', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new URLSearchParams().get('updatedAt')
        ? new Date()
        : new Date(), // Just a placeholder for lastModified
    })
  );

  return [...routes, ...projectUrls];
}
