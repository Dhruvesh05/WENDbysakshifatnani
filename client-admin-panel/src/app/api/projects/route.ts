import { NextResponse } from 'next/server';
import { projectsDb } from '../../../lib/db';
import { createCorsPreflightResponse, getCorsHeaders } from '../../../lib/cors';

export const runtime = 'nodejs';

export async function OPTIONS() {
  return createCorsPreflightResponse();
}

export async function GET() {
  try {
    const projects = await projectsDb.getAll();
    return NextResponse.json(projects, { headers: getCorsHeaders() });
  } catch {
    return NextResponse.json({ message: 'Failed to fetch projects.' }, { status: 500, headers: getCorsHeaders() });
  }
}

export async function POST(request: Request) {
  try {
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
  } catch {
    return NextResponse.json({ message: 'Failed to create project.' }, { status: 500, headers: getCorsHeaders() });
  }
}
