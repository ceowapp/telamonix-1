import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { UserLoginProps, UserLoginSchema } from '@/schemas/auth.schema';
import { SignInWithCredentials } from '@/actions/auth';
import { AuthService } from '@/utils/api/auth';

export const useSignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: 'all',
  });

  const handleSignIn = async (values: UserLoginProps) => {
    const { email, password } = values;
    if (!email || !password) {
      setError('Both email and password are required.');
      toast.error('Both email and password are required.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const signInResult = await SignInWithCredentials(email, password);
      if (!signInResult || !signInResult.success) {
        throw new Error(signInResult?.error || "Authentication failed");
      }
      toast.success('Successfully signed in!');
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      console.error('Error signing in:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onHandleSubmit = methods.handleSubmit(async (values: UserLoginProps) => {
    try {
      await handleSignIn(values);
    } catch (err: any) {
      console.error('Submit error:', err);
      toast.error(err.message || 'An error occurred during sign in');
    }
  });

  return {
    methods,
    onHandleSubmit,
    loading,
    error,
  };
};
