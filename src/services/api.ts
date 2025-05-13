export async function fetchPageContent(slug, language) {
  try {
    const response = await fetch(`/api/pages?where[and][0][slug][equals]=${slug}&where[and][1][language][equals]=${language}&depth=2`);
    const data = await response.json();
    if (data.docs && data.docs.length > 0) {
      return data.docs[0];
    }
    if (language !== 'en') {
      console.log('Content not found in selected language, falling back to English');
      return fetchPageContent(slug, 'en');
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return null;
  }
}