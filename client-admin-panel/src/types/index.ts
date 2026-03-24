export interface Project {
  id?: string;
  title: string;
  description: string;
  location?: string;
  category?: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Portfolio {
  id?: string;
  title: string;
  description: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  service?: string;
  message: string;
  createdAt?: string;
}

export const PROJECT_CATEGORIES = [
  'Living Room',
  'Bedroom',
  'Kitchen & Dining',
  'Lobby',
  'Cafe',
  'Studio',
  'Office',
  'Other',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];