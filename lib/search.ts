import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Type for search index items
export interface SearchIndexItem {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  date: string;
  readingTime?: number;
}

// In-memory cache for search index
let searchIndexCache: SearchIndexItem[] | null = null;
let searchIndexCacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

const postsDirectory = path.join(process.cwd(), "posts");

/**
 * Server-side function to build the search index from all Markdown files.
 * Extracts frontmatter metadata for search without sending full content to client.
 */
export function getSearchIndex(): SearchIndexItem[] {
  const now = Date.now();
  
  // Return cached data if valid
  if (searchIndexCache && (now - searchIndexCacheTime) < CACHE_DURATION) {
    return searchIndexCache;
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    
    const searchIndex = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);

        try {
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          // Calculate reading time (rough estimate)
          const wordsPerMinute = 200;
          const words = content.trim().split(/\s+/).length;
          const readingTime = Math.ceil(words / wordsPerMinute);

          // Normalize categories to always be an array
          let categories: string[] = [];
          if (data.categories) {
            categories = Array.isArray(data.categories) 
              ? data.categories 
              : [data.categories];
          } else if (data.category) {
            categories = Array.isArray(data.category) 
              ? data.category 
              : [data.category];
          }

          // Normalize tags to always be an array
          const tags = Array.isArray(data.tags) ? data.tags : [];

          return {
            slug,
            title: data.title || slug,
            description: data.description || "",
            categories,
            tags,
            date: data.date || "",
            readingTime,
          } as SearchIndexItem;
        } catch (error) {
          console.error(`Error parsing search index for ${fileName}:`, error);
          return null;
        }
      })
      .filter((item): item is SearchIndexItem => item !== null)
      .sort((a, b) => {
        // Sort by date descending (newest first)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

    // Update cache
    searchIndexCache = searchIndex;
    searchIndexCacheTime = now;

    return searchIndex;
  } catch (error) {
    console.error("Error building search index:", error);
    return searchIndexCache || [];
  }
}

/**
 * Clear the search index cache (useful for development or manual refresh)
 */
export function clearSearchIndexCache(): void {
  searchIndexCache = null;
  searchIndexCacheTime = 0;
}

