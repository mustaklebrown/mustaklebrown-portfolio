'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { skillSchema, type SkillFormData } from '@/lib/schemas';

// CREATE
export async function createSkill(data: SkillFormData) {
  try {
    const validatedData = skillSchema.parse(data);

    const skill = await prisma.skill.create({
      data: {
        name: validatedData.name,
        category: validatedData.category,
        icon: validatedData.icon || null,
        proficiency: validatedData.proficiency || null,
      },
    });

    revalidatePath('/about');
    revalidatePath('/');

    return { success: true, data: skill };
  } catch (error) {
    console.error('Error creating skill:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to create skill' };
  }
}

// READ ALL
export async function getSkills() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { category: 'asc' },
    });
    return { success: true, data: skills };
  } catch (error) {
    console.error('Error fetching skills:', error);
    return { success: false, error: 'Failed to fetch skills' };
  }
}

// READ BY CATEGORY
export async function getSkillsByCategory(category: string) {
  try {
    const skills = await prisma.skill.findMany({
      where: { category },
      orderBy: { name: 'asc' },
    });
    return { success: true, data: skills };
  } catch (error) {
    console.error('Error fetching skills by category:', error);
    return { success: false, error: 'Failed to fetch skills' };
  }
}

// READ ONE
export async function getSkillById(id: string) {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return { success: false, error: 'Skill not found' };
    }

    return { success: true, data: skill };
  } catch (error) {
    console.error('Error fetching skill:', error);
    return { success: false, error: 'Failed to fetch skill' };
  }
}

// UPDATE
export async function updateSkill(id: string, data: Partial<SkillFormData>) {
  try {
    const validatedData = skillSchema.partial().parse(data);

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        ...validatedData,
        icon: validatedData.icon || null,
        proficiency: validatedData.proficiency || null,
      },
    });

    revalidatePath('/about');
    revalidatePath('/');

    return { success: true, data: skill };
  } catch (error) {
    console.error('Error updating skill:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to update skill' };
  }
}

// DELETE
export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({
      where: { id },
    });

    revalidatePath('/about');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error deleting skill:', error);
    return { success: false, error: 'Failed to delete skill' };
  }
}

// GET ALL CATEGORIES
export async function getSkillCategories() {
  try {
    const skills = await prisma.skill.findMany({
      select: { category: true },
      distinct: ['category'],
    });
    return { success: true, data: skills.map((s) => s.category) };
  } catch (error) {
    console.error('Error fetching skill categories:', error);
    return { success: false, error: 'Failed to fetch categories' };
  }
}
