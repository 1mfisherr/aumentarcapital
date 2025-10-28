# SEO & Crawling Guide

Your site is now fully optimized for search engines! This guide explains what's been implemented and how to use it.

## ✅ What's Been Implemented

### 1. **Sitemap (`/sitemap.xml`)**
- **Location**: Automatically generated at `https://aumentarcapital.com/sitemap.xml`
- **Features**:
  - All static pages (home, artigos, sobre, contacto, política de privacidade)
  - All article posts dynamically included
  - Smart priority system (newer articles get higher priority)
  - Proper change frequencies for each page type
  - Automatic last modified dates

### 2. **Robots.txt (`/robots.txt`)**
- **Location**: Automatically generated at `https://aumentarcapital.com/robots.txt`
- **Features**:
  - Allows all search engines to crawl your site
  - Blocks sensitive directories (API routes, private folders, _next)
  - Optimized rules for Google and Bing
  - Points to your sitemap
  - Zero crawl delay for faster indexing

### 3. **Meta Tags & Verification**
- **Robot directives**: Tells search engines to index and follow all links
- **Google Search Console verification**: Ready to add your code
- **Bing Webmaster verification**: Ready to add your code
- **Optimal image and snippet previews**

### 4. **Structured Data (JSON-LD)**
- Organization schema already included in your layout
- Helps Google understand your business better

---

## 🚀 How to Submit Your Site to Search Engines

### Google Search Console

1. **Sign up**: Go to [Google Search Console](https://search.google.com/search-console)
2. **Add property**: Add `https://aumentarcapital.com`
3. **Verify ownership**: 
   - Copy your verification code
   - Add it to `lib/site.config.ts`:
   ```typescript
   seo: {
     googleSiteVerification: "YOUR_VERIFICATION_CODE_HERE",
   }
   ```
   - Rebuild and deploy
   - Click verify in Search Console

4. **Submit sitemap**:
   - Go to "Sitemaps" in the left menu
   - Enter: `sitemap.xml`
   - Click "Submit"

### Bing Webmaster Tools

1. **Sign up**: Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. **Add site**: Add `https://aumentarcapital.com`
3. **Verify ownership**:
   - Copy your verification code
   - Add it to `lib/site.config.ts`:
   ```typescript
   seo: {
     bingSiteVerification: "YOUR_VERIFICATION_CODE_HERE",
   }
   ```
   - Rebuild and deploy
   - Click verify

4. **Submit sitemap**:
   - Go to "Sitemaps"
   - Enter: `https://aumentarcapital.com/sitemap.xml`
   - Click "Submit"

---

## 📊 Sitemap Structure

Your sitemap includes:

| Page Type | Priority | Change Frequency | Notes |
|-----------|----------|------------------|-------|
| Homepage | 1.0 | Weekly | Highest priority |
| Articles Index | 0.9 | Daily | High priority, updates often |
| New Articles (< 7 days) | 0.9 | Monthly | Very high priority for fresh content |
| Recent Articles (< 30 days) | 0.8 | Monthly | High priority |
| Older Articles | 0.7 | Monthly | Standard priority |
| About/Contact | 0.6 | Monthly | Medium priority |
| Privacy Policy | 0.3 | Yearly | Low priority |

---

## 🔍 How to Verify Your Sitemap

### Method 1: Browser
Visit: `https://aumentarcapital.com/sitemap.xml`

You should see an XML file with all your URLs.

### Method 2: Google Search Console
After submitting, check the "Sitemaps" section for:
- ✅ Success status
- Number of discovered URLs
- Last read date

### Method 3: Sitemap Validator
Use [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

---

## 🎯 Best Practices Already Implemented

✅ **Dynamic Sitemap**: Automatically updates when you add new articles  
✅ **Priority System**: Newer content gets crawled first  
✅ **Robots.txt**: Properly configured to guide crawlers  
✅ **Meta Robots**: Tells search engines what to do  
✅ **Canonical URLs**: Prevents duplicate content issues  
✅ **Open Graph**: Social media previews  
✅ **Structured Data**: Helps search engines understand your content  
✅ **RSS Feed**: Alternative discovery method (`/feed.xml`)  

---

## 📈 Expected Crawling Timeline

| Timeframe | What to Expect |
|-----------|----------------|
| **24-48 hours** | Google starts discovering pages |
| **1-2 weeks** | Initial indexing complete |
| **2-4 weeks** | Regular crawling established |
| **1-3 months** | Full SEO benefits visible |

---

## 🔧 Maintenance

Your sitemap is **fully automatic**! No maintenance needed.

Every time you:
- Add a new article
- Update content
- Rebuild your site

The sitemap automatically updates with:
- New URLs
- Updated timestamps
- Recalculated priorities

---

## 📝 Adding New Pages

If you add new pages to your site, update `app/sitemap.ts`:

```typescript
{
  url: `${siteConfig.url}/your-new-page`,
  lastModified: currentDate,
  changeFrequency: "monthly",
  priority: 0.6,
}
```

---

## 🐛 Troubleshooting

### Sitemap not showing up?
1. Run `npm run build`
2. Check if `/sitemap.xml` is accessible
3. Verify no build errors

### Google not crawling?
1. Check robots.txt isn't blocking
2. Verify sitemap is submitted in Search Console
3. Check for crawl errors in Search Console
4. Make sure your domain is live and accessible

### Pages not indexed?
1. Content must be high quality
2. Pages must be accessible (not behind login)
3. No `noindex` tags on pages
4. Site must have some authority (takes time)

---

## 📚 Additional Resources

- [Google Search Central](https://developers.google.com/search)
- [Sitemap Protocol](https://www.sitemaps.org/)
- [Robots.txt Specifications](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)

---

## ✨ Summary

Your site is now **fully optimized** for search engine crawling:

✅ Sitemap generated automatically  
✅ Robots.txt configured properly  
✅ Ready for Search Console verification  
✅ Structured data included  
✅ All best practices implemented  

**Next Step**: Submit your sitemap to Google Search Console and Bing Webmaster Tools!

