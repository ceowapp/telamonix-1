// hooks/useContent.ts
import { useState, useEffect } from 'react';
import { PayloadService, ContentData } from '../services/PayloadService';

export function useContent(id?: string, slug?: string) {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(null);

      let result;

      if (id) {
        result = await PayloadService.getContentById(id);
      } else if (slug) {
        result = await PayloadService.getContentBySlug(slug);
      } else {
        setLoading(false);
        setError('Either id or slug must be provided');
        return;
      }

      if (result.success) {
        setContent(result.data);
      } else {
        setError(result.error || 'Failed to fetch content');
      }

      setLoading(false);
    }

    if (id || slug) {
      fetchContent();
    }
  }, [id, slug]);

  return { content, loading, error };
}