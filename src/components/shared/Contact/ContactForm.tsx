"use client"

import { toast } from 'sonner';
import { motion } from 'framer-motion';
import * as z from 'zod';
import { cn } from "@/lib/utils";
import React, { memo, useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { FieldErrors, FieldValues, UseFormRegister, UseFormTrigger, Control, Controller, UseFormSetValue, UseFormWatch, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, InputProps, ContactFormProps } from '@/types/contact';

const InputField = ({ 
  language = 'en',
  label, 
  labelClassName, 
  inputClassName, 
  type, 
  placeholder, 
  register, 
  name, 
  errors 
}: InputProps) => {
  const isMessageField = name === 'message';
  const commonClasses = cn(`w-full ${isMessageField ? 'min-h-[80px]' : 'h-12'} 
    bg-gray-600/50 border-[1px] border-[#E7E7E7] 
    rounded-[8px] px-3 py-2 text-body-regular-contact
    placeholder-[#D1D1D1] focus:outline-none focus:ring-2 focus:ring-blue-500
    transition-all duration-300`, inputClassName);
  return (
    <div className="relative flex flex-col space-y-1.5 z-50">
      <label className={cn("text-body-regular-contact", labelClassName)}>{label}</label>
      {isMessageField ? (
        <textarea
          lang={language}
          {...register(name)}
          placeholder={placeholder}
          className={commonClasses}
          rows={4}
        />
      ) : (
        <input
          lang={language}
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={commonClasses}
        />
      )}
      {errors[name] && <p className="text-body-regular-error mt-1">{errors[name]?.message}</p>}
    </div>
  );
};

export const ContactForm: React.FC<ContactFormProps> = ({
  language = 'en',
  mapData, 
  labelClassName, 
  inputClassName, 
  isContactPage = false, 
  contactTitleClassName, 
  contactDescriptionClassName, 
  contactFields, 
  contactSchema 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    mode: 'all',
  });
  const onSubmit = useCallback(async (data: FormData) => {
    try {
      const response = await fetch('/api/send_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, formType: 'contact' }),
      });
      if (!response.ok) {
        throw new Error((await response.json()).message || 'Failed to send message');
      }
      toast.success(`Message sent successfully!`, {
        icon: '✅',
        duration: 3000,
        position: 'bottom-center',
        className: 'success-toast'
      });
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(`An error occurred. Please try again later.`, {
        icon: '❌',
        duration: 3000,
        position: 'bottom-center',
        className: 'error-toast'
      });
    }
  }, [reset]);

  return (
    <div className="w-full flex flex-col lg:col-span-5 xl:col-span-4 px-4 sm:px-6 lg:px-0">
      <h2 className={cn("text-display-medium-white mb-6 leading-tight", contactTitleClassName)}>
        {mapData?.title} <br />
        <span className={isContactPage ? 'text-display-medium-gradient-1' : 'text-display-medium-gradient'}>
        {mapData?.subtitle} <br />
        </span>
      </h2>
      <p className={cn("text-body-regular-contact mb-10", contactDescriptionClassName)}>
        {mapData?.description} <br />
      </p>
      <form 
        className="space-y-6 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {contactFields.map((field, index) => (
          <InputField
            key={index}
            language={language}
            label={field.label}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            register={register}
            errors={errors}
            inputClassName={inputClassName}
            labelClassName={labelClassName}
          />
        ))}
        <motion.button 
          type="submit"
          aria-label="contact-button"
          className="relative bg-buttonColor
          text-title-regular-white 
          py-2.5 px-10 z-50
          rounded-full h-12 w-32
          flex items-center justify-center
          transition-all duration-300"
          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              Sending...
            </div>
          ) : (
            'Send'
          )}
        </motion.button>
      </form>
    </div>
  );
};
