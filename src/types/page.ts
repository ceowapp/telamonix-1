import type { Page } from '@/payload-types'

export enum IPage {
  HOME = 'home',
  ABOUT = 'about',
  CONTACT = 'contact',
  SOLUTIONS = 'solutions',
  DIVISIONS = 'divisions',
  TECHNOLOGY = 'technology',
  CAREER = 'careers',
  NEWS = 'news'
}

export enum ICareersSection {
  MAIN = 'main',
}

export enum IHomeSection {
  PROJECTS = 'projects',
}

export enum IDivisionsSection {
  MAIN = 'main',
  HEADING= 'heading',
  NEWS = 'news',
  CONTENT = 'content',
  OFFER = 'offer'
  CONNECT = 'connect'
}

export enum ISolutionsSection {
  MAIN = 'main',
  HEADING= 'heading',
  CONTENT = 'content',
}

export enum ITechnologySection {
  CONTENT = 'content',
}

export enum ISlug {
  PRODUCTION = 'production',
  FNB = 'fnb',
  INSURTECH = 'insurtech',
  ROBOTICS = 'robotics',
  INVESTMENT = 'investment'
}

export enum IStatus {
  PUBLISHED = 'published',
  DRAFT = 'drafted',
  ARCHIVED = 'archived'
}

export interface IPageData {
  _id: string;
  title: string;
  pageId: string;
  sectionId: string;
  contentType?: string;
  slug: string;
  status?: string;
  order?: number; 
  content: any;
  metadata: object;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type IPostType = {
  id: string;
  title: string;
  summary: string;
  content: any;
  sectionId?: string;
};

export type ISectionType = {
  id?: string;
  sectionId?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  sectionContent?: any;
  contentItems?: any[];
  sectionVisibility?: string;
  posts?: PostType[];
};

export type IPageType = RequiredDataFromCollectionSlug<'pages'> & {
  sections?: SectionType[];
};

export type IPageParams = {
  params: Promise<{
    slug?: string
    id?: string
  }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface ISectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: 'en' | 'vi' | 'ja';
  loading?: boolean;
  error?: string | null;
  handleScrollTo?: () => void;
}