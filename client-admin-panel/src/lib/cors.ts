const configuredOrigins = (process.env.CORS_ORIGIN ?? '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const fallbackOrigins = ['http://localhost:3000', 'http://localhost:5173'];

const resolveAllowedOrigin = (request?: Request) => {
  const requestOrigin = request?.headers.get('origin')?.trim();
  const wildcardEnabled = configuredOrigins.includes('*');

  if (wildcardEnabled) {
    return '*';
  }

  if (requestOrigin && configuredOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }

  if (requestOrigin && process.env.NODE_ENV !== 'production' && fallbackOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }

  return configuredOrigins[0] ?? '*';
};

export const getCorsHeaders = (request?: Request) => ({
  'Access-Control-Allow-Origin': resolveAllowedOrigin(request),
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  Vary: 'Origin',
});

export const createCorsPreflightResponse = (request?: Request) =>
  new Response(null, { status: 204, headers: getCorsHeaders(request) });
