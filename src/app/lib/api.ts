import emailjs from '@emailjs/browser';

export interface WebsiteProject {
  id: string;
  title: string;
  description: string;
  location?: string;
  category?: string;
  images: string[];
  modelSrc?: string;
  iosSrc?: string;
  arModelSrc?: string;
  arIosSrc?: string;
  glbModel?: string;
  usdzModel?: string;
  createdAt?: string;
}

export interface WebsitePortfolio {
  id: string;
  title: string;
  description: string;
  images: string[];
  createdAt?: string;
}

type AppImportMetaEnv = {
  readonly VITE_API_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_BACKEND_URL?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
};

const appImportMeta = import.meta as ImportMeta & { env?: AppImportMetaEnv };
const appEnv = appImportMeta?.env ?? {};

// Production defaults - explicitly set for Vercel, Render, and localhost
const DEFAULT_RENDER_API_URL = 'https://wendbysakshifatnani-edtn.onrender.com';
const DEFAULT_LOCALHOST_API_URL = 'http://localhost:3000'; // For local development

const normalizeApiBaseUrl = (value: string): string => {
  if (!value) return '';
  
  const trimmed = value.trim().replace(/\/$/, '');
  if (!trimmed) return '';

  // Convert http to https in production
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && /^http:\/\//i.test(trimmed)) {
    console.log('[api-config] normalizing http to https', { original: value, normalized: trimmed });
    return trimmed.replace(/^http:\/\//i, 'https://');
  }

  return trimmed;
};

const resolveApiBaseUrl = (): string => {
  // Priority order:
  // 1. VITE_API_URL (explicitly set env var)
  // 2. VITE_API_BASE_URL (alias)
  // 3. VITE_BACKEND_URL (alias)
  // 4. Auto-detect based on current hostname
  
  const explicitUrl = appEnv.VITE_API_URL?.trim() || appEnv.VITE_API_BASE_URL?.trim() || appEnv.VITE_BACKEND_URL?.trim();
  if (explicitUrl) {
    const normalized = normalizeApiBaseUrl(explicitUrl);
    if (normalized) {
      console.log('[api-config] using explicit environment variable', { VITE_API_URL: explicitUrl });
      return normalized;
    }
  }

  // Auto-detect based on current hostname
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;

    // Vercel production domain
    if (hostname.includes('vercel.app') || hostname.includes('wen-dbysakshifatnani.vercel.app')) {
      console.log('[api-config] detected Vercel hostname, using Render backend', { hostname });
      return DEFAULT_RENDER_API_URL;
    }

    // Render production domain
    if (hostname.includes('onrender.com') || hostname.includes('wendbysakshifatnani-edtn.onrender.com')) {
      console.log('[api-config] detected Render hostname, using Render backend', { hostname });
      return DEFAULT_RENDER_API_URL;
    }

    // Localhost/development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      console.log('[api-config] detected localhost, using Vite proxy for development', { hostname });
      return ''; // Empty = use relative /api paths with Vite proxy
    }
  }

  // Final fallback for production
  console.log('[api-config] using production fallback', { url: DEFAULT_RENDER_API_URL });
  return DEFAULT_RENDER_API_URL;
};

const API_BASE_URL = resolveApiBaseUrl();
console.log('[api-config] initialized', { API_BASE_URL });

// EmailJS configuration (optional browser-side email sending)
const EMAILJS_SERVICE_ID = appEnv.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = appEnv.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = appEnv.VITE_EMAILJS_PUBLIC_KEY;
const hasEmailJsConfig = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

if (hasEmailJsConfig) {
  console.log('[api-config] EmailJS is configured and ready');
}

const RETRY_ATTEMPTS = 5;
const RETRY_BASE_DELAY_MS = 1000;
const RETRY_MAX_DELAY_MS = 8000;
const REQUEST_TIMEOUT_MS = 15000;
const HEALTH_CHECK_TIMEOUT_MS = 5000;

const sleep = (durationMs: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, durationMs);
  });

// Request deduplication: prevent duplicate simultaneous requests to same endpoint
const inFlightRequests = new Map<string, Promise<Response>>();

const dedupeRequest = async (
  endpoint: string,
  fetcher: () => Promise<Response>
): Promise<Response> => {
  // If a request is already in flight, return the existing promise
  if (inFlightRequests.has(endpoint)) {
    console.log('[api] request already in flight, using cached promise', { endpoint });
    return inFlightRequests.get(endpoint)!;
  }

  // Create and cache the promise
  const promise = fetcher()
    .finally(() => {
      inFlightRequests.delete(endpoint);
    });

  inFlightRequests.set(endpoint, promise);
  return promise;
};

type ApiRequestOptions = {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
};

const isTransientHttpStatus = (status: number): boolean => {
  // Only retry transient errors (server errors, temporary client errors)
  // Never retry permanent 4xx errors like 404, 400, 401, 403
  
  // Specific transient 4xx errors
  if (status === 408) return true;  // Request Timeout - server is overloaded
  if (status === 429) return true;  // Too Many Requests - rate limit, wait and retry
  
  // All 5xx errors are transient
  if (status >= 500) return true;
  
  // Everything else (4xx like 400, 401, 403, 404) are permanent - don't retry
  return false;
};

const calculateBackoffDelay = (attempt: number): number => {
  // Exponential backoff with jitter: base * (2^attempt - 1) + random jitter up to 20%
  const exponentialDelay = RETRY_BASE_DELAY_MS * (Math.pow(2, attempt - 1) - 1);
  const jitter = exponentialDelay * 0.2 * Math.random();
  return Math.min(exponentialDelay + jitter, RETRY_MAX_DELAY_MS);
};

