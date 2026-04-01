import { NextResponse } from 'next/server';
import { contactsDb } from '../../../lib/db';
import { createCorsPreflightResponse, getCorsHeaders } from '../../../lib/cors';
import { sendContactNotificationEmail } from '../../../lib/mailer';

export const runtime = 'nodejs';

export async function OPTIONS() {
  return createCorsPreflightResponse();
}

export async function GET() {
  try {
    const contacts = await contactsDb.getAll();
    return NextResponse.json(contacts, { headers: getCorsHeaders() });
  } catch {
    return NextResponse.json(
      { message: 'Failed to fetch contact messages.' },
      { status: 500, headers: getCorsHeaders() },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      location?: string;
      service?: string;
      message?: string;
      skipEmailNotification?: boolean;
    };

    const name = body.name?.trim() ?? '';
    const email = body.email?.trim() ?? '';
    const location = body.location?.trim() ?? '';
    const service = body.service?.trim() ?? '';
    const message = body.message?.trim() ?? '';
    const skipEmailNotification = body.skipEmailNotification === true;

    if (!name) {
      return NextResponse.json({ message: 'Name is required.' }, { status: 400, headers: getCorsHeaders() });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'A valid email is required.' },
        { status: 400, headers: getCorsHeaders() },
      );
    }

    if (!message) {
      return NextResponse.json({ message: 'Message is required.' }, { status: 400, headers: getCorsHeaders() });
    }

    if (!service) {
      return NextResponse.json(
        { message: 'Service selection is required.' },
        { status: 400, headers: getCorsHeaders() },
      );
    }

    const contact = await contactsDb.create({ name, email, location, service, message });

    let emailNotificationSent = skipEmailNotification;
    let warning: string | undefined;

    if (!skipEmailNotification) {
      try {
        await sendContactNotificationEmail({ name, email, location, service, message });
        emailNotificationSent = true;
      } catch (mailError) {
        console.error('Failed to send contact notification email:', mailError);
        warning =
          'Your enquiry was saved successfully, but email notification is not configured correctly yet.';
      }
    }

    return NextResponse.json(
      {
        ...contact,
        emailNotificationSent,
        ...(warning ? { warning } : {}),
      },
      { status: 201, headers: getCorsHeaders() },
    );
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return NextResponse.json(
      { message: 'Failed to submit contact form.' },
      { status: 500, headers: getCorsHeaders() },
    );
  }
}
