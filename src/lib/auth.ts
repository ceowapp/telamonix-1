import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { authConfig } from "@/configs/auth.config";
import { v4 as uuidv4 } from 'uuid';
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from 'bcryptjs';
import { z } from "zod";
import dbConnect from '@/lib/mongodb';
import { AuthService } from '@/utils/auth';
import { type UserProps, type Credentials } from "@/types/auth";

const userHelpers = {
  async signUser(user: UserProps, credentials: Credentials) {
    const isValidPassword = await bcrypt.compare(
      credentials.password,
      user.password as string
    );
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    return user;
  },
};

export const authOptions: NextAuthOptions = {
  ...authConfig,
  adapter: MongoDBAdapter(dbConnect),
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: '/auth/error',
  },
  providers: [
    ...(authConfig.providers || []),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }
        const parsed = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }).safeParse(credentials);
        if (!parsed.success) return null;
        const user = await AuthService.getUserByEmail(credentials.email);
        if (user) {
          return userHelpers.signUser(user, credentials as Credentials);
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.APP_ENV === 'development',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name || user.userName;
        try {
          const dbUser = await AuthService.getUserById(user.id);
          if (dbUser) {
            token.role = dbUser.role || 'user';
          }
        } catch (error) {
          console.error('Error fetching user data for JWT:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role || 'user';
      }
      return session;
    },
    async signIn({ user }) {
      if (user) {
        try {
          const dbUser = await AuthService.getUserById(user.id);
          return !!dbUser;
        } catch (error) {
          console.error('Sign-in process failed:', error);
          return false;
        }
      }
      return false;
    },
  },
  events: {
    async signOut({ token }) {
      try {
        /*if (token?.id) {
          await AuthService.deleteUserSessions(token.id);
        }*/
      } catch (error) {
        console.error('Session deletion failed:', error);
      }
    },
  },
  async redirect({ url, baseUrl }) {
    if (url.startsWith(baseUrl)) return url;
    if (url.startsWith('/')) return new URL(url, baseUrl).toString();
    return baseUrl;
  },
};

export const { signIn, signOut, auth } = NextAuth(authOptions);