import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || '';
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || process.env.SUPABASE_SECRET_KEY?.trim() || '';

export const SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET?.trim() || 'wend-media';

declare global {
  var __supabaseClient: SupabaseClient | undefined;
  var __supabaseConnectionLogged: boolean | undefined;
}

export const validateSupabaseEnv = () => {
  if (!SUPABASE_URL) {
    throw new Error('Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL).');
  }

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY).');
  }

  if (!global.__supabaseConnectionLogged) {
    console.info('[db] Supabase env loaded', {
      hasSupabaseUrl: Boolean(SUPABASE_URL),
      hasServiceRoleKey: Boolean(SUPABASE_SERVICE_ROLE_KEY),
      storageBucket: SUPABASE_STORAGE_BUCKET,
      nodeVersion: process.version,
    });
    global.__supabaseConnectionLogged = true;
  }
};

export const getSupabaseServerClient = (): SupabaseClient => {
  validateSupabaseEnv();

  if (!global.__supabaseClient) {
    global.__supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return global.__supabaseClient;
};
