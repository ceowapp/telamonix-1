export const i18nLanguages = [
  'en',
  'vi',
  'zh',
] as const;

export const selectableLanguages = [
  'en',
  'vi',
  'zh',
] as const;

export const languageCodeToName = {
  'en': 'English',
  'vi': 'Tiếng Việt',
  'zh': '中文',
};

export const flagMap: Record<string, string> = {
  en: "/svgs/compressed_en-flag.svg",
  vi: "/svgs/compressed_vi-flag.svg",
  zh: "/svgs/compressed_zh-flag.svg",
};

export const SUPPORTED_LANGUAGES = ['en', 'vi', 'zh'];

export const DEFAULT_LANGUAGE = 'en';
