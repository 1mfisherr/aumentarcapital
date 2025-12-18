# 🎨 Theming Guide - Aumentar Capital

## Quick Start: Changing Colors

Want to change your website colors? **Edit ONE file** and you're done!

### Step 1: Open the Theme File

Open: `app/globals.css`

### Step 2: Find the Theme Section

Look for the `:root` section at the top:

```css
:root {
  /* ===== BRAND COLORS ===== */
  --color-brand-primary: #0891B2;      /* Main brand color (cyan) */
  --color-brand-secondary: #06B6D4;    /* Secondary brand color (lighter cyan) */
  --color-brand-accent: #0E7490;       /* Accent color (darker cyan) */
  ...
}
```

### Step 3: Change the Colors

Replace the hex codes with your new colors:

```css
:root {
  /* ===== BRAND COLORS ===== */
  --color-brand-primary: #FF6B6B;      /* Your new primary color */
  --color-brand-secondary: #FF8E8E;    /* Your new secondary color */
  --color-brand-accent: #FF4444;       /* Your new accent color */
  ...
}
```

### Step 4: Save & Refresh

Save the file → Refresh your browser → **Done!** ✨

The entire website updates automatically - logo, buttons, links, everything.

---

## Color Variables Reference

### Brand Colors
- `--color-brand-primary` - Main brand color (buttons, links, logo)
- `--color-brand-secondary` - Secondary brand color (hover states, gradients)
- `--color-brand-accent` - Accent color (pressed states, highlights)

### Text Colors
- `--color-text-primary` - Main text color (headings, body text)
- `--color-text-secondary` - Secondary text (subheadings, captions)
- `--color-text-muted` - Muted text (metadata, less important info)

### Background Colors
- `--color-bg-primary` - Main background (white)
- `--color-bg-secondary` - Secondary background (light gray)
- `--color-bg-subtle` - Subtle background (very light gray)
- `--color-bg-brand-light` - Light brand tint background

### UI Colors
- `--color-border` - Border color
- `--color-success` - Success messages (green)
- `--color-error` - Error messages (red)
- `--color-warning` - Warning messages (orange)

---

## Using Colors in Components

### With Tailwind Classes

```tsx
// Primary brand color
<button className="bg-brand-primary text-white">Click Me</button>

// With hover state
<button className="bg-brand-primary hover:bg-brand-accent">Click Me</button>

// Border
<div className="border-2 border-brand-primary">Content</div>

// Text
<h1 className="text-brand-primary">Heading</h1>
```

### Pre-made Utility Classes

The theme includes ready-to-use component classes:

```tsx
// Primary button
<button className="btn-primary">Save</button>

// Secondary button
<button className="btn-secondary">Cancel</button>

// Card
<div className="card">Card content</div>

// Logo gradient
<div className="logo-gradient">Gradient background</div>

// Logo gradient text
<h1 className="logo-gradient-text">Gradient text</h1>
```

---

## Color Scheme Examples

### Blue (Default)
```css
--color-brand-primary: #0891B2;
--color-brand-secondary: #06B6D4;
--color-brand-accent: #0E7490;
```

### Purple
```css
--color-brand-primary: #8B5CF6;
--color-brand-secondary: #A78BFA;
--color-brand-accent: #7C3AED;
```

### Green
```css
--color-brand-primary: #10B981;
--color-brand-secondary: #34D399;
--color-brand-accent: #059669;
```

### Orange
```css
--color-brand-primary: #F59E0B;
--color-brand-secondary: #FBBF24;
--color-brand-accent: #D97706;
```

### Red
```css
--color-brand-primary: #EF4444;
--color-brand-secondary: #F87171;
--color-brand-accent: #DC2626;
```

---

## Tips for Choosing Colors

### 1. Use a Color Picker

- [Coolors.co](https://coolors.co/) - Generate color palettes
- [Adobe Color](https://color.adobe.com/) - Professional color wheel
- [HTML Color Picker](https://www.w3schools.com/colors/colors_picker.asp) - Simple picker

### 2. Color Relationships

- **Primary**: Your main brand color
- **Secondary**: Lighter version of primary (add 20-30% brightness)
- **Accent**: Darker version of primary (reduce 20-30% brightness)

### 3. Accessibility

Make sure your colors have good contrast:
- Dark text on light backgrounds
- Light text on dark backgrounds
- Test with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 4. Test Your Colors

After changing colors:
1. Check the homepage
2. Check an article page
3. Check buttons and links
4. Check forms
5. Test in light/dark mode (if enabled)

---

## Advanced: Creating Color Schemes

### Monochromatic (Single Color)

Use different shades of the same color:

```css
--color-brand-primary: #3B82F6;    /* Base blue */
--color-brand-secondary: #60A5FA;  /* Lighter blue */
--color-brand-accent: #2563EB;     /* Darker blue */
```

### Complementary (Opposite Colors)

Use colors opposite on the color wheel:

```css
--color-brand-primary: #3B82F6;    /* Blue */
--color-brand-secondary: #F59E0B;  /* Orange (complementary) */
--color-brand-accent: #2563EB;     /* Dark blue */
```

### Analogous (Adjacent Colors)

Use colors next to each other on the color wheel:

```css
--color-brand-primary: #10B981;    /* Green */
--color-brand-secondary: #06B6D4;  /* Cyan (adjacent) */
--color-brand-accent: #059669;     /* Dark green */
```

---

## Troubleshooting

### Colors Not Updating?

1. **Clear browser cache**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Restart dev server**: Stop and run `npm run dev` again
3. **Check for typos**: Make sure hex codes start with `#`
4. **Valid hex format**: 6 characters (e.g., `#FF6B6B`) not 3 (e.g., ~~`#F6B`~~)

### Some Elements Still Old Color?

The theming system covers all components, but if you find any:
1. Search for the old hex code in your project
2. Replace with the appropriate CSS variable
3. Report it as a bug!

### Colors Look Wrong?

1. Check contrast ratios for accessibility
2. Test on different screens
3. View in incognito mode (no extensions interfering)
4. Try the "Web Developer" browser extension to test color blindness

---

## Need Help?

1. Check this guide again
2. Search for hex codes in `app/globals.css`
3. Test with one of the example color schemes above
4. Make sure you saved the file!

---

## What Changed vs. Old System?

### Before (Complex, Fragile)
```tsx
// Colors scattered everywhere
<div style={{ background: '#0891B2' }}>...</div>
<div className="bg-blue-500">...</div>
<div style={{ color: '#1E3A8A' }}>...</div>
```

**Problems:**
- Had to edit 20+ files to change colors
- Inline styles everywhere
- Tailwind config conflicts
- Impossible to maintain

### After (Simple, Maintainable)
```tsx
// Single source of truth
<div className="bg-brand-primary">...</div>
<div className="text-brand-primary">...</div>
<button className="btn-primary">...</button>
```

**Benefits:**
- Edit ONE file (`app/globals.css`)
- Consistent everywhere
- Easy to maintain
- Future-proof for dark mode

---

**Happy theming! 🎨**
