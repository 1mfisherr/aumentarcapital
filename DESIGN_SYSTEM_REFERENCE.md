# Design System Quick Reference

## 🎨 Color Palette

### Primary (Brand Blue) - Deep Sapphire #1E3A8A
Main brand color — use for headings, buttons, and accents.
```css
bg-primary-50    /* #EFF6FF - Lightest */
bg-primary-100   /* #DBEAFE */
bg-primary-200   /* #BFDBFE */
bg-primary-500   /* #3B82F6 - Sky Blue, Primary Light/Accent */
bg-primary       /* #1E3A8A - Deep Sapphire, Main brand color */
bg-primary-900   /* #1E3A8A - Deep Sapphire, Darkest */
text-primary     /* Use for headings, buttons, links */
hover:text-primary-500 /* Hover effects, links, highlights */
```

### Primary Light (Accent) - Sky Blue #3B82F6
Lighter variation — ideal for hover effects, links, highlights.
```css
bg-primary-500   /* #3B82F6 - Sky Blue */
text-primary-500 /* Use for hover effects, links */
border-primary-500 /* Hover states */
```

### Secondary (Neutral Contrast) - Slate Gray #64748B
For subheadings, icons, or UI elements. Softens contrast and adds depth.
```css
bg-secondary     /* #64748B - Slate Gray */
text-secondary   /* For subheadings, icons, UI elements */
```

### Neutral (Gray) - Text and Backgrounds
```css
bg-neutral-50    /* #fafafa - Subtle backgrounds */
bg-neutral-100   /* #f5f5f5 */
bg-neutral-200   /* #e5e5e5 - Borders */
bg-neutral-600   /* #525252 - Muted text */
bg-neutral-700   /* #404040 */
bg-neutral-900   /* #171717 - Primary text */
text-neutral-600 /* #64748B - Muted text */
text-foreground  /* #111827 - Charcoal, Primary text */
text-foreground-muted /* #6B7280 - Cool Gray, Muted text */
```

### Accent (Highlight) - Emerald #10B981
For positive numbers, success buttons, or key callouts.
```css
bg-accent        /* #10B981 - Emerald */
text-accent      /* For positive numbers, success states */
bg-success       /* #10B981 - Success states */
```

### Background Colors
```css
bg-background    /* #F9FAFB - Off White, Light Mode Background */
bg-surface       /* #FFFFFF - White, Surface/Cards */
bg-background-subtle /* #F3F4F6 - Subtle background */
```

### Error / Warning - Soft Red #EF4444
For alerts, warnings, or error messages.
```css
bg-error         /* #EF4444 - Soft Red */
text-error       /* Error messages */
```

---

## 📝 Typography

### Font Sizes
```css
text-xs      /* 0.75rem - Small labels */
text-sm      /* 0.875rem - Secondary text */
text-base    /* 1rem - Body text */
text-lg      /* 1.125rem - Emphasized text */
text-xl      /* 1.25rem - Small headings */
text-2xl     /* 1.5rem - Headings */
text-3xl     /* 1.875rem - Large headings */
text-4xl     /* 2.25rem - Page titles */
text-5xl     /* 3rem - Hero text */
text-6xl     /* Use for very large hero text */
```

### Font Weights
```css
font-medium  /* 500 - Links, emphasized text */
font-semibold /* 600 - (avoid, use bold instead) */
font-bold    /* 700 - Headings, buttons */
```

### Line Heights (Built into font sizes)
- Body text: 1.7-1.8
- Headings: 1.1-1.3
- Small text: 1.5-1.6

---

## 📏 Spacing Scale

### Padding & Margin
```css
p-4 / m-4    /* 1rem / 16px */
p-6 / m-6    /* 1.5rem / 24px - Common card padding */
p-8 / m-8    /* 2rem / 32px - Generous spacing */
p-10 / m-10  /* 2.5rem / 40px */
p-12 / m-12  /* 3rem / 48px */
p-16 / m-16  /* 4rem / 64px */
```

### Gap (for Flexbox/Grid)
```css
gap-2   /* 0.5rem - Tight spacing */
gap-3   /* 0.75rem - Tags, small elements */
gap-4   /* 1rem - Default spacing */
gap-6   /* 1.5rem - Card spacing */
gap-8   /* 2rem - Section spacing */
```

---

## 🔲 Borders

### Border Width
```css
border      /* 1px - Avoid, use border-2 instead */
border-2    /* 2px - Standard, more defined */
```

