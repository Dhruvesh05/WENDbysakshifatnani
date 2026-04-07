import { NextResponse } from 'next/server';
import { connectDB, projectsDb } from 'lib/db';
import { createCorsPreflightResponse, getCorsHeaders } from '../../../../lib/cors';

export const runtime = 'nodejs';

export async function OPTIONS(request: Request) {
  return createCorsPreflightResponse(request);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.info('[api/projects/:id] GET', { id });
    await connectDB();
    const project = await projectsDb.getById(id);
    if (!project) {
      return NextResponse.json({ message: 'Project not found.' }, { status: 404, headers: getCorsHeaders(_request) });
    }
    return NextResponse.json(project, { headers: getCorsHeaders(_request) });
  } catch (error) {
    console.error('Failed to fetch project by id:', error);
    return NextResponse.json({ message: 'Failed to fetch project.' }, { status: 500, headers: getCorsHeaders(_request) });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.info('[api/projects/:id] PUT', { id });
    await connectDB();
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
      return NextResponse.json({ message: 'Project not found.' }, { status: 404, headers: getCorsHeaders(request) });
    }

    return NextResponse.json(project, { headers: getCorsHeaders(request) });
  } catch (error) {
    console.error('Failed to update project:', error);
    return NextResponse.json({ message: 'Failed to update project.' }, { status: 500, headers: getCorsHeaders(request) });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.info('[api/projects/:id] DELETE', { id });
    await connectDB();
    const deleted = await projectsDb.delete(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Project not found.' }, { status: 404, headers: getCorsHeaders(_request) });
    }
    return new Response(null, { status: 204, headers: getCorsHeaders(_request) });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json({ message: 'Failed to delete project.' }, { status: 500, headers: getCorsHeaders(_request) });
  }
}
