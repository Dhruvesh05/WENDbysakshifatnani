const normalizeOrigin = (origin: string) => origin.trim().replace(/\/$/, '');

const configuredOrigins = (process.env.CORS_ORIGIN ?? '*')
  .split(',')
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean);

const fallbackOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://wen-dbysakshifatnani.vercel.app',
  'https://wendbysakshifatnani.vercel.app',
].map((origin) => normalizeOrigin(origin));

const resolveAllowedOrigin = (request?: Request) => {
  const requestOrigin = request?.headers.get('origin');
  const normalizedRequestOrigin = requestOrigin ? normalizeOrigin(requestOrigin) : '';
  const wildcardEnabled = configuredOrigins.includes('*');

  if (wildcardEnabled) {
    return '*';
  }

  if (normalizedRequestOrigin && configuredOrigins.includes(normalizedRequestOrigin)) {
    return normalizedRequestOrigin;
  }

  if (normalizedRequestOrigin && fallbackOrigins.includes(normalizedRequestOrigin)) {
    return normalizedRequestOrigin;
  }

  return configuredOrigins[0] ?? fallbackOrigins[0] ?? '*';
};

export const getCorsHeaders = (request?: Request) => ({
  'Access-Control-Allow-Origin': resolveAllowedOrigin(request),
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  Vary: 'Origin',
});

export const createCorsPreflightResponse = (request?: Request) =>
  new Response(null, { status: 204, headers: getCorsHeaders(request) });
