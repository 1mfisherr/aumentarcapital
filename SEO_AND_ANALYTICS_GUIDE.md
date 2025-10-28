# SEO & Analytics Guide - Aumentar Capital

## 📋 Table of Contents
1. [Google Search Console Setup](#google-search-console-setup)
2. [Sitemap Submission](#sitemap-submission)
3. [GA4 Article Tracking](#ga4-article-tracking)
4. [Analyzing Article Performance](#analyzing-article-performance)
5. [Structured Data Verification](#structured-data-verification)

---

## 🔍 Google Search Console Setup

### Step 1: Add Your Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Choose **URL prefix** and enter: `https://aumentarcapital.com`
4. Click **Continue**

### Step 2: Verify Ownership

**Option A: HTML Tag Verification (Recommended)**
1. Select **"HTML tag"** method
2. Copy the meta tag provided (looks like this):
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
3. Add this to your `app/layout.tsx` file in the `<head>` section:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <head>
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

4. Deploy your site
5. Return to Search Console and click **"Verify"**

**Option B: DNS Verification (Alternative)**
1. Select **"DNS record"** method
2. Add the TXT record to your domain's DNS settings
3. Wait a few minutes for DNS propagation
4. Click **"Verify"**

---

## 🗺️ Sitemap Submission

### Your Sitemap is Already Ready!

Your sitemap is automatically generated at:
```
https://aumentarcapital.com/sitemap.xml
```

### Submit to Google Search Console

1. In Google Search Console, go to **"Sitemaps"** in the left menu
2. Enter your sitemap URL: `https://aumentarcapital.com/sitemap.xml`
3. Click **"Submit"**
4. ✅ Done! Google will start crawling your site

### What's Included in Your Sitemap?

Your sitemap includes:
- ✅ Homepage (Priority: 1.0)
- ✅ All articles from `/posts` folder (Priority: 0.7-0.9 based on recency)
- ✅ Static pages: `/sobre`, `/contacto`, `/artigos` (Priority: 0.5-0.9)
- ✅ Automatic updates when you add new articles

### Monitor Sitemap Status

1. Check **"Sitemaps"** page in Search Console
2. Wait 24-48 hours for Google to crawl
3. You should see:
   - **Discovered:** Number of URLs found
   - **Indexed:** Number of URLs in Google's index

---

## 📊 GA4 Article Tracking

### What's Already Tracking

Your site now tracks:
1. **Article Views** - Every time someone views an article
2. **Scroll Depth** - At 25%, 50%, 75%, and 100% scroll
3. **Page Views** - Standard GA4 page tracking
4. **Reading Time** - How long articles take to read

### Custom Events Being Tracked

#### 1. Article View Event
Triggered when someone opens an article:
```javascript
{
  event_name: 'article_view',
  article_slug: 'como-criar-um-orcamento',
  article_title: 'Como Criar um Orçamento',
  article_category: 'finanças pessoais',
  article_author: 'Delfim Almeida',
  reading_time: 5
}
```

#### 2. Article Engagement Event
Triggered at scroll milestones (25%, 50%, 75%, 100%):
```javascript
{
  event_name: 'article_engagement',
  article_slug: 'como-criar-um-orcamento',
  scroll_depth: 50
}
```

#### 3. Newsletter Signup Event
Triggered when someone subscribes:
```javascript
{
  event_name: 'newsletter_signup',
  source: 'article_page' | 'homepage' | 'footer'
}
```

---

## 📈 Analyzing Article Performance

### Using GA4 Reports

#### Method 1: Custom Exploration (Recommended)

1. Go to **Google Analytics 4** → [GA4 Dashboard](https://analytics.google.com)
2. Navigate to **Explore** in the left menu
3. Click **"Blank"** to create a new exploration
4. Set up your report:

**Dimensions:**
- Add: `Event name`
- Add: `Page path`
- Add: `Article title` (Custom parameter)
- Add: `Article category` (Custom parameter)

**Metrics:**
- Add: `Event count`
- Add: `Total users`
- Add: `Engaged sessions`

**Example Setup:**
```
Rows: Article title
Values: Event count (where event_name = article_view)
Filters: event_name = article_view
Date range: Last 30 days
```

5. Click **"Apply"** to see which articles get the most views

#### Method 2: Events Report

1. Go to **Reports** → **Engagement** → **Events**
2. Look for these custom events:
   - `article_view` - See total article views
   - `article_engagement` - See scroll depth engagement
   - `newsletter_signup` - See conversion rates

3. Click on `article_view` to see breakdown by:
   - `article_slug`
   - `article_title`
   - `article_category`

#### Method 3: Pages Report

1. Go to **Reports** → **Engagement** → **Pages and screens**
2. Filter for `/artigos/` to see all article pages
3. Sort by **Views** to find top performers

### Creating a Content Performance Dashboard

1. In GA4, go to **Explore** → **Create new exploration**
2. Name it: **"Article Performance Dashboard"**
3. Add these visualizations:

**Table 1: Top Articles by Views**
- Dimension: `article_title`
- Metric: `Event count` (filtered to `article_view`)
- Sort: Descending

**Table 2: Engagement by Category**
- Dimension: `article_category`
- Metrics: `Event count`, `Average engagement time`

**Table 3: Scroll Depth Analysis**
- Dimension: `article_slug`
- Metric: `Event count` (filtered to `scroll_depth >= 75`)
- This shows articles people actually read

**Chart: Article Views Over Time**
- Date range: Last 90 days
- Dimension: `Date`
- Metric: `Event count` (article_view)

### Recommended Tracking Schedule

**Weekly Check:**
- Top 5 performing articles
- New articles performance (first 7 days)
- Engagement rates

**Monthly Analysis:**
- Which categories perform best?
- What topics should you write more about?
- Which articles need updates or improvements?

**Quarterly Review:**
- Overall traffic trends
- Content gaps to fill
- Seasonal patterns

---

## 🎯 Using Analytics to Guide Content Creation

### Step-by-Step Process

#### 1. Identify Top Performers (Monthly)

In GA4 Explore:
```
Report: Top Articles Last 30 Days
Filter: event_name = article_view
Sort by: Event count
Export: Top 10 articles
```

Look for patterns:
- What categories are most popular?
- What problems are people trying to solve?
- Which formats work best? (How-to, lists, guides)

#### 2. Analyze Engagement (Weekly)

Check scroll depth:
```
Report: Article Engagement
Filter: scroll_depth >= 75
Metric: Percentage of readers who finish articles
```

**Good engagement:** >40% reach 75% scroll
**Poor engagement:** <20% reach 75% scroll

If engagement is low:
- Article might be too long
- Content not matching title promise
- Topic not interesting enough

#### 3. Find Content Gaps

Compare:
- Articles with high views but low engagement → Improve content quality
- Categories with few articles but high views → Create more in this category
- Topics competitors cover that you don't → New content ideas

#### 4. Create Content Calendar

Based on analytics:
1. **Double down** on high-performing topics
2. **Create series** for popular categories
3. **Update** old articles with low engagement
4. **Fill gaps** in underserved categories

### Example Workflow

**Week 1: Analyze**
- Export top 10 articles from GA4
- Note categories and topics
- Check scroll depth data

**Week 2: Plan**
- Create list of related topics
- Research keywords
- Plan 4 new articles

**Week 3-4: Create**
- Write new content
- Optimize based on what works
- Publish and promote

**Repeat monthly**

---

## ✅ Structured Data Verification

### Your Article Schema is Already Implemented!

Every article includes comprehensive schema.org markup:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article description",
  "image": {
    "@type": "ImageObject",
    "url": "image-url",
    "width": 1200,
    "height": 628
  },
  "datePublished": "2024-01-01",
  "dateModified": "2024-01-01",
  "author": {
    "@type": "Person",
    "name": "Delfim Almeida"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Aumentar Capital",
    "logo": {
      "@type": "ImageObject",
      "url": "logo-url"
    }
  },
  "wordCount": 1500,
  "timeRequired": "PT5M",
  "inLanguage": "pt-PT",
  "isAccessibleForFree": true
}
```

### Verify Your Structured Data

#### 1. Google Rich Results Test

1. Go to [Rich Results Test](https://search.google.com/test/rich-results)
2. Enter your article URL: `https://aumentarcapital.com/artigos/YOUR-ARTICLE`
3. Click **"Test URL"**
4. ✅ Should show: **"Page is eligible for rich results"**

#### 2. Schema Markup Validator

1. Go to [Schema.org Validator](https://validator.schema.org/)
2. Enter your article URL
3. Check for any errors or warnings
4. Fix any issues found

#### 3. Google Search Console

After a few days:
1. Go to **Search Console** → **Enhancements**
2. Check **"Articles"** section
3. See how many articles are eligible for rich results

### Benefits of Structured Data

- 📰 **Rich Snippets:** Articles can appear with images, dates, and author info
- 📱 **Google News:** Eligible for Google News features
- 🔍 **Better CTR:** Rich results get more clicks
- 🤖 **Better Understanding:** Google understands your content better

---

## 🚀 Quick Start Checklist

### Immediate Actions (Do Today)
- [ ] Verify site in Google Search Console
- [ ] Submit sitemap to Google Search Console
- [ ] Verify GA4 is receiving data (check Real-time reports)
- [ ] Test one article with Rich Results Test

### This Week
- [ ] Set up custom GA4 exploration for article performance
- [ ] Create bookmark for GA4 Events report
- [ ] Test structured data on all published articles
- [ ] Document your baseline metrics

### Monthly Tasks
- [ ] Review top 10 articles
- [ ] Identify content gaps
- [ ] Plan next month's content based on data
- [ ] Check Search Console for indexing issues

### Quarterly Goals
- [ ] Increase article views by 20%
- [ ] Improve scroll depth engagement by 10%
- [ ] Add 3 articles in top-performing categories
- [ ] Get 50+ articles indexed in Google

---

## 📞 Support & Resources

### Helpful Links
- [Google Search Console Help](https://support.google.com/webmasters)
- [GA4 Documentation](https://support.google.com/analytics)
- [Schema.org Article Documentation](https://schema.org/Article)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)

### Troubleshooting

**Sitemap not showing in Search Console?**
- Wait 24-48 hours after submission
- Check sitemap is accessible: `https://aumentarcapital.com/sitemap.xml`
- Verify no robots.txt blocking

**GA4 not tracking events?**
- Check browser console for errors
- Verify GA4 ID in `lib/site.config.ts`
- Check Real-time reports in GA4
- Disable ad blockers when testing

**Structured data errors?**
- Use Rich Results Test tool
- Check all required fields are present
- Verify image URLs are absolute (not relative)

---

## 🎯 Expected Results Timeline

**Week 1:**
- ✅ Sitemap submitted
- ✅ GA4 tracking events
- ✅ Structured data validated

**Week 2-4:**
- 🔍 Google starts indexing articles
- 📊 GA4 data becomes meaningful
- 📈 See first traffic patterns

**Month 2-3:**
- 🚀 Most articles indexed
- 📊 Clear top performers identified
- 💡 Data-driven content strategy

**Month 4+:**
- 📈 Consistent traffic growth
- 🎯 Optimized content strategy
- 💰 Monetization opportunities

---

**Good luck with your SEO and analytics journey! 🚀**

*For questions or issues, review the troubleshooting section or check the official documentation.*

