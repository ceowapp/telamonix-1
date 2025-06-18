'use client'

import Script from 'next/script'

export default function GoogleAnalyticsProvider() {
  return (
    <>
      <Script 
        strategy="afterInteractive" 
        src="https://www.googletagmanager.com/gtag/js?id=G-B2MHFVBTDV"
      />
      <Script 
        id="google-analytics" 
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B2MHFVBTDV');
        `}
      </Script>
    </>
  )
}