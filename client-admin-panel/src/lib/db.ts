import { Db, MongoClient } from 'mongodb';
import { ContactMessage, Portfolio, Project } from '../types';

const MONGODB_URI = process.env.MONGO_URI?.trim() || process.env.MONGODB_URI?.trim();
const MONGODB_DB = process.env.MONGODB_DB?.trim() || 'wend';
const MAX_LIST_LIMIT = 100;

type ProjectDoc = Project & { _id?: unknown };
type PortfolioDoc = Portfolio & { _id?: unknown };
type ContactDoc = ContactMessage & { _id?: unknown };

declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise: Promise<MongoClient> | undefined;
  // eslint-disable-next-line no-var
  var __mongoConnectionLogged: boolean | undefined;
}

const clientPromise =
  global.__mongoClientPromise ??
  new MongoClient(MONGODB_URI ?? 'mongodb://127.0.0.1:27017', {
    appName: 'wend-admin-panel',
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10_000,
  }).connect();

if (!global.__mongoClientPromise) {
  global.__mongoClientPromise = clientPromise;
}

export const validateDatabaseEnv = () => {
  if (!MONGODB_URI) {
    throw new Error('Missing MongoDB connection string. Set MONGO_URI (preferred) or MONGODB_URI.');
  }

  if (!global.__mongoConnectionLogged) {
    console.info('[db] MongoDB env loaded', {
      hasMongoUri: Boolean(MONGODB_URI),
      dbName: MONGODB_DB,
    });
    global.__mongoConnectionLogged = true;
  }
};

export const connectDB = async (): Promise<MongoClient> => {
  validateDatabaseEnv();
  return clientPromise;
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

const getDb = async (): Promise<Db> => {
  const client = await connectDB();
  return client.db(MONGODB_DB);
};

const projectCollection = async () => (await getDb()).collection<ProjectDoc>('projects');
const portfolioCollection = async () => (await getDb()).collection<PortfolioDoc>('portfolios');
const contactCollection = async () => (await getDb()).collection<ContactDoc>('contacts');

const normalizeProject = (project: Project): Project => ({
  ...project,
  images: Array.isArray(project.images) ? project.images : [],
});

export const projectsDb = {
  async getAll(options?: { limit?: number; skip?: number }): Promise<Project[]> {
    const limit = sanitizeLimit(options?.limit);
    const skip = sanitizeSkip(options?.skip);
    const projects = await (await projectCollection())
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return projects.map(normalizeProject);
  },

  async getById(id: string): Promise<Project | null> {
    const project = await (await projectCollection()).findOne(
      { id },
      { projection: { _id: 0 } },
    );
    return project ? normalizeProject(project) : null;
  },

  async create(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const project: Project = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await (await projectCollection()).insertOne(project);
    return normalizeProject(project);
  },

  async update(id: string, data: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | null> {
    const updates = { ...data, updatedAt: new Date().toISOString() };
    const result = await (await projectCollection()).findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after', projection: { _id: 0 } },
    );

    return result ? normalizeProject(result) : null;
  },

  async delete(id: string): Promise<boolean> {
    const result = await (await projectCollection()).deleteOne({ id });
    return result.deletedCount > 0;
  },
};

export const portfoliosDb = {
  async getAll(options?: { limit?: number; skip?: number }): Promise<Portfolio[]> {
    const limit = sanitizeLimit(options?.limit);
    const skip = sanitizeSkip(options?.skip);
    return (await portfolioCollection())
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
  },

  async getById(id: string): Promise<Portfolio | null> {
    return (await portfolioCollection()).findOne({ id }, { projection: { _id: 0 } });
  },

  async create(data: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>): Promise<Portfolio> {
    const portfolio: Portfolio = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await (await portfolioCollection()).insertOne(portfolio);
    return portfolio;
  },

  async update(
    id: string,
    data: Partial<Omit<Portfolio, 'id' | 'createdAt'>>,
  ): Promise<Portfolio | null> {
    const updates = { ...data, updatedAt: new Date().toISOString() };
    const result = await (await portfolioCollection()).findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after', projection: { _id: 0 } },
    );

    return result ?? null;
  },

  async delete(id: string): Promise<boolean> {
    const result = await (await portfolioCollection()).deleteOne({ id });
    return result.deletedCount > 0;
  },
};

export const contactsDb = {
  async getAll(options?: { limit?: number; skip?: number }): Promise<ContactMessage[]> {
    const limit = sanitizeLimit(options?.limit);
    const skip = sanitizeSkip(options?.skip);
    return (await contactCollection())
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
  },

  async create(data: Pick<ContactMessage, 'name' | 'email' | 'location' | 'message' | 'service'>): Promise<ContactMessage> {
    const contact: ContactMessage = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      location: data.location,
      service: data.service,
      message: data.message,
      createdAt: new Date().toISOString(),
    };

    await (await contactCollection()).insertOne(contact);
    return contact;
  },

  async delete(id: string): Promise<boolean> {
    const result = await (await contactCollection()).deleteOne({ id });
    return result.deletedCount > 0;
  },
};