### Border Radius
```css
rounded-lg   /* 0.5rem / 8px - Small elements */
rounded-xl   /* 1rem / 16px - Cards, buttons */
rounded-2xl  /* 1.5rem / 24px - Large cards */
rounded-full /* Badges, pills */
```

### Common Border Styles
```css
/* Standard card */
border-2 border-neutral-200 rounded-2xl

/* Hover state */
hover:border-primary-500

/* Primary card */
border-2 border-primary-200 rounded-2xl
```

---

## 💫 Shadows

### Shadow Tokens
```css
shadow-soft     /* Subtle card shadow */
shadow-medium   /* Hover states */
shadow-strong   /* Active/featured elements */
```

### Usage
```css
/* Card default */
shadow-soft

/* Card on hover */
hover:shadow-medium

/* Featured/active card */
shadow-strong
```

---

## 🎭 Animations & Transitions

### Transition Duration
```css
duration-200    /* Fast - Small interactions */
duration-300    /* Standard - Most hover effects */
duration-500    /* Slow - Dramatic effects */
```

### Transition Properties
```css
transition-all       /* Most common */
transition-colors    /* Only colors */
transition-transform /* Only transforms */
```

### Built-in Animations
```css
animate-fade-in   /* Opacity 0 to 1 */
animate-slide-up  /* Slide from bottom */
animate-scale-in  /* Scale from 95% to 100% */
```

### Common Transforms
```css
/* Hover effects */
hover:scale-105      /* Slight grow */
hover:translate-x-1  /* Slide right 4px */
active:scale-98      /* Press effect */

/* Icon animations */
group-hover:translate-x-1
group-hover:opacity-100
```

---

## 🔘 Buttons

### Primary Button
```css
className="px-8 py-4 bg-primary-600 text-white font-bold text-lg 
           rounded-xl hover:bg-primary-700 hover:shadow-medium 
           transition-all duration-300 active:scale-98"
```

### Secondary Button (Outline)
```css
className="px-6 py-2.5 border-2 border-primary-600 text-primary-600 
           font-semibold rounded-full hover:bg-primary-600 
           hover:text-white transition-all duration-300"
```

### Link Button
```css
className="inline-flex items-center gap-2 text-primary-600 
           hover:text-primary-700 font-semibold transition-colors"
```

---

## 🃏 Cards

### Standard Card
```css
className="bg-white border-2 border-neutral-200 rounded-2xl 
           p-6 lg:p-8 hover:shadow-strong transition-all duration-300"
```

### Interactive Card (with hover effect)
```css
className="group bg-white border-2 border-neutral-200 rounded-2xl 
           p-6 lg:p-8 hover:border-primary-400 hover:shadow-strong 
           transition-all duration-300"
```

### Gradient Card
```css
className="bg-gradient-to-br from-primary-50 to-primary-100/50 
           border-2 border-primary-200 rounded-2xl p-8 shadow-soft"
```

---

## 📝 Forms

### Input Field
```css
className="w-full px-5 py-3.5 border-2 border-neutral-200 rounded-xl 
           focus:outline-none focus:ring-2 focus:ring-primary-500 
           focus:border-primary-500 transition-all duration-200"
```

### Textarea
```css
className="w-full px-5 py-3.5 border-2 border-neutral-200 rounded-xl 
           focus:outline-none focus:ring-2 focus:ring-primary-500 
           focus:border-primary-500 transition-all duration-200 resize-none"
```

### Label
```css
className="block text-base font-bold text-neutral-900 mb-2"
```

---

## 🏷️ Badges & Tags

### Category Badge
```css
className="inline-block px-3 py-1 bg-primary-50 text-primary-700 
           rounded-full text-xs font-bold uppercase tracking-wider"
```

### Tag (Interactive)
```css
className="px-4 py-2 bg-neutral-100 text-neutral-700 
           hover:bg-primary-50 hover:text-primary-700 
           rounded-xl text-sm font-medium transition-colors duration-200"
```

---

## 🔗 Links

### Navigation Link
```css
className="text-base font-medium text-neutral-700 hover:text-primary-600 
           transition-all duration-200 relative group"

/* With underline animation */
<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 
                 group-hover:w-full transition-all duration-300" />
```

### Text Link
```css
className="text-primary-600 hover:text-primary-700 
           underline underline-offset-3 decoration-2 
           transition-colors duration-200 font-medium"
```

