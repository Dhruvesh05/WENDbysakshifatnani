import { ContactMessage, Portfolio, Project } from '../types';

// When NEXT_PUBLIC_API_URL is not set, requests stay same-origin.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
const RETRY_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 900;
const REQUEST_TIMEOUT_MS = 12000;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const sleep = (durationMs: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, durationMs);
  });

const isTransientHttpStatus = (status: number) => status === 408 || status === 429 || status >= 500;

const request = async <T>(path: string, method: HttpMethod, body?: unknown): Promise<T> => {
  const endpoint = `${API_BASE_URL}${path}`;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt += 1) {
    const abortController = new AbortController();
    const timeoutId = window.setTimeout(() => abortController.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
        cache: 'no-store',
        signal: abortController.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (isTransientHttpStatus(response.status) && attempt < RETRY_ATTEMPTS) {
          console.warn('[admin-api] transient response, retrying', { endpoint, status: response.status, attempt });
          await sleep(RETRY_BASE_DELAY_MS * attempt);
          continue;
        }

        throw new Error(errorText || `Request failed with status ${response.status}`);
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      const normalizedError =
        error instanceof Error
          ? error
          : new Error('Unexpected request failure.');
      const isTimeout = normalizedError.name === 'AbortError';
      lastError = isTimeout
        ? new Error('Server is waking up. Please retry in a few seconds.')
        : normalizedError;

      console.error('[admin-api] request failure', {
        endpoint,
        attempt,
        message: lastError.message,
      });

      if (attempt < RETRY_ATTEMPTS) {
        await sleep(RETRY_BASE_DELAY_MS * attempt);
        continue;
      }
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  throw lastError ?? new Error('Server is currently unavailable.');
};

export const fetchProjects = async (): Promise<Project[]> => request<Project[]>('/api/projects', 'GET');

export const getProjectById = async (id: string): Promise<Project> =>
  request<Project>(`/api/projects/${id}`, 'GET');

export const createProject = async (
  project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Project> => request<Project>('/api/projects', 'POST', project);

export const updateProject = async (project: Project): Promise<Project> => {
  if (!project.id) {
    throw new Error('Project id is required for update.');
  }

  return request<Project>(`/api/projects/${project.id}`, 'PUT', project);
};

export const deleteProject = async (id: string): Promise<void> => {
  await request<void>(`/api/projects/${id}`, 'DELETE');
};

export const fetchPortfolios = async (): Promise<Portfolio[]> =>
  request<Portfolio[]>('/api/portfolios', 'GET');

export const getPortfolioById = async (id: string): Promise<Portfolio> =>
  request<Portfolio>(`/api/portfolios/${id}`, 'GET');

export const createPortfolio = async (
  portfolio: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Portfolio> => request<Portfolio>('/api/portfolios', 'POST', portfolio);

export const updatePortfolio = async (id: string, portfolio: Portfolio): Promise<Portfolio> =>
  request<Portfolio>(`/api/portfolios/${id}`, 'PUT', portfolio);

export const deletePortfolio = async (id: string): Promise<void> => {
  await request<void>(`/api/portfolios/${id}`, 'DELETE');
};

export const uploadImage = async (file: File): Promise<string> => {
  const urls = await uploadImages([file]);
  const first = urls[0];
  if (!first) {
    throw new Error('Upload failed.');
  }

  return first;
};

export const uploadImages = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const abortController = new AbortController();
  const timeoutId = window.setTimeout(() => abortController.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
      cache: 'no-store',
      signal: abortController.signal,
    });
  } catch (error) {
    const message = error instanceof Error && error.name === 'AbortError'
      ? 'Upload timed out while the server was waking up. Please retry.'
      : 'Upload failed due to a network error.';
    console.error('[admin-api] upload failure', { message });
    throw new Error(message);
  } finally {
    window.clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(error?.message ?? 'Upload failed.');
  }

  const data = (await response.json()) as { url?: string; urls?: string[] };
  if (Array.isArray(data.urls) && data.urls.length > 0) {
    return data.urls;
  }

  if (data.url) {
    return [data.url];
  }

  throw new Error('Upload failed.');
};

export const fetchContactMessages = async (): Promise<ContactMessage[]> =>
  request<ContactMessage[]>('/api/contact', 'GET');

export const deleteContactMessage = async (id: string): Promise<void> => {
  await request<void>(`/api/contact/${id}`, 'DELETE');
};