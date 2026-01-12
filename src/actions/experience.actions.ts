'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { experienceSchema, type ExperienceFormData } from '@/lib/schemas';

// CREATE
export async function createExperience(data: ExperienceFormData) {
  try {
    const validatedData = experienceSchema.parse(data);

    const experience = await prisma.experience.create({
      data: {
        company: validatedData.company,
        position: validatedData.position,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate || null,
        description: validatedData.description,
        location: validatedData.location || null,
      },
    });

    revalidatePath('/about');
    revalidatePath('/');

    return { success: true, data: experience };
  } catch (error) {
    console.error('Error creating experience:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to create experience' };
  }
}

// READ ALL
export async function getExperiences() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: 'desc' },
    });
    return { success: true, data: experiences };
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return { success: false, error: 'Failed to fetch experiences' };
  }
}

// READ ONE
export async function getExperienceById(id: string) {
  try {
    const experience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      return { success: false, error: 'Experience not found' };
    }

    return { success: true, data: experience };
  } catch (error) {
    console.error('Error fetching experience:', error);
    return { success: false, error: 'Failed to fetch experience' };
  }
}

// UPDATE
export async function updateExperience(
  id: string,
  data: Partial<ExperienceFormData>
) {
  try {
    const validatedData = experienceSchema.partial().parse(data);

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        ...validatedData,
        endDate: validatedData.endDate || null,
        location: validatedData.location || null,
      },
    });

    revalidatePath('/about');
    revalidatePath('/');

    return { success: true, data: experience };
  } catch (error) {
    console.error('Error updating experience:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to update experience' };
  }
}

// DELETE
export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({
      where: { id },
    });

    revalidatePath('/about');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error deleting experience:', error);
    return { success: false, error: 'Failed to delete experience' };
  }
}
