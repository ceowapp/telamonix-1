import { ZodType, z } from 'zod';
import { type ContentProps } from "@/types/content";

export const ContentSchema: ZodType<ContentProps> = z.object({
  title: z.string().optional(),
  slug: z
    .string()
    .optional()
    .transform((val) => (val ? val.toLowerCase() : val)),
  contentType: z.string().min(1, 'Content type is required'),
  
  pageId: z
    .string()
    .min(1, 'Page ID is required')
    .regex(/^[a-z]+$/, 'Page ID must contain only lowercase letters')
    .transform((val) => val.toLowerCase()),

  sectionId: z
    .string()
    .min(1, 'Section ID is required')
    .regex(/^[a-z]+$/, 'Section ID must contain only lowercase letters')
    .transform((val) => val.toLowerCase()),

  status: z.enum(['drafted', 'published', 'archived']),
  order: z.number().int().min(0).default(0),
  content: z.union([z.array(z.any()), z.record(z.any())]).default({}),
  metadata: z.record(z.any()).default({}),
});
