import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  title: "Telamonix",
  description: "The connected workspace where better, faster work happens.",
  url: 'https://telamonix.vercel.app',
  siteName: 'Telamonix',
  images: [
    {
      url: '/images/logo.png',
      width: 1200,
      height: 630,
    }
  ],
  locale: 'en_US',
};

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}


