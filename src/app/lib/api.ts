export interface WebsiteProject {
  id: string;
  title: string;
  description: string;
  location?: string;
  category?: string;
  images: string[];
  createdAt?: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

const parseError = async (response: Response) => {
  const fallback = `Request failed with status ${response.status}`;
  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message ?? fallback;
  } catch {
    return fallback;
  }
};

export const fetchProjects = async (): Promise<WebsiteProject[]> => {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as WebsiteProject[];
};

export const submitContactForm = async (payload: {
  name: string;
  email: string;
  service: string;
  message: string;
}): Promise<{ warning?: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as { warning?: string };
};
