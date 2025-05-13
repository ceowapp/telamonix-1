import { ARTICLE_SCHEMA } from './schema';

interface ContentResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export class ContentManager {
  private constructor() {}
  private static readonly contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID!;
  private static readonly accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;
  private static readonly previewAccessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!;
  
  static async fetchGraphQL(query: string, preview = false): Promise<any> {
    try {
      if (!this.contentfulSpaceId || !(preview ? this.previewAccessToken : this.accessToken)) {
        throw new Error("Missing required Contentful configuration");
      }
      const response = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${this.contentfulSpaceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              preview ? this.previewAccessToken : this.accessToken
            }`,
          },
          body: JSON.stringify({ query }),
          next: { tags: ["articles"] },
        }
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("GraphQL fetch error:", error);
      throw error;
    }
  }
  
  private static extractArticleEntries(fetchResponse: any) {
    return fetchResponse?.data?.knowledgeArticleCollection?.items || [];
  }
  
  static async getAllArticles(limit = 3, isDraftMode = false): Promise<ContentResponse<any[]>> {
    try {
      const articles = await this.fetchGraphQL(
        `query {
           knowledgeArticleCollection(where:{slug_exists: true}, order: date_DESC, limit: ${limit}, preview: ${
          isDraftMode ? "true" : "false"
        }) {
             items {
               ${ARTICLE_SCHEMA}
             }
           }
         }`,
        isDraftMode
      );
      if (articles.errors) {
        throw new Error(articles.errors[0]?.message || "GraphQL query error");
      }
      const extractedData = this.extractArticleEntries(articles);
      return {
        data: extractedData,
        loading: false,
        error: null
      };
    } catch (error: any) {
      return {
        data: null,
        loading: false,
        error: error.message || "Failed to fetch articles"
      };
    }
  }
  
  static async getArticle(slug: string, isDraftMode = false): Promise<ContentResponse<any>> {
    try {
      if (!slug) {
        throw new Error("Article slug is required");
      }
      const article = await this.fetchGraphQL(
        `query {
           knowledgeArticleCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
          isDraftMode ? "true" : "false"
        }) {
             items {
               ${ARTICLE_SCHEMA}
             }
           }
         }`,
        isDraftMode
      );
      if (article.errors) {
        throw new Error(article.errors[0]?.message || "GraphQL query error");
      }
      const extractedData = this.extractArticleEntries(article);
      if (!extractedData || extractedData.length === 0) {
        throw new Error(`Article with slug "${slug}" not found`);
      }
      return {
        data: extractedData[0],
        loading: false,
        error: null
      };
    } catch (error: any) {
      return {
        data: null,
        loading: false,
        error: error.message || "Failed to fetch article"
      };
    }
  }
}