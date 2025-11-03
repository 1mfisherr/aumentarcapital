"use client";

import { useEffect, useRef, useCallback, memo } from "react";
import { trackArticleView, trackArticleEngagement } from "./Analytics";

interface ArticleTrackerProps {
  articleData: {
    slug: string;
    title: string;
    category?: string;
    author: string;
    readingTime: number;
  };
}

function ArticleTracker({ articleData }: ArticleTrackerProps) {
  const scrollTrackedRef = useRef<Set<number>>(new Set());

  // Track scroll depth with throttling
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollDepth = ((scrollTop + windowHeight) / documentHeight) * 100;

    // Track at 25%, 50%, 75%, and 100% milestones
    const milestones = [25, 50, 75, 100];
    milestones.forEach((milestone) => {
      if (scrollDepth >= milestone && !scrollTrackedRef.current.has(milestone)) {
        scrollTrackedRef.current.add(milestone);
        trackArticleEngagement(articleData.slug, milestone);
      }
    });
  }, [articleData.slug]);

  useEffect(() => {
    // Track article view on mount
    trackArticleView(articleData);

    // Add scroll listener with passive flag for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [articleData, handleScroll]);

  return null; // This component doesn't render anything
}

export default memo(ArticleTracker);

