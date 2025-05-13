import type { Metadata } from 'next';
import { cache } from 'react';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

// Centralized imports and constants
import { 
  SUPPORTED_LANGUAGES, 
  DEFAULT_LANGUAGE 
} from '@/constants/language';

import { 
  careerRoutes, 
  newsRoutes 
} from '@/constants/routes'

import {
  HOME_SLUG,
  PAGE_COMPONENTS,
  PARENT_ROUTE_COMPONENTS,
  NESTED_ROUTE_COMPONENTS,
  WHITE_BG_PAGES,
  PADDING_PAGES,
  WHITE_NAV_PAGES,
  PAGES_WITHOUT_POSTS
} from '@/data';

// Type imports
import type { Page, Post } from '@/payload-types';
import type { PageParams } from '@/types/page';

// Utility imports
import { sanitizeDataForClient } from '@/utilities/sanitizeDataForClient';
import { parseRoute } from '@/utilities/parseRoute';
import { generateMeta } from '@/utilities/generateMeta';
import { cn } from '@/lib/utils';

// Component imports
import { PayloadRedirects } from '@/components/shared/PayloadRedirects';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { AdminBar } from '@/components/admin/AdminBar';
import { LivePreviewListener } from '@/components/shared/LivePreviewListener';

//export const revalidate = 3600;

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      parentPage: true,
      id: true
    },
  });
  
  // Fetch news posts
  const newsPosts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: {
      category: { equals: 'news' }
    },
    select: {
      slug: true,
    },
  });
  
  // Fetch career posts
  const careerPosts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: {
      category: { equals: 'career' }
    },
    select: {
      id: true,
    },
  });
  
  const params = [];
  
  // Add root route
  params.push({ lang: DEFAULT_LANGUAGE, slug: [] });
  
  // Add language-only routes
  SUPPORTED_LANGUAGES.forEach(lang => {
    params.push({ lang, slug: [] });
  });
  
  // Add all page combinations
  pages.docs.forEach(page => {
    if (page.slug !== HOME_SLUG) {
      SUPPORTED_LANGUAGES.forEach(lang => {
        // Ensure slug is a string
        const pageSlug = String(page.slug);
        
        // Simple page routes
        params.push({ lang, slug: [pageSlug] });
        
        // Check if parentPage is an object or an ID
        const parentPageId = typeof page.parentPage === 'object' ? page.parentPage?.id : page.parentPage;
        
        // Child page routes
        if (!parentPageId) {
          const childPages = pages.docs.filter(p => {
            const pParentPageId = typeof p.parentPage === 'object' ? p.parentPage?.id : p.parentPage;
            return pParentPageId === page.id;
          });
          
          childPages.forEach(childPage => {
            // Ensure childPage slug is a string
            const childSlug = String(childPage.slug);
            params.push({ lang, slug: [pageSlug, childSlug] });
          });
        }
      });
    }
  });
  
  // News routes
  newsRoutes.forEach(route => {
    newsPosts.docs.forEach(post => {
      // Ensure post slug is a string
      const postSlug = String(post.slug);
      params.push({ lang: route.lang, slug: [route.slug, postSlug] });
    });
  });
  
  // Career routes
  careerRoutes.forEach(route => {
    careerPosts.docs.forEach(post => {
      // Ensure post id is a string
      const postId = String(post.id);
      
      // Regular career post view - careers/[id]
      params.push({ lang: route.lang, slug: [route.slug, postId] });
      
      // Career application - careers/apply/[id]
      params.push({ lang: route.lang, slug: [route.slug, route.segment, postId] });
    });
  });
  return params;
}

