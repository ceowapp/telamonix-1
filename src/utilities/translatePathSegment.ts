import { routeTranslations } from "@/constants/routes";

export const translatePathSegment = (segment, fromLang, toLang) => {
  for (const [key, value] of Object.entries(routeTranslations[fromLang])) {
    if (value === segment) {
      return routeTranslations[toLang][key] || segment;
    }
  }
  return segment;
};
