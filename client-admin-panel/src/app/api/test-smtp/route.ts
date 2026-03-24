import { NextResponse } from 'next/server';
import { sendContactNotificationEmail } from '../../../lib/mailer';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await sendContactNotificationEmail({
      name: 'SMTP Test',
      email: 'test@example.com',
      service: 'Test',
      message: 'This is a test email to verify SMTP configuration.',
    });

    return NextResponse.json({
      status: 'success',
      message: 'Test email sent successfully. Check your inbox.',
    });
  } catch (error) {
    console.error('SMTP Test Error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        hint: 'SMTP_PASS must be a Gmail App Password (16 characters), not your regular Gmail password.',
      },
      { status: 500 },
    );
  }
}
