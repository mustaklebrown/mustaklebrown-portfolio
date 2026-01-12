'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { projectSchema, type ProjectFormData } from '@/lib/schemas';

// CREATE
export async function createProject(data: ProjectFormData) {
  try {
    const validatedData = projectSchema.parse(data);

    const project = await prisma.project.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        description: validatedData.description,
        content: validatedData.content,
        imageUrl: validatedData.imageUrl || null,
        demoUrl: validatedData.demoUrl || null,
        repoUrl: validatedData.repoUrl || null,
        tags: validatedData.tags,
        featured: validatedData.featured,
      },
    });

    revalidatePath('/projects');
    revalidatePath('/');

    return { success: true, data: project };
  } catch (error) {
    console.error('Error creating project:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to create project' };
  }
}

// READ ALL
export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: projects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error: 'Failed to fetch projects' };
  }
}

// READ ONE by slug
export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      return { success: false, error: 'Project not found' };
    }

    return { success: true, data: project };
  } catch (error) {
    console.error('Error fetching project:', error);
    return { success: false, error: 'Failed to fetch project' };
  }
}

// READ ONE by id
export async function getProjectById(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return { success: false, error: 'Project not found' };
    }

    return { success: true, data: project };
  } catch (error) {
    console.error('Error fetching project:', error);
    return { success: false, error: 'Failed to fetch project' };
  }
}

// READ FEATURED
export async function getFeaturedProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: projects };
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return { success: false, error: 'Failed to fetch featured projects' };
  }
}

// UPDATE
export async function updateProject(
  id: string,
  data: Partial<ProjectFormData>
) {
  try {
    const validatedData = projectSchema.partial().parse(data);

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...validatedData,
        imageUrl: validatedData.imageUrl || null,
        demoUrl: validatedData.demoUrl || null,
        repoUrl: validatedData.repoUrl || null,
      },
    });

    revalidatePath('/projects');
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath('/');

    return { success: true, data: project };
  } catch (error) {
    console.error('Error updating project:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to update project' };
  }
}

// DELETE
export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath('/projects');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: 'Failed to delete project' };
  }
}

// TOGGLE FEATURED
export async function toggleProjectFeatured(id: string) {
  try {
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      return { success: false, error: 'Project not found' };
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { featured: !project.featured },
    });

    revalidatePath('/projects');
    revalidatePath('/');

    return { success: true, data: updatedProject };
  } catch (error) {
    console.error('Error toggling featured status:', error);
    return { success: false, error: 'Failed to toggle featured status' };
  }
}
