import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import { siteConfig } from "@/lib/site.config";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema-utils";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: '/icon', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: siteConfig.seo?.googleSiteVerification || undefined,
    other: {
      'msvalidate.01': siteConfig.seo?.bingSiteVerification || undefined,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image`],
    creator: siteConfig.social.twitter ? `@${siteConfig.social.twitter.split('/').pop()}` : undefined,
  },
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Generate structured data for SEO using schema utilities
  const organizationSchema = generateOrganizationSchema(siteConfig);
  const websiteSchema = generateWebSiteSchema(siteConfig);

  return (
    <html lang="pt" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        {/* Performance optimization: Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text overflow-x-hidden">
        <Header />
        <main className="flex-1 w-full overflow-x-hidden">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
