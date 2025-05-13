import {
  Home,
  About,
  Solutions,
  SolutionsChild,
  Divisions,
  DivisionsChild,
  Technology,
  Careers,
  CareersContent,
  CareerForm,
  Contact,
  News,
  NewsContent
} from '@/components/importMaps';

// Page components mapping by slug
export const PAGE_COMPONENTS = {
  // Home page (all languages)
  'home': Home,
  '': Home,
  
  // About pages (all languages)
  'about': About,
  've_chung_toi': About,
  'guan_yu_wo_men': About,
  
  // Solutions pages (all languages)
  'solutions': Solutions,
  'giai_phap': Solutions,
  'wo_men_de_jie_jue_fang_an': Solutions,
  
  // Divisions pages (all languages)
  'divisions': Divisions,
  'cac_bo_phan': Divisions,
  'ye_wu_bu_men': Divisions,
  
  // Technology pages (all languages)
  'technology': Technology,
  'cong_nghe': Technology,
  'ji_shu': Technology,
  
  // Careers pages (all languages)
  'careers': Careers,
  'tuyen_dung': Careers,
  'zhi_ye_fa_zhan': Careers,
  
  // Contact pages (all languages)
  'contact': Contact,
  'lien_he': Contact,
  'lian_xi_wo_men': Contact,
  
  // News pages (all languages)
  'news': News,
  'tin_tuc': News,
  'xin_wen': News,
};

// Parent routes with special child page components
export const PARENT_ROUTE_COMPONENTS = {
  // Solutions child pages (all languages)
  'solutions': SolutionsChild,
  'giai_phap': SolutionsChild,
  'wo_men_de_jie_jue_fang_an': SolutionsChild,
  
  // Divisions child pages (all languages)
  'divisions': DivisionsChild,
  'cac_bo_phan': DivisionsChild,
  'ye_wu_bu_men': DivisionsChild,
  
  // News content pages (all languages)
  'news': NewsContent,
  'tin_tuc': NewsContent,
  'xin_wen': NewsContent,
  
  // Careers content pages (all languages)
  'careers': CareersContent,
  'tuyen_dung': CareersContent,
  'zhi_ye_fa_zhan': CareersContent,
};

// Special nested routes (for application forms, etc.)
export const NESTED_ROUTE_COMPONENTS = {
  'careers/apply': CareerForm,
  'tuyen_dung/ung_tuyen': CareerForm,
  'zhi_ye_fa_zhan/shen_qing': CareerForm,
};

// Pages that should have a white background
export const WHITE_BG_PAGES = ['home', 'about', 've_chung_toi', 'guan_yu_wo_men'];

// Pages that should have a padding bottom
export const PADDING_PAGES = ['about', 've_chung_toi', 'guan_yu_wo_men'];

// Pages that should have a navbar white
export const WHITE_NAV_PAGES = [
  'home',
  'divisions', 'phong_ban', 'bu_men', // English, Vietnamese, Chinese for Divisions
  'solutions', 'giai_phap', 'jie_jue_fang_an', // English, Vietnamese, Chinese for Solutions
  'technology', 'cong_nghe', 'ji_shu', // English, Vietnamese, Chinese for Solutions
];

export const PAGES_WITHOUT_POSTS = [
  
  // About pages in all languages
  'about', 've_chung_toi', 'guan_yu_wo_men',
  
  // Contact pages in all languages
  'contact', 'lien_he', 'lian_xi_wo_men',
  
  // Solutions pages in all languages
  'solutions', 'giai_phap', 'wo_men_de_jie_jue_fang_an',

  // Divisions pages in all languages
  'divisions', 'phong_ban', 'jie_jue_fang_an',

  // Technology pages in all languages
  'technology', 'cong_nghe', 'ji_shu',
  
];

export const HOME_SLUG = 'home';

