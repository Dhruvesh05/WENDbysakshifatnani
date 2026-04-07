import { NextResponse } from 'next/server';
import { connectDB, projectsDb } from '../../../lib/db';
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
    console.info('[api/projects] GET', { page, limit });
    await connectDB();
    const projects = await projectsDb.getAll({ limit, skip });
    return NextResponse.json(projects, { headers: getCorsHeaders() });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch projects.',
        detail: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers: getCorsHeaders() },
    );
  }
}

export async function POST(request: Request) {
  try {
    console.info('[api/projects] POST');
    await connectDB();
    const body = (await request.json()) as {
      title?: string;
      description?: string;
      location?: string;
      category?: string;
      images?: string[];
    };

    if (!body.title?.trim()) {
      return NextResponse.json({ message: 'Title is required.' }, { status: 400 });
    }
    if (!body.description?.trim()) {
      return NextResponse.json({ message: 'Description is required.' }, { status: 400 });
    }

    const project = await projectsDb.create({
      title: body.title.trim(),
      description: body.description.trim(),
      location: body.location?.trim() ?? '',
      category: body.category ?? '',
      images: Array.isArray(body.images) ? body.images : [],
    });

    return NextResponse.json(project, { status: 201, headers: getCorsHeaders() });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ message: 'Failed to create project.' }, { status: 500, headers: getCorsHeaders() });
  }
}
