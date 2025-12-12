/**
 * Date utility functions for consistent date formatting across the site
 */

/**
 * Formats a date string to Portuguese locale format
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formats a date to a relative time string (e.g., "há 2 horas", "há 3 dias")
 */
export function formatTimeAgo(date: string | Date): string {
  const now = new Date();
  const postDate = typeof date === 'string' ? new Date(date) : date;
  const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "há menos de 1 hora";
  if (diffInHours < 24) return `há ${diffInHours} horas`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "há 1 dia";
  if (diffInDays < 7) return `há ${diffInDays} dias`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) return "há 1 semana";
  if (diffInWeeks < 4) return `há ${diffInWeeks} semanas`;
  
  return formatDate(postDate);
}

