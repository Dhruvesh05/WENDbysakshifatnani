import { NextResponse } from 'next/server';
import path from 'path';
import { getSupabaseServerClient, SUPABASE_STORAGE_BUCKET, validateSupabaseEnv } from '../../../lib/supabase';
import { createCorsPreflightResponse, getCorsHeaders } from '../../../lib/cors';

export const runtime = 'nodejs';

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export async function OPTIONS(request: Request) {
  return createCorsPreflightResponse(request);
}

export async function POST(request: Request) {
  try {
    validateSupabaseEnv();
    const supabase = getSupabaseServerClient();

    console.info('[api/upload] POST', {
      storageBucket: SUPABASE_STORAGE_BUCKET,
      nodeEnv: process.env.NODE_ENV,
    });

    const formData = await request.formData();
    const formFiles = formData.getAll('files');
    const singleFile = formData.get('file');

    const files = formFiles.length > 0 ? formFiles : singleFile ? [singleFile] : [];

    if (files.length === 0) {
      return NextResponse.json(
        { message: 'No file provided.' },
        { status: 400, headers: getCorsHeaders(request) },
      );
    }

    const uploadedUrls: string[] = [];
    for (const currentFile of files) {
      if (typeof currentFile === 'string') {
        return NextResponse.json(
          { message: 'Invalid file payload.' },
          { status: 400, headers: getCorsHeaders(request) },
        );
      }

      const ext = path.extname(currentFile.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          { message: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF.' },
          { status: 400, headers: getCorsHeaders(request) },
        );
      }

      const bytes = await currentFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      if (buffer.length > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { message: 'One or more files are too large. Maximum size is 10 MB each.' },
          { status: 400, headers: getCorsHeaders(request) },
        );
      }

      const filename = `${Date.now()}-${crypto.randomUUID()}${ext}`;
      const objectPath = path.posix.join('uploads', filename);

      const { error: uploadError } = await supabase.storage
        .from(SUPABASE_STORAGE_BUCKET)
        .upload(objectPath, buffer, {
          contentType: currentFile.type || 'application/octet-stream',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data } = supabase.storage.from(SUPABASE_STORAGE_BUCKET).getPublicUrl(objectPath);

      if (!data.publicUrl) {
        throw new Error('Could not generate public URL for uploaded file.');
      }

      uploadedUrls.push(data.publicUrl);
    }

    return NextResponse.json(
      { url: uploadedUrls[0], urls: uploadedUrls },
      { headers: getCorsHeaders(request) },
    );
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json(
      { message: 'Upload failed. Please try again.' },
      { status: 500, headers: getCorsHeaders(request) },
    );
  }
}
