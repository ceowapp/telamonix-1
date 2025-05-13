import { PayloadRequest, CollectionSlug } from 'payload';

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '',
  pages: '',
};

type Props = {
  collection: keyof typeof collectionPrefixMap;
  slug: string;
  req: PayloadRequest;
  language?: string;
  pageId?: string;
  data?: any;
};

export const generatePreviewPath = ({ collection, slug, req, data, language = 'en' }: Props) => {
  let basePath = '';
  if (collection === 'pages') {
    let parentSlug = '';
    if (data?.parentPage) {
      if (typeof data.parentPage === 'object' && data.parentPage.slug) {
        parentSlug = data.parentPage.slug;
      }
    }
    if (slug === 'home' || !slug) {
      basePath = `/`;
    } else {
      basePath = parentSlug 
        ? `/${parentSlug}/${slug}`
        : `/${slug}`;
    }
  } else if (collection === 'posts') {
    let pageSlug = '';
    if (data?.page) {
      if (typeof data.page === 'object' && data.page.slug) {
        pageSlug = data.page.slug;
      }
    }
    if (pageSlug) {
      basePath = `${collectionPrefixMap.posts}/${pageSlug}/${slug}`;
    } else {
      basePath = `${collectionPrefixMap.posts}/${slug}`;
    }
  } else {
    basePath = `${collectionPrefixMap[collection] || ''}/${slug}`;
  }

  const token = req.user?.token || '';

  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `${basePath}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
    token: token, // Add the token to the query params
  });
  return `/api/preview?${encodedParams.toString()}`;
};