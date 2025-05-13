import { PageData } from '@/types/page';

export const findSection = (sectionItems: PageData[], sectionId: string) => {
  for (const item of sectionItems) {
    if (item.sectionId === sectionId) {
      return item.content;
    }
  }
  return null; 
};

export const isValidSection = (data: any, format: 'array' | 'object' = 'object') => {
  if (format === 'array') {
    return Array.isArray(data) && data.length > 0;
  } else if (format === 'object') {
    return data && typeof data === "object" && Object.keys(data).length > 0; 
  }
  return false;
};