// Cache the page query to improve performance
const queryPageBySlug = cache(async ({ 
  slug, 
  parentPage,
  language = DEFAULT_LANGUAGE,
  extraPath
}: { 
  slug: string; 
  parentPage?: string;
  language: string;
  extraPath?: string;
}): Promise<Page | null> => {
  try {
    const { isEnabled: draft } = await draftMode();
    const payload = await getPayload({ config: configPromise });
    
    // Build the query
    const query: any = {
      and: [
        { slug: { equals: slug } }
      ]
    };
    
    // Handle parent page relationship
    if (parentPage) {
      const parentResult = await payload.find({
        collection: 'pages',
        where: {
          slug: { equals: parentPage }
        },
        limit: 1
      });
      
      const parentPageId = parentResult.docs[0]?.id;
      if (parentPageId) {
        query.and.push({ parentPage: { equals: parentPageId } });
      } else {
        // If parent page not found, log warning but don't add parentPage filter
        // This allows finding the page even if the parent relationship is broken
        console.warn(`Parent page not found for slug: ${parentPage}`);
      }
    } else {
      query.and.push({ parentPage: { exists: false } });
    }
    
    // Add extra path filter if needed (for routes like careers/apply/[id])
    /*if (extraPath) {
      query.and.push({ extraPath: { equals: extraPath } });
    }*/

    console.log(`Querying page. Slug: ${slug}, Parent: ${parentPage || 'none'}, Language: ${language}`);
    console.log("Query:", JSON.stringify(query, null, 2));
    
    // Fetch the page
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      locale: language,
      where: query,
    });
    
    const page: Page | null = result.docs[0] || null;
    if (!page) {
      console.log(`Page not found for slug: ${slug}, parent: ${parentPage || 'none'}, language: ${language}`);
      return null;
    }
    
    // Process page sections
    const pageSections = page.sectionsTab?.sections || [];
    page.sections = pageSections;
    
    const skipPostFetching = PAGES_WITHOUT_POSTS.includes(slug) || 
    (parentPage && PAGES_WITHOUT_POSTS.includes(parentPage));

    // Fetch related posts if the page has sections
    if (pageSections.length > 0 && !skipPostFetching) {
      const postsResult = await payload.find({
        collection: 'posts',
        draft,
        limit: 100,
        pagination: false,
        overrideAccess: draft,
        locale: language,
        where: {
          page: { equals: page.id },
        },
        sort: 'order',
      });
      
      const postsBySection: Record<string, Post[]> = {};
      postsResult.docs.forEach((post: Post) => {
        const sectionId = post?.sectionId;
        if (sectionId) {
          if (!postsBySection[sectionId]) {
            postsBySection[sectionId] = [];
          }
          postsBySection[sectionId].push(post);
        }
      });
      
      // Attach posts to their respective sections
      page.sections = pageSections.map(section => ({
        ...section,
        posts: postsBySection[section?.sectionId || ''] || [],
      }));
    }
    
    return sanitizeDataForClient(page);
  } catch (error) {
    console.error(`Error querying page by slug: ${slug}`, error);
    return null;
  }
});

// Query post by ID - for careers/[id]
const queryPostById = cache(async ({ id, language = 'en' }: { id: string, language: string }) => {
  try {
    const { isEnabled: draft } = await draftMode();
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'posts',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      locale: language,
      where: {
        id: { equals: id },
        category: { equals: 'careers' }
      },
    });
    
    const post = result.docs?.[0] || null;
    if (!post || !post.relatedPosts || !post.relatedPosts.length) {
      return post;
    }
    
    const relatedPostIds = post.relatedPosts.map(relatedPost => 
      typeof relatedPost === 'string' ? relatedPost : relatedPost.id
    ).filter(Boolean);
    
    if (relatedPostIds.length === 0) {
      return post;
    }
    
    const relatedPostsResult = await payload.find({
      collection: 'posts',
      draft,
      overrideAccess: draft,
      pagination: false,
      locale: language,
      where: {
        id: {
          in: relatedPostIds,
        },
      },
    });
    
    const fullPost = {
      ...post,
      relatedPosts: relatedPostsResult.docs || [],
    };
    
    return sanitizeDataForClient(fullPost);
  } catch (error) {
    console.error(`Error querying post by ID: ${id}`, error);
    return null;
  }
});

// Query post by slug - for news/[slug]
const queryPostBySlug = cache(async ({ slug, language = 'en' }: { slug: string, language: string }) => {
  try {
    const { isEnabled: draft } = await draftMode();
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'posts',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      locale: language,
      where: {
        slug: { equals: slug },
        category: { equals: 'news' }
      },
    });
    
    const post = result.docs?.[0] || null;
    if (!post || !post.relatedPosts || !post.relatedPosts.length) {
      return sanitizeDataForClient(post);
    }
    
    const relatedPostIds = post.relatedPosts.map(relatedPost => 
      typeof relatedPost === 'string' ? relatedPost : relatedPost.id
    ).filter(Boolean);
    
    if (relatedPostIds.length === 0) {
      return sanitizeDataForClient(post);
    }
    
    const relatedPostsResult = await payload.find({
      collection: 'posts',
      draft,
      overrideAccess: draft,
      pagination: false,
      locale: language,
      where: {
        id: {
          in: relatedPostIds,
        },
      },
    });
    
    const fullPost = {
      ...post,
      relatedPosts: relatedPostsResult.docs || [],
    };
    
    return sanitizeDataForClient(fullPost);
  } catch (error) {
    console.error(`Error querying post by slug: ${slug}`, error);
    return null;
  }
});

