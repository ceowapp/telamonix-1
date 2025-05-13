import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }
    const maxFilesAllowed = 10;
    if (files.length > maxFilesAllowed) {
      return NextResponse.json({ 
        error: `Too many files. Maximum of ${maxFilesAllowed} files allowed.` 
      }, { status: 400 });
    }
    const allowedTypes = [
      'application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain', 'application/rtf', 'image/jpeg', 'image/png',
      'image/gif', 'image/webp', 'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv', 'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/zip', 'application/x-rar-compressed'
    ];
    const maxSize = 10 * 1024 * 1024;
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        if (!allowedTypes.includes(file.type)) {
          return {
            success: false,
            filename: file.name,
            error: `Invalid file type: ${file.type}. Please upload a supported file format.`
          };
        }
        if (file.size > maxSize) {
          return {
            success: false,
            filename: file.name,
            error: `File too large. Maximum size is 10MB.`
          };
        }
        try {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          if (!buffer || buffer.length === 0) {
            return {
              success: false,
              filename: file.name,
              error: 'Failed to read file data'
            };
          }
          const getFileCategory = (mimeType: string) => {
            if (mimeType.startsWith('image/')) return 'image';
            if (mimeType.includes('pdf') || mimeType.includes('word') || mimeType.includes('text')) return 'document';
            if (mimeType.includes('excel') || mimeType.includes('csv')) return 'spreadsheet';
            if (mimeType.includes('powerpoint')) return 'presentation';
            if (mimeType.includes('zip') || mimeType.includes('rar')) return 'archive';
            return 'other';
          };
          const payload = await getPayload({ config: configPromise });
          const uploadedFile = await payload.create({
            collection: 'media',
            data: {
              alt: `${getFileCategory(file.type)} - ${file.name || 'unnamed-file'}`,
              category: getFileCategory(file.type),
              description: `Uploaded by ${formData.get('name') || 'applicant'}`
            },
            file: {
              data: buffer,
              name: file.name.slice(0, 100),
              mimetype: file.type,
              size: file.size
            }
          });
          return {
            success: true,
            fileId: uploadedFile.id,
            filename: uploadedFile.filename,
            url: uploadedFile.url,
            mimeType: file.type,
            size: file.size
          };
        } catch (error) {
          console.error(`Error uploading file ${file.name}:`, error);
          return {
            success: false,
            filename: file.name,
            error: 'Failed to upload file'
          };
        }
      })
    );
    const failedUploads = uploadResults.filter(result => !result.success);
    const successfulUploads = uploadResults.filter(result => result.success);
    if (failedUploads.length > 0 && failedUploads.length === files.length) {
      return NextResponse.json({
        success: false,
        message: 'All file uploads failed',
        errors: failedUploads
      }, { status: 500 });
    }
    return NextResponse.json({
      success: true,
      message: failedUploads.length > 0 ? 'Some files uploaded successfully' : 'All files uploaded successfully',
      files: successfulUploads,
      failedUploads: failedUploads.length > 0 ? failedUploads : undefined
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process file uploads' },
      { status: 500 }
    );
  }
}
