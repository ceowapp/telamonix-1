import { imageFallbackUrl } from '@/constants/data';
import { getServerSideURL } from './getURL'

export const processImageUrl = (item) => {
  if (item?.imageLink) {
    return item.imageLink;
  }
  if (item?.image?.url) {
    const baseUrl = getServerSideURL();
    return `${baseUrl}${item.image.url}`;
  }
  return imageFallbackUrl;
};
