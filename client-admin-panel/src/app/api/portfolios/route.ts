import { NextResponse } from 'next/server';
import { connectDB, portfoliosDb } from '../../../lib/db';
import { createCorsPreflightResponse, getCorsHeaders } from '../../../lib/cors';

export const runtime = 'nodejs';

export async function OPTIONS() {
  return createCorsPreflightResponse();
}

const getPagination = (request: Request) => {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '20');
  const safePage = Number.isFinite(page) && page > 0 ? Math.trunc(page) : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.trunc(limit) : 20;
  const skip = (safePage - 1) * safeLimit;

  return { page: safePage, limit: safeLimit, skip };
};

export async function GET(request: Request) {
  try {
    const { page, limit, skip } = getPagination(request);
    console.info('[api/portfolios] GET', { page, limit });
    await connectDB();
    const portfolios = await portfoliosDb.getAll({ limit, skip });
    return NextResponse.json(portfolios, { headers: getCorsHeaders() });
  } catch (error) {
    console.error('Failed to fetch portfolios:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch portfolios.',
        detail: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers: getCorsHeaders() },
    );
  }
}

export async function POST(request: Request) {
  try {
    console.info('[api/portfolios] POST');
    await connectDB();
    const body = (await request.json()) as {
      title?: string;
      description?: string;
      images?: string[];
    };

    if (!body.title?.trim()) {
      return NextResponse.json({ message: 'Title is required.' }, { status: 400, headers: getCorsHeaders() });
    }
    if (!body.description?.trim()) {
      return NextResponse.json({ message: 'Description is required.' }, { status: 400, headers: getCorsHeaders() });
    }

    const portfolio = await portfoliosDb.create({
      title: body.title.trim(),
      description: body.description.trim(),
      images: Array.isArray(body.images) ? body.images : [],
    });

    return NextResponse.json(portfolio, { status: 201, headers: getCorsHeaders() });
  } catch (error) {
    console.error('Failed to create portfolio:', error);
    return NextResponse.json(
      { message: 'Failed to create portfolio.' },
      { status: 500, headers: getCorsHeaders() },
    );
  }
}
