import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Post } from '../../../payload-types'

const buildPostPath = async (doc: Post, payload?: any, language: string = 'en'): Promise<string> => {
  const slug = doc.slug;
  if (!doc.page) {
    return `/${language}/posts/${slug}`;
  }
  let pageData;
  if (typeof doc.page === 'object' && doc.page.slug) {
    pageData = doc.page;
  } else if (payload && typeof doc.page === 'string') {
    try {
      pageData = await payload.findByID({
        collection: 'pages',
        id: doc.page,
      });
    } catch (error) {
      console.error(`Error retrieving page for post ${doc.id}: ${error.message}`);
    }
  }
  const parentSlug = pageData?.slug;
  return parentSlug ? `/${language}/${parentSlug}/${slug}` : `/${language}/${slug}`;
}

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const language = doc.language || 'en';
      const path = await buildPostPath(doc, payload, language);
      payload.logger.info(`Revalidating post at path: ${path}`);
      revalidatePath(path);
      if (doc.page) {
        let pageSlug;
        if (typeof doc.page === 'object' && doc.page.slug) {
          pageSlug = doc.page.slug;
        } else if (typeof doc.page === 'string') {
          try {
            const pageData = await payload.findByID({
              collection: 'pages',
              id: doc.page,
            });
            if (pageData?.slug) {
              pageSlug = pageData.slug;
            }
          } catch (error) {
            payload.logger.error(`Error retrieving page for post ${doc.id}: ${error.message}`);
          }
        }
        if (pageSlug) {
          payload.logger.info(`Revalidating parent page: /${pageSlug}`);
          revalidatePath(`/${pageSlug}`);
        }
      }
      revalidateTag('posts-sitemap');
    }
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const language = resolvedPreviousDoc.language || 'en';
      const oldPath = await buildPostPath(previousDoc, payload, language);
      payload.logger.info(`Revalidating old post at path: ${oldPath}`);
      revalidatePath(oldPath);
      revalidateTag('posts-sitemap');
    }
  }
  return doc;
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate && doc) {
    const language = doc.language || 'en';
    const path = await buildPostPath(doc, payload, language);
    payload.logger.info(`Revalidating deleted post at path: ${path}`);
    revalidatePath(path);
    if (doc.page) {
      let pageSlug;
      if (typeof doc.page === 'object' && doc.page.slug) {
        pageSlug = doc.page.slug;
      } else if (typeof doc.page === 'string' && payload) {
        try {
          const pageData = await payload.findByID({
            collection: 'pages',
            id: doc.page,
          });
          if (pageData?.slug) {
            pageSlug = pageData.slug;
          }
        } catch (error) {
          console.error(`Error retrieving page for deleted post: ${error.message}`);
        }
      }
      if (pageSlug) {
        payload.logger.info(`Revalidating parent page: /${pageSlug}`);
        revalidatePath(`/${pageSlug}`);
      }
    }
    revalidateTag('posts-sitemap');
  }
  return doc;
}