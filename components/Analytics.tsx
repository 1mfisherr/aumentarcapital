"use client";

import { siteConfig } from "@/lib/site.config";
import Script from "next/script";

export default function Analytics() {
  if (!siteConfig.analytics.enabled) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      {siteConfig.analytics.googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.analytics.googleAnalyticsId}');
            `}
          </Script>
        </>
      )}

      {/* Plausible Analytics */}
      {siteConfig.analytics.plausibleDomain && (
        <Script
          defer
          data-domain={siteConfig.analytics.plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      )}
    </>
  );
}

