import { imageFallbackUrl } from '@/constants/data';
import { getServerSideURL } from './getURL'

export const processInfoData = (item: any) => {  
  const getImageUrl = () => {
    if (item?.imageLink) {
      return item.imageLink;
    }
    if (item?.image?.url) {
      const baseUrl = getServerSideURL();
      return `${baseUrl}${item.image.url}`;
    }
    return imageFallbackUrl;
  };
  return {
    imgSrc: getImageUrl(),
    ...item
  };
};
