"use client";

import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import type { ArticleMeta } from "@/lib/types";

interface ArtigosListProps {
  posts: ArticleMeta[];
}

export function ArtigosList({ posts }: ArtigosListProps) {
  return (
    <div className="grid gap-6 lg:gap-8">
      {posts.map((post, index) => (
        <ArticleCard key={post.slug} post={post} index={index} />
      ))}
    </div>
  );
}
