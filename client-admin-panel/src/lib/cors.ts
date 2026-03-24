const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*';

export const getCorsHeaders = () => ({
  'Access-Control-Allow-Origin': CORS_ORIGIN,
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
});

export const createCorsPreflightResponse = () => new Response(null, { status: 204, headers: getCorsHeaders() });
