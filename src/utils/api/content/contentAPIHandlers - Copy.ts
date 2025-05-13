import axios, { AxiosInstance } from 'axios';
import { toast } from 'sonner';

class ApiError extends Error {
  status?: number;
  originalError?: any;

  constructor(message: string, status?: number, originalError?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.originalError = originalError;
  }
}

interface ContentServiceConfig {
  baseURL?: string;
  timeout?: number;
  cacheLifetime?: number;
}

class CacheManager {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheLifetime: number;

  constructor(cacheLifetime = 5 * 60 * 1000) {
    this.cacheLifetime = cacheLifetime;
  }

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheLifetime) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  clear(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}

type ContentData = {
  pageId?: string;
  sectionId?: string;
  title?: string;
  content?: string;
  slug?: string;
  status?: 'draft' | 'published';
  order?: number;
  [key: string]: any;
};

export interface ContentState {
  loading: boolean;
  error: string | null;
}

export class ContentService {
  private static instance: ContentService;
  private static baseURL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/content` : 'http://localhost:3000/api/content';
  private axiosInstance: AxiosInstance;
  private cacheManager: CacheManager;
  private config: ContentServiceConfig;

  private static initialState: ContentState = {
    loading: false,
    error: null,
  };

  private static state: ContentState = { ...ContentService.initialState };

  private constructor(config: ContentServiceConfig = {}) {
    this.config = {
      baseURL: ContentService.baseURL,
      timeout: 60000,
      cacheLifetime: 5 * 60 * 1000,
      ...config,
    };
    this.axiosInstance = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.cacheManager = new CacheManager(this.config.cacheLifetime);
    this.setupInterceptors();
  }

  public static getInstance(config?: ContentServiceConfig): ContentService {
    if (!this.instance) {
      this.instance = new ContentService(config);
    }
    return this.instance;
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;
        switch (status) {
          case 401:
            this.handleUnauthorized();
            break;
          case 403:
            console.error('You do not have permission');
            break;
          case 404:
            console.error('Resource not found');
            break;
          case 500:
            console.error('Server error occurred');
            break;
          default:
            console.error(errorMessage || 'An unexpected error occurred');
        }
        return Promise.reject(new ApiError(errorMessage, status, error));
      }
    );
  }

  private getAuthToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  }

  private handleUnauthorized() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  }

  private static setState(newState: Partial<ContentState>) {
    ContentService.state = { ...ContentService.state, ...newState };
  }

  public static resetState() {
    this.state = { ...this.initialState }; 
  }

  public static async getAllContent(): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.get();
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error fetching content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async getContentById(id: string): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState(); 
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.get(`/${id}`);
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error fetching content by ID:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async getContentBySlug(slug: string, status?: 'draft' | 'published', pageId?: string): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState(); 
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.get(`/slugs/${slug}`, {
        params: { status, pageId },
      });
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error fetching content by slug:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      if (error.response?.status === 404) {
        return { success: false, error: 'Content not found' };
      }
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async getContentForPage(pageId: string, status: 'published' | 'drafted' | 'archived' , slug?: string): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true }); 
    try {
      const response = await this.instance.axiosInstance.get(`/pages/${pageId}`, {
        params: { status, slug }
      });
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error fetching content for page:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async getContentForSection(pageId: string, sectionId: string, status: 'published' | 'drafted' | 'archived' ): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true }); 
    try {
      const response = await this.instance.axiosInstance.get(`/pages/${pageId}/sections/${sectionId}`, {
        params: { status }
      });
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error fetching content for page:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

   public static async reorderContent(
    pageId: string,
    sectionId: string,
    orderedIds: string[]
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    this.resetState();
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.post(
        `${this.baseURL}/reorder`,
        { pageId, sectionId, orderedIds }
      );
      this.setState({ loading: false });
      toast.success('Content reordered successfully');
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error reordering content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      toast.error('Error reordering content. Please try again.');
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async addContentField(
    id: string,
    fieldPath: string,
    value: any
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    this.resetState();
    this.setState({ loading: true });
    try {
      const updateData: any = {};
      updateData[fieldPath] = value;
      const response = await this.instance.axiosInstance.put(`${this.baseURL}/${id}`, updateData);
      this.setState({ loading: false });
      toast.success('Content field added successfully');
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error adding content field:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      toast.error('Error updating content field. Please try again.');
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async getPages(): Promise<{ success: boolean; data?: any; error?: string }> {
    this.resetState(); 
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.get(`/pages`);
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error fetching pages:', error);
      this.setState({ loading: false });
      return { success: false, error: 'Failed to fetch pages', data: [] };
    }
  }

  public static async getSections(pageId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    this.resetState(); 
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.get(`/api/pages/${pageId}/sections`, {
        params: { pageId }
      });
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error fetching sections:', error);
      this.setState({ loading: false });
      return { success: false, error: 'Failed to fetch sections', data: [] };
    }
  }

  public static async createContent(contentData: ContentData): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.post(`${this.baseURL}`, contentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error creating content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async updateContent(id: string, updateData: ContentData): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.put(`/${id}`, updateData, {
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error updating content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async updateContentBySlug(
    slug: string,
    updateData: ContentData
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      this.setState({ loading: true, error: null });
      const response = this.instance.axiosInstance.put(`/slugs/${slug}`, updateData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error updating content by slug:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async deleteContent(id: string): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.delete(`/${id}`);
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error deleting content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async deleteContentBySlug(slug: string): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.delete(`/slugs/${slug}`);
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error deleting content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async publishContent(id: string): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.put(`/publish/${id}`);
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error deleting content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async publishPage(pageId: string, status: 'published' | 'drafted' | 'archived', slug?: string ): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.put(`/pages/${pageId}`, {
        params: { status, slug }
      });
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error deleting content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  private static handleError(message: string) {
    this.setState({ error: message, loading: false });
    throw new Error(message);
  }

  public static getState(): ContentState {
    return this.state;
  }

  public clearCache(key?: string) {
    this.cacheManager.clear(key);
  }
}

export const contentService = ContentService.getInstance();