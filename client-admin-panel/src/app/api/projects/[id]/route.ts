import { NextResponse } from 'next/server';
import { projectsDb } from '../../../../lib/db';
import { createCorsPreflightResponse, getCorsHeaders } from '../../../../lib/cors';

export const runtime = 'nodejs';

export async function OPTIONS() {
  return createCorsPreflightResponse();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const project = await projectsDb.getById(id);
  if (!project) {
    return NextResponse.json({ message: 'Project not found.' }, { status: 404, headers: getCorsHeaders() });
  }
  return NextResponse.json(project, { headers: getCorsHeaders() });
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
      location?: string;
      category?: string;
      images?: string[];
    };

    const project = await projectsDb.update(id, {
      title: body.title?.trim(),
      description: body.description?.trim(),
      location: body.location?.trim(),
      category: body.category,
      images: Array.isArray(body.images) ? body.images : undefined,
    });

    if (!project) {
      return NextResponse.json({ message: 'Project not found.' }, { status: 404, headers: getCorsHeaders() });
    }

    return NextResponse.json(project, { headers: getCorsHeaders() });
  } catch {
    return NextResponse.json({ message: 'Failed to update project.' }, { status: 500, headers: getCorsHeaders() });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const deleted = await projectsDb.delete(id);
  if (!deleted) {
    return NextResponse.json({ message: 'Project not found.' }, { status: 404, headers: getCorsHeaders() });
  }
  return new Response(null, { status: 204, headers: getCorsHeaders() });
}
