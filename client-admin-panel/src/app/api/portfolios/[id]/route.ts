import { NextResponse } from 'next/server';
import { connectDB, portfoliosDb } from '../../../../lib/db';
import { createCorsPreflightResponse, getCorsHeaders } from '../../../../lib/cors';

export const runtime = 'nodejs';

export async function OPTIONS() {
  return createCorsPreflightResponse();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.info('[api/portfolios/:id] GET', { id });
    await connectDB();
    const portfolio = await portfoliosDb.getById(id);
    if (!portfolio) {
      return NextResponse.json({ message: 'Portfolio not found.' }, { status: 404, headers: getCorsHeaders() });
    }
    return NextResponse.json(portfolio, { headers: getCorsHeaders() });
  } catch (error) {
    console.error('Failed to fetch portfolio by id:', error);
    return NextResponse.json({ message: 'Failed to fetch portfolio.' }, { status: 500, headers: getCorsHeaders() });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.info('[api/portfolios/:id] PUT', { id });
    await connectDB();
    const body = (await request.json()) as {
      title?: string;
      description?: string;
      images?: string[];
    };

    const portfolio = await portfoliosDb.update(id, {
      title: body.title?.trim(),
      description: body.description?.trim(),
      images: Array.isArray(body.images) ? body.images : undefined,
    });

    if (!portfolio) {
      return NextResponse.json({ message: 'Portfolio not found.' }, { status: 404, headers: getCorsHeaders() });
    }

    return NextResponse.json(portfolio, { headers: getCorsHeaders() });
  } catch (error) {
    console.error('Failed to update portfolio:', error);
    return NextResponse.json(
      { message: 'Failed to update portfolio.' },
      { status: 500, headers: getCorsHeaders() },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.info('[api/portfolios/:id] DELETE', { id });
    await connectDB();
    const deleted = await portfoliosDb.delete(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Portfolio not found.' }, { status: 404, headers: getCorsHeaders() });
    }
    return new Response(null, { status: 204, headers: getCorsHeaders() });
  } catch (error) {
    console.error('Failed to delete portfolio:', error);
    return NextResponse.json({ message: 'Failed to delete portfolio.' }, { status: 500, headers: getCorsHeaders() });
  }
}
