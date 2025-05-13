type Route = {
  lang: string;
  slug: string;
  segment?: string;
}

export function getSlugByLanguage(
  routes: Route[],
  language: string,
  options?: {
    segment?: string;
    defaultSlug?: string;
  }
): string {
  const { segment, defaultSlug = 'news' } = options || {};
  const route = routes.find(route => route.lang === language);
  const baseSlug = route?.slug ?? defaultSlug;
  return segment ? `${baseSlug}/${segment}` : baseSlug;
}