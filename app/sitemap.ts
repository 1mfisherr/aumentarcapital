import { getSortedPostsData } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSortedPostsData();
  const currentDate = new Date();

  // Dynamic article entries with smart priority calculation
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
    // Calculate priority based on recency (newer articles get higher priority)
    const daysSincePublication = (Date.now() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24);
    const priority = daysSincePublication < 7 ? 0.9 : daysSincePublication < 30 ? 0.8 : 0.7;
    
    return {
      url: `${siteConfig.url}/artigos/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority,
    };
  });

  // Static pages with appropriate priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/artigos`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/sobre`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contacto`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/politica-privacidade`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...staticPages, ...postEntries];
}

