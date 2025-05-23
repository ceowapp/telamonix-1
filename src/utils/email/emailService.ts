import nodemailer, { Transporter } from 'nodemailer';
import { SUPPORT_MAIL_LIST } from '@/constants/contact';
import dotenv from 'dotenv';

dotenv.config();

export interface EmailTheme {
  brandColor: string;
  buttonText: string;
  backgroundColor: string;
  textColor: string;
  headerColor: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface EmailResponse {
  success: boolean;
  messageId: string;
  timestamp: string;
}

interface Attachment {
   filename: string;
   content: Buffer | string;
   contentType?: string;
}

export class EmailServiceError extends Error {
  constructor(message: string, public code: string, public details?: any) {
    super(message);
    this.name = 'EmailServiceError';
  }
}

export class EmailService {
  private static instances: Map<string, EmailService> = new Map();
  private transporter: Transporter;
  private defaultFrom: string;
  private theme: EmailTheme;
  private templateCache: Map<string, EmailTemplate> = new Map();
  private initialized: boolean = false;

  private constructor(config: EmailConfig, defaultFrom: string, theme?: Partial<EmailTheme>) {
    if (!defaultFrom) {
      throw new EmailServiceError(
        'Default FROM email address is required',
        'CONFIG_ERROR'
      );
    }

    if (!config.auth.user || !config.auth.pass) {
      throw new EmailServiceError(
        'Email authentication credentials are required',
        'CONFIG_ERROR'
      );
    }

    this.transporter = nodemailer.createTransport(config);
    this.defaultFrom = defaultFrom;
    this.theme = {
      brandColor: '#346df1',
      buttonText: '#ffffff',
      backgroundColor: '#f9f9f9',
      textColor: '#444444',
      headerColor: '#000000',
      ...theme
    };
  }

  public static getInstance(config: EmailConfig, defaultFrom: string, theme?: Partial<EmailTheme>): EmailService {
    const instanceKey = `${config.host}:${config.auth.user}`;
    if (!this.instances.has(instanceKey)) {
      this.instances.set(instanceKey, new EmailService(config, defaultFrom, theme));
    }
    return this.instances.get(instanceKey)!;
  }

  private validateEmail(email: string | string[]): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (Array.isArray(email)) {
      return email.every((e) => emailRegex.test(e));
    }
    return emailRegex.test(email);
  }

  public async initialize(): Promise<void> {
    if (this.initialized) return;
    try {
      await this.transporter.verify();
      this.initialized = true;
    } catch (error) {
      throw new EmailServiceError(
        'Failed to initialize email service',
        'INIT_ERROR',
        error
      );
    }
  }

  private async sendNodemailerEmail(
    to: string | string[],
    subject: string, 
    html: string,
    text?: string,
    from = this.defaultFrom,
    cc?: string | string[],
    attachments?: Attachment[]
  ): Promise<any> {
    if (!this.initialized) {
      await this.initialize();
    }
    if (!this.validateEmail(to)) {
      throw new EmailServiceError(
        'Invalid recipient email address',
        'INVALID_EMAIL',
        { email: to }
      );
    }
    if (cc && !this.validateEmail(cc)) {
      throw new EmailServiceError(
        'Invalid CC email address',
        'INVALID_CC_EMAIL',
        { email: cc }
      );
    }
    try {
      const result = await this.transporter.sendMail({
        from,
        to: Array.isArray(to) ? to.join(',') : to,
        cc: cc ? (Array.isArray(cc) ? cc.join(',') : cc) : undefined,
        subject,
        html,
        text,
        attachments
      });
      console.log('Email sent successfully:', { messageId: result.messageId, to });
      return { success: true, messageId: result.messageId };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new EmailServiceError(
        `Failed to send email: ${errorMessage}`,
        'SEND_ERROR',
        error
      );
    }
  }

  private validateEmailData(data: BillingEmailData, requiredFields: (keyof BillingEmailData)[]): void {
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new EmailServiceError(
        `Missing required data fields: ${missingFields.join(', ')}`,
        'DATA_ERROR',
        { required: requiredFields, missing: missingFields, received: data }
      );
    }
  }
  
  public async sendCustomEmail(
    subject: string,
    html: string,
    cc?: string | string[],
    attachments?: Attachment[]
  ): Promise<any> {
    if (!subject?.trim()) {
      throw new EmailServiceError('Subject is required', 'DATA_ERROR', { field: 'subject' });
    }
    if (!html?.trim()) {
      throw new EmailServiceError('HTML content is required', 'DATA_ERROR', { field: 'html' });
    }
    try {
      return await this.sendNodemailerEmail(SUPPORT_MAIL_LIST, subject, html, undefined, this.defaultFrom, cc, attachments);
    } catch (error) {
      if (error instanceof EmailServiceError) throw error;
      throw new EmailServiceError('Failed to send custom email', 'SEND_ERROR', error);
    }
  }

  private createEmailResponse(result: any): EmailResponse {
    return {
      success: true,
      messageId: result.messageId,
      timestamp: new Date().toISOString()
    };
  }

  public async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service verification failed:', error);
      return false;
    }
  }

  public reset(): void {
    this.templateCache.clear();
    this.initialized = false;
  }

  public clearTemplateCache(): void {
    this.templateCache.clear();
  }
}

function validateEmailConfig(config: EmailConfig): EmailConfig {
  if (!config.host || !config.port) {
    throw new EmailServiceError(
      'Invalid email configuration: missing host or port',
      'CONFIG_ERROR'
    );
  }
  return {
    host: config.host,
    port: parseInt(String(config.port)),
    secure: config.secure ?? true,
    auth: {
      user: config.auth.user,
      pass: config.auth.pass
    }
  };
}

const gmailConfig: EmailConfig = validateEmailConfig({
  host: process.env.GMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.GMAIL_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_APP_PASSWORD || ''
  }
});

const hostingerConfig: EmailConfig = validateEmailConfig({
  host: process.env.HOSTINGER_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.HOSTINGER_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.HOSTINGER_USER || '',
    pass: process.env.HOSTINGER_PASSWORD || ''
  }
});

export const gmailService = EmailService.getInstance(
  gmailConfig,
  process.env.GMAIL_USER || '',
);

export const hostingerService = EmailService.getInstance(
  hostingerConfig,
  process.env.HOSTINGER_USER || '',
);

export const emailService = process.env.DEFAULT_EMAIL_SERVICE === 'hostinger' 
  ? hostingerService 
  : gmailService;

export default emailService;