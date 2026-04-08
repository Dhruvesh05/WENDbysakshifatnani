import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import { createCorsPreflightResponse, getCorsHeaders } from '../../../lib/cors';

export const runtime = 'nodejs';

export async function OPTIONS(request: Request) {
  return createCorsPreflightResponse(request);
}

export async function GET(request: Request) {
  try {
    await connectDB();
    return NextResponse.json(
      {
        ok: true,
        service: 'client-admin-panel-api',
        timestamp: new Date().toISOString(),
      },
      { status: 200, headers: getCorsHeaders(request) },
    );
  } catch (error) {
    console.error('[api/health] failing health check', error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 503, headers: getCorsHeaders(request) },
    );
  }
}
