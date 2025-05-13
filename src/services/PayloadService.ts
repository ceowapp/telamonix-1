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

interface PayloadServiceConfig {
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

export type ContentData = {
  id?: string;
  title?: string;
  content?: string;
  slug?: string;
  status?: 'draft' | 'published';
  order?: number;
  pageId?: string;
  sectionId?: string;
  [key: string]: any;
};

export interface ContentState {
  loading: boolean;
  error: string | null;
}

export class PayloadService {
  private static instance: PayloadService;
  private static baseURL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3000/api';
  private axiosInstance: AxiosInstance;
  private cacheManager: CacheManager;
  private config: PayloadServiceConfig;
  private collection: string = 'contents';

  private static initialState: ContentState = {
    loading: false,
    error: null,
  };

  private static state: ContentState = { ...PayloadService.initialState };

  private constructor(config: PayloadServiceConfig = {}) {
    this.config = {
      baseURL: PayloadService.baseURL,
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

  public static getInstance(config?: PayloadServiceConfig): PayloadService {
    if (!this.instance) {
      this.instance = new PayloadService(config);
    }
    return this.instance;
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers['Authorization'] = `JWT ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.errors?.[0]?.message || error.message;
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
    return typeof window !== 'undefined' ? localStorage.getItem('payload-token') : null;
  }

  private handleUnauthorized() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('payload-token');
      window.location.href = '/admin/login';
    }
  }

  private static setState(newState: Partial<ContentState>) {
    PayloadService.state = { ...PayloadService.state, ...newState };
  }

  public static resetState() {
    this.state = { ...this.initialState }; 
  }

  // Generic method to build query params
  private static buildQuery(params: Record<string, any> = {}): string {
    const query: Record<string, any> = { ...params };
    
    if (query.where) {
      query.where = JSON.stringify(query.where);
    }
    
    if (query.sort) {
      query.sort = JSON.stringify(query.sort);
    }
    
    const queryString = new URLSearchParams();
    
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, value.toString());
      }
    });
    
    return queryString.toString();
  }

  public static setCollection(collection: string) {
    this.instance.collection = collection;
    return this;
  }

  public static async getAllContent(limit: number = 100, page: number = 1, sort: string = '-createdAt'): Promise<{
    success: boolean;
    data?: any;
    totalDocs?: number;
    totalPages?: number;
    page?: number;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true });
    try {
      const query = this.buildQuery({
        limit,
        page,
        sort
      });
      
      const response = await this.instance.axiosInstance.get(`/${this.instance.collection}?${query}`);
      this.setState({ loading: false });
      
      return { 
        success: true, 
        data: response.data.docs,
        totalDocs: response.data.totalDocs,
        totalPages: response.data.totalPages,
        page: response.data.page
      };
    } catch (error: any) {
      console.error('Error fetching content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      });
      return { success: false, error: error.response?.data?.errors?.[0]?.message || error.message };
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
      const response = await this.instance.axiosInstance.get(`/${this.instance.collection}/${id}`);
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error fetching content by ID:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      });
      return { success: false, error: error.response?.data?.errors?.[0]?.message || error.message };
    }
  }

  public static async getContentBySlug(slug: string, status?: 'draft' | 'published'): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState(); 
    this.setState({ loading: true });
    try {
      const whereClause: any = {
        slug: { equals: slug }
      };
      
      if (status) {
        whereClause.status = { equals: status };
      }
      
      const query = this.buildQuery({
        where: whereClause,
        limit: 1
      });
      
      const response = await this.instance.axiosInstance.get(`/${this.instance.collection}?${query}`);
      
      if (response.data.docs.length === 0) {
        throw new ApiError('Content not found', 404);
      }
      
      this.setState({ loading: false });
      return { success: true, data: response.data.docs[0] };
    } catch (error: any) {
      console.error('Error fetching content by slug:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      });
      if (error.status === 404) {
        return { success: false, error: 'Content not found' };
      }
      return { success: false, error: error.response?.data?.errors?.[0]?.message || error.message };
    }
  }

  public static async getContentForPage(pageId: string, status?: 'published' | 'draft'): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true }); 
    try {
      const whereClause: any = {
        pageId: { equals: pageId }
      };
      
      if (status) {
        whereClause.status = { equals: status };
      }
      
      const query = this.buildQuery({
        where: whereClause,
        sort: { order: 1 }
      });
      
      const response = await this.instance.axiosInstance.get(`/${this.instance.collection}?${query}`);
      this.setState({ loading: false });
      return { success: true, data: response.data.docs };
    } catch (error: any) {
      console.error('Error fetching content for page:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      });
      return { success: false, error: error.response?.data?.errors?.[0]?.message || error.message };
    }
  }

  public static async getContentForSection(pageId: string, sectionId: string, status?: 'published' | 'draft'): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true }); 
    try {
      const whereClause: any = {
        pageId: { equals: pageId },
        sectionId: { equals: sectionId }
      };
      
      if (status) {
        whereClause.status = { equals: status };
      }
      
      const query = this.buildQuery({
        where: whereClause,
        sort: { order: 1 }
      });
      
      const response = await this.instance.axiosInstance.get(`/${this.instance.collection}?${query}`);
      this.setState({ loading: false });
      return { success: true, data: response.data.docs };
    } catch (error: any) {
      console.error('Error fetching content for section:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      });
      return { success: false, error: error.response?.data?.errors?.[0]?.message || error.message };
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
      // Payload doesn't have a bulk update endpoint, so we need to update each item individually
      const updatePromises = orderedIds.map((id, index) => 
        this.instance.axiosInstance.patch(`/${this.instance.collection}/${id}`, { order: index })
      );
      
      await Promise.all(updatePromises);
      
      this.setState({ loading: false });
      toast.success('Content reordered successfully');
      return { success: true };
    } catch (error: any) {
      console.error('Error reordering content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      });
      toast.error('Error reordering content. Please try again.');
      return { success: false, error: error.response?.data?.errors?.[0]?.message || error.message };
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
      const response = await this.instance.axiosInstance.post(`/${this.instance.collection}`, contentData);
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error creating content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      });
      return { success: false, error: error.response?.data?.errors?.[0]?.message || error.message };
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
      const response = await this.instance.axiosInstance.patch(`/${this.instance.collection}/${id}`, updateData);
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error updating content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      });
      return { success: false, error: error.response?.data?.errors?.[0]?.message || error.message };
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
      const response = await this.instance.axiosInstance.delete(`/${this.instance.collection}/${id}`);
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error deleting content:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      });
      return { success: false, error: error.response?.data?.errors?.[0]?.message || error.message };
    }
  }

  public static async login(email: string, password: string): Promise<{
    success: boolean;
    user?: any;
    token?: string;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true });
    try {
      const response = await this.instance.axiosInstance.post('/users/login', {
        email,
        password,
      });
      
      if (response.data.token) {
        localStorage.setItem('payload-token', response.data.token);
      }
      
      this.setState({ loading: false });
      return { 
        success: true, 
        user: response.data.user,
        token: response.data.token
      };
    } catch (error: any) {
      console.error('Login failed:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      });
      return { success: false, error: error.response?.data?.errors?.[0]?.message || error.message };
    }
  }

  public static async logout(): Promise<{
    success: boolean;
    error?: string;
  }> {
    this.resetState();
    this.setState({ loading: true });
    try {
      await this.instance.axiosInstance.post('/users/logout');
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('payload-token');
      }
      
      this.setState({ loading: false });
      return { success: true };
    } catch (error: any) {
      console.error('Logout failed:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      });
      return { success: false, error: error.response?.data?.errors?.[0]?.message || error.message };
    }
  }

  public static getState(): ContentState {
    return this.state;
  }

  public clearCache(key?: string) {
    this.cacheManager.clear(key);
  }
}

export const payloadService = PayloadService.getInstance();