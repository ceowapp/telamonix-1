import { withSentryConfig } from "@sentry/nextjs";
import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from "next";
import redirects from './redirects.js'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'


/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },
  async redirects() {
      return [
      {
        source: '/en/ve_chung_toi',
        destination: '/en/about',
        permanent: true,
      },
      {
        source: '/en/lien_he',
        destination: '/en/contact',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/video/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, immutable" },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL ].map((item) => {
        const url = new URL(item)
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'naiscorp.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev'
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com'
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com'
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com'
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net'
      },
      {
        protocol: 'https',
        hostname: 'e-cdns-images.dzcdn.net'
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com'
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
  reactStrictMode: true,
  output: 'standalone',
  redirects,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    AUTH_SECRET: process.env.AUTH_SECRET,
    PROXY_HOST: process.env.PROXY_HOST,
    PROXY_PORT: process.env.PROXY_PORT,
    PAYLOAD_PUBLIC_SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
    PREVIEW_SECRET: process.env.PREVIEW_SECRET
  },
};

const sentryConfig = {
  org: "wapp-4y",
  project: "naiscorp",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

// Suppress Turbopack warning
process.env.SENTRY_SUPPRESS_TURBOPACK_WARNING = '1';

/// Apply bundle analyzer and Sentry configs
const configWithBundleAnalyzer = withBundleAnalyzer(nextConfig);
//const finalConfig = withSentryConfig(configWithBundleAnalyzer, sentryConfig);

export default withPayload(configWithBundleAnalyzer);

