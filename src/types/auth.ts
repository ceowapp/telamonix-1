export type UserProps = {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: 'user' | 'admin' | 'member';
  image?: string;
};

export type Credentials = {
  name?: string;
  email: string;
  password: string;
};

export type UserLoginProps = {
  email?: string;
  password?: string;
};

export type UserResetPasswordProps = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  token?: string;
};

export type ContentProps = {
  title?: string;
  slug: string;
  contentType: string;
  pageId: string;
  status: 'draft' | 'published' | 'archived';
  order?: number;
  content?: Record<string, any>;
  metadata?: Record<string, any>;
};

export type FormProps = {
  id: string
  type: 'email' | 'phone' | 'text' | 'password'| 'otp'
  inputType: 'select' | 'input' | 'phone-input'
  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  name: string
  icon?: LucideIcon
  phone?: string
  otp?: string
}