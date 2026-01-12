// Re-export all actions for convenient imports

// Project Actions
export {
  createProject,
  getProjects,
  getProjectBySlug,
  getProjectById,
  getFeaturedProjects,
  updateProject,
  deleteProject,
  toggleProjectFeatured,
} from './project.actions';

// Experience Actions
export {
  createExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
} from './experience.actions';

// Skill Actions
export {
  createSkill,
  getSkills,
  getSkillsByCategory,
  getSkillById,
  updateSkill,
  deleteSkill,
  getSkillCategories,
} from './skill.actions';

// Schemas & Types (Moved to a separate file to avoid "use server" restrictions)
export * from '@/lib/schemas';