const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const finalUrl = API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
  
  // Log the final URL to help debug production issues
  if (path.startsWith('/')) {
    console.log('[api-url-builder]', { 
      path, 
      apiBaseUrl: API_BASE_URL || '(empty - using relative proxy)',
      finalUrl,
      isAbsolute: !!API_BASE_URL
    });
  }
  
  return finalUrl;
};

export const checkServerHealth = async (): Promise<boolean> => {
  const healthUrl = buildApiUrl('/health');
  const abortController = new AbortController();
  const timeoutId = window.setTimeout(() => abortController.abort(), HEALTH_CHECK_TIMEOUT_MS);

  try {
    const response = await fetch(healthUrl, {
      method: 'GET',
      signal: abortController.signal,
    });
    window.clearTimeout(timeoutId);
    return response.ok;
  } catch {
    window.clearTimeout(timeoutId);
    return false;
  }
};

const requestWithRetry = async (path: string, options: ApiRequestOptions): Promise<Response> => {
  const endpoint = buildApiUrl(path);
  const cacheKey = `${options.method ?? 'GET'}:${endpoint}`;

  // Deduplicate requests - if a GET request is already in flight, reuse it
  if ((options.method ?? 'GET') === 'GET' && inFlightRequests.has(cacheKey)) {
    console.log('[api] GET request already in flight, using cached promise', { endpoint });
    return inFlightRequests.get(cacheKey)!;
  }

  const doFetch = async (): Promise<Response> => {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt += 1) {
      const abortController = new AbortController();
      const timeoutId = window.setTimeout(() => abortController.abort(), REQUEST_TIMEOUT_MS);

      try {
        const response = await fetch(endpoint, {
          method: options.method ?? 'GET',
          headers: options.headers,
          body: options.body,
          signal: abortController.signal,
        });

        // Log response status
        if (!response.ok) {
          const isTransient = isTransientHttpStatus(response.status);
          const shouldRetry = isTransient && attempt < RETRY_ATTEMPTS;
          console.warn(`[api] response ${response.status}${shouldRetry ? ' - retriable, will retry' : ' - not retriable, giving up'}`, { 
            endpoint, 
            status: response.status, 
            attempt,
            attempts: RETRY_ATTEMPTS
          });

          if (shouldRetry) {
            const delayMs = calculateBackoffDelay(attempt);
            window.clearTimeout(timeoutId);
            await sleep(delayMs);
            continue;
          }
        }

        window.clearTimeout(timeoutId);
        return response;
      } catch (error) {
        const normalizedError =
          error instanceof Error
            ? error
            : new Error('Unexpected network failure.');
        const isTimeout = normalizedError.name === 'AbortError';
        
        if (isTimeout) {
          lastError = new Error(`Server timeout (${REQUEST_TIMEOUT_MS}ms) - cold-start in progress`);
        } else {
          lastError = normalizedError;
        }

        if (attempt < RETRY_ATTEMPTS) {
          const delayMs = calculateBackoffDelay(attempt);
          console.warn(`[api] request failed on attempt ${attempt}/${RETRY_ATTEMPTS}, retrying in ${delayMs}ms`, {
            endpoint,
            error: lastError.message,
          });
          window.clearTimeout(timeoutId);
          await sleep(delayMs);
          continue;
        } else {
          console.error('[api] all retries exhausted', {
            endpoint,
            totalAttempts: RETRY_ATTEMPTS,
            finalError: lastError.message,
          });
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    throw lastError ?? new Error('Server is unavailable. Please try again in a moment.');
  };

  // Cache GET requests to prevent duplicate simultaneous fetches
  if ((options.method ?? 'GET') === 'GET') {
    return dedupeRequest(cacheKey, doFetch);
  } else {
    return doFetch();
  }
};

const parseError = async (response: Response) => {
  const fallback = `Request failed with status ${response.status}`;
  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message ?? fallback;
  } catch {
    return fallback;
  }
};

const toAbsoluteMediaUrl = (url: string) => {
  if (!url) {
    return url;
  }

  if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  const normalizedPath = url.startsWith('/') ? url : `/${url}`;
  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
};

export const fetchProjects = async (): Promise<WebsiteProject[]> => {
  const response = await requestWithRetry('/api/projects', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const projects = (await response.json()) as WebsiteProject[];
  return projects.map((project) => ({
    ...project,
    images: Array.isArray(project.images) ? project.images.map(toAbsoluteMediaUrl) : [],
  }));
};

export const fetchPortfolios = async (): Promise<WebsitePortfolio[]> => {
  const response = await requestWithRetry('/api/portfolios', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const portfolios = (await response.json()) as WebsitePortfolio[];
  return portfolios.map((portfolio) => ({
    ...portfolio,
    images: Array.isArray(portfolio.images) ? portfolio.images.map(toAbsoluteMediaUrl) : [],
  }));
};

export const submitContactForm = async (payload: {
  name: string;
  email: string;
  location?: string;
  service: string;
  message: string;
}): Promise<{ warning?: string }> => {
  let sentViaEmailJs = false;

  if (hasEmailJsConfig) {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID!,
        EMAILJS_TEMPLATE_ID!,
        {
          name: payload.name,
          email: payload.email,
          location: payload.location,
          service: payload.service,
          message: payload.message,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY!,
        },
      );
      sentViaEmailJs = true;
    } catch {
      throw new Error('Failed to send message via EmailJS. Please check your EmailJS settings and try again.');
    }
  }

  const response = await requestWithRetry('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      skipEmailNotification: sentViaEmailJs,
    }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as { warning?: string };
};
