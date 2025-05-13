NaisCorp Website Project
Overview
This repository contains the official NaisCorp website built with Next.js 15 and PayloadCMS. The project leverages a powerful headless CMS architecture for content management while providing a performant, modern frontend experience.
Core Technologies

Next.js 15.2.0: Frontend framework providing server-side rendering, static site generation, and routing
PayloadCMS (latest): Enterprise-grade headless CMS for content management
MongoDB: Database solution for content storage (via @payloadcms/db-mongodb)
AWS S3: Cloud storage for media assets (via @payloadcms/storage-s3)
Contentful: Additional content management integration
Tailwind CSS: Utility-first CSS framework for styling
React 19.0.0: Frontend library for building user interfaces

Features

Layout Builder: Create unique page layouts with pre-configured building blocks
Authentication System: Secure user management via next-auth
Draft Preview: Preview content changes before publishing
Live Preview: Real-time content preview capabilities
SEO Optimization: Built-in SEO tools via @payloadcms/plugin-seo
Multi-language Support: i18next integration for localization
Media Management: Comprehensive media library with AWS S3 integration
Form Builder: Dynamic form creation with @payloadcms/plugin-form-builder
Email Services: Integration with multiple email providers via nodemailer
Analytics: Google Analytics integration for visitor tracking
Redirects Management: URL redirect handling with @payloadcms/plugin-redirects
Search Functionality: Integrated search capabilities with @payloadcms/plugin-search

Environment Configuration
The application requires several environment variables to function properly. Create a .env file in the project root with the following configurations:
Contentful Configuration
CopyCONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_REVALIDATE_SECRET=your_revalidate_secret
CONTENTFUL_PREVIEW_SECRET=your_preview_secret
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_access_token
Google Analytics
CopyNEXT_PUBLIC_GA_ID=your_ga_id
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
MongoDB
CopyMONGODB_URI=your_mongodb_connection_string
Application Settings
CopyAPP_ENV=production
LOCAL_DOMAIN=localhost
SITE_DOMAIN=your_production_domain
NEXT_IGNORE_TYPECHECK=1
Authentication
CopyAUTH_SECRET=your_auth_secret
Email Configuration
CopyDEFAULT_EMAIL_SERVICE=hostinger
HOSTINGER_PASSWORD=your_hostinger_password
HOSTINGER_USER=support@doc2product.com
HOSTINGER_PORT=465
HOSTINGER_HOST=smtp.hostinger.com

GMAIL_APP_PASSWORD=your_gmail_app_password
GMAIL_USER=your_gmail_email
GMAIL_PORT=465
GMAIL_HOST=smtp.gmail.com
PayloadCMS Configuration
CopyNEXT_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_SECRET=your_payload_secret
VERCEL_PROJECT_PRODUCTION_URL
CRON_SECRET=your_cron_secret
PREVIEW_SECRET=your_preview_secret
AWS Configuration
CopyAWS_REGION=your_aws_region
AWS_S3_BUCKET_NAME=your_s3_bucket_name
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
Getting Started
Development

Clone the repository
Install dependencies:
bashCopynpm install

Create a .env file with the required environment variables
Start the development server:
bashCopynpm run dev

Access the website at http://localhost:3000 and the admin panel at http://localhost:3000/admin

Production Build

Build the application:
bashCopynpm run build

Start the production server:
bashCopynpm run start


Available Scripts

npm run dev - Start development server
npm run build - Build for production
npm run start - Start production server
npm run lint - Run ESLint
npm run lint:fix - Fix ESLint issues
npm run generate:types - Generate PayloadCMS types
npm run generate:importmap - Generate import map for PayloadCMS
npm run payload - Run PayloadCMS CLI
npm run reinstall - Clean install dependencies
npm run dev:prod - Run production build in development mode

Requirements

Node.js ^18.20.2 || >=20.9.0

Content Management
The project utilizes PayloadCMS for content management with collections for:

Pages: Website pages with flexible layout options
Posts: Blog/news entries with publication workflow
Media: Central management for images and other media assets
Users: User accounts with role-based permissions

Deployment
The application can be deployed to various platforms:

Vercel: Recommended platform for Next.js applications
AWS: For enterprise-scale deployments with custom infrastructure
Self-hosted: Deploy on your own servers or VPS

Security Notes

Never commit the .env file to version control
Rotate AWS and other API keys regularly
Implement proper backups for MongoDB database
Follow security best practices for authentication and API endpoints

Support and Maintenance
For questions or issues, please contact the NaisCorp development team at thenguyenfiner@gmail.com.

© 2025 NaisCorp. All rights reserved.