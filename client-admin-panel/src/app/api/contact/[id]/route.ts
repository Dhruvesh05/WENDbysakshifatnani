import { NextResponse } from 'next/server';
import { connectDB, contactsDb } from '../../../../lib/db';
import { createCorsPreflightResponse, getCorsHeaders } from '../../../../lib/cors';

export const runtime = 'nodejs';

export async function OPTIONS() {
  return createCorsPreflightResponse();
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    console.info('[api/contact/:id] DELETE', { id });
    await connectDB();
    const deleted = await contactsDb.delete(id);
    if (!deleted) {
      return NextResponse.json(
        { message: 'Contact message not found.' },
        { status: 404, headers: getCorsHeaders() },
      );
    }

    return new Response(null, { status: 204, headers: getCorsHeaders() });
  } catch (error) {
    console.error('Failed to delete contact message:', error);
    return NextResponse.json(
      { message: 'Failed to delete contact message.' },
      { status: 500, headers: getCorsHeaders() },
    );
  }
}
