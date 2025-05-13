import { NextResponse } from 'next/server';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { generateContactEmailTemplate, generateCareerEmailTemplate } from '@/utilities/generateEmailTemplate';
import emailService, { EmailServiceError } from '@/utils/email/emailService';

export async function POST(req: Request) {
  try {
    const { data, formType = 'contact', fileIds = [], attachments = [] } = await req.json();
    if (!data) {
      return NextResponse.json(
        { message: 'Missing body parameters' },
        { status: 400 }
      );
    }
    const { name, email, phone, message = 'Default Message' } = data;
    if (!name || !email) {
      return NextResponse.json(
        { message: 'Missing required fields: name, email' },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }
    let payloadResponse;
    let emailTemplate;
    let emailSubject;
    const formattedAttachments = formType === 'career' ? 
      attachments?.map(attachment => ({
        filename: attachment.filename,
        content: Buffer.from(attachment.content, 'base64'),
        contentType: attachment.contentType
      })) || [] : [];
    const payload = await getPayload({ config: configPromise });
    switch (formType) {
      case 'contact':
        payloadResponse = await payload.create({
          collection: 'contact-submissions',
          data: {
            name,
            email,
            phoneNumber: phone,
            message,
            ipAddress: req.headers.get('x-forwarded-for') || 'unknown',
          },
        });
        emailSubject = `New Contact Form Message from ${name}`;
        emailTemplate = generateContactEmailTemplate(name, email, phone, message);
        break;
        
      case 'career':
        payloadResponse = await payload.create({
        collection: 'career-applications',
        data: {
          name,
          email,
          phoneNumber: phone,
          job: data.job,
          availableTime: data.availableTime || null,
          salaryBottom: data.salaryBottom || '',
          salaryTop: data.salaryTop || '',
          attachments: fileIds && fileIds.length > 0 
          ? fileIds.map(id => ({ file: id })) 
          : [],
        },
      });
      emailSubject = `New Career Application from ${name} for ${data.job}`;
      emailTemplate = generateCareerEmailTemplate(
        name, 
        email, 
        phone, 
        data.job, 
        data.availableTime || 'Not specified', 
        data.salaryBottom || '', 
        data.salaryTop || '',
        formattedAttachments
      );
        break;
      default:
        return NextResponse.json(
          { message: 'Invalid form type' },
          { status: 400 }
        );
    }
    try {
      await emailService.initialize();
      await emailService.sendCustomEmail(
        emailSubject,
        emailTemplate,
        email,
        formType === 'career' ? formattedAttachments : []
      );
      return NextResponse.json({
        message: 'Form submitted successfully',
        success: true,
        id: payloadResponse.id
      });
    } catch (error) {
      console.error('Failed to send email:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        email,
        name,
        formType
      });
      if (error instanceof EmailServiceError) {
        const errorDetails = {
          code: error.code,
          message: error.message,
          details: error.details,
        };
        console.error('Email service error details:', errorDetails);
        switch (error.code) {
          case 'DATA_ERROR':
            return NextResponse.json(
              { message: 'Invalid email data provided' },
              { status: 400 }
            );
          case 'TEMPLATE_ERROR':
            return NextResponse.json(
              { message: 'Email template error' },
              { status: 500 }
            );
          case 'SEND_ERROR':
            return NextResponse.json(
              { message: 'Failed to send email' },
              { status: 503 }
            );
          default:
            return NextResponse.json(
              { message: 'Unexpected email service error' },
              { status: 500 }
            );
        }
      }
      return NextResponse.json({
        message: 'Form data saved but email notification failed',
        success: true,
        id: payloadResponse.id,
        emailError: error instanceof Error ? error.message : 'Unknown email error'
      });
    }
  } catch (error) {
    console.error('Error processing form submission:', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    return NextResponse.json(
      { message: 'Failed to process submission' },
      { status: 500 }
    );
  }
}

