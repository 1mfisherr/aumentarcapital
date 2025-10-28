import "./globals.css";
import { DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import { siteConfig } from "@/lib/site.config";

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Organization structured data for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/aumentarcapital_logo.svg`,
    description: siteConfig.description,
    sameAs: [
      siteConfig.social.twitter,
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.author.email,
      contactType: "customer service",
    },
  };

  return (
    <html lang="pt" className={dmSans.variable}>
      <head>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
