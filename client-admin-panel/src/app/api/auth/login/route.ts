import { NextResponse } from 'next/server';
import {
  createSessionToken,
  getSessionMaxAgeSeconds,
  hasAuthEnvConfigured,
  SESSION_COOKIE_NAME,
  validateAdminCredentials,
} from '../../../../lib/auth';

export async function POST(request: Request) {
  if (!hasAuthEnvConfigured()) {
    return NextResponse.json(
      { message: 'Authentication is not configured on the server.' },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;

  const email = body?.email ?? '';
  const password = body?.password ?? '';

  if (!validateAdminCredentials(email, password)) {
    return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
  }

  const token = await createSessionToken(email);
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: getSessionMaxAgeSeconds(),
  });

  return response;
}