import { s3Storage } from '@payloadcms/storage-s3'

export const s3Adapter = s3Storage({
  collections: {
    media: true,
    'media-with-prefix': {
      prefix: 'media',
    },
  },
  bucket: process.env.AWS_S3_BUCKET_NAME || '',
  config: {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
    region: process.env.AWS_REGION || 'ap-southeast-2',
  },
});