import { NextResponse } from 'next/server';
import { portfoliosDb } from '../../../lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const portfolios = await portfoliosDb.getAll();
    return NextResponse.json(portfolios);
  } catch {
    return NextResponse.json({ message: 'Failed to fetch portfolios.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      title?: string;
      description?: string;
      images?: string[];
    };

    if (!body.title?.trim()) {
      return NextResponse.json({ message: 'Title is required.' }, { status: 400 });
    }
    if (!body.description?.trim()) {
      return NextResponse.json({ message: 'Description is required.' }, { status: 400 });
    }

    const portfolio = await portfoliosDb.create({
      title: body.title.trim(),
      description: body.description.trim(),
      images: Array.isArray(body.images) ? body.images : [],
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Failed to create portfolio.' }, { status: 500 });
  }
}
