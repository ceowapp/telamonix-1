import { FieldErrors, FieldValues, UseFormRegister, UseFormTrigger, Control, Controller, UseFormSetValue, UseFormWatch, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export interface FormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

export interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FormData>;
  name: keyof FormData;
  errors: FieldErrors<FormData>;
}

export interface ContactFormProps {
  contactFields: {
    label: string;
    type: string;
    name: keyof FormData;
    placeholder: string;
  }[];
  contactSchema: z.ZodType<FormData>;
}
