"use client"

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import React, { memo, useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { FieldErrors, FieldValues, UseFormRegister, UseFormTrigger, Control, Controller, UseFormSetValue, UseFormWatch, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';
import Image from "next/image";
import { careerRoutes } from '@/constants/routes';
import { applicationFields, applicationFormLanguages, languageData } from '@/constants/contact';
import { applicationSchema } from '@/schemas/contact.schema';
import { getSlugByLanguage } from '@/utilities/getSlugByLanguage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type ApplicationFormProps = {
  labelClassName?: string;
  inputClassName?: string;
  isContactPage?: boolean;
  contactTitleClassName?: string;
  contactDescriptionClassName?: string;
};

type FormData = z.infer<typeof applicationSchema>;

type InputFieldProps = {
  label?: string;
  id?: string;
  name: string;
  type: "text" | "email" | "textarea" | "tel" | "date" | "number";
  placeholder?: string;
  required?: boolean;
  className?: string;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

const FormSection = ({ title }: { title: string }) => (
  <div className="mb-3">
    <h3 className="text-title-medium-black-4 pb-2 mb-2">
      {title}
    </h3>
  </div>
);

const InputField = ({
  label,
  name,
  id,
  type,
  inputType,
  placeholder,
  required,
  className,
  suffix,
  readOnly,
  register,
  errors,
  control,
  lang
}: InputFieldProps & { 
  inputType?: string; 
  suffix?: string; 
  readOnly?: boolean;
  control: Control<FormData>;
  lang?: any;
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<DatePicker>(null);

  if (name === "attachments") return null;

  const renderInput = () => {
    const commonProps = {
      id: id || name,
      placeholder,
      required,
      readOnly,
      className: cn(
        "w-full px-4 py-3 border bg-white border-gray-200 rounded text-body-regular-black-contact-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
        className
      )
    };

    if (inputType === "date") {
      return (
        <div className="relative" ref={calendarRef}>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                ref={datePickerRef}
                selected={value ? new Date(value) : null}
                onChange={(date: Date) => onChange(date.toISOString().split('T')[0])}
                minDate={new Date()}
                placeholderText={lang?.availableTimePlaceholder || "Select date"}
                dateFormat="yyyy-MM-dd"
                className={commonProps.className}
                calendarClassName="custom-datepicker"
                locale="en"
                portalId="root"
              />
            )}
          />
          <div 
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
            onClick={() => {
              if (datePickerRef.current) {
                datePickerRef.current.setOpen(true);
              }
            }}
          >
            <Image
              src={"/svgs/calendar.svg"}
              alt="Calendar"
              width={24}
              height={24}
              className="rounded-sm"
            />
          </div>
        </div>
      );
    }

    if (name.includes('salary')) {
      return (
        <div className="relative">
          <input
            {...register(name)}
            {...commonProps}
            type="text"
            inputMode="numeric"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value) {
                const formattedValue = Number(value).toLocaleString('de-DE');
                e.target.value = formattedValue;
              }
            }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-body-regular-black-contact-1 w-12 text-right">
            Vnd
          </span>
        </div>
      );
    }

    return (
      <input 
        {...register(name)}
        {...commonProps} 
        type={type} 
      />
    );
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id || name} className="block text-body-regular-black-contact-1 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {renderInput()}
      {errors[name] && (
        <p className="text-body-regular-error mt-1">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};

const CONSTANTS = {
  MAX_FILES: 10,
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  SUPPORTED_FILES: {
    images: '.jpg,.jpeg,.png,.gif,.webp',
    documents: '.pdf,.doc,.docx,.txt,.rtf',
    spreadsheets: '.xls,.xlsx,.csv',
    presentations: '.ppt,.pptx',
    other: '.zip,.rar'
  }
} as const;

const allSupportedFormats = '.jpg, .jpeg, .png, .gif, .webp, .pdf, .doc, .docx, .txt, .rtf, .xls, .xlsx, .csv, .ppt, .pptx, .zip, .rar';

const getFormatName = (mime: string): string => {
  const mimeMap: Record<string, string> = {
    'image/': 'Image',
    'application/pdf': 'PDF',
    'application/msword': 'Word',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
    'text/': 'Text',
    'application/vnd.ms-excel': 'Excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
    'application/vnd.ms-powerpoint': 'PowerPoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PowerPoint',
    'application/zip': 'ZIP',
    'application/x-rar-compressed': 'RAR'
  };
  return Object.entries(mimeMap).find(([key]) => mime.startsWith(key))?.[1] || 'File';
};

interface FileUpload {
  filename: string;
  file: File;
  type: string;
  url: string;
}

interface FileUploadPreviewProps {
  files: FileUpload[];
  onRemove: (index: number) => void;
}

const FileUploadPreview = memo(({ files, onRemove }: FileUploadPreviewProps) => (
  <div className="space-y-3">
    {files.map((file, index) => (
      <div 
        key={`${file.filename}-${index}`}
        className="flex items-center justify-between p-4"
      >
        <div className="flex items-center gap-2">
          <Image
            src="/svgs/file-pdf-one.svg"
            alt="File PDF"
            width={24}
            height={24}
            className="rounded-sm"
          />
          <span className="text-body-regular-black-contact-1">{file.filename}</span>
        </div>
        <button
          type="button"
          onClick={() => onRemove(index)}
        >
          <Image
            src="/svgs/delete-2.svg"
            alt="File Remove"
            width={24}
            height={24}
            className="rounded-sm"
          />
        </button>
      </div>
    ))}
  </div>
));

const FileUploadZone = ({ 
  onFileSelect, 
  className,
  label = "Resume/Curriculum Vitae",
  uploadText = "Upload your file"
}: { 
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  uploadText?: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-body-regular-black-contact-1">
        {label} <span className="text-red-500">*</span>
      </p>
      <div 
        className={cn("cursor-pointer text-center py-[10px] px-[16px] border border-[1px] border-[#D1D1D1] rounded-md", className)}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/svgs/document-upload.svg"
            alt="File Upload"
            width={24}
            height={24}
            className="rounded-sm"
          />
          <p className="mt-2 text-body-regular-black-contact-1">{uploadText}</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allSupportedFormats}
          onChange={onFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

const SuccessModal = ({ 
  onBackToHome, 
  onExploreJobs,
  title = "Application successful",
  message = "Thank you for your interest and application. We have received your application and will contact you as soon as possible.",
  backToHomeText = "Back to home",
  exploreJobsText = "Explore jobs"
}: { 
  onBackToHome: () => void;
  onExploreJobs: () => void;
  title?: string;
  message?: string;
  backToHomeText?: string;
  exploreJobsText?: string;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center mx-auto my-auto">
        <div className="mx-auto flex items-center justify-center mb-4">
          <Image
            src="/svgs/success.svg"
            alt="Success Upload"
            width={48}
            height={48}
            className="rounded-sm"
          />
        </div>
        <h3 className="text-title-medium-black-4 mb-2">{title}</h3>
        <p className="text-body-regular-black-contact-1 mb-6 text-center">
          {message}
        </p>
        <div className="flex gap-4">
          <button
            aria-label="Back home"
            onClick={onBackToHome}
            className="flex-1 py-3 bg-[#C4C8FF] text-title-regular-purple rounded-full"
          >
            {backToHomeText}
          </button>
          <button
            aria-label="Explore jobs"
            onClick={onExploreJobs}
            className="flex-1 py-3 bg-buttonColor text-title-regular-white rounded-full"
          >
            {exploreJobsText}
          </button>
        </div>
      </div>
    </div>
  );
};

const ApplicationForm: React.FC<ApplicationFormProps> = ({ 
  data,
  language = 'en',
  labelClassName, 
  inputClassName, 
  isContactPage = false, 
  contactTitleClassName, 
  contactDescriptionClassName 
}) => {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const lang = applicationFormLanguages[language] || applicationFormLanguages.en;
  const { applicationFields } = languageData[language];

  const defaultValues = useMemo(() => ({
    job: data?.careerFields?.title, 
    attachments: []
  }), [data]);

  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues,
    mode: 'all',
  });

  const uploadFiles = async (files: File[]): Promise<{fileIds: string[], errors: string[]}> => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('name', watch('name') || 'applicant');
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }
      const fileIds = result.files.map(file => file.fileId);
      const errors = result.failedUploads ? 
        result.failedUploads.map(fail => `${fail.filename}: ${fail.error}`) : 
        [];
      return { fileIds, errors };
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      if (file.size > CONSTANTS.MAX_FILE_SIZE) {
        toast.error(`${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });
    setUploadedFiles(prev => {
      const newFiles = validFiles.map(file => ({
        filename: file.name,
        file,
        type: file.type,
        url: URL.createObjectURL(file)
      }));
      const updated = [...prev, ...newFiles];
      if (updated.length > CONSTANTS.MAX_FILES) {
        toast.error(`Maximum ${CONSTANTS.MAX_FILES} files allowed`);
        return prev;
      }
      return updated;
    });
  }, []);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event);
  }, [handleFileChange]);

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  const handleBackToHome = useCallback(() => {
    router.push(`/${language}`);
  }, [language, router]);

  const handleExploreJobs = useCallback(() => {
    const careerRoute = careerRoutes.find(route => route.lang === language);
    const redirectPath = careerRoute ? `/${language}/${careerRoute.slug}` : `/en/careers`;
    router.push(redirectPath);
  }, [language, router, careerRoutes]);

  const onSubmit = useCallback(async (data: FormData) => {
    if (uploadedFiles.length === 0) {
      toast.error('At least one document must be uploaded', {
        icon: '❌',
        duration: 3000,
        position: 'top-center',
        className: 'error-toast'
      });
      return;
    }
    try {
      const attachments = await Promise.all(
        uploadedFiles.map(async (fileObj) => {
          return new Promise<{
            filename: string;
            content: string;
            contentType: string;
          }>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64Content = (reader.result as string).split(',')[1];
              resolve({
                filename: fileObj.filename,
                content: base64Content,
                contentType: fileObj.type
              });
            };
            reader.readAsDataURL(fileObj.file);
          });
        })
      );
      let fileIds = [];
      let uploadErrors = [];
      if (uploadedFiles.length > 0) {
        const fileUploadResult = await uploadFiles(uploadedFiles.map(f => f.file));
        fileIds = fileUploadResult.fileIds;
        uploadErrors = fileUploadResult.errors;
        if (uploadErrors.length > 0) {
          toast.warning(`Some files failed to upload: ${uploadErrors.join(', ')}`, {
            icon: '⚠️',
            duration: 3000,
            position: 'top-center',
            className: 'warning-toast'
          });
        }
        if (fileIds.length === 0 && uploadedFiles.length > 0) {
        toast.error('None of your files could be uploaded. Please try again with different files.', {
          icon: '❌',
          duration: 3000,
          position: 'top-center',
          className: 'warning-toast'
        });
          return;
        }
      }
      const response = await fetch('/api/send_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, fileIds, attachments, formType: 'career' }),
      });
      
      if (!response.ok) {
        throw new Error((await response.json()).message || 'Failed to send message');
      }
      setShowSuccessModal(true);
      reset();
      setUploadedFiles([]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(error.message || 'An error occurred. Please try again later.', {
        icon: '❌',
        duration: 3000,
        position: 'top-center',
        className: 'error-toast'
      });
    }
  }, [reset, uploadedFiles, uploadFiles]);

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow border border-blue-100 mt-8 sm:mt-12 md:mt-16 mb-24 sm:mb-32">
        <div className="p-6">
          <h2 className="text-headline-medium-1 text-center mb-8 sm:mb-10">{lang.formTitle}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <FormSection title={lang.contactSection} />
              <InputField
                label={lang.fullName}
                name="name"
                type="text"
                required
                register={register}
                errors={errors}
              />
              <InputField
                label={lang.phoneNumber}
                name="phone"
                type="tel"
                required
                register={register}
                errors={errors}
              />
              <InputField
                label={lang.email}
                name="email"
                type="email"
                required
                register={register}
                errors={errors}
              />
            </div>
            <div className="border-t border-[#D1D1D1] pt-4 space-y-6">
              <FormSection title={lang.jobSection} />
              <InputField
                label={lang.job}
                name="job"
                type="text"
                readOnly
                register={register}
                errors={errors}
              />
              <InputField
                name="availableTime"
                type="text"
                inputType="date"
                required
                control={control}
                lang={lang}
                register={register}
                errors={errors}
              />
              <div className="mb-4">
                <label className="block text-body-regular-black-contact-1 mb-2">
                  {lang.desiredSalary}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      {...register("salaryBottom")}
                      type="text"
                      inputMode="numeric" 
                      placeholder={lang.salaryMin}
                      className="w-full px-4 py-3 border border-gray-200 rounded text-body-regular-black-contact-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value) {
                          const formattedValue = Number(value).toLocaleString('de-DE'); 
                          e.target.value = formattedValue;
                        }
                      }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-body-regular-black-contact-1">
                      Vnd
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      {...register("salaryTop")}
                      type="text"
                      inputMode="numeric" 
                      placeholder={lang.salaryMax}
                      className="w-full px-4 py-3 border border-gray-200 rounded text-body-regular-black-contact-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value) {
                          const formattedValue = Number(value).toLocaleString('de-DE');
                          e.target.value = formattedValue;
                        }
                      }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-body-regular-black-contact-1">
                      Vnd
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-[#D1D1D1] pt-4">
              <FormSection title={lang.documentsSection} />
              <div className="space-y-4">
                <FileUploadZone 
                  label={lang.resumeLabel}
                  onFileSelect={handleFileSelect}
                  uploadText={lang.uploadDocument}
                  className="border border-dashed border-gray-300 rounded-lg p-4"
                />
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <FileUploadPreview files={uploadedFiles} onRemove={removeFile} />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-[40%] py-3 px-4 bg-buttonColor text-title-regular-white rounded-full",
                  "disabled:bg-[#D1D1D1] disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <span>{lang.submitting}</span>
                  </div>
                ) : (
                  lang.submitButton
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showSuccessModal && (
        <SuccessModal
          onBackToHome={handleBackToHome}
          onExploreJobs={handleExploreJobs}
          title={lang.successTitle}
          message={lang.successMessage}
          backToHomeText={lang.backToHome}
          exploreJobsText={lang.exploreJobs}
        />
      )}
    </>
  );
};

export default ApplicationForm;