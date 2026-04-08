import { NextResponse } from 'next/server';
import { connectDB } from '../../lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json(
      {
        ok: true,
        service: 'client-admin-panel-api',
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('[health] failing health check', error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
