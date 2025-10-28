import { getSortedPostsData } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSortedPostsData();

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

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/artigos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...postEntries];
}

