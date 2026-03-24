import { NextResponse } from 'next/server';
import { portfoliosDb } from '../../../../lib/db';

export const runtime = 'nodejs';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const portfolio = await portfoliosDb.getById(id);
  if (!portfolio) {
    return NextResponse.json({ message: 'Portfolio not found.' }, { status: 404 });
  }
  return NextResponse.json(portfolio);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
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
      return NextResponse.json({ message: 'Portfolio not found.' }, { status: 404 });
    }

    return NextResponse.json(portfolio);
  } catch {
    return NextResponse.json({ message: 'Failed to update portfolio.' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const deleted = await portfoliosDb.delete(id);
  if (!deleted) {
    return NextResponse.json({ message: 'Portfolio not found.' }, { status: 404 });
  }
  return new Response(null, { status: 204 });
}
