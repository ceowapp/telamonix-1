import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Page } from '../../../payload-types'

const buildPath = (doc: Page, language: string = 'en'): string => {
  const { slug, parentPage } = doc;
  if (slug === 'home') return `/${language}`;
  let parentSlug = '';
  if (parentPage) {
    if (typeof parentPage === 'object' && parentPage.slug) {
      parentSlug = parentPage.slug;
    }
  }
  return parentSlug 
    ? `/${language}/${parentSlug}/${slug}` 
    : `/${language}/${slug}`;
}

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    let resolvedDoc = { ...doc };
    if (doc.parentPage && typeof doc.parentPage !== 'object') {
      try {
        const parentPage = await payload.findByID({
          collection: 'pages',
          id: doc.parentPage,
        });
        
        if (parentPage) {
          resolvedDoc.parentPage = parentPage;
        }
      } catch (error) {
        payload.logger.error(`Error retrieving parent page for ${doc.id}: ${error.message}`);
      }
    }
    
    let resolvedPreviousDoc = previousDoc ? { ...previousDoc } : null;
    if (previousDoc?.parentPage && typeof previousDoc.parentPage !== 'object') {
      try {
        const parentPage = await payload.findByID({
          collection: 'pages',
          id: previousDoc.parentPage,
        });
        
        if (parentPage) {
          resolvedPreviousDoc.parentPage = parentPage;
        }
      } catch (error) {
        payload.logger.error(`Error retrieving previous parent page for ${previousDoc.id}: ${error.message}`);
      }
    }
    
    if (doc._status === 'published') {
      const language = doc.language || 'en';
      const path = buildPath(resolvedDoc, language);
      payload.logger.info(`Revalidating page at path: ${path}`);
      revalidatePath(path);
      revalidateTag('pages-sitemap');
    }
    
    if (resolvedPreviousDoc?._status === 'published' && doc._status !== 'published') {
      const language = resolvedPreviousDoc.language || 'en';
      const oldPath = buildPath(resolvedPreviousDoc, language);
      payload.logger.info(`Revalidating old page at path: ${oldPath}`);
      revalidatePath(oldPath);
      revalidateTag('pages-sitemap');
    }
  }
  return doc;
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate && doc) {
    let resolvedDoc = { ...doc };
    if (doc.parentPage && typeof doc.parentPage !== 'object') {
      try {
        const parentPage = await payload.findByID({
          collection: 'pages',
          id: doc.parentPage,
        });
        
        if (parentPage) {
          resolvedDoc.parentPage = parentPage;
        }
      } catch (error) {
        payload.logger.error(`Error retrieving parent page for ${doc.id}: ${error.message}`);
      }
    }
    const language = doc.language || 'en';
    const path = buildPath(resolvedDoc, language);
    payload.logger.info(`Revalidating deleted page at path: ${path}`);
    revalidatePath(path);
    revalidateTag('pages-sitemap');
  }
  return doc;
}