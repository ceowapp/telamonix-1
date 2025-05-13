import { imageFallbackUrl } from '@/constants/data';
import { getServerSideURL } from './getURL'

export const processNewsData = (item: any) => {  
  const getImageUrl = () => {
    if (item?.featureImageLink) {
      return item.featureImageLink;
    }
    if (item?.featureImage?.url) {
      const baseUrl = getServerSideURL();
      return `${baseUrl}${item.featureImage.url}`;
    }
    return imageFallbackUrl;
  };
  const getRelativeTime = () => {
    if (!item?.publishedAt) return '';
    const now = new Date();
    const publishDate = new Date(item.publishedAt);
    const diffInSeconds = Math.floor((now.getTime() - publishDate.getTime()) / 1000);
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    }
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  };
  return {
    id: item?.id || '',
    title: item?.title || 'Untitled Article',
    slug: item?.slug || '',
    date: getRelativeTime(),
    imageUrl: getImageUrl(),
    summary: item?.summary || '',
    content: item?.newsFields?.content || ''
  };
};
