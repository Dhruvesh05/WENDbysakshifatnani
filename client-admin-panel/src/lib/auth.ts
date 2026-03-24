import { jwtVerify, SignJWT, type JWTPayload } from 'jose';

export const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12;

export interface AdminSessionPayload extends JWTPayload {
  email: string;
  role: 'admin';
}

const getSecretKey = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    return null;
  }

  return new TextEncoder().encode(secret);
};

export const hasAuthEnvConfigured = () => {
  return Boolean(process.env.AUTH_SECRET && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
};

export const createSessionToken = async (email: string) => {
  const key = getSecretKey();
  if (!key) {
    throw new Error('AUTH_SECRET is not configured.');
  }

  return new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(key);
};

export const verifySessionToken = async (token: string) => {
  const key = getSecretKey();
  if (!key) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
    return payload as AdminSessionPayload;
  } catch {
    return null;
  }
};

export const validateAdminCredentials = (email: string, password: string) => {
  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const allowedPassword = process.env.ADMIN_PASSWORD;

  if (!allowedEmail || !allowedPassword) {
    return false;
  }

  return email.trim().toLowerCase() === allowedEmail && password === allowedPassword;
};

export const isAllowedAdmin = (payload: AdminSessionPayload | null) => {
  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!payload || !allowedEmail) {
    return false;
  }

  return payload.role === 'admin' && payload.email?.trim().toLowerCase() === allowedEmail;
};

export const getSessionMaxAgeSeconds = () => SESSION_TTL_SECONDS;