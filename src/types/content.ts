export interface PostData {
  id?: string;
  title: string;
  slug?: string;
  category: 'career' | 'news';
  page: string | { id: string; [key: string]: any };
  sectionId: string;
  order?: number;
  summary?: string;
  featureImage?: string | { id: string; url: string };
  featureImageLink?: string;
  newsFields?: {
    content: string;
    publishDate: string;
  };
  careerFields?: {
    jobId?: string;
    title: string;
    tags?: { name: string }[];
    summary?: string;
    responsibilities?: string;
    qualifications?: string;
    address?: string;
    salaryRange?: string;
    background?: string;
  };
  relatedPosts?: string[] | { id: string; title: string }[];
  meta?: {
    title?: string;
    description?: string;
    image?: string | { id: string; url: string };
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface SectionData {
  sectionId: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  backgroundImage?: string;
  sectionContent?: string;
  sectionjson?: Record<string, any>;
  contentArray?: ContentGroup[];
}

export interface ContentGroup {
  groupId: string;
  contentFields: {
    title?: string;
    titleClassName?: string;
    titlePosition: 'start' | 'center' | 'end';
    subtitle?: string;
    description?: string;
    contentItems?: ContentItem[];
  };
}

export interface ContentItem {
  id?: string;
  title?: string;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  content: string;
  contentClassName?: string;
  order: 'imageFirst' | 'infoFirst';
  showButton: 'true' | 'false';
  buttonText?: string;
  image?: string;
  imageLink?: string;
  imageClassName?: string;
  link?: string;
  date?: string;
  customFields?: CustomField[];
}

export interface CustomField {
  fieldName: string;
  fieldType: 'text' | 'richText' | 'number' | 'date' | 'image' | 'link';
  textValue?: string;
  richTextValue?: string;
  numberValue?: number;
  dateValue?: string;
}

export interface PageData {
  pageId: string;
  title: string;
  slug: string;
  language?: string;
  sections?: SectionData[];
}