export default async function Page({ params: paramsPromise }: PageParams) {
  try {
    const params = await paramsPromise;
    const { lang = DEFAULT_LANGUAGE, slug = [] } = params;
    const language = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
    if (language !== lang) {
      const path = `/${language}/${slug.join('/')}`;
      return <PayloadRedirects url={path} />;
    }
    const routeParams = parseRoute(slug);
    const { 
      pageSlug, 
      parentSlug, 
      childSlug, 
      extraPath, 
      isNews, 
      isCareer, 
      isSpecialNestedRoute 
    } = routeParams;
    const PageComponent = 
      NESTED_ROUTE_COMPONENTS[`${parentSlug}/${extraPath}`] ||
      PARENT_ROUTE_COMPONENTS[parentSlug] ||
      PAGE_COMPONENTS[pageSlug] ||
      PAGE_COMPONENTS[HOME_SLUG];
    let page: Page | null = null;
    let post: Post | null = null;
    if (isNews) {
      post = await queryPostBySlug({ slug: childSlug, language });
    } else if (isCareer) {
      post = await queryPostById({ id: childSlug, language });
    } else if (isSpecialNestedRoute) {
      post = await queryPostById({ id: childSlug, language });
      page = await queryPageBySlug({ 
        slug: extraPath, 
        parentPage: parentSlug,
        language
      });
    } else if (parentSlug && childSlug) {
      page = await queryPageBySlug({ 
        slug: childSlug, 
        parentPage: parentSlug, 
        language 
      });
    } else {
      page = await queryPageBySlug({ 
        slug: pageSlug || HOME_SLUG, 
        language 
      });
    }
    if (!page && !post) {
      return <PayloadRedirects url={`/${language}/404`} />;
    }
    const sections = page?.sections || [];
    const displaySlug = childSlug || pageSlug || parentSlug || HOME_SLUG;
    const bgColor = WHITE_BG_PAGES.includes(displaySlug) ? 'bg-white' : 'bg-lightGrey';
    const isDark = (
      (parentSlug === 'divisions' && WHITE_NAV_PAGES.includes(parentSlug)) || 
      (parentSlug !== 'solutions' && WHITE_NAV_PAGES.includes(displaySlug))
    ) ? false : true;    
    const paddingBottom = PADDING_PAGES.includes(displaySlug) ? 'mb-12' : '';
    return (
      <div className={bgColor}>
        <Navbar language={language} isDark={isDark} />
        <main className={cn(bgColor, paddingBottom)}>
          <PageComponent 
            {...(isNews || isCareer || isSpecialNestedRoute 
              ? { data: post } 
              : { sections }
            )}
            language={language} 
          />
        </main>
        <Footer language={language} />
      </div>
    );
  } catch (error) {
    console.error("Page rendering error:", error);
    return (
      <div className="bg-lightGrey">
        <Navbar language={DEFAULT_LANGUAGE} isDark={true} />
        <main className="container mx-auto py-20 px-4">
          <h1 className="text-3xl font-bold mb-4">Page Error</h1>
          <a href={`/${DEFAULT_LANGUAGE}`} className="text-blue-600 hover:underline">Return Home</a>
        </main>
        <Footer language={DEFAULT_LANGUAGE} />
      </div>
    );
  }
}

export async function generateMetadata({ params: paramsPromise }: PageParams): Promise<Metadata> {
  try {
    const params = await paramsPromise;
    const { lang = DEFAULT_LANGUAGE, slug = [] } = params;
    const language = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
    const routeParams = parseRoute(slug);
    const { 
      pageSlug, 
      parentSlug, 
      childSlug, 
      extraPath, 
      isNews, 
      isCareer, 
      isSpecialNestedRoute 
    } = routeParams;
    let doc = null;
    if (isNews) {
      // For news/[slug], use queryPostBySlug
      doc = await queryPostBySlug({ slug: childSlug, language });
    } else if (isCareer) {
      // For careers/[id] or careers/apply/[id], use queryPostById
      doc = await queryPostById({ id: childSlug, language });
    } else if (extraPath) {
      doc = await queryPageBySlug({ 
        slug: extraPath, 
        parentPage: parentSlug,
        language
      });
    } else if (parentSlug && childSlug) {
      doc = await queryPageBySlug({ 
        slug: childSlug, 
        parentPage: parentSlug, 
        language 
      });
    } else {
      doc = await queryPageBySlug({ slug: pageSlug || HOME_SLUG, language });
    }
    // Fallback to default language if doc not found in requested language
    if (!doc && language !== DEFAULT_LANGUAGE) {
      if (isNews) {
        doc = await queryPostBySlug({ slug: childSlug, language: DEFAULT_LANGUAGE });
      } else if (isCareer) {
        doc = await queryPostById({ id: childSlug, language: DEFAULT_LANGUAGE });
      } else if (extraPath) {
        doc = await queryPageBySlug({ 
          slug: extraPath, 
          parentPage: parentSlug,
          language: DEFAULT_LANGUAGE
        });
      } else if (parentSlug && childSlug) {
        doc = await queryPageBySlug({ 
          slug: childSlug, 
          parentPage: parentSlug, 
          language: DEFAULT_LANGUAGE 
        });
      } else {
        doc = await queryPageBySlug({ slug: pageSlug || HOME_SLUG, language: DEFAULT_LANGUAGE });
      }
    }
    return generateMeta({ doc });
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Page",
      description: "Page description"
    };
  }
}



