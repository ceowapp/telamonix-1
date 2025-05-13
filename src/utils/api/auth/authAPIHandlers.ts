import axios from 'axios';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

type SignUpData = {
  name: string;
  email: string;
  password: string;
}

type SignInData = {
  email: string;
  password: string;
}

type RequestData = {
  email: string;
  password: string;
}

type ResetData = {
  token: string;
  password: string;
}

type Session = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  userId?: string;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  session: Session | null;
}

export class AuthService {
  private static baseURL: string = '/api/auth';
  private static state: AuthState = {
    loading: false,
    error: null,
    session: null
  };

  private static setState(newState: Partial<AuthState>) {
    AuthService.state = { ...AuthService.state, ...newState };
  }
  
  public static async signUp(data: SignUpData): Promise<any> {
    try {
      this.setState({ loading: true, error: null });
      if (!data.email?.trim() || !data.password?.trim()) {
        throw new Error('Email and password are required');
      }
      const response = await axios.post<{ success: boolean; user: any }>(
        `${this.baseURL}/signup`,
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data.success) {
        const signInResponse = await this.signIn({
          email: data.email,
          password: data.password
        });
        this.setState({ loading: false, error: null });
        return signInResponse;
      }
      throw new Error('Signup failed');
    } catch (error: any) {
      this.setState({ loading: false });
      if (error.response?.status === 409) {
        toast.info('An account with this email already exists. Please sign in instead.', {
          position: 'top-center',
          duration: 5000,
        });
      } else {
        toast.error(error.response?.data?.error || 'Failed to sign up. Please try again.', {
          position: 'top-center',
          duration: 5000,
        });
      }
      throw error;
    }
  }

  public static async signIn(data: SignInData): Promise<void> {
    try {
      this.setState({ loading: true, error: null });
      const response = await axios.post(`${this.baseURL}/signin`, data);
      if (response.data.error) {
        switch (response.data.code) {
          case 'CREDENTIALS_REQUIRED':
            toast.error('Please enter both email and password');
            break;
          case 'INVALID_FORMAT':
            toast.error('Please enter a valid email and password (minimum 6 characters)');
            break;
          case 'USER_NOT_FOUND':
            toast.error('No account found with this email. Please sign up first.');
            break;
          case 'INVALID_PASSWORD':
            toast.error('Invalid password. Please try again.');
            break;
          default:
            toast.error('Failed to sign in. Please try again.');
        }
        throw new Error(response.data.error);
      }
      this.setState({ 
        loading: false,
        error: null 
      });
      return {
        success: response.data.success,
        redirectUrl: response.data.redirectUrl
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      this.setState({ 
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to sign in'
      });
      throw error;
    }
  }

  public static async sendResetRequest(data: RequestData): Promise<void> {
    try {
      this.setState({ loading: true, error: null });
      const response = await axios.post(`${this.baseURL}/reset-request`, data);
      if (response.data.success) {
        toast.success('An email has been sent to your email address!');
        this.setState({ loading: false, error: null });
        return null;
      }
      return null;
    } catch (error: any) {
      this.setState({ loading: false, error: error.message });
      throw error;
    }
  }

  public static async resetPassword(data: ResetData): Promise<string> {
    try {
      this.setState({ loading: true, error: null });
      const response = await axios.post(`${this.baseURL}/reset-password`, data);
      if (response.data.success) {
        this.setState({ loading: false, error: null });
        return response;
      }
      return null;
    } catch (error: any) {
      this.handleError('Failed to reset password');
      this.setState({ loading: false, error: error.message });
      throw error;
    }
  }

  public static async signOut(userId: string): Promise<string> {
    try {
      this.setState({ loading: true, error: null });
      const response = await axios.post(`${this.baseURL}/signout`, { userId });
      if (response.data.success) {
        this.setState({ loading: false, error: null });
        return response.data;
      }
      return null;
      this.setState({ loading: false, session: null });
    } catch (error) {
      this.handleError('Failed to sign out');
      throw error;
    }
  }

  public static async getSession(): Promise<Session> {
    try {
      this.setState({ loading: true, error: null });
      const response = await axios.get(`${this.baseURL}/get-session`);
      const { session } = response.data;
      this.setState({ loading: false, session });
      return session;
    } catch (error) {
      this.handleError('Failed to get session');
      throw error;
    }
  }

  public static async refreshToken(currentSession: Session): Promise<Session> {
    try {
      this.setState({ loading: true, error: null });
      const response = await axios.post(`${this.baseURL}/refresh_token`, { currentSession });
      const { session } = response.data;
      this.setState({ loading: false, session });
      return session;
    } catch (error) {
      this.handleError('Failed to refresh token');
      throw error;
    }
  }

  //***ADMINISTRATION***//
  public static async getAllUsers(): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    try {
      this.setState({ loading: true, error: null });
      const response = await axios.get(`${this.baseURL}/users`);
      this.setState({ loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error fetching users:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      toast.error('Error fetching users. Please try again.');
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async getUser(
    id: string,
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      this.setState({ loading: true, error: null });
       const response = await axios.get(
        `${this.baseURL}/users/${id}`, {
          params: { id }
        }
      );
      this.setState({ loading: false });
      toast.success('User retrieved successfully');
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error retrieving user:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      toast.error('Error retrieving user. Please try again.');
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async createUser(userData: any): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    try {
      this.setState({ loading: true, error: null });
      const response = await axios.post(`${this.baseURL}/users`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.setState({ loading: false });
      toast.success('User created successfully');
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error creating user:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      if (error.response?.status === 409) {
        toast.info('A user with that email or username already exists.');
      } else {
        toast.error('Error creating user. Please try again.');
      }
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async updateUser(
    id: string,
    updateData: any
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      this.setState({ loading: true, error: null });
      const response = await axios.put(`${this.baseURL}/users/${id}`, updateData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.setState({ loading: false });
      toast.success('User updated successfully');
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error updating user:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      toast.error('Error updating user. Please try again.');
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  public static async deleteUser(
    id: string,
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      this.setState({ loading: true, error: null });
      const response = await axios.delete(
        `${this.baseURL}/users/${id}`, {
          params: { id }
        }
      );
      this.setState({ loading: false });
      toast.success('User deleted successfully');
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error deleting user:', error);
      this.setState({
        loading: false,
        error: error.response?.data?.error || error.message,
      });
      toast.error('Error deleting user. Please try again.');
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  private static handleError(message: string) {
    this.setState({ error: message, loading: false });
    throw new Error(message);
  }

  public static getState(): AuthState {
    return this.state;
  }
}


