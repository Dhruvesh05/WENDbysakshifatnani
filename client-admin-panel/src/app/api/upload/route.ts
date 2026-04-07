import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOW_LOCAL_UPLOADS = process.env.ALLOW_LOCAL_UPLOADS === 'true';

export async function POST(request: Request) {
  try {
    console.info('[api/upload] POST', {
      allowLocalUploads: ALLOW_LOCAL_UPLOADS,
      nodeEnv: process.env.NODE_ENV,
    });

    if (!ALLOW_LOCAL_UPLOADS && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          message:
            'Local file uploads are disabled in production. Configure cloud object storage or set ALLOW_LOCAL_UPLOADS=true only for temporary testing.',
        },
        { status: 503 },
      );
    }

    const formData = await request.formData();
    const formFiles = formData.getAll('files');
    const singleFile = formData.get('file');

    const files = formFiles.length > 0 ? formFiles : singleFile ? [singleFile] : [];

    if (files.length === 0) {
      return NextResponse.json({ message: 'No file provided.' }, { status: 400 });
    }

    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const uploadedUrls: string[] = [];
    for (const currentFile of files) {
      if (typeof currentFile === 'string') {
        return NextResponse.json({ message: 'Invalid file payload.' }, { status: 400 });
      }

      const ext = path.extname(currentFile.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          { message: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF.' },
          { status: 400 },
        );
      }

      const bytes = await currentFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      if (buffer.length > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { message: 'One or more files are too large. Maximum size is 10 MB each.' },
          { status: 400 },
        );
      }

      const filename = `${crypto.randomUUID()}${ext}`;
      await writeFile(path.join(UPLOAD_DIR, filename), buffer);
      uploadedUrls.push(`/uploads/${filename}`);
    }

    return NextResponse.json({ url: uploadedUrls[0], urls: uploadedUrls });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ message: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
