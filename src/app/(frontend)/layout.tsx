import React from "react";
import { Toaster } from "sonner";
import localFont from "next/font/local";
import { Inter } from 'next/font/google';
import Head from "next/head";
import type { Metadata } from 'next'
import { Providers } from '@/providers';
import { InitTheme } from '@/providers/Theme/InitTheme';
import { ThemeProvider } from "@/providers/ThemeProvider";
import { reportWebVitals } from '@/lib/vitals';
import { useWebVitals } from '@/hooks/useWebVitals';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';
import { getServerSideURL } from '@/utilities/getURL';
import { AdminBar } from '@/components/admin/AdminBar'
import { draftMode } from 'next/headers'
import "./globals.css";

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

const metadata: Metadata = {
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    title: "NaisCorp",
    description: "The connected workspace where better, faster work happens.",
    images: ['/images/logo.png'],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon.ico", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/images/logo.png",
    shortcut: "/images/logo.png",
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <InitTheme />  
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://shopify-app.doc2product.com" />
      </Head>
      <body className={inter.className}>
        <React.StrictMode>
          <Toaster position="bottom-center" />
          <Providers>
            {children}
          </Providers>
        </React.StrictMode>
      </body>
    </html>
  );
}


