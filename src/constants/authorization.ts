"use client";
import { 
  Phone,
  Mail,
  KeyRound,
  type LucideIcon
} from "lucide-react";

export const roles = ["admin", "member", "user"];

export type AuthProviderProps = {
  id: string;
  provider: string;
  name: string;
  logo?: string;
  icon?: LucideIcon;
};

export const BASE_PROVIDERS: AuthProviderProps[] = [
 {
   id: '1',
   provider: 'google',
   name: 'Google',
   logo: '/images/auth/logo_google.png'
 },
 {
   id: '2',
   provider: 'microsoft',
   name: 'Microsoft', 
   logo: '/images/auth/logo_microsoft.png'
 },
 {
   id: '3',
   provider: 'github',
   name: 'Github',
   logo: '/images/auth/logo_github.png'
 }
];
