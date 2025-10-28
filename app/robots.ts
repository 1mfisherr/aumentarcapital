import { siteConfig } from "@/lib/site.config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/private/",
          "/_next/",
          "/admin/",
        ],
        crawlDelay: 0,
      },
      // Optimize for Google
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/private/"],
        crawlDelay: 0,
      },
      // Optimize for Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/private/"],
        crawlDelay: 0,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