### Arrow Link
```css
className="inline-flex items-center gap-2 text-primary-600 
           hover:text-primary-700 font-semibold group"

{/* Icon */}
<svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
```

---

## 📱 Responsive Patterns

### Container
```css
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16"
```

### Grid
```css
/* 2 columns on tablet, 3 on desktop */
className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"

/* Sidebar layout */
className="grid lg:grid-cols-2 gap-8 lg:gap-10"
```

### Text Sizing
```css
/* Responsive heading */
className="text-4xl sm:text-5xl lg:text-6xl"

/* Responsive body */
className="text-base sm:text-lg"
```

### Spacing
```css
/* Responsive padding */
className="p-6 sm:p-8 lg:p-10"

/* Responsive margin */
className="mb-8 lg:mb-12"
```

---

## 🎯 Common Patterns

### Section Header
```tsx
<div className="mb-8 lg:mb-12">
  <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
    Section Title
  </h2>
  <p className="text-lg text-neutral-600 leading-relaxed">
    Section description
  </p>
</div>
```

### Card with Icon
```tsx
<div className="bg-white border-2 border-neutral-200 rounded-2xl p-6 lg:p-8 
                hover:border-primary-500 hover:shadow-strong transition-all duration-300">
  <div className="text-4xl mb-4">🎯</div>
  <h3 className="text-2xl font-bold mb-3 text-neutral-900">Title</h3>
  <p className="text-neutral-600 leading-relaxed">Description</p>
</div>
```

### Hover Card with Arrow
```tsx
<Link href="/path" className="group block">
  <div className="border-2 border-neutral-200 rounded-2xl p-6 
                  hover:border-primary-400 hover:shadow-strong transition-all">
    <h3 className="font-bold text-neutral-900 group-hover:text-primary-600 
                   transition-colors">
      Title
    </h3>
    <div className="flex items-center gap-2 text-primary-600 mt-4">
      <span className="font-semibold">Learn more</span>
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform">
        {/* Arrow icon */}
      </svg>
    </div>
  </div>
</Link>
```

---

## ✅ Best Practices

### Do's
✅ Use `border-2` for all borders
✅ Use `rounded-xl` or `rounded-2xl` for modern look
✅ Add `transition-all duration-300` to interactive elements
✅ Use `group` and `group-hover` for complex hover effects
✅ Include hover states on all clickable elements
✅ Use semantic color names (primary, neutral) not hex codes
✅ Test on mobile, tablet, and desktop
✅ Add `active:scale-98` for button press feedback

### Don'ts
❌ Don't use `border` (1px) - use `border-2` instead
❌ Don't use `rounded-lg` for cards - use `rounded-xl` or `rounded-2xl`
❌ Don't forget hover states
❌ Don't use fixed font sizes - use responsive text classes
❌ Don't skip `transition` properties
❌ Don't use colors outside the palette
❌ Don't make tap targets smaller than 44px on mobile

---

## 🚀 Quick Start

1. **Start with a card**: Use the standard card pattern
2. **Add content**: Use heading hierarchy (h1 → h2 → h3)
3. **Add spacing**: Use p-6 to p-8, mb-4 to mb-8
4. **Add interactions**: hover:shadow-medium, transition-all duration-300
5. **Test responsive**: Check sm, md, lg breakpoints
6. **Add animations**: group-hover effects, icon translations

---

## 💡 Examples

### Hero Section
```tsx
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 
                 mb-6 tracking-tight">
    Hero Title
  </h1>
  <p className="text-xl sm:text-2xl text-neutral-600 mb-10 leading-relaxed 
                max-w-3xl">
    Hero description
  </p>
  <button className="px-8 py-4 bg-primary-600 text-white font-bold rounded-xl 
                     hover:bg-primary-700 hover:shadow-medium transition-all 
                     duration-300">
    Call to Action
  </button>
</section>
```

### Feature Grid
```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {features.map((feature) => (
    <div key={feature.id} 
         className="bg-white border-2 border-neutral-200 rounded-2xl p-8 
                    hover:border-primary-500 hover:shadow-strong 
                    transition-all duration-300">
      <div className="text-5xl mb-4">{feature.icon}</div>
      <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
      <p className="text-neutral-600">{feature.description}</p>
    </div>
  ))}
</div>
```

---

This reference guide provides all the building blocks you need to maintain design consistency throughout the website!

