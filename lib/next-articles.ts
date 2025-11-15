import { ArticleMeta, ArticleType, IntentTag } from "./types";
import { getSortedPostsData } from "./posts";

export interface NextArticleLink {
  title: string;
  slug: string;
  description: string;
  anchorText: string;
}

/**
 * Generates next article links based on article type, trail, and topic similarity
 */
export function getNextArticles(
  currentArticle: ArticleMeta
): NextArticleLink[] {
  const allArticles = getSortedPostsData();
  const articleType = currentArticle.type || "supporting";
  const trail = currentArticle.trail || [];
  const intent = currentArticle.intent
    ? Array.isArray(currentArticle.intent)
      ? currentArticle.intent
      : [currentArticle.intent]
    : [];

  // Foundation articles: follow the trail
  if (articleType === "foundation" && trail.length > 0) {
    const currentIndex = trail.indexOf(currentArticle.slug);
    
    if (currentIndex >= 0 && currentIndex < trail.length - 1) {
      const nextSlug = trail[currentIndex + 1];
      const nextArticle = allArticles.find((a) => a.slug === nextSlug);
      
      if (nextArticle) {
        // If trail branches, check intent to choose the right path
        if (currentIndex + 1 < trail.length - 1) {
          // Check if there are multiple possible next articles based on intent
          const potentialNext = trail.slice(currentIndex + 1);
          
          // If intent is specified, try to find the best match
          if (intent.length > 0) {
            const intentBasedNext = findArticleByIntent(
              allArticles,
              potentialNext,
              intent
            );
            if (intentBasedNext) {
              return [createNextArticleLink(intentBasedNext)];
            }
          }
        }
        
        return [createNextArticleLink(nextArticle)];
      }
    }
  }

  // Supporting articles: find relevant articles based on topic similarity
  if (articleType === "supporting") {
    const relevantArticles = findRelevantArticles(
      allArticles,
      currentArticle,
      intent
    );
    
    // Return 1-2 suggested reads
    return relevantArticles.slice(0, 2).map(createNextArticleLink);
  }

  // Fallback: if no trail or type specified, find similar articles
  const similarArticles = findRelevantArticles(
    allArticles,
    currentArticle,
    intent
  );
  
  return similarArticles.slice(0, 1).map(createNextArticleLink);
}

/**
 * Finds articles by intent tags when trail branches
 */
function findArticleByIntent(
  allArticles: ArticleMeta[],
  potentialSlugs: string[],
  intent: IntentTag[]
): ArticleMeta | null {
  for (const slug of potentialSlugs) {
    const article = allArticles.find((a) => a.slug === slug);
    if (article) {
      const articleIntent = article.intent
        ? Array.isArray(article.intent)
          ? article.intent
          : [article.intent]
        : [];
      
      // Check if article intent matches any of the current article's intents
      if (intent.some((i) => articleIntent.includes(i))) {
        return article;
      }
    }
  }
  
  // If no match, return the first potential article
  const firstArticle = allArticles.find((a) => a.slug === potentialSlugs[0]);
  return firstArticle || null;
}

/**
 * Finds relevant articles based on topic similarity (tags, categories, intent)
 */
function findRelevantArticles(
  allArticles: ArticleMeta[],
  currentArticle: ArticleMeta,
  intent: IntentTag[]
): ArticleMeta[] {
  // Exclude current article
  const otherArticles = allArticles.filter(
    (a) => a.slug !== currentArticle.slug
  );

  // Score articles based on relevance
  const scoredArticles = otherArticles.map((article) => {
    let score = 0;

    // Category match (high weight)
    const currentCategories = Array.isArray(currentArticle.category)
      ? currentArticle.category
      : [currentArticle.category];
    const articleCategories = Array.isArray(article.category)
      ? article.category
      : [article.category];
    
    if (currentCategories.some((cat) => articleCategories.includes(cat))) {
      score += 10;
    }

    // Tag overlap (medium weight)
    const commonTags = currentArticle.tags.filter((tag) =>
      article.tags.includes(tag)
    );
    score += commonTags.length * 3;

    // Intent match (high weight for supporting articles)
    if (intent.length > 0) {
      const articleIntent = article.intent
        ? Array.isArray(article.intent)
          ? article.intent
          : [article.intent]
        : [];
      
      if (intent.some((i) => articleIntent.includes(i))) {
        score += 15;
      }
    }

    // Prefer foundation articles for supporting articles
    if (currentArticle.type === "supporting" && article.type === "foundation") {
      score += 5;
    }

    return { article, score };
  });

  // Sort by score (descending) and return articles
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0)
    .map((item) => item.article);
}

/**
 * Creates a NextArticleLink with descriptive anchor text
 */
function createNextArticleLink(article: ArticleMeta): NextArticleLink {
  // Generate descriptive anchor text based on title and description
  let anchorText = article.title;
  
  // If description is available and shorter, use it for context
  if (article.description && article.description.length < 100) {
    anchorText = `${article.title}: ${article.description}`;
  }

  return {
    title: article.title,
    slug: article.slug,
    description: article.description,
    anchorText,
  };
}

