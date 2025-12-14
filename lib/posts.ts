import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";
import { ArticleMeta, ArticleData } from "./types";

const postsDirectory = path.join(process.cwd(), "posts");

// Simple in-memory cache for posts data
let postsCache: ArticleMeta[] | null = null;
let postsCacheTime: number = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

export function getSortedPostsData(): ArticleMeta[] {
  // Return cached data if valid
  const now = Date.now();
  if (postsCache && (now - postsCacheTime) < CACHE_DURATION) {
    return postsCache;
  }
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        
        try {
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);
          const stats = readingTime(content);

          return {
            ...(data as ArticleMeta),
            slug,
            readingTime: Math.ceil(stats.minutes),
          } as ArticleMeta;
        } catch (error) {
          console.error(`Error reading post file ${fileName}:`, error);
          return null;
        }
      })
      .filter((post): post is ArticleMeta => post !== null);

    const sortedPosts = allPostsData.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Sort descending (newest first)
    });

    // Update cache
    postsCache = sortedPosts;
    postsCacheTime = Date.now();

    return sortedPosts;
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return postsCache || []; // Return stale cache if available
  }
}

// Clear cache (useful for development or forced refresh)
export function clearPostsCache(): void {
  postsCache = null;
  postsCacheTime = 0;
}

export async function getPostData(slug: string): Promise<ArticleData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  // Validate slug to prevent directory traversal
  if (!slug || slug.includes('..') || slug.includes('/') || slug.includes('\\')) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  try {
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    if (!data.title || !data.date || !data.author) {
      throw new Error(`Post ${slug} is missing required metadata`);
    }

    const processedContent = await remark().use(html, { sanitize: false }).process(content);
    const contentHtml = processedContent.toString();
    const stats = readingTime(content);

    return {
      ...(data as ArticleMeta),
      slug,
      contentHtml,
      readingTime: Math.ceil(stats.minutes),
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    throw error;
  }
}
