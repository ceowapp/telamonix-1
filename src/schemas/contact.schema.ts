import { ZodType, z } from 'zod';
import { type ContentProps } from "@/types/content";

export const sharedContactSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .transform(s => s.trim()),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .toLowerCase(),
  phone: z
    .string()
    .regex(/^(0|84|\+84)\d{7,9}$/, { 
      message: "Please enter a valid phone number (0, 84, +84 and 8-10 digits)" 
  })
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .transform(s => s.trim()),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .toLowerCase(),
  phone: z
    .string()
    .regex(/^(0|84|\+84)\d{7,9}$/, { 
      message: "Please enter a valid phone number (0, 84, +84 and 8-10 digits)" 
  }),  
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must not exceed 1000 characters" })
    .transform(s => s.trim()),
});


export const applicationSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .transform(s => s.trim()),
  phone: z
    .string()
    .regex(/^(0|84|\+84)\d{7,9}$/, { 
      message: "Please enter a valid phone number (0, 84, +84 and 8-10 digits)" 
  }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .toLowerCase(),
  availableTime: z
    .string()
    .min(1, { message: "Time Available is required" })
    .max(200, { message: "Time Available must not exceed 200 characters" }),
  job: z
    .string()
    .min(1, { message: "Job is required" })
    .max(100, { message: "Job title must not exceed 100 characters" }),
  salaryBottom: z
    .string()
    .min(1, { message: "Least Amount is required" })
    .transform((val) => {
      const numericValue = val.replace(/[^\d]/g, '');
      if (!numericValue.match(/^\d+$/)) {
        throw new Error("Please enter a valid number");
      }
      return numericValue;
    }),
  salaryTop: z
    .string()
    .min(1, { message: "Max Amount is required" })
    .transform((val) => {
      const numericValue = val.replace(/[^\d]/g, '');
      if (!numericValue.match(/^\d+$/)) {
        throw new Error("Please enter a valid number");
      }
      return numericValue;
    }),
  attachments: z
    .any()
    .optional(),
}).refine((data) => {
  const bottom = parseInt(data.salaryBottom, 10);
  const top = parseInt(data.salaryTop, 10);
  return !isNaN(bottom) && !isNaN(top) && bottom < top;
}, {
  message: "Max Amount must be greater than Least Amount",
  path: ["salaryTop"],
});