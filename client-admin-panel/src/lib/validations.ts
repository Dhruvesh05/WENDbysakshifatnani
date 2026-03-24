import { Portfolio, Project } from '../types';

export const validateProject = (project: Pick<Project, 'title' | 'description'>): string | null => {
  if (!project.title?.trim()) {
    return 'Project title is required.';
  }

  if (!project.description?.trim()) {
    return 'Project description is required.';
  }

  return null;
};

export const validatePortfolio = (
  portfolio: Pick<Portfolio, 'title' | 'description' | 'images'>,
): string | null => {
  if (!portfolio.title?.trim()) {
    return 'Portfolio title is required.';
  }

  if (!portfolio.description?.trim()) {
    return 'Portfolio description is required.';
  }

  if (!Array.isArray(portfolio.images)) {
    return 'Portfolio images must be a list of URLs.';
  }

  return null;
};