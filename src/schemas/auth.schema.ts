import { ZodType, z } from 'zod';
import { type UserProps, type UserLoginProps, type UserResetPasswordProps } from "@/types/auth";

export const UserSchema: ZodType<UserProps> = z.object({
  name: z.string()
    .min(4, { message: 'Your full name must be at least 4 characters long' }) 
    .max(50, { message: 'Your full name cannot be longer than 50 characters long' }) 
    .regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, { message: 'Your full name should only contain letters and at most one space between words' })
    .optional(),
  username: z.string()
    .min(4, { message: 'Your username must be at least 4 characters long' })
    .max(20, { message: 'Your username cannot be longer than 20 characters long' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Your username should only contain letters, numbers, and underscores' })
    .optional(), 
  email: z.string().email({ message: 'Incorrect email format' }).optional(),
  password: z.string()
    .min(12, { message: 'Your password must be at least 12 characters long' }) 
    .max(128, { message: 'Your password cannot be longer than 128 characters long' }) 
    .regex(/[a-z]/, { message: 'Password should contain at least one lowercase letter' }) 
    .regex(/[A-Z]/, { message: 'Password should contain at least one uppercase letter' }) 
    .regex(/[0-9]/, { message: 'Password should contain at least one digit' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password should contain at least one special character' }) 
    .refine(
      (value) => /^[^\s]+$/.test(value ?? ''), 
      { message: 'Password should not contain whitespace' }
    ),
  role: z.enum(['user', 'admin', 'member']),
  image: z.string().optional(),
});

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: 'You did not enter a valid email' }).optional(),
  password: z.string()
    .min(12, { message: 'Your password must be at least 12 characters long' }) 
    .max(128, { message: 'Your password cannot be longer than 128 characters long' }) 
    .regex(/[a-z]/, { message: 'Password should contain at least one lowercase letter' }) 
    .regex(/[A-Z]/, { message: 'Password should contain at least one uppercase letter' }) 
    .regex(/[0-9]/, { message: 'Password should contain at least one digit' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password should contain at least one special character' }) 
    .refine(
      (value) => /^[^\s]+$/.test(value ?? ''), 
      { message: 'Password should not contain whitespace' }
    ),
  });

export const UserResetPasswordSchema: ZodType<UserResetPasswordProps> = z.object({
  password: z.string()
    .min(12, { message: 'Your password must be at least 12 characters long' }) 
    .max(128, { message: 'Your password cannot be longer than 128 characters long' }) 
    .regex(/[a-z]/, { message: 'Password should contain at least one lowercase letter' }) 
    .regex(/[A-Z]/, { message: 'Password should contain at least one uppercase letter' }) 
    .regex(/[0-9]/, { message: 'Password should contain at least one digit' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password should contain at least one special character' }) 
    .refine(
      (value) => /^[^\s]+$/.test(value ?? ''), 
      { message: 'Password should not contain whitespace' }
    ),
  token: z.string()
  .min(32, { message: 'You must enter a 32 digit hash code' })
  .optional(),
  confirmPassword: z.string(),
}).refine((schema) => schema.password === schema.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const UserEmailNoPasswordSchema: ZodType<UserResetPasswordProps> = z.object({
  email: z.string().email({ message: 'You did not enter a valid email' }).optional()
});
