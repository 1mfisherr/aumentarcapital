"use client";

import { siteConfig } from "@/lib/site.config";
import Script from "next/script";

// GA4 Event tracking functions
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

export const trackArticleView = (articleData: {
  slug: string;
  title: string;
  category?: string;
  author: string;
  readingTime: number;
}) => {
  trackEvent('article_view', {
    article_slug: articleData.slug,
    article_title: articleData.title,
    article_category: articleData.category || 'uncategorized',
    article_author: articleData.author,
    reading_time: articleData.readingTime,
  });
};

export const trackArticleEngagement = (slug: string, scrollDepth: number) => {
  trackEvent('article_engagement', {
    article_slug: slug,
    scroll_depth: Math.round(scrollDepth),
  });
};

export const trackNewsletterSignup = (source: string) => {
  trackEvent('newsletter_signup', {
    source: source,
  });
};

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
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.analytics.googleAnalyticsId}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
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

