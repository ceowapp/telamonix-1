"use client";
import { 
  User,
  Mail,
  Lock,
  KeyRound,
  Sparkles,
  Image, 
  Tag, 
  Clock,
  Star, 
  ListChecks, 
  type LucideIcon
} from "lucide-react";
import { type FormProps } from '@/types/auth';

export const USER_LOGIN_FORM: FormProps[] = [
  {
    id: '1',
    inputType: 'input',
    placeholder: 'Enter your email',
    name: 'email',
    type: 'email',
    icon: Mail
  },
  {
    id: '2',
    inputType: 'input',
    placeholder: 'Password',
    name: 'password',
    type: 'password',
    icon: KeyRound
  },
]