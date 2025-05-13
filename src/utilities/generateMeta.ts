import type { Metadata } from 'next'
import type { Media, Page, Post, Config } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = serverUrl + '/website-template-OG.webp'
  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }
  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args
  const ogImage = getImageURL(doc?.meta?.image)
  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Innovative Solutions for Modern Businesses'
    : 'Naiscorp | Innovative Solutions for Modern Businesses'
  const siteName = 'Naiscorp'
  const baseUrl = getServerSideURL()
  const isHomePage = Array.isArray(doc?.slug) ? doc?.slug.includes('home') : doc?.slug === 'home'
  const slugPath = isHomePage 
    ? '' 
    : `${Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug || ''}`
  const canonicalUrl = doc?.meta?.canonical || `${baseUrl}/${slugPath}`
  const twitterCard = doc?.meta?.twitter?.card || 'summary_large_image'
  const twitterSite = doc?.meta?.twitter?.site || '@naiscorp'
  const twitterCreator = doc?.meta?.twitter?.creator || twitterSite
  const additionalMetaTags = doc?.meta?.additionalMetaTags?.map(tag => ({
    name: tag.name,
    content: tag.content,
  })) || []
  return {
    title,
    description: doc?.meta?.description || '',
    keywords: doc?.meta?.keywords || 'Naiscorp, technology solutions, innovation, digital transformation',
    openGraph: mergeOpenGraph({
      title,
      description: doc?.meta?.description || '',
      url: isHomePage ? '/' : (Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug || ''),
      siteName,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
      type: 'website',
    }),
    twitter: {
      card: twitterCard as 'summary' | 'summary_large_image' | 'app' | 'player',
      site: twitterSite,
      creator: twitterCreator,
      title,
      description: doc?.meta?.description || '',
      images: ogImage ? [ogImage] : undefined,
    },
    robots: doc?.meta?.robots || 'index, follow',
    canonical: canonicalUrl,
    other: additionalMetaTags,
  }
}
