import memoize from 'memoize';
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

export const parseRoute = memoize((slug: string[]) => {
  const params = {
    pageSlug: '',
    parentSlug: '',
    childSlug: '',
    extraPath: '',
    isNews: false,
    isCareer: false,
    isSpecialNestedRoute: false
  };
  switch (slug.length) {
    case 0:
      params.pageSlug = HOME_SLUG;
      break;
    case 1:
      params.pageSlug = slug[0];
      break;
    case 2:
      params.parentSlug = slug[0];
      params.childSlug = slug[1];
      params.isNews = ['news', 'tin_tuc', 'xin_wen'].includes(params.parentSlug);
      params.isCareer = ['careers', 'tuyen_dung', 'zhi_ye_fa_zhan'].includes(params.parentSlug);
      break;
    case 3:
      params.parentSlug = slug[0];
      params.extraPath = slug[1];
      params.childSlug = slug[2];
      params.isSpecialNestedRoute = true;
      params.isCareer = ['careers', 'tuyen_dung', 'zhi_ye_fa_zhan'].includes(params.parentSlug);
      break;
  }
  return params;
}, {
  maxAge: 1000 * 60 * 5,
  max: 100,
  primed: {}
});