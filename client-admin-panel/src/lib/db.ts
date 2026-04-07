import { ContactMessage, Portfolio, Project } from '../types';
import { getSupabaseServerClient, validateSupabaseEnv } from './supabase';

const MAX_LIST_LIMIT = 100;

type ProjectRow = {
  id: string;
  title: string;
  description: string;
  location: string | null;
  category: string | null;
  images: unknown;
  created_at: string;
  updated_at: string;
};

type PortfolioRow = {
  id: string;
  title: string;
  description: string;
  images: unknown;
  created_at: string;
  updated_at: string;
};

type ContactRow = {
  id: string;
  name: string;
  email: string;
  location: string | null;
  service: string | null;
  message: string;
  created_at: string;
};

const sanitizeLimit = (limit?: number) => {
  if (!Number.isFinite(limit)) {
    return 20;
  }

  return Math.min(Math.max(Math.trunc(limit as number), 1), MAX_LIST_LIMIT);
};

const sanitizeSkip = (skip?: number) => {
  if (!Number.isFinite(skip)) {
    return 0;
  }

  return Math.max(Math.trunc(skip as number), 0);
};

const asStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
};

const mapProjectRow = (row: ProjectRow): Project => ({
  id: row.id,
  title: row.title,
  description: row.description,
  location: row.location ?? '',
  category: row.category ?? '',
  images: asStringArray(row.images),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapPortfolioRow = (row: PortfolioRow): Portfolio => ({
  id: row.id,
  title: row.title,
  description: row.description,
  images: asStringArray(row.images),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapContactRow = (row: ContactRow): ContactMessage => ({
  id: row.id,
  name: row.name,
  email: row.email,
  location: row.location ?? '',
  service: row.service ?? '',
  message: row.message,
  createdAt: row.created_at,
});

const isoNow = () => new Date().toISOString();

export const connectDB = async () => {
  validateSupabaseEnv();
  return getSupabaseServerClient();
};

export const projectsDb = {
  async getAll(options?: { limit?: number; skip?: number }): Promise<Project[]> {
    const limit = sanitizeLimit(options?.limit);
    const skip = sanitizeSkip(options?.skip);
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((row) => mapProjectRow(row as ProjectRow));
  },

  async getById(id: string): Promise<Project | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data ? mapProjectRow(data as ProjectRow) : null;
  },

  async create(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const now = isoNow();
    const payload = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      location: data.location ?? '',
      category: data.category ?? '',
      images: Array.isArray(data.images) ? data.images : [],
      created_at: now,
      updated_at: now,
    };

    const supabase = getSupabaseServerClient();
    const { data: inserted, error } = await supabase
      .from('projects')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return mapProjectRow(inserted as ProjectRow);
  },

  async update(id: string, data: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | null> {
    const payload: Record<string, unknown> = { updated_at: isoNow() };

    if (typeof data.title === 'string') payload.title = data.title;
    if (typeof data.description === 'string') payload.description = data.description;
    if (typeof data.location === 'string') payload.location = data.location;
    if (typeof data.category === 'string') payload.category = data.category;
    if (Array.isArray(data.images)) payload.images = data.images;

    const supabase = getSupabaseServerClient();
    const { data: updated, error } = await supabase
      .from('projects')
      .update(payload)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return updated ? mapProjectRow(updated as ProjectRow) : null;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return Boolean(data);
  },
};

export const portfoliosDb = {
  async getAll(options?: { limit?: number; skip?: number }): Promise<Portfolio[]> {
    const limit = sanitizeLimit(options?.limit);
    const skip = sanitizeSkip(options?.skip);
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((row) => mapPortfolioRow(row as PortfolioRow));
  },

  async getById(id: string): Promise<Portfolio | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from('portfolios').select('*').eq('id', id).maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data ? mapPortfolioRow(data as PortfolioRow) : null;
  },

  async create(data: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>): Promise<Portfolio> {
    const now = isoNow();
    const payload = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      images: Array.isArray(data.images) ? data.images : [],
      created_at: now,
      updated_at: now,
    };

    const supabase = getSupabaseServerClient();
    const { data: inserted, error } = await supabase
      .from('portfolios')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return mapPortfolioRow(inserted as PortfolioRow);
  },

  async update(
    id: string,
    data: Partial<Omit<Portfolio, 'id' | 'createdAt'>>,
  ): Promise<Portfolio | null> {
    const payload: Record<string, unknown> = { updated_at: isoNow() };

    if (typeof data.title === 'string') payload.title = data.title;
    if (typeof data.description === 'string') payload.description = data.description;
    if (Array.isArray(data.images)) payload.images = data.images;

    const supabase = getSupabaseServerClient();
    const { data: updated, error } = await supabase
      .from('portfolios')
      .update(payload)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return updated ? mapPortfolioRow(updated as PortfolioRow) : null;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return Boolean(data);
  },
};

export const contactsDb = {
  async getAll(options?: { limit?: number; skip?: number }): Promise<ContactMessage[]> {
    const limit = sanitizeLimit(options?.limit);
    const skip = sanitizeSkip(options?.skip);
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((row) => mapContactRow(row as ContactRow));
  },

  async create(data: Pick<ContactMessage, 'name' | 'email' | 'location' | 'message' | 'service'>): Promise<ContactMessage> {
    const payload = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      location: data.location ?? '',
      service: data.service ?? '',
      message: data.message,
      created_at: isoNow(),
    };

    const supabase = getSupabaseServerClient();
    const { data: inserted, error } = await supabase
      .from('contacts')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return mapContactRow(inserted as ContactRow);
  },

  async delete(id: string): Promise<boolean> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return Boolean(data);
  },
};
